Ext.define('Aporo.controller.ActiveDG', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            ActiveDGMainView: 'ActiveDGMainView',
            ActiveDGMenuView: 'ActiveDGMainView #ActiveDGMenuView',
            ActiveDGCheckPackage: 'ActiveDGCheckPackage',

            checkPackageButton: 'ActiveDGMainView #btnCheckPackage'
        },

        control: {
            ActiveDGMainView: {
                activate: 'onActivate'
            },

            // Menu
            'ActiveDGMainView #btnCheckPackage': {
                tap: 'onCheckPackage'
            },
            'ActiveDGMainView #btnUpdateRoute': {
                tap: 'onUpdateRoute'
            },
            'ActiveDGMainView #btnCheckOut': {
                tap: 'onCheckOut'
            },

            // Check Out
            'ActiveDGCheckPackage #submitButton': {
                tap: 'onCallInOrderSubmit'
            }
        }
    },

    device: null,
    locations: null,

    /**
     * Updates the local Device.JSON with device information.
     * If fetchDevice is specified, it will use the local Device.JSON when updating.
     */
    updateJSON: function(fetchDevice) {
        this.getActiveDGMainView().setMasked({
            xtype: 'loadmask',
            message: l.LOADING
        });

        var me = this,
            callback;

        // Callback when the Device.JSON file has been updated
        callback = function(json) {
            // Post the latest Device.JSON to the server
            me.postDeviceJSONUpdate(json, function(success) {
                if (!success) {
                    me.back();
                    Ext.Msg.alert(l.PROBLEM, l.PROBLEM_SAVING_DEVICE_JSON);
                    return;
                }

                me.showMenu();
            });
        };

        // Only get the local Device.JSON file if specified 
        if (fetchDevice) {
            var failure = function(error) {
                // We need to wait until the animation is complete
                setTimeout(function() {
                    me.back();

                    if (error) {
                        Ext.Msg.alert(l.PROBLEM, l.SOMETHING_WENT_WRONG + ':<br /><br />' + error.code);
                    } else {
                        Ext.Msg.alert(l.PROBLEM, l.SOMETHING_WENT_WRONG);
                    }
                }, 500);
            };

            // Check if a Device.JSON file already exists
            Aporo.util.PhoneGap.fileExists({
                fileName: 'Device.JSON',
                success: function(exists) {
                    // When the user is brought to this page, the application checks the local 
                    // “Device.JSON” file.  The application (A) updates Device.JSON and (B) makes 
                    // a URL post request if either:
                    if (exists) {
                        me.readDeviceJSON({
                            success: function(json) {
                                // (1) “is_active” is “False”, or
                                // (2)  the current time is equal to or greater than “last_updated” plus the 
                                //      number of seconds defined by “update_frequency”.
                                var details = json,
                                    isActive = details['is_active'] == 'True',
                                    lastUpdated = Date.parse(details['last_updated']),
                                    requiresUpdate = (Date.now() - lastUpdated) >= parseInt(details['update_frequency']);

                                if (!isActive || requiresUpdate) {
                                    me.updateDeviceJSON(json, function(success, json) {
                                        callback(json);
                                    });
                                }
                            },
                            failure: failure
                        });
                    } else {
                        // Update the local Device.JSON file
                        me.updateDeviceJSON(null, function(success, json) {
                            callback(json);
                        });
                    }
                },
                failure: failure
            });
        } else {
            callback(me.device);
        }
    },

    /**
     * Reads the Device.JSON from the filesystem
     */
    readDeviceJSON: function(config) {
        if (!Aporo.util.PhoneGap.is()) {
            if (Aporo.config.Env.showPhoneGapAlerts) {
                Ext.Msg.alert(l.PROBLEM, l.CANNOT_READ_DEVICE_JSON, function() {
                    setTimeout(function() {
                        config.success({});
                    }, 800);
                }, this);
            } else {
                config.success({});
            }

            return;
        }

        Aporo.util.PhoneGap.readFile({
            fileName: 'device.JSON',
            format: 'json',
            success: function(json) {
                config.success(json);
            },
            failure: function(error) {
                config.failure(error);
            }
        });
    },

    /**
     * Updates Device.JSON on the filesystem
     */
    updateDeviceJSON: function(json, callback) {
        var me = this;

        // The application updates Device.JSON with device information obtained via the 
        // PhoneGap library, defines “is_active” as True, and keeps “update_frequency” 
        // constant.

        json = me.json || {};

        json['is_active'] = 'True';

        var _callback = function() {
            me.device = json;

            callback(true, json);
        };

        if (Aporo.util.PhoneGap.is()) {
            // Standard device information
            json['model'] = device.model;
            json['platform'] = device.platform;
            json['uuid'] = device.uuid;
            json['op_sys_ver'] = device.version;

            if (Aporo.util.PhoneGap.batteryLevel) {
                json['battery_level'] = Aporo.util.PhoneGap.batteryLevel;
            }

            // Geolocation data requires a callback
            navigator.geolocation.getCurrentPosition(function(position) {
                json['lat'] = position.coords.latitude;
                json['long'] = position.coords.longitude;
                json['coord_accuracy'] = position.coords.accuracy;
                json['heading'] = position.coords.heading;
                json['speed'] = position.coords.speed;

                _callback.call(me);
            }, function(error) {
                _callback.call(me);
            }, {
                enableHighAccuracy: true,
                timeout: 5000
            });
        } else {
            _callback();
        }
    },

    /**
     * Posts the curent Device.JSON to the server
     */
    postDeviceJSONUpdate: function(json, callback) {
        console.log('postDeviceJSONUpdate');
        var me = this,
            device = Ext.clone(json);

        // Remove is_active and update_frequency
        delete device['is_active'];
        delete device['update_frequency'];

        var updateJSON = function() {
            var params = {
                action: 'update',
                currier_id: Aporo.config.Env.currier_id,
                is_active: json['is_active'],
                update_frequency: json['update_frequency'],
                'Device.JSON': device,
                'Locations.JSON': me.locations
            };

            Ext.Ajax.request({
                url: Aporo.config.Env.baseApiUrl + 'api/update/',
                method: 'POST',
                useDefaultXhrHeader: false,
                params: Ext.encode(params),
                success: function(response) {
                    console.log(' - success');
                    var responseJson = Ext.decode(response.responseText),
                        device = responseJson['Device.JSON'],
                        locations = responseJson['Locations.JSON'];

                    // Update the Device.JSON
                    json = Ext.Object.merge(json, device);
                    me.updateDeviceJSON(json, function() {
                        // Update Locations.JSON
                        me.updateLocationsJSON(locations, function() {
                            callback(true);
                        });
                    });
                },
                failure: function(response) {
                    callback(false);
                }
            });
        };

        me.getLocationsJSON(updateJSON);
    },

    getLocationsJSON: function(callback) {
        var me = this;

        if (!Aporo.util.PhoneGap.is()) {
            if (Aporo.config.Env.showPhoneGapAlerts) {
                Ext.Msg.alert(l.PROBLEM, l.CANNOT_READ_LOCATIONS_JSON, function() {
                    setTimeout(function() {
                        callback();
                    }, 800);
                }, me);
            } else {
                callback();
            }

            return;
        }

        Aporo.util.PhoneGap.readFile({
            fileName: 'Locations.JSON',
            format: 'json',
            success: function(json) {
                console.log('getLocationsJSON');
                me.locations = json;
                callback();
            },
            failure: function(error) {
                config.failure(error);
            }
        });
    },

    /**
     * Updates the local Locations.JSON file with specified data.
     */
    updateLocationsJSON: function(json, callback) {
        console.log('updateLocationsJSON', json);
        // DEBUG
        // json[0]['tag'] = 'test';
        // json[0]['web_url'] = 'url';
        // json[0]['pickup'] = '';
        // json[0]['delivery'] = 'True';

        if (json == "null") {
            json = null;
        }

        this.locations = json;
        this.updateTitle();

        if (!Aporo.util.PhoneGap.is()) {
            if (Aporo.config.Env.showPhoneGapAlerts) {
                Ext.Msg.alert(l.PROBLEM, l.CANNOT_SAVE_LOCATIONS_JSON, function() {
                    setTimeout(function() {
                        callback(true);
                    }, 800);
                }, this);
            } else {
                callback(true);
            }

            return;
        }

        // Save the file to the device
        Aporo.util.PhoneGap.saveFile({
            fileName: 'Locations.JSON',
            data: json,
            success: function() {
                callback(true);
            },
            failure: function(error) {
                if (error) {
                    Ext.Msg.alert(l.PROBLEM, l.PROBLEM_SAVING_LOCATIONS_JSON + ':<br /><br />' + error.code);
                }

                callback(false);
            }
        });
    },

    /**
     * Actions
     */

    onActivate: function() {
        this.updateJSON(true);
    },

    /**
     * Shows the ActiveDG menu
     */
    showMenu: function() {
        var me = this;

        me.getActiveDGMainView().setMasked(false);
        me.updateTitle();
    },

    updateTitle: function() {
        var me = this,
            nextLocation = me.nextLocation(),
            toolbar = me.getActiveDGMenuView().getComponent('toolbarHeader'),
            button = me.getCheckPackageButton();

        if (nextLocation) {
            toolbar.setTitle(me.titleForLocation(nextLocation));

            button.setText(l.CHECK_PACKAGE);
            button.setUi('normal');
        } else {
            toolbar.setTitle(l.NO_CURRENT_DELIVERIES);

            button.setText(l.CHECK_FOR_MORE_DELIVERIES);
            button.setUi('decline');
        }
    },

    back: function() {
        Ext.getCmp('Viewport').pop();
    },

    /**
     * When the user engages the “Check Package” button, the application directs the user to a
     * particular view depending on the contents of Next Location.
     */
    onCheckPackage: function() {
        //  - If “call_in” is True: --> user is directed to Call In Order
        //  - If “web” is True:     --> user is directed to Web Order

        var me = this,
            checkPackageView = Ext.create('Aporo.view.activeDG.CheckPackage'),
            nextLocation = me.nextLocation();

        if (!nextLocation) {
            me.updateJSON(false);
            return;
        }

        // DEBUG
        // nextLocation['call_in'] = "True";
        // nextLocation['web'] = "True";

        if (nextLocation['call_in'] === true || nextLocation['call_in'] === "True") {
            Ext.getCmp('Viewport').getNavigationBar().titleComponent.setTitle('Check Package');
            Ext.getCmp('Viewport').push(checkPackageView);
        } else if (nextLocation['web'] === true || nextLocation['web'] === "True") {
            me.onWebOrder();
        } else {
            Ext.Msg.alert(l.PROBLEM, l.NEXT_LOCATION_WAS_NEITHER);
            return;
        }
    },

    /**
     * Update the Device.JSON file
     */
    onUpdateRoute: function() {
        this.updateJSON(false);
    },

    /**
     * Checkout of the current job
     */
    onCheckOut: function() {
        var me = this;

        // If any entries in Locations.JSON have “end_datetime” as null or blank, the user is 
        // presented with notification “Please deliver all orders before checking out. Contact 
        // Help if you cannot do so.”                                    
        //                                                          --> directed to Active DG 

        var locations = me.locationsWithProperties([{
            key: 'end_datetime',
            value: null
        }]);

        // DEBUG undo
        if (locations.length > 0) {
            Ext.Msg.alert(l.CHECK_OUT, l.PLEASE_DELIVER_ALL_ORDERS);

            return;
        }

        // Else, the current time is compared with [ “start_time” plus “hour_period” minus 15 
        // minutes ] (“End Time” herein) in Work.JSON.

        // If End Time is greater than the current time, the user is presented with notification 
        // “You are checking out early. This may affect your pay.  Do you wish to continue?” 
        // and with options to confirm or go back.

        var controller = Aporo.app.getController('PassiveDG'),
            work;

        controller.getWork(function(json) {
            work = json;

        }, false);
    },

    /**
     * Check Package Actions
     */

    onCallInOrderSubmit: function() {
        var me = this;

        var tagField = me.getActiveDGCheckPackage().down('textfield'),
            value = tagField.getValue();

        if (!value || value == "") {
            Ext.Msg.alert(l.PROBLEM, l.PLEASE_ENTER_A_TAG);
            return;
        }

        // Otherwise, the application updates the first entry in the local Locations.JSON where: 
        //     1. “tag” is the same as from the user input, 
        //     2. “end_datetime” is null or blank, and, 
        //     3. either (A) or (B).

        //     (A) an entry has “pickup” defined as “True”.  In this case, that entry in Locations.JSON 
        //         is updated by defining:
        //            - “end_datetime” with the current time, and
        //            - { batt_level, lat, long, dev_updated } with PhoneGap.

        var locations = me.locationsWithProperties([{
            key: 'tag',
            value: value
        }, {
            key: 'end_datetime',
            value: null
        }, {
            key: 'pickup',
            value: "True"
        }]);

        if (locations.length > 0) {
            // TODO
            // update:dev_updated - via phonegap
            me.updateDeviceJSON(me.json, function(success, json) {
                var location = locations[0];
                location['end_datetime'] = me.formattedDate();

                me.updateLocationsJSON(me.locations, function(success) {
                    Ext.Msg.alert(l.SUCCESS, null, function() {
                        setTimeout(function() {
                            me.back();

                            me.updateTitle();
                        }, 800);
                    }, me);
                });
            });

            return;
        }

        //     (B) no entry has “pickup” defined as “True”.  In this case, the entry in Locations.JSON 
        //         with “delivery” defined as “True” is updated by defining:
        //            - “end_datetime” with the current time,
        //            - { batt_level, lat, long, dev_updated } with PhoneGap, and
        //            - “price” and “tip” with user inputs from a form.

        locations = me.locationsWithProperties([{
            key: 'tag',
            value: value
        }, {
            key: 'delivery',
            value: 'True'
        }]);

        if (locations.length > 0) {
            var modal = Ext.create('Aporo.view.activeDG.CheckPackageModal'),
                location = locations[0];

            Ext.Viewport.add(modal);

            Ext.getCmp('checkPackageModalSubmitButton').on('tap', function() {
                var price = Ext.getCmp('checkPackageModalPriceField').getValue(),
                    tip = Ext.getCmp('checkPackageModalTipField').getValue();

                modal.destroy();

                // TODO
                // update: dev_updated - via phonegap

                me.updateDeviceJSON(me.json, function(success, json) {
                    location['price'] = price;
                    location['tip'] = tip;
                    location['end_datetime'] = me.formattedDate();

                    me.updateLocationsJSON(me.locations, function(success) {
                        Ext.Msg.alert(l.SUCCESS, null, function() {
                            setTimeout(function() {
                                me.back();

                                me.updateTitle();
                            }, 800);
                        }, me);
                    });
                });
            }, me);

            return;
        }

        // the order is not recognised, so show an alert
        Ext.Msg.show({
            title: l.PROBLEM,
            message: l.ORDER_NOT_RECOGNIZED,
            promptConfig: false,
            buttons: [{
                text: l.GO_BACK,
                itemId: 'back'
            }, {
                text: l.TRY_AGAIN,
                ui: 'action',
                itemId: 'tryagain'
            }],
            fn: function(buttonId) {
                if (buttonId == "back") {
                    setTimeout(function() {
                        me.back();
                    }, 800);
                }
            }
        });
    },

    /**
     * Prompts a barcode scanner using PhoneGap
     */
    onWebOrder: function() {
        var me = this;

        // Method which is called when the barcode has returned a QR code URL
        var callback = function(QR_url) {
            // Otherwise, the application updates the first entry in the local Locations.JSON where: 
            //     1. “web_url” equals “QR_url”, 
            //     2. “end_datetime” is null or blank, and, 
            //     3. either (A) or (B).

            //     (A) an entry has “pickup” defined as “True”.  In this case, that entry in Locations.JSON 
            //         is updated by defining:
            //            - “end_datetime” with the current time, and
            //            - { batt_level, lat, long, dev_updated } with PhoneGap.

            var locations = me.locationsWithProperties([{
                key: 'web_url',
                value: QR_url
            }, {
                key: 'end_datetime',
                value: null
            }, {
                key: 'pickup',
                value: 'True'
            }]);

            if (locations.length > 0) {
                var location = locations[0];
                location['end_datetime'] = me.formattedDate();

                // TODO
                // update:dev_updated - via phonegap
                me.updateDeviceJSON(me.json, function(success, json) {
                    var location = locations[0];
                    location['end_datetime'] = me.formattedDate();

                    me.updateLocationsJSON(me.locations, function(success) {
                        Ext.Msg.alert(l.SUCCESS, null, function() {
                            setTimeout(function() {
                                me.updateTitle();
                            }, 800);
                        });
                    });
                });

                return;
            }

            //     (B) no entry has “pickup” defined as “True”.  In this case, the entry in Locations.JSON 
            //         with “delivery” defined as “True” is updated by defining:
            //            - “end_datetime” with the current time,
            //            - { batt_level, lat, long, dev_updated } with PhoneGap, and
            //            - “price” and “tip” with user inputs from a form.

            locations = me.locationsWithProperties([{
                key: 'web_url',
                value: QR_url
            }, {
                key: 'delivery',
                value: 'True'
            }]);

            if (locations.length > 0) {
                var modal = Ext.create('Aporo.view.activeDG.CheckPackageModal'),
                    location = locations[0];

                Ext.Viewport.add(modal);

                Ext.getCmp('checkPackageModalSubmitButton').on('tap', function() {
                    var price = Ext.getCmp('checkPackageModalPriceField').getValue(),
                        tip = Ext.getCmp('checkPackageModalTipField').getValue();

                    modal.destroy();

                    // TODO
                    // update: dev_updated - via phonegap

                    me.updateDeviceJSON(me.json, function(success, json) {
                        location['price'] = price;
                        location['tip'] = tip;
                        location['end_datetime'] = me.formattedDate();

                        me.updateLocationsJSON(me.locations, function(success) {
                            Ext.Msg.alert(l.SUCCESS, null, function() {
                                setTimeout(function() {
                                    me.updateTitle();
                                }, 800);
                            });
                        });
                    });
                }, me);

                return;
            }

            Ext.Msg.show({
                title: l.PROBLEM,
                message: l.ORDER_NOT_RECOGNIZED,
                promptConfig: false,
                buttons: [{
                    text: l.CANCEL,
                    itemId: 'back'
                }, {
                    text: l.TRY_AGAIN,
                    ui: 'action',
                    itemId: 'tryagain'
                }],
                fn: function(buttonId) {
                    if (buttonId == "tryagain") {
                        setTimeout(function() {
                            me.onWebOrder();
                        }, 800);
                    }
                }
            });
        };

        if (Aporo.util.PhoneGap.is()) {
            var scanner = cordova.require("com.phonegap.plugins.barcodescanner.barcodescanner");
            scanner.scan(
                function(result) {
                    callback.call(me, result.text);
                },
                function(error) {
                    Ext.Msg.alert(l.PROBLEM, l.SOMETHING_WENT_WRONG);
                }
            );
        } else {
            Ext.Msg.alert(l.SCANNER, l.MUST_BE_ON_DEVICE_TO_USE_SCANNER);
        }
    },

    /**
     * Helpers
     */

    /**
     * Returns a formatted date
     */
    formattedDate: function() {
        function ISODateString(d) {
            function pad(n) {
                return n < 10 ? '0' + n : n;
            };

            return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds())
        };

        return ISODateString(new Date());
    },

    /**
     * REturns the next location for the user
     */
    nextLocation: function() {
        var nextLocation = null,
            me = this;

        if (!me.locations) {
            return nextLocation;
        }

        for (var i = 0; i < me.locations.length; i++) {
            var endDatetime = me.locations[i]['end_datetime'];
            if (!endDatetime || endDatetime == '') {
                if (nextLocation) {
                    if (parseInt(nextLocation['loc_num']) > parseInt(me.locations[i]['loc_num'])) {
                        nextLocation = me.locations[i];
                    }
                } else {
                    nextLocation = me.locations[i];
                }
            }
        }

        return nextLocation;
    },

    /**
     * Returns all locations for a tag
     */
    locationsForTag: function(tag) {
        var locations = [],
            me = this;

        if (!me.locations) {
            return locations;
        }

        for (var i = 0; i < me.locations.length; i++) {
            if (me.locations[i]['tag'] == tag) {
                locations.push(me.locations[i]);
            }
        }

        return locations;
    },

    /**
     * Returns all locations with specified properties
     */
    locationsWithProperties: function(properties) {
        var locations = [],
            me = this;

        if (!me.locations) {
            return locations;
        }

        for (var i = 0; i < me.locations.length; i++) {
            var selected = true;

            for (var j = 0; j < properties.length; j++) {
                var key = properties[j]['key'],
                    value = properties[j]['value'];

                if (!value) {
                    if (me.locations[i][key] && me.locations[i][key] != "") {
                        selected = false;
                    }
                } else if (value == "True") {
                    if (me.locations[i][key] === false || me.locations[i][key] == "false" || !me.locations[i][key]) {
                        selected = false;
                    }
                } else if (me.locations[i][key].toLowerCase() != value.toLowerCase()) {
                    selected = false;
                }
            }

            if (selected) {
                locations.push(me.locations[i]);
                break;
            }
        }

        return locations;
    },

    /**
     * Returns the menu title for a location
     */
    titleForLocation: function(location) {
        var title = null;

        if (location['addr']) {
            title = location['addr'];
        }

        if (location['cross_street']) {
            title = (title && title.length > 0) ? title + ', ' + location['cross_street'] : location['cross_street'];
        }

        if (location['tag']) {
            title = (title && title.length > 0) ? title + ', ' + location['tag'] : location['tag'];
        }

        return title;
    }
});
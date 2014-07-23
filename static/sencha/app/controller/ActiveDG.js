Ext.define('Aporo.controller.ActiveDG', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            ActiveDGMainView: 'ActiveDGMainView',
            ActiveDGMenuView: 'ActiveDGMainView #ActiveDGMenuView',
            ActiveDGCheckPackage: 'ActiveDGCheckPackage'
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

    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },

    device: null,
    locations: null,

    updateJSON: function(fetchDevice) {
        this.getActiveDGMainView().setMasked({
            xtype: 'loadmask'
        });

        var me = this,
            callback;

        callback = function(json) {
            me.postDeviceJSONUpdate(json, function(success) {
                if (!success) {
                    me.back();
                    Ext.Msg.alert('Error', 'Something went wrong.');
                    return;
                }

                me.showMenu();
            });
        };

        // Ext.browser.is.PhoneGap

        // Only get the local Device.JSON file if specified 
        if (fetchDevice) {
            Ext.Ajax.request({
                // TODO
                // this needs to be correct URL
                url: 'Device.JSON',
                useDefaultXhrHeader: false,

                success: function(response) {
                    var json = Ext.decode(response.responseText);
                    
                    // When the user is brought to this page, the application checks the local 
                    // “Device.JSON” file.  The application (A) updates Device.JSON and (B) makes 
                    // a URL post request if either:
                    // 
                    // (1) “is_active” is “False”, or
                    // (2)  the current time is equal to or greater than “last_updated” plus the 
                    //      number of seconds defined by “update_frequency”.
                    
                    var details = json[0],
                        isActive = details['is_active'] == 'True',
                        lastUpdated = Date.parse(details['last_updated']),
                        requiresUpdate = (Date.now() - lastUpdated) >= parseInt(details['update_frequency']);

                    if (!isActive || requiresUpdate) {
                        me.updateDeviceJSON(json, function(success, json) {
                            callback(json);
                        });
                    }
                },
                failure: function(response) {
                    console.log('failure', response);

                    me.back();
                    Ext.Msg.alert('Error', 'Something went wrong.');
                }
            });
        }
        else {
            callback(this.device);
        }
    },

    showMenu: function() {
        this.getActiveDGMainView().setMasked(false);

        var nextLocation = this.nextLocation(),
            toolbar = this.getActiveDGMenuView().getComponent('toolbarHeader');

        if (nextLocation) {
            toolbar.setTitle(this.titleForLocation(nextLocation));
        }
    },

    /**
     * Actions
     */
    
    onActivate: function() {
        this.updateJSON(true);
    },

    back: function() {
        Ext.getCmp('Viewport').pop();
    },
    
    onCheckPackage: function() {
        console.log('# onCheckPackage');

        // When the user engages the “Check Package” button, the application directs the user to a 
        // particular view depending on the contents of Next Location.
        // 
        //  - If “call_in” is True: --> user is directed to Call In Order
        //  - If “web” is True:     --> user is directed to Web Order

        var checkPackageView = Ext.create('Aporo.view.ActiveDGCheckPackage'),
            nextLocation = this.nextLocation();

        if (!nextLocation) {
            Ext.Msg.alert('No location found!');
            return;
        }

        // TODO 
        // remove this
        // nextLocation['call_in'] = "True";
        // nextLocation['web'] = "True";

        if (nextLocation['call_in'] == "True") {
            Ext.getCmp('Viewport').getNavigationBar().titleComponent.setTitle('Check Package');
            Ext.getCmp('Viewport').push(checkPackageView);
        }
        else if (nextLocation['web'] == "True") {
            this.onWebOrder();
        }
        else {
            // @seth
            // This should probably have a better error message
            Ext.Msg.alert('Problem', 'Next location was neither call_in or web');
            return;
        }
    },

    onUpdateRoute: function() {
        console.log('# onUpdateRoute');

        this.updateJSON(false);
    },

    onCheckOut: function() {
        console.log('# onCheckOut');

        this.back();
    },

    /**
     * Check Package Actions
     */
    
    onCallInOrderSubmit: function() {
        console.log('# onCallInOrderSubmit');

        var tagField = this.getActiveDGCheckPackage().down('textfield'),
            value = tagField.getValue();

        if (!value || value == "") {
            Ext.Msg.alert('Problem', 'Please enter a tag');
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
        
        var locations = this.locationsWithProperties([
            { key: 'tag', value: value },
            { key: 'end_datetime', value: null },
            { key: 'pickup', value: 'True' }
        ]);
        
        if (locations.length > 0) {
            // TODO
            // update: batt_level, lat, long, dev_updated - via phonegap
            
            var location = locations[0];
            location['end_datetime'] = this.formattedDate();

            console.log(location);

            Ext.Msg.alert('Success!', null, function() {
                this.back();
            }, this);
            
            return;
        }

        //     (B) no entry has “pickup” defined as “True”.  In this case, the entry in Locations.JSON 
        //         with “delivery” defined as “True” is updated by defining:
        //            - “end_datetime” with the current time,
        //            - { batt_level, lat, long, dev_updated } with PhoneGap, and
        //            - “price” and “tip” with user inputs from a form.

        locations = this.locationsWithProperties([
            { key: 'tag', value: value },
            { key: 'delivery', value: 'True' }
        ]);

        if (locations.length > 0) {
            var modal = Ext.create('Aporo.view.ActiveDGCheckPackageModal'),
                location = locations[0];

            Ext.Viewport.add(modal);

            Ext.getCmp('checkPackageModalSubmitButton').on('tap', function() {
                var price = Ext.getCmp('checkPackageModalPriceField').getValue(),
                    tip = Ext.getCmp('checkPackageModalTipField').getValue();

                modal.destroy();

                location['price'] = price;
                location['tip'] = tip;
                location['end_datetime'] = this.formattedDate();

                // TODO
                // update: batt_level, lat, long, dev_updated - via phonegap
                console.log(location);

                Ext.Msg.alert('Success!', null, function() {
                    this.back();
                }, this);
            }, this);

            return;
        }

        Ext.Msg.show({
            title: 'Problem',
            message: 'This order is not recognized',
            promptConfig: false,
            buttons: [{
                text: 'Go back',
                itemId: 'back'
            },
            {
                text: 'Try again',
                ui: 'action',
                itemId: 'tryagain'
            }],
            scope: this,
            fn: function(buttonId) {
                if (buttonId == "back") {
                    this.back();
                }
            }
        });
    },

    onWebOrder: function() {
        // TODO open barcode reader with phonegap
        var callback = function(QR_url) {
            // Otherwise, the application updates the first entry in the local Locations.JSON where: 
            //     1. “web_url” equals “QR_url”, 
            //     2. “end_datetime” is null or blank, and, 
            //     3. either (A) or (B).

            //     (A) an entry has “pickup” defined as “True”.  In this case, that entry in Locations.JSON 
            //         is updated by defining:
            //            - “end_datetime” with the current time, and
            //            - { batt_level, lat, long, dev_updated } with PhoneGap.
            
            var locations = this.locationsWithProperties([
                { key: 'web_url', value: QR_url },
                { key: 'end_datetime', value: null },
                { key: 'pickup', value: 'True' }
            ]);
            if (locations.length > 0) {
                // TODO
                // update: batt_level, lat, long, dev_updated - via phonegap
                
                var location = locations[0];
                location['end_datetime'] = this.formattedDate();

                console.log(location);

                Ext.Msg.alert('Success!');
                
                return;
            }

            //     (B) no entry has “pickup” defined as “True”.  In this case, the entry in Locations.JSON 
            //         with “delivery” defined as “True” is updated by defining:
            //            - “end_datetime” with the current time,
            //            - { batt_level, lat, long, dev_updated } with PhoneGap, and
            //            - “price” and “tip” with user inputs from a form.

            locations = this.locationsWithProperties([
                { key: 'web_url', value: QR_url },
                { key: 'delivery', value: 'True' }
            ]);

            if (locations.length > 0) {
                var modal = Ext.create('Aporo.view.ActiveDGCheckPackageModal'),
                    location = locations[0];

                Ext.Viewport.add(modal);

                Ext.getCmp('checkPackageModalSubmitButton').on('tap', function() {
                    var price = Ext.getCmp('checkPackageModalPriceField').getValue(),
                        tip = Ext.getCmp('checkPackageModalTipField').getValue();

                    modal.destroy();

                    location['price'] = price;
                    location['tip'] = tip;
                    location['end_datetime'] = this.formattedDate();

                    // TODO
                    // update: batt_level, lat, long, dev_updated - via phonegap
                    console.log(location);

                    Ext.Msg.alert('Success!');
                }, this);

                return;
            }

            Ext.Msg.show({
                title: 'Problem',
                message: 'This order is not recognized',
                promptConfig: false,
                buttons: [{
                    text: 'Cancel',
                    itemId: 'back'
                },
                {
                    text: 'Try again',
                    ui: 'action',
                    itemId: 'tryagain'
                }],
                scope: this,
                fn: function(buttonId) {
                    if (buttonId == "tryagain") {
                        var me = this;
                        setTimeout(function() {
                            me.onWebOrder();
                        }, 500);
                    }
                }
            });
        };

        callback.call(this, 'url');
    },

    /**
     * Updating Device.JSON and Locations.JSON
     */

    updateDeviceJSON: function(json, callback) {
        console.log('# updateDeviceJSON');

        // TODO
        // The application updates Device.JSON with device information obtained via the 
        // PhoneGap library, defines “is_active” as True, and keeps “update_frequency” 
        // constant.
        
        var newJson = Ext.clone(json);
        newJson[0]["is_active"] = "True";

        console.log(newJson);

        this.device = newJson;

        callback(true, json);
    },

    postDeviceJSONUpdate: function(json, callback) {
        console.log('# postDeviceJSONUpdate');

        var me = this,
            device = Ext.clone(json[0]);

        // Remove is_active and update_frequency
        delete device['is_active'];
        delete device['update_frequency'];

        Ext.Ajax.request({
            url: Aporo.config.Env.baseApiUrl + 'api/device/',
            method: 'POST',
            useDefaultXhrHeader: false,
            params: Ext.encode({
                action: 'update',
                currier_id: Aporo.app.globals.currier_id,
                device: device,
                is_active: json[0]['is_active'],
                update_frequency: json[0]['update_frequency']
            }),
            success: function(response) {
                var responseJson = Ext.decode(response.responseText)[0],
                    device = responseJson['Device'],
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
    },

    updateLocationsJSON: function(json, callback) {
        console.log('# updateLocationsJSON');

        // TODO
        // The contents of the “Locations” field are to replace the entire contents of 
        // the locally saved file Locations.JSON.
        console.log(json);

        // TODO
        // Remove this
        // json[0]['tag'] = 'test';
        // json[0]['web_url'] = 'url';
        // json[0]['pickup'] = '';
        // json[0]['delivery'] = 'True';

        this.locations = json;

        callback(true);
    },

    /**
     * Helpers
     */

    formattedDate: function() {
        function ISODateString(d) {
            function pad(n) {
                return n < 10 ? '0' + n : n;
            };

            return d.getUTCFullYear() + '-'
             + pad(d.getUTCMonth()+1) + '-'
             + pad(d.getUTCDate()) + 'T'
             + pad(d.getUTCHours()) + ':'
             + pad(d.getUTCMinutes()) + ':'
             + pad(d.getUTCSeconds()) + 'Z'
         };

         return ISODateString(new Date());
    },

    nextLocation: function() {
        var nextLocation = null;

        if (!this.locations) {
            return nextLocation;
        }

        for (var i = 0; i < this.locations.length; i++) {
            var endDatetime = this.locations[i]['end_datetime'];
            if (!endDatetime || endDatetime == '') {
                if (nextLocation) {
                    if (parseInt(nextLocation['loc_num']) > parseInt(this.locations[i]['loc_num'])) {
                        nextLocation = this.locations[i];
                    }
                }
                else {
                    nextLocation = this.locations[i];
                }
            }
        }

        return nextLocation;
    },

    locationsForTag: function(tag) {
        var locations = [];

        if (!this.locations) {
            return locations;
        }

        for (var i = 0; i < this.locations.length; i++) {
            if (this.locations[i]['tag'] == tag) {
                locations.push(this.locations[i]);
            }
        }

        return locations;
    },

    locationsWithProperties: function(properties) {
        var locations = [];

        if (!this.locations) {
            return locations;
        }

        for (var i = 0; i < this.locations.length; i++) {
            var selected = true;

            for (var j = 0; j < properties.length; j++) {
                var key = properties[j]['key'],
                    value = properties[j]['value'];

                if (!value) {
                    if (this.locations[i][key] && this.locations[i][key] != "") {
                        selected = false;
                    }
                }
                else if (this.locations[i][key] != value) {
                    selected = false;
                }
            }

            if (selected) {
                locations.push(this.locations[i]);
                break;
            }
        }

        return locations;
    },

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
Ext.define('Aporo.controller.Vendors', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            VendorMainView: 'VendorMainView',
            VendorNewOrder: 'VendorNewOrder',
            VendorHistory: 'VendorHistory',
            VendorGeo: 'VendorGeo',

            VendorNewOrderContinueButton: 'VendorNewOrder #continueButton'
        },
        control: {
            VendorMainView: {
                activate: 'onVendorOrderListActivate'
            },

            'VendorMainView #newOrderButton': {
                tap: 'onNewOrder'
            },
            'VendorMainView #historyButton': {
                tap: 'onHistory'
            },
            'VendorMainView #quitButton': {
                tap: 'onQuit'
            },
            'VendorMainView #geoButton': {
                tap: 'onGeo'
            },

            'VendorMainView grid': {
                itemtap: 'onGridItemTap'
            },

            // New Order
            'VendorNewOrder #cancelOrderButton': {
                tap: 'onCancelOrder'
            },
            'VendorNewOrder #continueButton': {
                tap: 'onContinue'
            },

            // Geo
            'VendorGeo #submitButton': {
                tap: 'onGeoSubmit'
            }
        }
    },

    /**
     * Pops the viewport
     */
    back: function() {
        Ext.getCmp('Viewport').pop();
    },

    onVendorOrderListActivate: function() {
        this.getVendorJSON();
    },

    onVendorOrderListDeactivate: function() {

    },

    getVendorJSON: function() {
        var me = this;

        Ext.Ajax.request({
            url: Aporo.config.Env.baseApiUrl + 'api/order/',
            method: 'GET',
            useDefaultXhrHeader: false,
            params: Ext.encode({
                action: 'GET',
                vendor_id: Aporo.config.Env.vendor_id
            }),

            success: function(response) {
                var json = Ext.decode(response.responseText);

                // Create the vendor store
                me.vendorStore = Ext.create('Ext.data.Store', {
                    storeId: 'vendorStore',
                    fields: [
                        'req_pickup_time',
                        'tag',
                        'deliv_addr',

                        'type',

                        {
                            name: 'web',
                            convert: function(value, record) {
                                record.set('type', (value == "True" || value === true) ? 'Web' : 'User');
                            }
                        }
                    ],
                    data: json
                });

                // Give the grid the new store
                me.getVendorMainView().setStore(me.vendorStore);
            },
            failure: function(response) {
                Ext.Msg.alert(l.PROBLEM, l.PROBLEM_FETCHING_VENDORS);
                me.back();
            }
        });
    },

    onGridItemTap: function(grid, index, el, record, e) {
        if (e.target.className == "button") {
            this.onNewOrder(record.raw);
        }

        setTimeout(function() {
            grid.deselect(record);
        }, 500);
    },

    onNewOrder: function(values) {
        var view = Ext.create('Aporo.view.vendor.NewOrder');

        Ext.getCmp('Viewport').push(view);

        view.setValues(values ? values : {});
    },

    onHistory: function() {
        Ext.getCmp('Viewport').push(Ext.create('Aporo.view.vendor.History'));

        var me = this;

        me.getVendorHistory().setMasked({
            xtype: 'loadmask',
            message: l.LOADING
        });

        Ext.Ajax.request({
            url: Aporo.config.Env.baseApiUrl + 'api/order/',
            method: 'GET',
            useDefaultXhrHeader: false,
            params: Ext.encode({
                action: 'history',
                vendor_id: Aporo.config.Env.vendor_id
            }),

            success: function(response) {
                var json = Ext.decode(response.responseText);

                // Create the history store
                me.historyStore = Ext.create('Ext.data.Store', {
                    storeId: 'historyStore',
                    fields: [
                        'req_pickup_time',
                        'tag',
                        'deliv_addr',

                        'type',

                        {
                            name: 'web',
                            convert: function(value, record) {
                                record.set('type', (value == "True" || value === true) ? 'Web' : 'User');
                            }
                        }
                    ],
                    data: json
                });

                me.getVendorHistory().setMasked(false);

                // Give the grid the new store
                me.getVendorHistory().setStore(me.historyStore);
            },
            failure: function(response) {
                Ext.Msg.alert(l.PROBLEM, l.PROBLEM_FETCHING_HISTORY);
                me.back();
            }
        });
    },

    onQuit: function() {

    },

    onCancelOrder: function() {
        Ext.getCmp('Viewport').pop();
    },

    onContinue: function() {
        var me = this,
            values = me.getVendorNewOrder().getValues() || {};

        me.getVendorNewOrder().setMasked({
            xtype: 'loadmask',
            message: l.LOADING
        });

        me.getVendorNewOrderContinueButton().setDisabled(true);

        values['action'] = 'update';
        values['vendor_id'] = Aporo.config.Env.vendor_id;

        Ext.Ajax.request({
            url: Aporo.config.Env.baseApiUrl + 'api/order/',
            method: 'POST',
            useDefaultXhrHeader: false,
            params: Ext.encode(values),

            success: function(response) {
                me.getVendorNewOrder().setMasked(false);
                me.getVendorNewOrderContinueButton().setDisabled(false);

                Ext.Msg.alert(l.SUCCESS, l.NEW_ORDER_CREATED, function() {
                    me.back();
                }, me);
            },
            failure: function(response) {
                me.getVendorNewOrder().setMasked(false);
                me.getVendorNewOrderContinueButton().setDisabled(false);

                Ext.Msg.alert(l.PROBLEM, l.PROBLEM_CREATING_NEW_ORDER);
            }
        });
    },

    onGeo: function() {
        var view = Ext.create('Aporo.view.vendor.Geo');

        Ext.getCmp('Viewport').push(view);
    },

    // Geo
    
    onGeoSubmit: function() {
        var apiKey = 'AIzaSyD1YZH1XiVv8JtruQA_WJCfNh8p8ukW1yg',
            values = this.getVendorGeo().getValues() || {},
            address;

        for (var key in values) {
            if (values[key]) {
                if (!address) {
                    address = values[key];
                }
                else {
                    address += ', ' + values[key];
                }
            }
        }

        Ext.Viewport.setMasked({
            xtype: 'loadmask'
        });

        Ext.Ajax.request({
            url: 'https://maps.googleapis.com/maps/api/geocode/json?key=' + apiKey + '&address=' + address,
            scope: this,
            success: function(response) {
                var response = Ext.decode(response.responseText);
                
                if (response.status == "OK") {
                    if (response.results > 1) {
                        this.handleMultipleGeoResults(response.results);
                    }
                    else {
                        this.handleSingleGeoResult(response.results[0]);
                    }
                }
                else {
                    Ext.Viewport.setMasked(false);
                    Ext.Msg.alert(l.PROBLEM, this.errorMessageForStatus(response.status));
                }
            },
            failure: function() {
                Ext.Viewport.setMasked(false);
                Ext.Msg.alert(l.PROBLEM, l.PROBLEM_FETCHING_GEOLOCATION);
            }
        });
    },

    handleSingleGeoResult: function(result) {
        Ext.Viewport.setMasked(false);

        var params = this.getVendorGeo().getValues() || {};
        params.lat = result.geometry.location.lat;
        params.lng = result.geometry.location.lng;

        Ext.Ajax.request({
            url: Aporo.config.Env.baseApiUrl + 'url/to/post',
            method: 'POST',
            params: params,
            scope: this,
            success: function(response) {
                Ext.Viewport.setMasked(false);

                this.back();
            },
            failure: function() {
                Ext.Viewport.setMasked(false);
                Ext.Msg.alert(l.PROBLEM, l.PROBLEM_SAVING_GEOLOCATION);
            }
        });
    },

    handleMultipleGeoResults: function(results) {
        Ext.Viewport.setMasked(false);
        
        var panel = Ext.create('Ext.Panel', {
            width: '80%',
            height: '80%',
            modal: true,
            centered: true,
            layout: 'card',
            items: [{
                docked: 'top',
                xtype: 'toolbar',
                title: 'Please choose the correct address:'
            }, {
                xtype: 'list',
                data: results,
                itemTpl: '{formatted_address}',
                listeners: {
                    select: function(list, record) {
                        panel.hide();

                        Ext.Viewport.setMasked({
                            xtype: 'loadmask'
                        });

                        this.handleSingleGeoResult(record.data);
                    },
                    scope: this
                }
            }]
        });

        Ext.Viewport.add(panel);
        panel.show();
    },

    errorMessageForStatus: function(status) {
        if (status == "ZERO_RESULTS") {
            return l.ZERO_RESULTS;
        }
        else if (status == "OVER_QUERY_LIMT") {
            return l.OVER_QUERY_LIMT;
        }
        else if (status == "REQUEST_DENIED") {
            return l.REQUEST_DENIED;
        }
        else if (status == "INVALID_REQUEST") {
            return l.INVALID_REQUEST;
        }

        return l.PROBLEM_FETCHING_GEOLOCATION;
    }
});
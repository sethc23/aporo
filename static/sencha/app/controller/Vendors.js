Ext.define('Aporo.controller.Vendors', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            VendorMainView: 'VendorMainView',
            VendorNewOrder: 'VendorNewOrder',
            VendorHistory: 'VendorHistory',

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

            'VendorMainView grid': {
                itemtap: 'onGridItemTap'
            },

            // New Order
            'VendorNewOrder #cancelOrderButton': {
                tap: 'onCancelOrder'
            },
            'VendorNewOrder #continueButton': {
                tap: 'onContinue'
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
                Ext.Msg.alert('Error', 'There was a problem fetching Vendors');

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

                Ext.Msg.alert('Success', 'New order created', function() {
                    me.back();
                }, me);
            },
            failure: function(response) {
                me.getVendorNewOrder().setMasked(false);
                me.getVendorNewOrderContinueButton().setDisabled(false);

                Ext.Msg.alert('Error', 'There was a problem creating the new order');
            }
        });
    }
});
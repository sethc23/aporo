Ext.define("Aporo.view.vendor.NewOrder", {
    extend: 'Ext.form.Panel',
    xtype: 'VendorNewOrder',
    id: 'VendorNewOrder',

    requires: [

    ],

    config: {
        title: 'New Order',
        items: [{
            xtype: 'toolbar',
            docked: 'bottom',
            items: [{
                xtype: 'spacer'
            }, {
                xtype: 'button',
                text: 'Cancel Order',
                itemId: 'cancelOrderButton'
            }, {
                xtype: 'button',
                text: 'Continue',
                itemId: 'continueButton'
            }, {
                xtype: 'spacer'
            }]
        }, {
            xtype: 'fieldset',
            items: [{
                xtype: 'textfield',
                name: 'contact_number',
                label: 'Contact Number'
            }, {
                xtype: 'textfield',
                name: 'deliv_addr',
                label: 'Delivery Address'
            }, {
                xtype: 'textfield',
                name: 'apt_num',
                label: 'Apt. Number'
            }, {
                xtype: 'textfield',
                name: 'deliv_cross_street',
                label: 'Delivery Cross St.'
            }, {
                xtype: 'textfield',
                name: 'req_pickup_time',
                label: 'Pickup Time'
            }, {
                xtype: 'textfield',
                name: 'price',
                label: 'Price'
            }, {
                xtype: 'textfield',
                name: 'tip',
                label: 'Tip'
            }, {
                xtype: 'textfield',
                name: 'comment',
                label: 'Comment'
            }]
        }]
    }
});
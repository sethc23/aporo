Ext.define("Aporo.view.vendor.NewOrder", {
    extend: 'Ext.form.Panel',
    xtype: 'VendorNewOrder',
    id: 'VendorNewOrder',

    config: {
        title: l.NEW_ORDER,
        items: [{
            xtype: 'toolbar',
            docked: 'bottom',
            items: [{
                xtype: 'spacer'
            }, {
                xtype: 'button',
                text: l.CANCEL_ORDER,
                itemId: 'cancelOrderButton'
            }, {
                xtype: 'button',
                text: l.CONTINUE,
                itemId: 'continueButton'
            }, {
                xtype: 'spacer'
            }]
        }, {
            xtype: 'fieldset',
            items: [{
                xtype: 'textfield',
                name: 'contact_number',
                label: l.CONTACT_NUMBER
            }, {
                xtype: 'textfield',
                name: 'deliv_addr',
                label: l.DELIVERY_ADDRESS
            }, {
                xtype: 'textfield',
                name: 'apt_num',
                label: l.APT_NUM
            }, {
                xtype: 'textfield',
                name: 'deliv_cross_street',
                label: l.DELIVERY_CROSS_ST
            }, {
                xtype: 'textfield',
                name: 'req_pickup_time',
                label: l.PICK_UP_TIME
            }, {
                xtype: 'textfield',
                name: 'price',
                label: l.PRICE
            }, {
                xtype: 'textfield',
                name: 'tip',
                label: l.TIP
            }, {
                xtype: 'textfield',
                name: 'comment',
                label: l.COMMENT
            }]
        }]
    }
});
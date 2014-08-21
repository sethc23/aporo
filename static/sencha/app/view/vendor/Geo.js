Ext.define("Aporo.view.vendor.Geo", {
    extend: 'Ext.form.Panel',
    xtype: 'VendorGeo',
    id: 'VendorGeo',

    config: {
        title: 'Geo',
        items: [{
            xtype: 'toolbar',
            docked: 'bottom',
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            items: [{
                xtype: 'button',
                text: l.SUBMIT,
                itemId: 'submitButton'
            }]
        }, {
            xtype: 'fieldset',
            items: [{
                xtype: 'textfield',
                name: 'address',
                placeHolder: l.ADDRESS
            }, {
                xtype: 'textfield',
                name: 'apt_num',
                placeHolder: l.APT_NUM
            }, {
                xtype: 'textfield',
                name: 'deliv_cross_street',
                placeHolder: l.DELIVERY_CROSS_STREET
            }, {
                xtype: 'textfield',
                name: 'state',
                placeHolder: l.STATE
            }, {
                xtype: 'textfield',
                name: 'zipcode',
                placeHolder: l.ZIP_CODE
            }]
        }]
    }
});
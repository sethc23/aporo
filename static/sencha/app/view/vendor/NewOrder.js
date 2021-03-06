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
                placeHolder: l.PHONE
            }, {
                xtype: 'textfield',
                name: 'deliv_addr',
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
                xtype: 'selectfield',
                name: 'req_pickup_time',
                label: l.PICK_UP_TIME,
                options: [{
                    text: l.ASAP,
                    value: 0
                }, {
                    text: '15',
                    value: 15
                }, {
                    text: '20',
                    value: 20
                }, {
                    text: '25',
                    value: 25
                }, {
                    text: '30',
                    value: 30
                }, {
                    text: '35',
                    value: 35
                }, {
                    text: '40',
                    value: 40
                }, {
                    text: '45',
                    value: 45
                }, {
                    text: '50',
                    value: 50
                }, {
                    text: '55',
                    value: 55
                }, {
                    text: '60',
                    value: 60
                }, {
                    text: '65',
                    value: 65
                }, {
                    text: '70',
                    value: 70
                }, {
                    text: '75',
                    value: 75
                }, {
                    text: '80',
                    value: 80
                }, {
                    text: '85',
                    value: 85
                }, {
                    text: '90',
                    value: 90
                }]
            }, {
                xtype: 'textfield',
                name: 'price',
                placeHolder: l.PRICE
            }, {
                xtype: 'textfield',
                name: 'tip',
                placeHolder: l.TIP
            }, {
                xtype: 'textfield',
                name: 'comment',
                placeHolder: l.COMMENT
            }]
        }]
    }
});
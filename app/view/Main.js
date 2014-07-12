Ext.define('Aporo.view.Main', {
    extend: 'Ext.NavigationView',
    xtype: 'main',
    id: 'Viewport',
    requires: [
    ],
    config: {
        layout: {
            type: 'card',
            animation: 'slide'
        },
        items: [
        {
            xtype: 'container',
            itemId: 'btnList',
            layout: {
                type: 'vbox',
                pack: 'center',
                align: 'middle'
            },
            items: [
            {
                xtype: 'button',
                ui: 'action',
                width: '70%',
                margin: 15,
                itemId: 'MainRegBtn',
                text: 'Registration'
            },
            {
                xtype: 'button',
                ui: 'action',
                width: '70%',
                margin: 15,
                itemId: 'MainHelpBtn',
                text: 'Contact Help'
            },
            {
                xtype: 'button',
                ui: 'action',
                width: '70%',
                margin: 15,
                itemId: 'MainVendorBtn',
                text: 'Vendor Menu'
            }
            ]
        }
        ]
    }
});

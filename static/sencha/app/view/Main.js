Ext.define('Aporo.view.Main', {
    extend: 'Ext.navigation.View',
    title: 'Home',
    xtype: 'main',
    id: 'Viewport',
    requires: [
    ],
    config: {
        layout: {
            type: 'card',
            animation: 'slide'
        },
        navigationBar: {
            hidden: true,
            items: [
            {
                xtype: 'button',
                align: 'right',
                id: 'addVendorsBtn',
                hidden: true,
                text: 'Add Vendors'
            },
            {
                xtype: 'button',
                align: 'right',
                id: 'historyBtn',
                hidden: true,
                text: 'History'
            }
            ]
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
            },
            {
                xtype: 'button',
                ui: 'action',
                width: '70%',
                margin: 15,
                itemId: 'ActiveDGBtn',
                text: 'Active DG Menu'
            },
            {
                xtype: 'button',
                ui: 'action',
                width: '70%',
                margin: 15,
                itemId: 'PassiveDGBtn',
                text: 'Passive DG Menu'
            }
            ]
        }
        ]
    }
});

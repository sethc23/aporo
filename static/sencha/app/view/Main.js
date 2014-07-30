Ext.define('Aporo.view.Main', {
    extend: 'Ext.navigation.View',
    title: 'Home',
    xtype: 'main',
    id: 'Viewport',
    requires: [],
    config: {
        layout: {
            type: 'card',
            animation: 'slide'
        },
        navigationBar: {
            hidden: true,
            items: [{
                xtype: 'button',
                align: 'right',
                id: 'addVendorsBtn',
                hidden: true,
                text: 'Add Vendors'
            }, {
                xtype: 'button',
                align: 'right',
                id: 'historyBtn',
                hidden: true,
                text: 'History'
            }]
        },
        items: [{
            xtype: 'container',
            itemId: 'btnList',
            layout: {
                type: 'vbox',
                pack: 'center',
                align: 'middle'
            },
            items: [{
                xtype: 'button',
                ui: 'action',
                width: '70%',
                margin: 15,
                itemId: 'MainRegBtn',
                text: l.REGISTRATION
            }, {
                xtype: 'button',
                ui: 'action',
                width: '70%',
                margin: 15,
                itemId: 'MainHelpBtn',
                text: l.CONTACT_HELP
            }, {
                xtype: 'button',
                ui: 'action',
                width: '70%',
                margin: 15,
                itemId: 'MainVendorBtn',
                text: l.VENDOR_MENU
            }, {
                xtype: 'button',
                ui: 'action',
                width: '70%',
                margin: 15,
                itemId: 'ActiveDGBtn',
                text: l.ACTIVE_DG_MENU
            }, {
                xtype: 'button',
                ui: 'action',
                width: '70%',
                margin: 15,
                itemId: 'PassiveDGBtn',
                text: l.PASSIVE_DG_MENU
            }]
        }]
    },

    onBackButtonTap: function() {
        if (this.fireEvent('beforepop', this) !== false) {
            this.callParent(arguments);
        }
    }
});
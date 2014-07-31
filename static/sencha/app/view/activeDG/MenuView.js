Ext.define('Aporo.view.activeDG.MenuView', {
    extend: 'Ext.Container',
    xtype: 'ActiveDGMenuView',

    config: {
        layout: 'card',
        scrollable: null,

        items: [{
            xtype: 'toolbar',
            docked: 'top',
            itemId: 'toolbarHeader',
            cls: 'toolbarHeader'
        }, {
            flex: 1,
            layout: {
                pack: 'center',
                type: 'vbox'
            },
            items: [{
                xtype: 'button',
                text: l.CHECK_PACKAGE,
                itemId: 'btnCheckPackage',
                ui: "action",
                margin: '2% 15% 0 15%'
            }, {
                xtype: 'button',
                text: l.UPDATE_ROUTE,
                itemId: 'btnUpdateRoute',
                ui: "action",
                margin: '2% 15% 0 15%'
            }, {
                xtype: 'button',
                text: l.CHECK_OUT,
                itemId: 'btnCheckOut',
                ui: "action",
                margin: '2% 15% 0 15%'
            }]
        }]
    }
});
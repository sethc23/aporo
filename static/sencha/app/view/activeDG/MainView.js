Ext.define('Aporo.view.activeDG.MainView', {
    extend: 'Ext.Container',
    xtype: 'ActiveDGMainView',
    id: 'ActiveDGMainView',

    config: {
        title: l.ACTIVE_DG_MENU,
        layout: 'card',
        items: [{
            itemId: "ActiveDGMenuView",
            xtype: "ActiveDGMenuView",
            flex: 1
        }]
    }
});
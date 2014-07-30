Ext.define('Aporo.view.passiveDG.MainView', {
    extend: 'Ext.Container',
    xtype: 'PassiveDGMainView',
    id: 'PassiveDGMainView',

    config: {
        title: l.PASSIVE_DG_MENU,
        layout: 'card',
        items: [{
            id: "PassiveDGMenuView",
            itemId: "PassiveDGMenuView",
            xtype: "PassiveDGMenuView",
            flex: 1
        }]
    }
});
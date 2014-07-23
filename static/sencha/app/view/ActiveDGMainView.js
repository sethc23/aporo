Ext.define('Aporo.view.ActiveDGMainView',{
	extend: 'Ext.Container',
    xtype: 'ActiveDGMainView',
	id: 'ActiveDGMainView',

	config: {
		layout: 'card',
        items: [
            {
                itemId: "ActiveDGMenuView",
                xtype: "ActiveDGMenuView",
                flex: 1
            }
        ]
	}
});
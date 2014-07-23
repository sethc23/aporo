Ext.define('Aporo.view.ActiveDGMenuView',{
	extend: 'Ext.Container',
	xtype: 'ActiveDGMenuView',

	config: {
        layout: 'card',
		scrollable: null, 
        
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                itemId: 'toolbarHeader'
            },
            {
                flex: 1,
                layout: {
                    pack: 'center',
                    type: 'vbox'
                },
                items:[
                    {
                        xtype: 'button',
                        text: 'Check Package',  
                        itemId: 'btnCheckPackage',
                        ui: "action",
                        margin: '2% 15% 0 15%'
                    },
                    {
                        xtype: 'button',
                        text: 'Update Route',                                        
                        itemId: 'btnUpdateRoute',                                            
                        ui: "action",
                        margin: '2% 15% 0 15%'
                    },
                    {
                        xtype: 'button',
                        text: 'Check-out',                                      
                        itemId: 'btnCheckOut',                                          
                        ui: "action",
                        margin: '2% 15% 0 15%'
                    }
                ]
            }
        ]
	}
});
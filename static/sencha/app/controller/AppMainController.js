Ext.define("TransportApp.controller.AppMainController",{
	extend: 'Ext.app.Controller',
	config: {		
		refs:{
				MainView:'MainView'
			 },
		control:{
				'#MainView':{
					activeitemchange:'fnSwitchItems'
				}
		}
	},
	fnSwitchItems: function( record, newActiveItem, oldActiveItem,eOpts ){
           	  Ext.defer(function(){	     
	        newActiveItem.setDisabled(false);
	    },500);	
			
	},
	launch: function(){		
		TransportApp.AppMainController = this;		
	}
});
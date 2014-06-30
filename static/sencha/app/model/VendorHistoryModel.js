Ext.define("TransportApp.model.VendorHistoryModel",{
	extend:"Ext.data.Model",	
		config:
			{
				fields: ['OrderId','Address', 'ExpectedPickupTime', {name: 'leaf'}]
			}
});
	
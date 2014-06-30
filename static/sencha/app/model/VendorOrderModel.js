Ext.define("TransportApp.model.VendorOrderModel",{
	extend:"Ext.data.Model",	
		config:
			{
				fields: ['OrderId','Address', 'ExpectedPickupTime', 'DGId', {name: 'leaf'}]
			}
});
	
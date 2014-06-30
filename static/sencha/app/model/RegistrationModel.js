Ext.define("TransportApp.model.RegistrationModel",{
	extend:"Ext.data.Model",	
		config:
			{
				fields: ['VendorName','Address', 'PcName', 'PcNumber' , 'PcEmail' ,'VendorNumber','VendorEmail', {name: 'leaf'}]
			}
});

Ext.define("Aporo.model.VendorOrderHistoryModel",{
	extend:"Ext.data.Model",	
		config:
			{
                fields:
                    [
                        "order_id",
                        "pickup_time",
                        "pickup_date",
                        "pickup_addr",
                        "check_time",
                        "deliv_time",
                        "deliv_date",
                        "deliv_addr",
                        {name: 'leaf'}
                    ]
			}
});
	
Ext.define("Aporo.model.RegistrationModel",{
	extend:"Ext.data.Model",	
		config:
			{
				fields:
                [
//  Previous Fields
//                    'VendorName','Address', 'PcName', 'PcNumber' , 'PcEmail' ,'VendorNumber','VendorEmail',


// Database Fields

//                    "vend_id",
//                    "language",
                    "name",
                    "addr1",
//                    "addr2",
//                    "zipcode",
                    "primary_first_name",
//                    "primary_last_name",
                    "primary_cell",
                    "primary_email",
//                    "secondary_first_name",
//                    "secondary_last_name",
//                    "secondary_cell",
//                    "secondary_email",
                    "bus_email",
                    "bus_phone",
//                    "registration_date_time",
//                    "rating",
                    {name: 'leaf'}

                ]
            }
});

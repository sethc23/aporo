#API for Aporo

…

###Login

###Forgot Password

###New Currier Registration

######POST Request
	
	URL:	api/new_currier

	JSON:	app_user_type = "dg"			first_name			last_name			addr1			addr2			zip
			email			cell			lang			emergency_contact_name			emergency_contact_number###New Vendor Registration

######POST Request	
	URL:	api/new_vendor
	JSON:	app_user_type = "vend_mgr"			first_name			last_name			biz_name			biz_addr1			biz_addr2			biz_zip			biz_email			biz_phone			biz_other_phone			email			cell			lang###New Vendor Employee

######POST Request
	URL:	api/new_vendor
	
	JSON:	vendor_id			app_user_type = "vend_empl"			first_name			last_name			email			cell			lang
vendor_id obtained from [http://54.191.47.76/api/reg_vends/?format=json](http://54.191.47.76/api/reg_vends/?format=json)###DG Passive Menu

######POST Request
	URL:	api/work/
	
	JSON:	{ 	'action' 	: 'GET', 
				'dg_id' 	: [ dg_id from cookie ] }

######Example Server Response
	{
    	"dg_schedule": [
      	  	{
     	       "start_datetime"		: "2014-07-22T04:00:00", 
     	       "start_day"			: "Thu, Jul. 17", 
     	       "start_time"			: "08:00 AM", 
     	       "hour_period"		: "4", 
     	       "area"				: "Murray Hill", 
     	       "check_in_datetime"	: "null",
     	       "check_out_datetime"	: "null", 
      	       "total_breaktime"	: "null", 
       	       "total_deliveries"	: "null",
        	},
        ]
	}
###Contracts

######POST Request ( "action" = "GET" )
	URL:	api/dg_contracts/
	
	JSON:	{ 	'action' 	: 'GET', 
				'dg_id' 	: [ dg_id from cookie ] }
######Example Server Response ( "action" = "GET" )
	
	[
    	{
	        "contract_id"		: "4"", 
        	"start_datetime"	: "2015-04-02T08:00:00", 
        	"start_day"			: "Thu, Jul. 17", 
        	"start_time"		: "12:00 PM", 
        	"hour_period"		: "4"", 
        	"area"				: "Murray Hill", 
        	"curriers"	: [
            	{
                	"currier_id": 1
            	}
        	]
    	},
    ]
   
######POST Request ( "action" = "add" or "remove" )
	URL:	api/dg_contracts/
	
	JSON:
		  [
			{
	       		"action" 			: "add" (or "remove")
	        	"contract_id"		: "4"", 
        		"start_datetime"	: "2014-07-17T08:00:00", 
        		"start_day"			: "Thu, Jul. 17", 
        		"start_time"		: "12:00 PM", 
        		"hour_period"		: "4"", 
        		"area"				: "Murray Hill", 
        		"curriers"	: [
            		{
                		"dg_id": 1
            		}
        		]
    		},
    	  ]
######Example Server Response ( "action" = "add" or "remove" )
	
	[{
    	"contracts.json":	[
        	{
            	"area"				: "Murray Hill", 
            	"contract_id"		: 36, 
            	"curriers"	: [
                	{
                    	"currier_id": 1
                	}
            	], 
            	"hour_period"		: 4, 
            	"start_datetime"	: "2014-07-23T16:00:00", 
            	"start_day"			: "Wed, Jul. 23", 
            	"start_time"		: "08:00 PM"
        	},
        	{
            	"area"				: "Murray Hill", 
            	"contract_id"		: 70, 
            	"curriers"			: [], 
            	"hour_period"		: 4, 
            	"start_datetime"	: "2014-07-29T08:00:00", 
            	"start_day"			: "Tue, Jul. 29", 
            	"start_time"		: "12:00 PM"
        	},
        ],
    	"work.json": [
        	{
           		"area"					: "Murray Hill", 
            	"check_in_datetime"		: null, 
            	"check_out_datetime"	: null, 
            	"hour_period"			: 4, 
            	"start_datetime"		: "2014-07-22T12:00:00", 
            	"start_day"				: "Tue, Jul. 22", 
            	"start_time"			: "04:00 PM", 
            	"total_breaktime"		: null, 
            	"total_deliveries"		: null,
        	},
        ],
	}]
###Check In

######POST Request	URL:	api/work/
	
	JSON:	{ 	'action'	: 'check_in', 
				'dg_id' 	: [ dg_id from cookie ] }
######Example Server Response
	{
    	"is_active": "True"
	}###Check Out

######POST Request	URL:	api/work/
	
	JSON:	{ 	'action' 	: 'check_out', 
				'dg_id' 	: [ dg_id from cookie ] }
######Example Server Response
	{
    	"is_active": "False"
	}
###DG History

######POST Request
	URL:	api/work/
	
	JSON:	{ "dg_id" 	: [ dg_id from cookie ],			  "action" 	: "history" }
######Example Server Response	
	[
	    {
	        "area"					: "Murray Hill", 
	        "check_in_datetime"		: null, 
	        "check_out_datetime"	: "2014-07-11T00:39:27", 
	        "hour_period"			: 4, 
	        "start_day"				: "Tue, Jul. 22", 
	        "start_time"			: "12:00 PM", 
	        "total_breaktime"		: null, 
	        "total_deliveries"		: null
	    },
	]
	###DG Active Menu

######POST Request
	URL:	api/device/
	
	JSON:	[{ 
				“action” 			: “update”,
				“currier_id” 		: [ currier_id from cookie ],
			   	“device” 			:  { 
					"model" 			: 	"XT926",
					"platform" 			: 	"Android",
					"uuid" 				: 	"398923",
					"op_sys_ver"		: 	"4.2",
					"battery_level"		: 	"50",
					"lat" 				: 	"0.0045",
					"long" 				: 	"0.8983",
					"coord_accuracy"	: 	"1.0",
					"heading" 			: 	"0.4444",
					"speed" 			: 	"1.508",
					"last_updated" 		: 	"2014-01-01T15:45:00",
				},
				"Locations.JSON": [{}],
				"is_active"			: 	"True",
				"update_frequency"	:	"120",
			},]

######Example Server Response
	[{
        "Device.JSON": {
            "is_active": false, 
            "update_frequency": null
        }, 
        "Locations.JSON": [
            {
                "addr": "ONE_pickup_addr", 
                "call_in": false, 
                "cross_street": "", 
                "end_datetime": null, 
                "loc_num": 1, 
                "location_id": 1, 
                "price": null, 
                "req_datetime": null, 
                "tag": null, 
                "tip": null, 
                "web": false, 
                "web_url": ""
            }, 
            {
                "addr": "ONE_deliv_addr", 
                "call_in": false, 
                "cross_street": "", 
                "end_datetime": null, 
                "loc_num": 2, 
                "location_id": 2, 
                "price": null, 
                "req_datetime": null, 
                "tag": null, 
                "tip": null, 
                "web": false, 
                "web_url": ""
			},
		],
	}]

###DG Check Package Response

######POST Request
	URL:	api/update/
	
	JSON:	[{ 
				“action” : “check_pkg”,
				“dg_id” : [ dg_id from cookie ],
			   	“itinerary” : Itinerary.JSON,
			   	“device” :  { 
			   	 	
					"model" 			: 	"XT926",
					"platform" 			: 	"Android",
					"uuid" 				: 	"398923",
					"op_sys_ver"		: 	"4.2",
					"battery_level"		: 	"50",
					"lat" 				: 	"0.0045",
					"long" 				: 	"0.8983",
					"coord_accuracy"	: 	"1.0",
					"heading" 			: 	"0.4444",
					"speed" 			: 	"1.508",
					"last_updated" 		: 	[date_iso_format],
					"is_active"			: 	"True"  
				}
			}]

######Example Server Response

	[{
        "Device.JSON": {
            "is_active": false, 
            "update_frequency": null
        }, 
        "Locations.JSON": [
            {
                "addr": "ONE_pickup_addr", 
                "call_in": false, 
                "cross_street": "", 
                "end_datetime": null, 
                "loc_num": 1, 
                "location_id": 1, 
                "price": null, 
                "req_datetime": null, 
                "tag": null, 
                "tip": null, 
                "web": false, 
                "web_url": ""
            }, 
            {
                "addr": "ONE_deliv_addr", 
                "call_in": false, 
                "cross_street": "", 
                "end_datetime": null, 
                "loc_num": 2, 
                "location_id": 2, 
                "price": null, 
                "req_datetime": null, 
                "tag": null, 
                "tip": null, 
                "web": false, 
                "web_url": ""
			},
		],
	}]

###Vendor: Load Vendor Menu

######POST Request with "get" action
	
	{
    	"{'action': 'get', 'vendor_id': '1'}": ""
	}
	
	or 
	
	{
    	'action'	: 'get', 
    	'vendor_id'	: '1',
	}

######Example Server Response for GET Request

    URL:    base_url + /api/order
    
    JSON:   [	
				{
					"order_id": 1, 
					"tag": "TAG1", 
					"web": false, 
					"call_in": true, 
					"contact_num": "", 
					"deliv_addr": "ONE_deliv_addr", 
					"apt_num": "", 
					"deliv_cross_street": "", 
					"req_pickup_time": null, 
					"price": null, 
					"tip": null, 
					"comment": null
				}
			]


######POST Request where action is "add"

	{
	"	{'Orders.JSON': 
				[{'comment': '5th Floor', 
                    'web': 'False', 
                    'req_pickup_time': '2014-07-28T13:52:22.722884', 
                    'call_in': 'True', 
                    'deliv_addr': 'Order_Deliv_one_hour', 
                    'action': 'add', 
                    'deliv_cross_street': '', 
                    'price': '20.00'}, 
                 {'comment': '10th Floor', 
                    'web': 'True', 
                    'req_pickup_time': '2014-07-28T14:52:22.722924', 
                    'call_in': 'False', 
                    'deliv_addr': 'Order_Deliv_two_hour', 
                    'action': 'add', 
                    'deliv_cross_street': '', 
                    'price': '25.00'}
                ], 
    	'vendor_id': '1'}
    ": ""
	}
######Example Server Response
	
	{
    	"Orders.JSON": [
        	{
            "call_in": true, 
            "comment": "5th Floor", 
            "created": "2014-07-28T12:52:22", 
            "currier": null, 
            "currier_dev": null, 
            "deliv_addr": "Order_Deliv_one_hour", 
            "deliv_cross_street": "", 
            "deliv_lat": null, and
            "deliv_long": null, 
            "price": 20.0, 
            "req_pickup_time": "2014-07-28T13:52:22", 
            "tag": null, 
            "tip": null, 
            "url": "/api_view/orders/5/", 
            "vendor": "/api_view/vendors/1/", 
            "vendor_dev": null, 
            "web": true, 
            "web_url": ""},
        	{
            "call_in": true, 
            "comment": "10th Floor", 
            "created": "2014-07-28T12:52:22", 
            "currier": null, 
            "currier_dev": null, 
            "deliv_addr": "Order_Deliv_two_hour", 
            "deliv_cross_street": "", 
            "deliv_lat": null, 
            "deliv_long": null, 
            "price": 25.0, 
            "req_pickup_time": "2014-07-28T14:52:22", 
            "tag": null, 
            "tip": null, 
            "url": "/api_view/orders/6/", 
            "vendor": "/api_view/vendors/1/", 
            "vendor_dev": null, 
            "web": true, 
            "web_url": ""
        	}
    	]
	}
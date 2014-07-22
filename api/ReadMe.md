#API for Aporo

…

###Login

###Forgot Password

###New Currier Registration

######POST Request
	
	URL:	api/new_currier

	JSON:	app_user_type = "dg"
			email

######POST Request	



######POST Request

	
	JSON:	vendor_id


######POST Request

	
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


######POST Request ( "action" = "GET" )

	
	JSON:	{ 	'action' 	: 'GET', 
				'dg_id' 	: [ dg_id from cookie ] }
######Example Server Response ( "action" = "GET" )
	
	[
    	{
	        "contract_id"		: "4"", 
        	"start_datetime"	: "2014-07-17T08:00:00", 
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


######POST Request
	
	JSON:	{ 	'action'	: 'check_in', 
				'dg_id' 	: [ dg_id from cookie ] }
######Example Server Response
	{
    	"is_active": "True"
	}

######POST Request
	
	JSON:	{ 	'action' 	: 'check_out', 
				'dg_id' 	: [ dg_id from cookie ] }
######Example Server Response
	{
    	"is_active": "False"
	}


######POST Request

	
	JSON:	{ "dg_id" 	: [ dg_id from cookie ],
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
	

######POST Request

	
	JSON:	[{ 
				“action” : “update”,
				“dg_id” : [ dg_id from cookie ],
			   	“device” :  { 
					"model" 			: 	"XT926",
					"platform" 			: 	"Android",
					"uuid" 				: 	"398923",
					"op_sys_ver"		: 	"4.2",
					"battery_level"		: 	"50",
					"update_frequency"	:	"120",
					"lat" 				: 	"0.0045",
					"long" 				: 	"0.8983",
					"coord_accuracy"	: 	"1.0",
					"heading" 			: 	"0.4444",
					"speed" 			: 	"1.508",
					"last_updated" 		: 	"2014-01-01T15:45:00",
					"is_active"			: 	"True"  
				},
			},]

######Example Server Response
	[{
        "Device"        :
        {
            "update_frequency"      :   "60",
        },
        "Itinerary"     :
        {   "order_id"              :   "",
            "vendor"                :   "",
            "dg"                    :   "",
            "tag"                   :   "",
            "web"                   :   "",
            "call_in"               :   "",
            "req_pickup_time"       :   "",
            "pickup_time"           :   "",
            "pickup_date"           :   "",
            "pickup_addr"           :   "",
            "check_time"            :   "",
            "deliv_time"            :   "",
            "deliv_date"            :   "",
            "deliv_addr"            :   "",
            "deliv_zip"             :   "",
            "deliv_cross_street"    :   "",
            "price"                 :   "",
            "tip"                   :   "",
        }
    }]
    
###DG Check Package Response

######POST Request

	
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
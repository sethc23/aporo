Ext.define('TransportApp.store.VendorOrderStore',{
			extend:'Ext.data.Store',
			
			config:{
					model:'TransportApp.model.VendorOrderModel',
					data:[                                        
                                                    {OrderId:"A001",Address:"India",ExpectedPickupTime:"2hrs",'DGId':'DG001'},
                                                    {OrderId:"A002",Address:"Australia",ExpectedPickupTime:"2hrs",'DGId':'DG002'},
                                                    {OrderId:"A003",Address:"US",ExpectedPickupTime:"2hrs",'DGId':'DG003'},
                                                    {OrderId:"A004",Address:"UK",ExpectedPickupTime:"2hrs",'DGId':'DG004'},
                                                    {OrderId:"A005",Address:"NewYork",ExpectedPickupTime:"2hrs",'DGId':'DG005'},
					     ]
						 
					
					/*	proxy:
						{
							type: 'jsonp',
							url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://feeds.feedburner.com/SenchaBlog',
							//url:'http://50.23.221.50/WCF/CustomerService/GetPassengerRides?passengerId=885',
							reader: 
							{
								type: 'json',
								rootProperty: 'responseData.feed.entries'
							}									
						},
						autoLoad: true*/
					}
		});
		
		
		

Ext.define('TransportApp.store.VendorHistoryStore',{
			extend:'Ext.data.Store',
			
			config:{
					model:'TransportApp.model.VendorHistoryModel',
//					data:[
//					            { OrderId:"A001",  Address:"India",      ExpectedPickupTime:"2hrs" },
//                                                    { OrderId:"A002",  Address:"Australia",  ExpectedPickupTime:"2hrs" },
//                                                    { OrderId:"A003",  Address:"US",         ExpectedPickupTime:"2hrs" },
//                                                    { OrderId:"A004",  Address:"UK",         ExpectedPickupTime:"2hrs" },
//                                                    { OrderId:"A005",  Address:"NewYork",    ExpectedPickupTime:"2hrs" },
//					     ]
						 
					autoLoad: true,
					proxy:
						{
							type: 'rest',
							url: '/api/vendor/',
							//url:'http://50.23.221.50/WCF/CustomerService/GetPassengerRides?passengerId=885',
							reader: 
							{
								type: 'json',
                                root: 'objects'
//								rootProperty: 'responseData.feed.entries'
                            },
                            writer: {
                                type: "json",
                                nameProperty: "mapping"
                            }
						}

					}
		});
		
		
		

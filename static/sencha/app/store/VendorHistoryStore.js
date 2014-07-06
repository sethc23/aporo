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
							type: 'ajax',
                            method: 'GET',
							url: TransportApp.config.Env.baseApiUrl+'/vendors/',
                            useDefaultXhrHeader: false,
							reader: 
							{
								type: 'json'
                            }
						}

					}
		});
		
		
		

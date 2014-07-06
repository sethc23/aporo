Ext.define('TransportApp.store.VendorOrderStore',{
			extend:'Ext.data.Store',
			
			config:{
					model:'TransportApp.model.VendorOrderModel',
					/*data:[                                        
                                                    {OrderId:"A001",Address:"India",ExpectedPickupTime:"2hrs",'DGId':'DG001'},
                                                    {OrderId:"A002",Address:"Australia",ExpectedPickupTime:"2hrs",'DGId':'DG002'},
                                                    {OrderId:"A003",Address:"US",ExpectedPickupTime:"2hrs",'DGId':'DG003'},
                                                    {OrderId:"A004",Address:"UK",ExpectedPickupTime:"2hrs",'DGId':'DG004'},
                                                    {OrderId:"A005",Address:"NewYork",ExpectedPickupTime:"2hrs",'DGId':'DG005'},
					     ]*/
			 	proxy:
						{
							type: 'ajax',
                            method: 'GET',
                            useDefaultXhrHeader: false,
							url: TransportApp.config.Env.baseApiUrl+'/orders/',
							reader: 
							{
								type: 'json'
							}									
						},
						autoLoad: true
					}
		});
		
		
		

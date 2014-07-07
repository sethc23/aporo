Ext.define('TransportApp.store.VendorOrderHistoryStore',{
			extend:'Ext.data.Store',
			
			config:{
					model:'TransportApp.model.VendorOrderHistoryModel',
			 	    autoLoad: true,
                    proxy:
						{
							type: 'ajax',
                            method: 'GET',
                            useDefaultXhrHeader: false,
							url: TransportApp.config.Env.baseApiUrl+'/orders/?format=json',
							reader: 
							{
								type: 'json'
							}									
						}

					}
		});
Ext.define("TransportApp.view.VendorHistory",{
extend:'Ext.List',
id:'VendorHistory',
itemId: 'VendorHistory',
xtype:'VendorHistory',
	config:{
		layout:'fit',
		items:[						
			{
				id:'VendorHistoryList',
				xtype:'list',
				flex:1,	
				itemTpl:'<div id={order_id}  class="ListBg">'+
						'<div style="width:100%">'+
							'<div style="width:20%; float:left" class="ListTitle1">{order_id}</div>'+
							'<div style="width:60%; float:right;text-align:right;padding-right:30px" class="ListTitle2">{deliv_addr}</div>'+
							'<div style="width:20%; float:left;text-align:left;padding-bottom:3px" class="ListSubtitle">{pickup_time}</div>'+
						'</div>'+
					'</div>',
				store: 'VendorOrderHistoryStore',
				 /*listeners: {
					itemtap:function( view, index, target, record, e, eOpts )
					{
						var record = view.getStore().getAt(index);
					    InstaPark.ParkingLocationId=record.data.ParkingLocationId;
						InstaPark.AppMainController.AddViewToStore('TabsView','SubMainView','ConfirmationTab1')
						Ext.getCmp("SubMainView").setActiveItem(Ext.getCmp("ConfirmationTab1"));	
						InstaPark.ConfirmationController.GetConfirmedParkingData();
					}
				}*/
			},
		]
	},
});



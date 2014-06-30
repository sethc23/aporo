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
				itemTpl:'<div id={OrderId}  class="ListBg">'+
						'<div style="width:100%">'+
							'<div style="width:20%; float:left" class="ListTitle1">{OrderId}</div>'+
							'<div style="width:60%; float:right;text-align:right;padding-right:30px" class="ListTitle2">{Address}</div>'+
							'<div style="width:20%; float:left;text-align:left;padding-bottom:3px" class="ListSubtitle">{ExpectedPickupTime}</div>'+
						'</div>'+
					'</div>',
				store: 'VendorHistoryStore',
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



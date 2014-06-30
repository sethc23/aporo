Ext.define("TransportApp.view.VendorOrderList",{
	extend:'Ext.List',
        id:'VendorOrderList',
        itemId: 'VendorOrderList',		
	xtype:'VendorOrderList',
			config:{   
				layout:'fit',
                                items:[				      
                                        {
                                            id:'idVendorOrderList',
                                            xtype:'list',
                                            flex:.8,
                                            itemTpl:'<div id={Address}  class="ListBg">'+
                                                '<div style="width:100%">'+
                                                        '<div style="width:20%; float:left" class="ListTitle1">{OrderId}</div>'+
							  '<div style="width:20%; float:left" class="ListTitle1">{DGId}</div>'+
							  '<div style="width:20%; float:right;text-align:right;padding-right:30px" class="ListTitle2">{ExpectedPickupTime}</div>'+
                                                        '<div style="width:40%; float:right;text-align:right;padding-right:30px" class="ListTitle2">{Address}</div>'+
                                                    '</div>'+
                                                 
                                                '</div>'+
                                            '</div>',
                                            store: 'VendorOrderStore',
                                        }
                                    ]
			},
});

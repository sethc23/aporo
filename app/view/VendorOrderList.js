Ext.define("Aporo.view.VendorOrderList",{
	extend:'Ext.Container',		
	xtype:'VendorOrderList',
	config:{   
	   layout:'fit',
        items:[				      
        {
            id: 'idVendorOrderList',
            xtype: 'list',
            store: 'VendorOrderHistoryStore',
            itemTpl: '<div id={order_id}  class="ListBg">'+
            '<div style="width:100%">'+
            '<div style="width:20%; float:left" class="ListTitle1">{order_id}</div>'+
            '<div style="width:60%; float:right;text-align:right;padding-right:30px" class="ListTitle2">{deliv_addr}</div>'+
            '<div style="width:20%; float:left;text-align:left;padding-bottom:3px" class="ListSubtitle">{pickup_time}</div>'+
            '</div>'+
            '</div>'
        }
        ]
	}
});
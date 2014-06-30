Ext.define('TransportApp.view.HistoryView',{
	extend:'Ext.Panel',
	xtype:'HistoryView',
    id:'HistoryView',
	config:{		
        layout: {
            type: 'vbox'
        },
		items:[
                    {
                        xtype: 'titlebar',
                        margin:'0 0 10 0',
                        height:54,
                        title:'Vendor History',
                        items: [
                            {
                                id: 'backBtnHis',
                                itemId: 'backBtnHis',
                                align: 'right',
                                text: 'Back'
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        layout: 'fit',
                        items: [{
                            id: 'id_VendorHistory',
                            xtype: 'VendorHistory',
                            disabled: false,
                            flex: 1,
                            height: '500px'

                        }
                        ]
                    }
              ],
        listeners:
        [
            {
                delegate:'#backBtnHis',
                event: 'tap',
                fn:"OnBackButton"
            }
        ]
    },
    OnBackButton: function () {
        this.fireEvent("HistoryBackButtonCommand", this);
    }
});
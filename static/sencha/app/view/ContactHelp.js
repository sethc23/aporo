Ext.define('TransportApp.view.ContactHelp',{
	extend:'Ext.Panel',
	xtype:'ContactHelp',	
	scrollable:null,
    id:'ContactHelp',
	config:{		
        layout: {
            type: 'vbox'
        },
		items:[
                    {
                        xtype: 'titlebar',
                        margin:'0 0 10 0',
                        height:54,
                        title:'Contact Help',
                        items: [
                            {
                                id: 'btnBack',
                                itemId: 'btnBack',
                                align: 'right',
                                text: 'Back'
                            }
                        ]
                    },
                    {
                        id:"IdPhoneNumber",
                        itemId:"IdPhoneNumber",
                        xtype:"label",
                        cls:'contactInfo',
                        html: '<div>Conatct Number: <a href="tel:+18005558080">(800) 555-8080</a></div>'
                    }
              ],
        listeners:
        [
            {
                delegate:'#btnBack',
                event: 'tap',
                fn:"OnBackBtn"
            }
        ]
    },
    OnBackBtn: function () {
        this.fireEvent("BackBtnCommand", this);
    }
});
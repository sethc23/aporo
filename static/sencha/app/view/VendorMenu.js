Ext.define("TransportApp.view.VendorMenu", {
    extend: 'Ext.Container',
    xtype: 'VendorMenu',
    id: 'VendorMenu',
    config: {
        scrollable: null,
        items: [{
            id: 'btnNewOrder',
            xtype: 'titlebar',
            flex: 1,
            width: '100%',
            //docked:'top',
            title: 'Vendor Orders',
            items: [{
                id: 'btnAddVendorOrder',
                itemId: 'btnAddVendorOrder',
                align: 'left',
                text: 'Add Vendor'
            },
            {
                id: 'btnHistory',
                itemId: 'btnHistory',
                align: 'right',
                text: 'History'
            },
            {
                id: 'btnBack',
                itemId: 'btnBack',
                align: 'right',
                text: 'Back'
            }]
        }, {
            xtype: 'panel',
            layout: 'fit',
            items: [{
                id: 'id_VendorOrderList',
                itemId: 'NewVendorOrder',
                xtype: 'VendorOrderList',
                disabled: false,
                flex: 1,
                height: '500px'

            }
            ]
        },

        ],
        listeners: [{
            delegate: "#btnAddVendorOrder",
            event: "tap",
            fn: "OnAddVendorOrderBtnTap"
        }, {
            delegate: '#btnBack',
            event: 'tap',
            fn: 'OnBackBtnTap'

        }, {
            delegate: '#btnHistory',
            event: 'tap',
            fn: 'OnHistoryBtnTap'

        } ]
    },
    OnAddVendorOrderBtnTap: function () {
        //	alert('in functiond');
        this.fireEvent("AddOrderCommand", this);
    },
    OnBackBtnTap: function () {
        //	alert('in functiond');
        this.fireEvent("BackViewCommand", this);
    },
    OnHistoryBtnTap: function () {
    this.fireEvent("OpenHistoryViewCommand", this);
}

});
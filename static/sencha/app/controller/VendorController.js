Ext.define('TransportApp.controller.VendorController', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            VendorMenu: 'VendorMenu',
            AddVendorOrder: 'AddVendorOrder',
            VendorOrderList: 'VendorOrderList',
            HistoryView:'HistoryView'
        },
        control: {
            VendorMenu: { // The commands fired 						
                AddOrderCommand: "onAddVendorOrderCommand",
                ShowHistoryCommand: "OnShowHistoryCommand",
                BackViewCommand: "OnBackViewCommand",
                OpenHistoryViewCommand: "OnOpenHistoryViewCommand"
            },
            AddVendorOrder: {
                AddOrderCommand: "OnAddOrderCommand",
                CancelOrderCommand: "OnCancelOrderCommand",
                VendorBackButtonCommand:"OnVendorBackButtonCommand"
            },
            VendorOrderList: {
            },
            HistoryView:
            {
                HistoryBackButtonCommand:'OnHistoryBackButtonCommand'
            }
        }
    },
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },
    onAddVendorOrderCommand: function () {
        //alert('onAddVendorOrderCommand');
        Ext.getCmp("VendorMainView").animateActiveItem(Ext.getCmp("AddVendorOrder"),this.slideLeftTransition);
    },
    OnAddOrderCommand: function () {
        //   alert('OnAddOrderCommand');
    },
    OnShowHistoryCommand: function () {
        //  alert('OnShowHistoryCommand');    

    },
    OnVendorBackButtonCommand:function()
    {
        Ext.getCmp("VendorMainView").animateActiveItem(Ext.getCmp("VendorMenu"),this.slideRightTransition)
    },
    OnBackViewCommand: function () {
        Ext.getCmp("MainView").animateActiveItem(Ext.getCmp("MenuView"),this.slideRightTransition);

    },
    OnCancelOrderCommand: function () {
        Ext.getCmp('IdAddVendorOrder').hide();
    },
    OnOpenHistoryViewCommand: function () {
        Ext.getCmp("VendorMainView").animateActiveItem(Ext.getCmp("HistoryView"),this.slideLeftTransition)
    },
    OnHistoryBackButtonCommand:function()
    {
        Ext.getCmp("VendorMainView").animateActiveItem(Ext.getCmp("VendorMenu"),{type: 'slide', direction: 'right'});
    }

});
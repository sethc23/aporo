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
            },
            
            'button[itemId=saveBtn]' :
            {
                tap: 'onVendorOrderSaveTap'
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
    },
    
    
    
    /**
     * This listener will fire after Vendor add/save button tap
     **/
    
    onVendorOrderSaveTap: function()
    {
        var vendor_form = Ext.getCmp('AddVendorOrder');  //Getting DOM query of FormPanel
             var data = vendor_form.getValues(); //Full form data as object
             for(var key in data)
             {
                if(data[key]=='')
                {
                    Ext.Msg.alert('Warning', 'Please do not leave any field as blank');
                    return;
                }
             }
             
            var progressIndicator = Ext.Viewport.add(Ext.create("Ext.ProgressIndicator", {
                loadingText: 'Please wait'
            }));
            
            progressIndicator.show(); //A progress mask while making Ajax request
            
            Ext.Ajax.disableCaching = false;

            Ext.Ajax.request({
            url: TransportApp.config.Env.baseApiUrl+'/orders/',
            method: 'post',

            headers: {  'X-CSRFTOKEN': TransportApp.config.Env.django_token,
                        'Content-Type': 'application/json' },

            params: Ext.JSON.encode(vendor_form.getValues()),

            success: function(res){
                progressIndicator.hide();
                Ext.Msg.alert('Response', res.toString());
            },
            failure: function(e)
            {
                e = Ext.JSON.decode(e.responseText);
                Ext.Msg.alert("Error", e.detail);
                progressIndicator.hide();
            }
        });
    }

});
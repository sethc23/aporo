Ext.define('Aporo.controller.Vendors', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
        },
        control: {
            VendorOrderList: {
                activate: 'onVendorOrderListActivate',
                deactivate: 'onVendorOrderListDeactivate'
            },
            'button[id=addVendorsBtn]': {
                
            },
            'button[id=historyBtn]': {
                tap: 'onHistoryBtn'
            },
            'button[id=addVendorsBtn]': {
                tap: 'onAddVendorsBtn'
            },
            'button[itemId=vendorCancelBtn]': {
                tap: 'onVendorFormCancel'
            },
            'button[itemId=saveBtn]': {
                tap: 'onVendorSave'
            }
        }
    },
    onVendorOrderListActivate: function(cmp)
    {
        Ext.getCmp('Viewport').getNavigationBar().titleComponent.setTitle('Vendor Menu');
        Ext.getCmp('addVendorsBtn').setHidden(false);
        Ext.getCmp('historyBtn').setHidden(false);
    },
    onVendorOrderListDeactivate: function(cmp)
    {
        Ext.getCmp('addVendorsBtn').setHidden(true);
        Ext.getCmp('historyBtn').setHidden(true);
    },
    
    onHistoryBtn: function()
    {
        Ext.getCmp('Viewport').getNavigationBar().titleComponent.setTitle('Vendor History');
        Ext.getCmp('Viewport').push(Ext.create('Aporo.view.VendorHistory'));
    },
    onAddVendorsBtn: function()
    {
        Ext.getCmp('Viewport').getNavigationBar().titleComponent.setTitle('Add Vendor Orders');
        Ext.getCmp('Viewport').push(Ext.create('Aporo.view.AddVendorOrder'));
    },
    onVendorFormCancel: function()
    {
        Ext.getCmp('Viewport').pop();
    },
    onVendorSave: function()
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
            url: Aporo.config.Env.baseApiUrl+'/orders/',
            useDefaultXhrHeader: false,
            method: 'post',

            headers: {  'X-CSRFTOKEN': Aporo.config.Env.django_token,
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
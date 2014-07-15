Ext.define('Aporo.controller.Registration', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
        },
        control: {
            RegistrationView: {
                activate: 'onRegistrationViewActivate'
            },
            'button[itemId=btCancelRegistration]': {
                tap: 'onRegistrationCancel'
            },
            'button[itemId=RegisterBtn]' : {
                tap: 'onRegisterButtonTap'
            }
        }
    },
    onRegistrationViewActivate: function(cmp)
    {},
    onRegistrationCancel: function()
    {
        Ext.getCmp('Viewport').pop();
    },
    
    onRegisterButtonTap: function()
    {
        var registration_form = Ext.getCmp('RegistrationView');  //Getting DOM query of FormPanel
        var data = registration_form.getValues(); //Full form data as object
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
            
        Ext.Ajax.request({
            url: Aporo.config.Env.baseApiUrl+'/vendors/',
            header: { 'X-CSRFToken': Aporo.config.Env.django_token },
            method: 'POST',
            useDefaultXhrHeader: false,
            params: Ext.JSON.encode(registration_form.getValues()),
            success: function(res){
                progressIndicator.hide();
                Ext.Msg.alert('Response', res.toString());
            },
            failure: function(e)
            {
                Ext.Msg.alert("Error", e.detail);
                progressIndicator.hide();
            }
        });
    }
});
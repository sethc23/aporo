Ext.define('Aporo.controller.Registration', {
    extend: 'Ext.app.Controller',
    config: {
        control: {
            'button[itemId=btCancelRegistration]': {
                tap: 'onRegistrationCancel'
            },
            'button[itemId=RegisterBtn]': {
                tap: 'onRegisterButtonTap'
            }
        }
    },

    onRegistrationCancel: function() {
        Ext.getCmp('Viewport').pop();
    },

    onRegisterButtonTap: function() {
        var registration_form = Ext.getCmp('RegistrationView'), //Getting DOM query of FormPanel
            data = registration_form.getValues(); //Full form data as object

        for (var key in data) {
            if (data[key] == '') {
                Ext.Msg.alert(l.PROBLEM, l.PLEASE_COMPLETE_ALL_FIELDS);
                return;
            }
        }

        var progressIndicator = Ext.Viewport.add(Ext.create("Ext.ProgressIndicator", {
            loadingText: l.LOADING
        }));

        progressIndicator.show(); //A progress mask while making Ajax request

        Ext.Ajax.request({
            url: Aporo.config.Env.baseApiUrl + 'api_view/vendors/',
            header: {
                'X-CSRFToken': Aporo.config.Env.django_token
            },
            method: 'POST',
            useDefaultXhrHeader: false,
            params: Ext.JSON.encode(registration_form.getValues()),
            success: function(res) {
                progressIndicator.hide();
                Ext.Msg.alert('Response', res.toString());
            },
            failure: function(e) {
                Ext.Msg.alert("Error", e.detail);
                progressIndicator.hide();
            }
        });
    }
});
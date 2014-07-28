Ext.define("Aporo.config.Env", {
    statics: {
        app_user: 1,
        currier_id: 1,
        is_active: false,

        logLevel: 'verbose',
        baseApiUrl: 'http://aporo.ngrok.com/',
        django_token: typeof Aporo == "undefined" ? null : Aporo.csrftoken
    }
});

//Ext.Ajax.defaultHeaders({ 'X-CSRFToken': TransportApp.config.Env.django_token });
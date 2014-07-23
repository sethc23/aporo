Ext.define("Aporo.config.Env", {
    statics: {
        app_user: 1,
        currier_id: 1,
        is_active: false,

        logLevel: 'verbose',
        baseApiUrl: 'http://54.191.47.76/',
        //        baseApiUrl: 'http://0.0.0.0/api_view',
        django_token: typeof Aporo == "undefined" ? null : Aporo.csrftoken
    }
});

//Ext.Ajax.defaultHeaders({ 'X-CSRFToken': TransportApp.config.Env.django_token });
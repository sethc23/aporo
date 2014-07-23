Ext.define("Aporo.config.Env", {
    statics: {
        logLevel: 'verbose',
        baseApiUrl: 'http://54.191.47.76/',
//        baseApiUrl: 'http://0.0.0.0/api_view',
        django_token: Aporo.csrftoken,
    }
});

//Ext.Ajax.defaultHeaders({ 'X-CSRFToken': TransportApp.config.Env.django_token });
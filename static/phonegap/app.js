Ext.application({
    name: 'App',

    appFolder: '/static/phonegap/app',

    stores: ['Items'], //List of stores
    
    models: ['Items'], //List of models
    views: [
        'Viewport' //Default view to be loaded
    ],

    controllers: [
        'Application' //Default controller to be interacted
    ],

    launch: function() {
        Ext.Loader.setPath('App', '/static/phonegap/app');
        Ext.getStore('Items').load(); //Load it when the app load for very first time
        Ext.Viewport.add(Ext.create('App.view.Viewport'));
    },
     viewport : {
        autoMaximize : true
    }
});
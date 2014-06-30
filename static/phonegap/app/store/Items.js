Ext.define('App.store.Items', {
    extend: 'Ext.data.Store',
        config: {
        model: 'App.model.Items',
        proxy: {
        type: 'ajax',
        url : 'data.json',
        reader: {
            rootProperty: 'data',
            type: 'json'
        },
    autoLoad: true
    }
    }
       
});
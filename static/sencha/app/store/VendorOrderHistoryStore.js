Ext.define('Aporo.store.VendorOrderHistoryStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'Aporo.model.VendorOrderHistoryModel',
        autoLoad: true,
        proxy: {
            type: 'ajax',
            method: 'GET',
            useDefaultXhrHeader: false,
            url: Aporo.config.Env.baseApiUrl + 'api/order/?format=json',
            reader: {
                type: 'json'
            }
        }

    }
});
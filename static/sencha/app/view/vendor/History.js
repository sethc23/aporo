Ext.define("Aporo.view.vendor.History", {
    extend: 'Ext.Container',
    xtype: 'VendorHistory',
    id: 'VendorHistory',

    requires: [
        'Ext.grid.Grid'
    ],

    config: {
        title: l.HISTORY,
        store: null,
        layout: 'fit',
        items: [{
            xtype: 'grid',
            flex: 1,
            titleBar: false,

            headerContainer: {
                height: '2.85em'
            },

            columns: [{
                text: l.TYPE,
                align: 'center',
                dataIndex: 'type',
                width: 100
            }, {
                text: l.PICK_UP_TIME,
                dataIndex: 'req_pickup_time',
                align: 'center',
                width: 140
            }, {
                text: l.TAG,
                dataIndex: 'tag',
                align: 'center',
                width: 100
            }, {
                text: l.ADDRESS,
                dataIndex: 'deliv_addr',
                width: 200
            }]
        }]
    },

    updateStore: function(newStore) {
        this.down('grid').setStore(newStore);
    }
});
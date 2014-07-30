Ext.define("Aporo.view.vendor.History", {
    extend: 'Ext.Container',
    xtype: 'VendorHistory',
    id: 'VendorHistory',

    requires: [
        'Ext.grid.Grid',
        'Aporo.extension.column.Button'
    ],

    config: {
        title: 'History',
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
                text: 'Type',
                align: 'center',
                dataIndex: 'type',
                width: 100
            }, {
                xtype: 'buttoncolumn',
                align: 'center',
                width: 110
            }, {
                text: 'Pick Up Time',
                dataIndex: 'req_pickup_time',
                align: 'center',
                width: 140
            }, {
                text: 'Tag',
                dataIndex: 'tag',
                align: 'center',
                width: 100
            }, {
                text: 'Address',
                dataIndex: 'deliv_addr',
                width: 200
            }],
        }]
    },

    updateStore: function(newStore) {
        this.down('grid').setStore(newStore);
    }
});
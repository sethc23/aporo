Ext.define("Aporo.view.vendor.MainView", {
    extend: 'Ext.Container',
    xtype: 'VendorMainView',
    id: 'VendorMainView',

    requires: [
        'Ext.grid.Grid',
        'Aporo.extension.column.Button'
    ],

    config: {
        title: 'Vendor',
        store: null,
        layout: 'vbox',
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
                xtype: 'buttoncolumn',
                align: 'center',
                width: 110
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
        }, {
            xtype: 'container',
            defaults: {
                margin: '1% 15% 1% 15%'
            },
            items: [{
                xtype: 'button',
                text: l.NEW_ORDER,
                itemId: 'newOrderButton'
            }, {
                xtype: 'button',
                text: l.HISTORY,
                itemId: 'historyButton'
            }, {
                xtype: 'button',
                text: l.LOG_OUT_QUIT,
                itemId: 'quitButton'
            }]
        }]
    },

    updateStore: function(newStore) {
        this.down('grid').setStore(newStore);
    }
});
Ext.define('Aporo.view.passiveDG.History', {
    extend: 'Ext.Container',
    xtype: 'PassiveDGHistory',
    id: 'PassiveDGHistory',

    requires: [
        'Ext.grid.Grid'
    ],

    config: {
        store: null,
        layout: 'card',

        items: [{
            xtype: 'grid',
            titleBar: false,

            headerContainer: {
                // We need to override the height as the normal height is for the default ST theme
                height: '2.85em'
            },

            columns: [{
                text: 'Area',
                dataIndex: 'area',
                width: 200
            }, {
                xtype: 'datecolumn',
                format: 'D, M. j g:i A',
                text: 'Check In',
                dataIndex: 'check_in_datetime',
                align: 'center',
                width: 170
            }, {
                xtype: 'datecolumn',
                format: 'D, M. j g:i A',
                text: 'Check Out',
                dataIndex: 'check_out_datetime',
                align: 'center',
                width: 170
            }, {
                text: 'Day',
                dataIndex: 'start_day',
                align: 'center',
                width: 110
            }, {
                text: 'Time',
                dataIndex: 'start_time',
                align: 'center',
                sortable: false,
                width: 100
            }, {
                text: 'Hour Period',
                dataIndex: 'hour_period',
                align: 'center',
                sortable: false,
                width: 110
            }, {
                text: 'Total Breaktime',
                dataIndex: 'total_breaktime',
                align: 'center',
                sortable: false,
                width: 140
            }, {
                text: 'Total Deliveries',
                dataIndex: 'total_deliveries',
                align: 'center',
                sortable: false,
                width: 140
            }]
        }]
    },

    updateStore: function(newStore) {
        this.down('grid').setStore(newStore);
    }
});
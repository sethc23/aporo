Ext.define('Aporo.view.passiveDG.History', {
    extend: 'Ext.Container',
    xtype: 'PassiveDGHistory',
    id: 'PassiveDGHistory',

    requires: [
        'Ext.grid.Grid'
    ],

    config: {
        title: l.HISTORY,
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
                text: l.AREA,
                dataIndex: 'area',
                width: 200
            }, {
                xtype: 'datecolumn',
                format: 'D, M. j g:i A',
                text: l.CHECK_IN,
                dataIndex: 'check_in_datetime',
                align: 'center',
                width: 170
            }, {
                xtype: 'datecolumn',
                format: 'D, M. j g:i A',
                text: l.CHECK_OUT,
                dataIndex: 'check_out_datetime',
                align: 'center',
                width: 170
            }, {
                text: l.DAY,
                dataIndex: 'start_day',
                align: 'center',
                width: 110
            }, {
                text: l.TIME,
                dataIndex: 'start_time',
                align: 'center',
                sortable: false,
                width: 100
            }, {
                text: l.HOUR_PERIOD,
                dataIndex: 'hour_period',
                align: 'center',
                sortable: false,
                width: 110
            }, {
                text: l.TOTAL_BREAKTIME,
                dataIndex: 'total_breaktime',
                align: 'center',
                sortable: false,
                width: 140
            }, {
                text: l.TOTAL_DELIVERIES,
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
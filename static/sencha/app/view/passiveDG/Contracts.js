Ext.define('Aporo.view.passiveDG.Contracts', {
    extend: 'Ext.Container',
    xtype: 'PassiveDGContracts',
    id: 'PassiveDGContracts',

    requires: [
        'Ext.grid.Grid',
        'Aporo.extension.column.Checkbox'
    ],

    config: {
        title: l.CONTRACTS,
        store: null,
        layout: 'card',

        items: [{
            xtype: 'toolbar',
            docked: 'bottom',
            items: [{
                xtype: 'spacer'
            }, {
                xtype: 'button',
                text: l.UPDATE,
                itemId: 'update'
            }, {
                xtype: 'spacer'
            }]
        }, {
            xtype: 'grid',
            titleBar: false,

            headerContainer: {
                height: '2.85em'
            },

            columns: [{
                xtype: 'checkboxcolumn',
                text: l.REGISTERED,
                align: 'center',
                dataIndex: 'registered',
                width: 120
            }, {
                text: l.DAY,
                dataIndex: 'start_day',
                align: 'center',
                width: 130
            }, {
                text: l.TIME,
                dataIndex: 'start_time',
                align: 'center',
                align: 'center',
                sortable: false,
                width: 100
            }, {
                text: l.AREA,
                dataIndex: 'area',
                width: 200
            }],

            listeners: {
                select: function(grid, record) {
                    record.set('registered', !record.get('registered'));
                    record.set('changedRegistered', true);

                    // Deselect after 100ms otherwise the user won't see the row selection CSS
                    setTimeout(function() {
                        grid.deselect(record);
                    }, 100);
                }
            }
        }]
    },

    updateStore: function(newStore) {
        this.down('grid').setStore(newStore);
    }
});
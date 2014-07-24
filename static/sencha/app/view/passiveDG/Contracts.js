Ext.define('Aporo.view.passiveDG.Contracts', {
    extend: 'Ext.Container',
    xtype: 'PassiveDGContracts',
    id: 'PassiveDGContracts',

    requires: [
        'Ext.grid.Grid',
        'Aporo.extension.column.Checkbox'
    ],

    config: {
        store: null,
        layout: 'card',

        items: [{
            xtype: 'toolbar',
            docked: 'bottom',
            items: [{
                xtype: 'spacer'
            }, {
                xtype: 'button',
                text: 'Update',
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
                xtype: 'checkboxcolumn', //checkboxcolumn
                text: 'Registered?',
                align: 'center',
                dataIndex: 'registered',
                width: 120
            }, {
                text: 'Day',
                dataIndex: 'start_day',
                align: 'center',
                width: 110
            }, {
                text: 'Time',
                dataIndex: 'start_time',
                align: 'center',
                align: 'center',
                sortable: false,
                width: 100
            }, {
                text: 'Area',
                dataIndex: 'area',
                width: 200
            }],

            listeners: {
                select: function(grid, record) {
                    record.set('registered', !record.get('registered'));
                    record.set('changedRegistered', true);

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
Ext.define('Aporo.view.passiveDG.Contracts', {
    extend: 'Ext.Container',
    xtype: 'PassiveDGContracts',
    id: 'PassiveDGContracts',

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
                text: 'Update'
            }, {
                xtype: 'spacer'
            }]
        }, {
            xtype: 'grid',
            titleBar: false,

            columns: [{
                xtype: 'checkcolumn',
                text: 'Registered?',
                // trueText: '<input type="checkbox" checked="checked" />',
                // falseText: '<input type="checkbox" />',
                dataIndex: 'registered',
                width: 120
            }, {
                text: 'Day',
                dataIndex: 'start_day',
                width: 150
            }, {
                text: 'Time',
                dataIndex: 'start_time',
                width: 100
            }, {
                text: 'Area',
                dataIndex: 'area',
                width: 200
            }]
        }]
    },

    updateStore: function(newStore) {
        this.down('grid').setStore(newStore);
    }
});
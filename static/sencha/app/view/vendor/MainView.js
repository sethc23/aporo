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
            }]
        }, {
            xtype: 'container',
            defaults: {
                margin: '1% 15% 1% 15%'
            },
            items: [{
                xtype: 'button',
                text: 'New Order',
                itemId: 'newOrderButton'
            }, {
                xtype: 'button',
                text: 'History',
                itemId: 'historyButton'
            }, {
                xtype: 'button',
                text: 'Log Out/Quit',
                itemId: 'quitButton'
            }]
        }]
    },

    // constructor: function() {
    //     var me = this;

    //     this.config.items[0].listeners = [{
    //         element: 'element',
    //         delegate: '.button.cancel',
    //         event: 'tap',
    //         fn: function(e, el) {
    //             var el = Ext.get(el),
    //                 listEl = el.parent().parent(),
    //                 grid = me.down('grid'),
    //                 listItem;

    //             for (var i = 0; i < grid.listItems.length; i++) {
    //                 if (listEl == grid.listItems[i].element) {
    //                     listItem = grid.listItems[i].element;
    //                     break;
    //                 }
    //             }

    //             debugger;
    //         }
    //     }];

    //     this.callParent(arguments);
    // },

    updateStore: function(newStore) {
        this.down('grid').setStore(newStore);
    }
});
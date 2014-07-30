Ext.define('Aporo.view.passiveDG.MenuView', {
    extend: 'Ext.Container',
    xtype: 'PassiveDGMenuView',
    id: 'PassiveDGMenuView',

    config: {
        layout: 'card',
        scrollable: null,

        items: [{
            xtype: 'container',
            docked: 'top',
            itemId: 'header',
            margin: '2% 15% 0 15%'
        }, {
            xtype: 'button',
            docked: 'top',
            text: l.FIND_WORK_NOW,
            itemId: 'findWorkButton',
            margin: '2% 15% 0 15%',
            hidden: true
        }, {
            xtype: 'button',
            docked: 'top',
            text: l.CHECK_IN_NOW,
            itemId: 'checkInNowButton',
            margin: '2% 15% 0 15%',
            hidden: true
        }, {
            flex: 1,
            layout: {
                pack: 'center',
                type: 'vbox'
            },
            items: [{
                xtype: 'button',
                text: l.CONTRACTS,
                itemId: 'btnContracts',
                ui: "action",
                margin: '2% 15% 0 15%'
            }, {
                xtype: 'button',
                text: l.CHECK_IN,
                itemId: 'btnCheckIn',
                ui: "action",
                margin: '2% 15% 0 15%'
            }, {
                xtype: 'button',
                text: l.HISTORY,
                itemId: 'btnHistory',
                ui: "action",
                margin: '2% 15% 0 15%'
            }]
        }]
    }
});
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
            text: 'Find Work Now!',
            itemId: 'findWorkButton',
            margin: '2% 15% 0 15%'
        }, {
            xtype: 'button',
            docked: 'top',
            text: 'Check In Now',
            itemId: 'checkInNowButton',
            margin: '2% 15% 0 15%'
        }, {
            flex: 1,
            layout: {
                pack: 'center',
                type: 'vbox'
            },
            items: [{
                xtype: 'button',
                text: 'Contracts',
                itemId: 'btnContracts',
                ui: "action",
                margin: '2% 15% 0 15%'
            }, {
                xtype: 'button',
                text: 'Check-in',
                itemId: 'btnCheckIn',
                ui: "action",
                margin: '2% 15% 0 15%'
            }, {
                xtype: 'button',
                text: 'History',
                itemId: 'btnHistory',
                ui: "action",
                margin: '2% 15% 0 15%'
            }]
        }]
    }
});
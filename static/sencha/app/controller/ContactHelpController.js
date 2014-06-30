Ext.define('TransportApp.controller.ContactHelpController', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            ContactHelp: 'ContactHelp'

        },
        control:
        {
            ContactHelp:
            {
                BackViewCommand: "OnBackViewCommand"

            }
        },
        slideLeftTransition: { type: 'slide', direction: 'left' },
        slideRightTransition: { type: 'slide', direction: 'right' },
        OnBackViewCommand: function () {
            Ext.getCmp("MainView").animateActiveItem(Ext.getCmp("MenuView"),this.slideRightTransition);
        }

    },
    launch: function () {
        this.callParent(arguments);
        console.log("launch");

    },
    init: function () {
        this.callParent(arguments);
        console.log("init");
    }
});
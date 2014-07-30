Ext.define('Aporo.controller.MainController', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {},
        control: {
            'container[itemId=btnList]': {
                activate: function(cmp) {
                    Ext.getCmp('Viewport').getNavigationBar().setHidden(true);
                }
            },
            'button[itemId=MainRegBtn]': {
                tap: 'onMainRegistrationBtnTap'
            },
            'button[itemId=MainHelpBtn]': {
                tap: 'onMainHelpContactBtnTap'
            },
            'button[itemId=MainVendorBtn]': {
                tap: 'onMainVendorMenuBtnTap'
            },
            'button[itemId=ActiveDGBtn]': {
                tap: 'onActiveDGMenuBtnTap'
            },
            'button[itemId=PassiveDGBtn]': {
                tap: 'onPassiveDGMenuBtnTap'
            }
        }
    },
    onMainRegistrationBtnTap: function() {
        Ext.getCmp('Viewport').getNavigationBar().setHidden(false);
        Ext.getCmp('Viewport').push(Ext.create('Aporo.view.RegistrationView'));
    },
    onMainHelpContactBtnTap: function() {
        Ext.getCmp('Viewport').getNavigationBar().setHidden(false);
        Ext.getCmp('Viewport').push(Ext.create('Aporo.view.ContactHelp'));
    },
    onMainVendorMenuBtnTap: function() {
        Ext.getCmp('Viewport').getNavigationBar().setHidden(false);
        Ext.getCmp('Viewport').push(Ext.create('Aporo.view.vendor.MainView'));
    },
    onActiveDGMenuBtnTap: function() {
        Ext.getCmp('Viewport').getNavigationBar().setHidden(false);
        Ext.getCmp('Viewport').push(Ext.create('Aporo.view.activeDG.MainView'));
    },
    onPassiveDGMenuBtnTap: function() {
        Ext.getCmp('Viewport').getNavigationBar().setHidden(false);
        Ext.getCmp('Viewport').push(Ext.create('Aporo.view.passiveDG.MainView'));
    }
});
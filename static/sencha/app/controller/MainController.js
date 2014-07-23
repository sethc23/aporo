Ext.define('Aporo.controller.MainController', {
    extend: 'Ext.app.Controller',
    config: {
        platformConfig: {

        },
        refs: {
        },
        control: {
            'container[itemId=btnList]' : {
                activate: function(cmp) {
                   Ext.getCmp('Viewport').getNavigationBar().setHidden(true);
                }
            },
            'button[itemId=MainRegBtn]' : {
                tap: 'onMainRegistrationBtnTap'
            },
            'button[itemId=MainHelpBtn]' : {
                tap: 'onMainHelpContactBtnTap'
            },
            'button[itemId=MainVendorBtn]' : {
                tap: 'onMainVendorMenuBtnTap'
            },
            'button[itemId=ActiveDGBtn]' : {
                tap: 'onActiveDGMenuBtnTap'
            },
            'button[itemId=PassiveDGBtn]' : {
                tap: 'onPassiveDGMenuBtnTap'
            }
        }
    },
    onMainRegistrationBtnTap: function()
    {
        Ext.getCmp('Viewport').getNavigationBar().setHidden(false);
        Ext.getCmp('Viewport').getNavigationBar().titleComponent.setTitle('Registration');
        Ext.getCmp('Viewport').push(Ext.create('Aporo.view.RegistrationView'));
    },
    onMainHelpContactBtnTap: function()
    {
        Ext.getCmp('Viewport').getNavigationBar().setHidden(false);
        Ext.getCmp('Viewport').getNavigationBar().titleComponent.setTitle('Contact Help');
        Ext.getCmp('Viewport').push(Ext.create('Aporo.view.ContactHelp'));
    },
    onMainVendorMenuBtnTap: function()
    {
        Ext.getCmp('Viewport').getNavigationBar().setHidden(false);
        Ext.getCmp('Viewport').getNavigationBar().titleComponent.setTitle('Vendor Menu');
        Ext.getCmp('Viewport').push(Ext.create('Aporo.view.VendorOrderList'));
    },
    onActiveDGMenuBtnTap: function()
    {
        Ext.getCmp('Viewport').getNavigationBar().setHidden(false);
        Ext.getCmp('Viewport').getNavigationBar().titleComponent.setTitle('Active DG Menu');
        Ext.getCmp('Viewport').push(Ext.create('Aporo.view.ActiveDGMainView'));
    },
    onPassiveDGMenuBtnTap: function()
    {
        Ext.getCmp('Viewport').getNavigationBar().setHidden(false);
        Ext.getCmp('Viewport').getNavigationBar().titleComponent.setTitle('Passive DG Menu');
        Ext.getCmp('Viewport').push(Ext.create('Aporo.view.PassiveDGMainView'));
    }
});
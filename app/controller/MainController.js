Ext.define('Aporo.controller.MainController', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
        },
        control: {
            'container[itemId=btnList]' : {
                activate: function(cmp)
                {
                    Ext.getCmp('Viewport').setNavigationBar(false);
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
        }
    },
    onMainRegistrationBtnTap: function()
    {
        Ext.Msg.alert('Notice', 'Main app refactorying is under construction!', Ext.EmptyFn);
    },
    onMainHelpContactBtnTap: function()
    {
        Ext.Msg.alert('Notice', 'Main app refactorying is under construction!', Ext.EmptyFn);
    },
    onMainVendorMenuBtnTap: function()
    {
        Ext.Msg.alert('Notice', 'Main app refactorying is under construction!', Ext.EmptyFn);
    }
});
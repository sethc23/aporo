gettext = function(text) {
    return text;
};

Ext.BLANK_IMAGE_URL = '/static/xmin/images/s.gif';

Ext.Loader.setConfig({
    enabled: true
});

Ext.Loader.setPath('Ext', '../extjs-4/src');
Ext.Loader.setPath('Ext.ux', '../extjs-4/examples/ux');

Ext.application({
    name: 'Xmin',

    appFolder: '../xmin',

    controllers: [
        'Dashboard',
        'Router',
        'ServerEvents',
        'Admin'
    ],

    requires: [
        'Ext.util.History',
        'Ext.util.Cookies',
        'Ext.window.MessageBox',
        'Ext.container.Viewport'
    ],

    launch: function() {
        Ext.tip.QuickTipManager.init();

        Ext.Ajax.defaultHeaders = {
            'X-CSRFToken': Ext.util.Cookies.get('csrftoken')
        };

        Xmin.application = this;

        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: {
                xtype: 'Dashboard'
            }
        });
    }
});
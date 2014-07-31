Ext.define('Aporo.view.activeDG.CheckPackage', {
    extend: 'Ext.Container',
    xtype: 'ActiveDGCheckPackage',
    id: 'ActiveDGCheckPackage',

    config: {
        layout: 'card',
        scrollable: null,

        items: [{
            xtype: 'formpanel',
            items: [{
                xtype: 'textfield',
                label: l.TAG,
                itemId: 'tagField'
            }, {
                xtype: 'titlebar',
                docked: 'bottom',
                items: [{
                    xtype: 'button',
                    text: l.SUBMIT,
                    align: 'right',
                    itemId: 'submitButton'
                }]
            }]
        }]
    }
});
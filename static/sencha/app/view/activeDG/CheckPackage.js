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
                label: 'Tag',
                itemId: 'tagField'
            }, {
                xtype: 'titlebar',
                docked: 'bottom',
                items: [{
                    xtype: 'button',
                    text: 'Submit',
                    align: 'right',
                    itemId: 'submitButton'
                }]
            }]
        }]
    }
});
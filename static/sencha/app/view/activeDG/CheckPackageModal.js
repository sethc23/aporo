Ext.define('Aporo.view.activeDG.CheckPackageModal', {
    extend: 'Ext.Panel',
    xtype: 'ActiveDGCheckPackageModal',
    id: 'ActiveDGCheckPackageModal',

    config: {
        scrollable: null,
        modal: true,
        centered: true,

        items: [{
            xtype: 'fieldset',
            items: [{
                xtype: 'textfield',
                label: l.PRICE,
                id: 'checkPackageModalPriceField'
            }, {
                xtype: 'textfield',
                label: l.TIP,
                id: 'checkPackageModalTipField'
            }]
        }, {
            xtype: 'toolbar',
            docked: 'bottom',
            items: [{
                xtype: 'button',
                text: l.SUBMIT,
                id: 'checkPackageModalSubmitButton'
            }]
        }]
    }
});
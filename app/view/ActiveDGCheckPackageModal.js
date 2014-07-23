Ext.define('Aporo.view.ActiveDGCheckPackageModal', {
    extend: 'Ext.Panel',
    xtype: 'ActiveDGCheckPackageModal',
    id: 'ActiveDGCheckPackageModal',

    config: {
        scrollable: null,
        modal: true,
        centered: true,
    
        items: [
            {
                xtype: 'fieldset',
                items: [
                    {
                        xtype: 'textfield',
                        label: 'Price',
                        id: 'checkPackageModalPriceField'
                    },
                    {
                        xtype: 'textfield',
                        label: 'Tip',
                        id: 'checkPackageModalTipField'
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [{
                    xtype: 'button',
                    text: 'Submit',
                    id: 'checkPackageModalSubmitButton'
                }]
            }
        ]
    }
});
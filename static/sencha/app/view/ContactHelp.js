Ext.define('Aporo.view.ContactHelp', {
    extend: 'Ext.Container',
    xtype: 'ContactHelp',
    title: 'Contact Help',
    config: {
        title: l.CONTACT_HELP,
        layout: {
            type: 'vbox',
            align: 'center'
        },
        items: [{
            id: "IdPhoneNumber",
            itemId: "IdPhoneNumber",
            xtype: "label",
            margin: 20,
            cls: 'contactInfo',
            html: '<div>' + l.CONTACT_NUMBER + ': <a href="tel:+18005558080">(800) 555-8080</a></div>'
        }]
    }
})
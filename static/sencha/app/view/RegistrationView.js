Ext.define('Aporo.view.RegistrationView', {
    extend: "Ext.form.Panel",
    xtype: 'RegistrationView',
    id: 'RegistrationView',

    requires: [
        'Ext.field.Text',
        'Ext.field.Email',
        'Ext.field.Number',
        'Ext.form.FieldSet'
    ],

    config: {
        title: l.REGISTRATION,
        layout: 'vbox',
        //scrollable:null,
        align: 'center',
        items: [{
            id: 'IdRegistrationForm',
            width: '98%',
            xtype: 'fieldset',
            instructions: '(All fields are mandatory)',
            items: [{
                id: 'fldVendorName',
                name: 'VendorName',
                xtype: 'textfield',
                placeHolder: l.VENDOR_NAME,
                margin: '15 5 5 5',
                required: true
            }, {
                id: 'fldAddress',
                name: 'Address',
                xtype: 'textfield',
                placeHolder: l.ADDRESS,
                margin: '10 5 0 5',
                required: true
            }, {
                id: 'fldPcName',
                name: 'fldPcName',
                xtype: 'textfield',
                placeHolder: l.PRIMARY_CONTACT_NAME,
                margin: '10 5 0 5',
                required: true
            }, {
                id: 'fldPcNumber',
                name: 'fldPcNumber',
                xtype: 'numberfield',
                placeHolder: l.PRIMARY_CONTACT_NUMBER,
                margin: '10 5 0 5',
                required: true
            }, {
                id: 'fldPcEmail',
                name: 'fldPcEmail',
                xtype: 'emailfield',
                placeHolder: l.PRIMARY_CONTACT_EMAIL,
                cls: 'clsTextinput',
                margin: '10 5 0 5',
                required: true
            }, {
                id: 'fldVendorNumber',
                name: 'fldVendorNumber',
                xtype: 'numberfield',
                placeHolder: l.VENDOR_NUMER,
                cls: 'clsTextinput',
                margin: '10 5 0 5',
                required: true
            }, {
                id: 'fldVendorEmail',
                name: 'fldVendorEmail',
                xtype: 'textfield',
                placeHolder: l.VENDOR_EMAIL,
                cls: 'clsTextinput',
                margin: '10 5 0 5',
                required: true
            }]
        }, {
            xtype: 'panel',
            layout: 'hbox',
            margin: '0 0 15 0',
            items: [{
                xtype: 'button',
                text: l.SUBMIT,
                margin: '15 10 15 10',
                itemId: 'RegisterBtn',
                flex: .4,
                ui: "action"
            }, {
                xtype: 'button',
                text: l.CANCEL,
                margin: '15 10 15 10',
                itemId: 'btCancelRegistration',
                flex: .4,
                ui: "action"
            }]

        }]
    }

});
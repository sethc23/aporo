Ext.define('Aporo.view.RegistrationView', {
    extend: "Ext.form.Panel",
    xtype: 'RegistrationView',
    id: 'RegistrationView',

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
                placeHolder: 'Vendor Name',
                margin: '15 5 5 5',
                required: true
            }, {
                id: 'fldAddress',
                name: 'Address',
                xtype: 'textfield',
                placeHolder: 'Address',
                margin: '10 5 0 5',
                required: true
            }, {
                id: 'fldPcName',
                name: 'fldPcName',
                xtype: 'textfield',
                placeHolder: 'Primary Contact Name',
                margin: '10 5 0 5',
                required: true
            }, {
                id: 'fldPcNumber',
                name: 'fldPcNumber',
                xtype: 'numberfield',
                placeHolder: 'Primary Contact Number',
                margin: '10 5 0 5',
                required: true
            }, {
                id: 'fldPcEmail',
                name: 'fldPcEmail',
                xtype: 'emailfield',
                placeHolder: 'Primary Contact Email',
                cls: 'clsTextinput',
                margin: '10 5 0 5',
                required: true
            }, {
                id: 'fldVendorNumber',
                name: 'fldVendorNumber',
                xtype: 'numberfield',
                placeHolder: 'Vendor Number',
                cls: 'clsTextinput',
                margin: '10 5 0 5',
                required: true
            }, {
                id: 'fldVendorEmail',
                name: 'fldVendorEmail',
                xtype: 'textfield',
                placeHolder: 'Vendor Email',
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
                text: 'Submit',
                margin: '15 10 15 10',
                itemId: 'RegisterBtn',
                flex: .4,
                ui: "action"
            }, {
                xtype: 'button',
                text: 'Cancel',
                margin: '15 10 15 10',
                itemId: 'btCancelRegistration',
                flex: .4,
                ui: "action"
            }]

        }]
    }

});
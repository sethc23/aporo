Ext.define('Aporo.view.AddVendorOrder',
    {
        extend: "Ext.form.Panel",
        xtype: 'AddVendorOrder',
        id: 'AddVendorOrder',
        config:
        {
            layout: 'vbox',
            align: 'center',
            items: [
                {
                    id: 'IdVendorOrderForm',
                    width: '98%',
                    xtype: 'fieldset',
                    instructions: '(All fields are mandatory)',
                    items: [
                        {
                            id: 'fldDeliverAddress',
                            name: 'DeliverAddress',
                            xtype: 'textfield',
                            placeHolder: 'Deliver Address',
                            margin: '15 5 5 5',
                            required: true
                        },
                        {
                            id: 'fldPickupDate',
                            name: 'fldPickupDate',
                            xtype: 'datepickerfield',
                            margin: '10 5 0 5',
                            value: new Date()
                        },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            height: "140px",
                            items: [
                                {
                                    id: 'fldPickupTime',
                                    name: 'fldPickupTime',
                                    xtype: 'textfield',
                                    placeHolder: 'Pickup Time',
                                    margin: '10 5 0 5',
                                    required: true

                                },
                                {
                                    flex:
                                        .5,
                                    label: 'Hours:',
                                    xtype: 'spinnerfield',
                                    minValue: 0,
                                    maxValue: 23,
                                    stepValue: 1,
                                    value: 1,
                                    component:
                                    {
                                        disabled: false
                                    }
                                },
                                {
                                    flex:
                                        .5,
                                    label: 'Minutes:',
                                    xtype: 'spinnerfield',
                                    minValue: 0,
                                    maxValue: 59,
                                    stepValue: 5,
                                    value:20,
                                    component:
                                    {
                                        disabled: false
                                    }
                                }]
                        }]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '0 0 15 0',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Submit',
                            margin: '15 10 15 10',
                            itemId: 'saveBtn',
                            flex:
                                .5,
                            ui: "action"
                        },
                        {
                            xtype: 'button',
                            text: 'Cancel',
                            margin: '15 10 15 10',
                            itemId: 'vendorCancelBtn',
                            flex:
                                .5,
                            ui: "action"
                        }]
                }]
        }
    });
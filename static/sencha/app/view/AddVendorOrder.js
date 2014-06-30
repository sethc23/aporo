Ext.define(
    'TransportApp.view.AddVendorOrder',
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
                    xtype: 'titlebar',
                    docked: 'top',
                    width: '100%',
                    height: '54px',
                    title: 'Add Vendor Orders',
                    items: [
                        {
                            id: 'backBtnVen',
                            itemId: 'backBtnVen',
                            align: 'right',
                            text: 'Back'
                        }]
                },
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
                            placeHolder: strDeliverAddress,
                            margin: '15 5 5 5',
                            required: true
                        },
                        {
                            id: 'fldPickupDate',
                            name: 'fldPickupDate',
                            xtype: 'datepickerfield',
                            placeHolder: strPickupDate,
                            margin: '10 5 0 5',
                            value: new Date(),
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
                                    placeHolder: strPickupTime,
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
                        }, ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '0 0 15 0',
                    items: [
                        {
                            xtype: 'button',
                            text: strSubmit,
                            cls: 'ClsSmallButton',
                            margin: '15 10 15 10',
                            itemId: 'btnSave',
                            flex:
                                .5,
                            ui: "action"
                        },
                        {
                            xtype: 'button',
                            text: strCancel,
                            cls: 'ClsSmallButton',
                            margin: '15 10 15 10',
                            id: 'btCancel',
                            flex:
                                .5,
                            ui: "action"
                        }]
                }],
            listeners: [
                {
                    delegate: "#btnSave",
                    event: "tap",
                    fn: "OnSaveButtonTap"
                },
                {
                    delegate: "#btCancel",
                    event: "tap",
                    fn: "OnCancelButtonTap"
                },
                {
                    delegate: '#AddVendorOrder',
                    event: 'activeitemchange',
                    fn: "OnVendorOrderViewactivate"
                },
                {
                    delegate: '#backBtnVen',
                    event: 'tap',
                    fn: "OnBackButton"
                }]
        },
        OnSaveButtonTap: function ()
        {
            alert(
                'Save Button tap'
            );
            this.fireEvent(
                "AddOrderCommand",
                this);
        },
        OnCancelButtonTap: function ()
        {
            this.fireEvent(
                "CancelOrderCommand",
                this);
        },
        OnVendorOrderViewactivate: function (
            AddVendorOrder,
            value, oldValue,
            eOpts)
        {
            //alert("Add Vendor order Tap");
            //Ext.getCmp('fldEmail').blur();	
        },
        OnBackButton: function ()
        {
            this.fireEvent(
                "VendorBackButtonCommand",
                this);
        }
    });
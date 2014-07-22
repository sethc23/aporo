//<debug>
Ext.Loader.setPath({
    'Ext': '/static/dyn_forms/touch/src'
});
//</debug>

Ext.application({

//    appFolder: '/static/dyn_forms/touch/src',

    requires: [
        'Ext.Button',
        'Ext.Toolbar',
        'Ext.form.*',
        'Ext.field.*'
    ],

    launch: function() {
        this.loadForms();
    },

    /**
     * Method to load remote forms data via JSON
     */
    loadForms: function() {

        var me = this;

        Ext.Ajax.request({
            url: '/static/dyn_forms/forms.json',
            success: function(response) {
                var responseText = response.responseText;

                // Strip the encoded input_attr properties from the JSON
                responseText = responseText.replace(/\\"/g,"");

                // Decode the JSON data
                var forms = Ext.util.JSON.decode(responseText);

                // Loop each of the forms and convert the stringified form_inputs into json
                var form, form_inputs;
                for (var i = 0; i < forms.length; i++) {
                    form = forms[i];
                    inputs = form.form_inputs;

                    // The inputs data is not valid JSON, so we must replace ' with "
                    inputs = inputs.replace(/\'/g, "\"");

                    // Catch any errors
                    try {
                        form.form_inputs = Ext.util.JSON.decode(inputs);
                    } catch(e) {
                        form.form_inputs = [];
                        console.log('Error JSON decoding the form_inputs property of ' + form.name);
                    }
                }

                // Update the UI
                me.setForms(forms);
            }
        });
    },

    /**
     * Adds buttons to navigate to each form supplied
     * @param {Array} forms The array of forms to add into the UI
     */
    setForms: function(forms) {

        this.forms = forms;

        var me = this,
            items = [];

        for (var i = 0; i < forms.length; i++) {
            var form = forms[i];

            items.push({
                xtype: 'button',
                text: form.name,
                scope: this,

                // Must be inside a closure so the data is persistent
                // More information: http://stackoverflow.com/a/341759/273985
                handler: function(f) {
                    return function() {
                        me.showForm(f);
                    }
                }(forms[i])
            });
        }

        // Add the new item into the view with a vbox layout
        Ext.Viewport.add({
            layout: {
                type: 'vbox'
            },
            defaults: {
                margin: '10 10 0 10'
            },
            items: items
        })
    },

    /**
     * Shows a specific form
     * @param  {Object} form The form to show
     */
    showForm: function(form) {
        var me = this,
            items;

        items = [
            // Add a toolbar docked to the top so we can show the form name and a back button
            {
                docked: 'top',
                xtype: 'toolbar',
                title: form.name,
                items: [{
                    xtype: 'button',
                    ui: 'back',
                    text: 'Back',
                    handler: function() {
                        // Navigate back to the first item in the Viewport (view with buttons)
                        Ext.Viewport.setActiveItem(0);

                        // Destroy existing form item
                        var formItem = Ext.Viewport.getItems().getAt(1);
                        if (formItem) {
                            formItem.destroy();
                        }
                    }
                }]
            },

            // Add a toolbar docked to the bottom to show the form submission button
            {
                docked: 'bottom',
                xtype: 'toolbar',
                ui: 'neutral',
                items: [
                    { xtype: 'spacer' },
                    {
                        xtype: 'button',
                        text: 'Submit',
                        handler: function() {
                            me.submitForm(form);
                        }
                    },
                    { xtype: 'spacer' }
                ]
            }
        ];

        // Get the items for the form and add them into the existing items (the top toolbar)
        items = items.concat(this.formItemsForData(form.form_inputs));

        // Show the form in the Viewport
        Ext.Viewport.setActiveItem({
            xtype: 'formpanel',
            items: items
        });
    },

    /**
     * Submits the specified form
     * @param {Object} form
     */
    submitForm: function(form) {
        // Get the values from the form
        var values = Ext.Viewport.getActiveItem().getValues();

        Ext.Ajax.request({
            url: form.url,
            method: form.method,
            params: values,
            disableCaching: false,
            success: function(response) {
                console.log('Form submission success!', response.responseText);
            },
            failure: function(response) {
                console.log('Form submission failure!', response.responseText);
            }
        });
    },

    /**
     * Returns an array of items for the specified form_inputs data
     * @param  {Array} data 
     * @return {Array} An array of items
     */
    formItemsForData: function(data) {
        var items = [],
            item;

        for (var i = 0; i < data.length; i++) {
            item = data[i];

            // We need to map each of the fields passed from the server into the appropriate configs
            items.push({
                xtype: this.xtypeForInputType(item.input_type),
                id: item.input_id,
                label: item.input_label,
                name: item.input_name,
                value: item.input_value,
                required: item.input_required,
                maxLength: (item.input_attr && item.input_attr.maxlength) ? parseInt(item.input_attr.maxlength) : null
            });
        }

        return items;
    },

    /**
     * Returns a Sencha Touch component xtype for a specified string from the server
     * @param  {String} inputType
     * @return {String} xtype
     */
    xtypeForInputType: function(inputType) {
        if (inputType == "text" || inputType == "phone" || inputType == "zip") {
            return "textfield";
        }
        else if (inputType == "password") {
            return "passwordfield";
        }
        else if (inputType == "email") {
            return "emailfield";
        }
        else if (inputType == "hidden") {
            return "hiddenfield";
        }

        // If we don't define anything above, we default to textfield
        console.log("xtype not defined for input_type: " + inputType);
        return "textfield";
    }
});


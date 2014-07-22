Ext.define('App.view.Viewport', {
    extend: 'Ext.Container',
    xtype: 'Viewport',
    config: {	
        layout: 'card',
        items: [
        {
          xtype: 'toolbar',
          docked: 'top',
          title: 'PhoneGap / Cordova',
          items: [
          {
            xtype: 'button',
            text: 'Scan',
            handler: function()
            {
                if(!debugging)
                {
                    startScanner();
                }else{
                    Ext.Msg.alert('Warning', 'Please disable the Debugging mode and deploy to a device to scan');
                }
            }
          }
          ]  
        },
       {
        xtype: 'list',
        store: 'Items',
        itemId: 'main-list',
        itemTpl: '<p style="text-align: left; margin-left: 10px; font-size: 15px;">{name}</p>'
       }
        ]
        
        }
        });
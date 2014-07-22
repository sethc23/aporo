Ext.define('App.controller.Application', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            viewport: 'viewport',
            
        },
        control: {
            'list[itemId=main-list]': {
                select: function(list, record)
                {
                    if(!deployed&&!debugging)
                    {
                        Ext.Msg.alert('Warning', 'All native activities is designed to working after device deployment');
                    }else{
                        if(!initialized&&!debugging)
                        {
                            Ext.Msg.alert('Warning', 'Device has not initialize yet the native access');
                        }else{
                            switch(record.get('type'))
                            {
                                case 'device':
                                var device_panel = Ext.Viewport.add({
                                    xtype: 'panel',
                                    modal: true,
                                    centered: true,
                                    hideOnMaskTap: true,
                                    showAnimation: {
                                        type: 'popIn',
                                        duration: 300,
                                        easing: 'ease-out'
                                    },
                                    hideAnimation: {
                                        type: 'popOut',
                                        duration: 300,
                                        easing: 'ease-out'
                                    },
                                    height: 400,
                                    width: 300,
                                    items: [
                                    {
                                        xtype: 'toolbar',
                                        docked: 'top',
                                        title: 'device info'
                                    },
                                    {
                                        xtype: 'titlebar',
                                        docked: 'top',
                                        padding: 5,
                                        cls: 'titlebar',
                                        items: [
                                        {
                                            xtype: 'container',
                                            align: 'left',
                                            html: 'Cordova version:'
                                        },
                                        {
                                            xtype: 'container',
                                            align: 'right',
                                            id: 'cordova-version',
                                            html: 'loading...'
                                        }
                                        ]
                                    },
                                    {
                                        xtype: 'titlebar',
                                        docked: 'top',
                                        padding: 5,
                                        cls: 'titlebar',
                                        items: [
                                        {
                                            xtype: 'container',
                                            align: 'left',
                                            html: 'Platform OS:'
                                        },
                                        {
                                            xtype: 'container',
                                            align: 'right',
                                            id: 'platform-os',
                                            html: 'loading...'
                                        }
                                        ]
                                    },
                                    {
                                        xtype: 'titlebar',
                                        docked: 'top',
                                        padding: 5,
                                        cls: 'titlebar',
                                        items: [
                                        {
                                            xtype: 'container',
                                            align: 'left',
                                            html: 'UUID:'
                                        },
                                        {
                                            xtype: 'container',
                                            align: 'right',
                                            id: 'uuid',
                                            html: 'loading...'
                                        }
                                        ]
                                    },
                                    {
                                        xtype: 'titlebar',
                                        docked: 'top',
                                        padding: 5,
                                        cls: 'titlebar',
                                        items: [
                                        {
                                            xtype: 'container',
                                            align: 'left',
                                            html: 'Phone Model:'
                                        },
                                        {
                                            xtype: 'container',
                                            align: 'right',
                                            id: 'device-model',
                                            html: 'loading...'
                                        }
                                        ]
                                    },
                                    ]
                                });
                                
                                if(!debugging)
                                {
                                    Ext.getCmp('cordova-version').setHtml('<b>'+device.cordova+'</b>');
                                    Ext.getCmp('platform-os').setHtml('<b>'+device.platform+'</b>');
                                    Ext.getCmp('uuid').setHtml('<b>'+device.uuid+'</b>');
                                    Ext.getCmp('device-model').setHtml('<b>'+device.model+'</b>');
                                }
                                
                                device_panel.show();
                                break;
                                
                                //Case of event list trigged
                                case 'event':
                                
                                
                                Ext.Msg.alert('event info', 'Battery Status: '+batteryStatus+'<br/>'+
                                'Battery Plagged: '+batteryPlagged+'<br/>'+
                                'Online Status: '+onlineStatus+'<br/>'+
                                '<br/>'+
                                'Other events will fire when the device trigged that event and a PopUp alert will be appear');
                                
                                /*var event_panel = Ext.Viewport.add({
                                    xtype: 'panel',
                                    modal: true,
                                    centered: true,
                                    hideOnMaskTap: true,
                                    showAnimation: {
                                        type: 'popIn',
                                        duration: 300,
                                        easing: 'ease-out'
                                    },
                                    hideAnimation: {
                                        type: 'popOut',
                                        duration: 300,
                                        easing: 'ease-out'
                                    },
                                    height: 400,
                                    width: 300,
                                    items: [
                                    {
                                        xtype: 'toolbar',
                                        docked: 'top',
                                        title: 'event info'
                                    },
                                    {
                                        xtype: 'titlebar',
                                        docked: 'top',
                                        padding: 5,
                                        cls: 'titlebar',
                                        items: [
                                        {
                                            xtype: 'container',
                                            align: 'left',
                                            html: 'Battery Status:'
                                        },
                                        {
                                            xtype: 'container',
                                            align: 'right',
                                            id: 'batteryStatus',
                                            html: 'loading...'
                                        }
                                        ]
                                    },
                                    {
                                        xtype: 'titlebar',
                                        docked: 'top',
                                        padding: 5,
                                        cls: 'titlebar',
                                        items: [
                                        {
                                            xtype: 'container',
                                            align: 'left',
                                            html: 'Battery Plagged:'
                                        },
                                        {
                                            xtype: 'container',
                                            align: 'right',
                                            id: 'batteryPagged',
                                            html: 'loading...'
                                        }
                                        ]
                                    },
                                    {
                                        xtype: 'titlebar',
                                        docked: 'top',
                                        padding: 5,
                                        cls: 'titlebar',
                                        items: [
                                        {
                                            xtype: 'container',
                                            align: 'left',
                                            html: 'Online Status:'
                                        },
                                        {
                                            xtype: 'container',
                                            align: 'right',
                                            id: 'onlineStatus',
                                            html: 'loading...'
                                        }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        margin: '40 15 0 15',
                                        html: 'Other events will fire when the device trigged that event and a PopUp alert will be appear'
                                    }
                                    ]
                                });*/
                                
                                
                                //window.addEventListener("batterystatus", batteryCallback, false);
                                //document.addEventListener("online", onOnline, false);
                                //document.addEventListener("offline", onOffline, false);
                                
                                //event_panel.show();
                                break;
                                
                                
                                
                                //Case of Geolocation list trigged
                                case 'geo':
                                
                                navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, {enableHighAccuracy: true });
                                
                                
                                var gps_panel = Ext.Viewport.add({
                                    xtype: 'carousel',
                                    modal: true,
                                    centered: true,
                                    hideOnMaskTap: true,
                                    style: 'background-color: #fff;',
                                    showAnimation: {
                                        type: 'popIn',
                                        duration: 300,
                                        easing: 'ease-out'
                                    },
                                    hideAnimation: {
                                        type: 'popOut',
                                        duration: 300,
                                        easing: 'ease-out'
                                    },
                                    height: 500,
                                    width: 300,
                                    items: [
                                    {
                                        xtype: 'panel',
                                        items: [
                                        {
                                            xtype: 'toolbar',
                                            docked: 'top',
                                            title: 'Current Position'
                                        },
                                        {
                                            xtype: 'titlebar',
                                            docked: 'top',
                                            padding: 5,
                                            cls: 'titlebar',
                                            items: [
                                            {
                                                xtype: 'container',
                                                align: 'left',
                                                html: 'Latitude:'
                                            },
                                            {
                                                xtype: 'container',
                                                align: 'right',
                                                id: 'latitude',
                                                html: 'loading...'
                                            }
                                            ]
                                        },
                                        {
                                            xtype: 'titlebar',
                                            docked: 'top',
                                            padding: 5,
                                            cls: 'titlebar',
                                            items: [
                                            {
                                                xtype: 'container',
                                                align: 'left',
                                                html: 'Longitude:'
                                            },
                                            {
                                                xtype: 'container',
                                                align: 'right',
                                                id: 'longitude',
                                                html: 'loading...'
                                            }
                                            ]
                                        },
                                        {
                                            xtype: 'titlebar',
                                            docked: 'top',
                                            padding: 5,
                                            cls: 'titlebar',
                                            items: [
                                            {
                                                xtype: 'container',
                                                align: 'left',
                                                html: 'Altitude:'
                                            },
                                            {
                                                xtype: 'container',
                                                align: 'right',
                                                id: 'altitude',
                                                html: 'loading...'
                                            }
                                            ]
                                        },
                                        {
                                            xtype: 'titlebar',
                                            docked: 'top',
                                            padding: 5,
                                            cls: 'titlebar',
                                            items: [
                                            {
                                                xtype: 'container',
                                                align: 'left',
                                                html: 'Accuracy:'
                                            },
                                            {
                                                xtype: 'container',
                                                align: 'right',
                                                id: 'accuracy',
                                                html: 'loading...'
                                            }
                                            ]
                                        },
                                        {
                                            xtype: 'titlebar',
                                            docked: 'top',
                                            padding: 5,
                                            cls: 'titlebar',
                                            items: [
                                            {
                                                xtype: 'container',
                                                align: 'left',
                                                html: 'Altitude Accuracy:'
                                            },
                                            {
                                                xtype: 'container',
                                                align: 'right',
                                                id: 'altitudeAccuracy',
                                                html: 'loading...'
                                            }
                                            ]
                                        },
                                        {
                                            xtype: 'titlebar',
                                            docked: 'top',
                                            padding: 5,
                                            cls: 'titlebar',
                                            items: [
                                            {
                                                xtype: 'container',
                                                align: 'left',
                                                html: 'Heading:'
                                            },
                                            {
                                                xtype: 'container',
                                                align: 'right',
                                                id: 'heading',
                                                html: 'loading...'
                                            }
                                            ]
                                        },
                                        {
                                            xtype: 'titlebar',
                                            docked: 'top',
                                            padding: 5,
                                            cls: 'titlebar',
                                            items: [
                                            {
                                                xtype: 'container',
                                                align: 'left',
                                                html: 'Speed:'
                                            },
                                            {
                                                xtype: 'container',
                                                align: 'right',
                                                id: 'speed',
                                                html: 'loading...'
                                            }
                                            ]
                                        },
                                        {
                                            xtype: 'titlebar',
                                            docked: 'top',
                                            padding: 5,
                                            cls: 'titlebar',
                                            items: [
                                            {
                                                xtype: 'container',
                                                align: 'left',
                                                html: 'Timestamp:'
                                            },
                                            {
                                                xtype: 'container',
                                                align: 'right',
                                                id: 'timestamp',
                                                html: 'loading...'
                                            }
                                            ]
                                        }
                                        ]
                                    },
                                    
                                    //Geo watch panel
                                    {
                                        xtype: 'panel',
                                        layout: 'vbox',
                                        items: [
                                        {
                                            xtype: 'toolbar',
                                            docked: 'top',
                                            title: 'Watch Position'
                                        },
                                        {
                                            xtype: 'titlebar',
                                            docked: 'top',
                                            padding: 5,
                                            cls: 'titlebar',
                                            items: [
                                            {
                                                xtype: 'container',
                                                align: 'left',
                                                html: 'Latitude:'
                                            },
                                            {
                                                xtype: 'container',
                                                align: 'right',
                                                id: 'latitude-watch',
                                                html: 'loading...'
                                            }
                                            ]
                                        },
                                        {
                                            xtype: 'titlebar',
                                            docked: 'top',
                                            padding: 5,
                                            cls: 'titlebar',
                                            items: [
                                            {
                                                xtype: 'container',
                                                align: 'left',
                                                html: 'Longitude:'
                                            },
                                            {
                                                xtype: 'container',
                                                align: 'right',
                                                id: 'longitude-watch',
                                                html: 'loading...'
                                            }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '40 15 0 15',
                                            html: 'clear watch will fire after deactivating this screen!'
                                        }
                                        ],
                                        listeners: {
                                            activate: function()
                                            {
                                                // Throw an error if no update is received every 60 seconds
                                                var options = { timeout: 60000,  enableHighAccuracy: true};
                                                watchID = navigator.geolocation.watchPosition(onGeoWatchSuccess, onGeoWatchError, options);
                                                console.log('activate');
                                            },
                                            deactivate: function()
                                            {
                                                if (watchID!==null)
                                                {
                                                    clearWatch();
                                                }
                                            },
                                        }
                                    },
                                    ]
                                });
                                gps_panel.show();
                                break;
                                
                                
                                
                                
                                //Case of Connection list trigged
                                case 'connection':
                                
                                if(!debugging)
                                {
                                    checkConnection();
                                }
                                
                                
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
});

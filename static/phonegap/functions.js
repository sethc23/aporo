
var batteryStatus = null;
var batteryPlagged = null;
var onlineStatus = null;


function is_valid_url(url)
{
     return url.match(/^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/);
}

/*
 * This function will be trigged when battery level reaches low battery
 */
 function lowBattery(params)
 {
    Ext.Msg.alert('Warning', 'Your battery reached low level <br/>'+
    'current battery status:'+params.level+'% <br/>'+
    'and '+(params.isPlugged ? 'plugged to source' : 'even not plugged'));
 }
 
 /*
  * This function will be trigged when ask for battery status
  */
  
  function batteryCallback(params)
  {
    var plagged = params.isPlugged ? 'plugged in' : 'not plugged';
    batteryStatus = '<b>'+params.level+'%</b>';
    batteryPlagged = plagged;
  }
 /*
 * This function will be trigged when battery level reaches critical battery
 */ 
 function criticalBattery(params)
 {
    Ext.Msg.alert('Warning', 'Your battery reached critical level <br/>'+
    'current battery status:'+params.level+'% <br/>'+
    'and '+(params.isPlugged ? 'plugged to source' : 'even not plugged'));
 }
 /*
  * This function will be fired when connection state changed to online 
  * and write the status to PopUp box
  */
  function onOnline()
  {
    onlineStatus = '<b>online</b>';
  }
  
  /*
  * This function will be fired when connection state changed to offline 
  * and write the status to PopUp box
  */
  function onOffline()
  {
    onlineStatus = '<b>offline</b>';
  }
  
 /*
  * This function will be fired when app goes to sleep
  */
  function onPause()
  {
    Ext.Msg.alert('Alert', 'App is goes to sleep or activity has been paused');
  } 
  
  /*
  * This function will be fired when app awake from sleep mode
  */
  function onResume()
  {
    Ext.Msg.alert('Alert', 'App is awake from sleep mode or activity resumed after a pause interval');
  }
  
  
  /*
   * Geo location: current possition Success/error
   */
  function onGeoSuccess(position)
  {
    Ext.getCmp('latitude').setHtml('<b>'+position.coords.latitude+'</b>');
    Ext.getCmp('longitude').setHtml('<b>'+position.coords.longitude+'</b>');
    Ext.getCmp('altitude').setHtml('<b>'+position.coords.altitude+'</b>');
    Ext.getCmp('accuracy').setHtml('<b>'+position.coords.accuracy+'</b>');
    Ext.getCmp('altitudeAccuracy').setHtml('<b>'+position.coords.altitudeAccuracy+'</b>');
    Ext.getCmp('heading').setHtml('<b>'+position.coords.heading+'</b>');
    Ext.getCmp('speed').setHtml('<b>'+position.coords.speed+'</b>');
    Ext.getCmp('timestamp').setHtml('<b>'+position.timestamp+'</b>');
  }
  
  function onGeoError(err)
  {
    Ext.Msg.alert('Error '+err.code, 'Geo location failed to fetch with message: '+err.message);
  }
  
  /*
   * clear the watch that was started earlier
   */
  function clearWatch()
  {
    if (watchID != null) 
    {
        navigator.geolocation.clearWatch(watchID);
        watchID = null;
    }
  }
  
  /*
   * geo watch success callback
   */
   function onGeoWatchSuccess(position)
   {
      Ext.getCmp('latitude-watch').setHtml('<b>'+position.coords.latitude+'</b>');
      Ext.getCmp('longitude-watch').setHtml('<b>'+position.coords.longitude+'</b>');
   }
   
  /*
   * geo watch error callback
   */
   function onGeoWatchError(err)
   {
     Ext.Msg.alert('Error '+err.code, 'Geo location watch failed to fetch with message: '+err.message);
   }
   
  /*
   * Connection check
   */
    function checkConnection() {
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';

        Ext.Msg.alert('Connection','Connection type: ' + states[networkState]);
    }
    
  /*
   * Call to open sacnner and scan a barcode
   */
   
   function startScanner()
   {
      window.plugins.barcodeScanner.scan(function(data)
      {
        document.removeEventListener("pause", onPause, false);
        document.removeEventListener("resume", onResume, false);
        console.log(JSON.stringify(data));
        var decode = data.text;
        if(is_valid_url(decode))
        {
            //window.location = decode;
            var ref = window.open(decode, '_blank', 'location=yes');
        }else{
            Ext.Msg.confirm('Warning', 'Scanned barcode is not an URL!<br/>'+
            'Would you like to try it again', function(btn){
                console.log(btn.toString());
            if(btn=='yes')
            {
                startScanner();            
            }else{
                document.addEventListener("pause", onPause, false);
                document.addEventListener("resume", onResume, false);
            }
          });
        }
      }, function(err){
      Ext.Msg.alert('Warning', 'There is an error at scanner plugin while scanning barcode or parsing it', function(){
        document.addEventListener("pause", onPause, false);
        document.addEventListener("resume", onResume, false);
      });
      });
   }
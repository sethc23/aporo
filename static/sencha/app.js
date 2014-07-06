Ext.Loader.setPath('TransportApp.config', 'app/config'); // set the path of static information class - like: APIurl variable

Ext.Ajax.setUseDefaultXhrHeader(false); //Disabling default request header of Sencha - if true it won't allow to cross-origin  

Ext.application({
	name:'TransportApp',

    //appFolder: '/static/sencha/app',
	
    requires: [
    'TransportApp.config.Env'
    ],
    
	views:['MainView','MenuView','RegistrationView','VendorMenu','VendorOrderList','AddVendorOrder','VendorHistory','ContactHelp','HistoryView','VendorMainView'],
	
	models:['VendorOrderModel','VendorHistoryModel','RegistrationModel'],
	
	stores:['VendorOrderStore','VendorHistoryStore'],
	
	controllers:['RegistrationController','AppMainController','VendorController','ContactHelpController','HistoryController'],
	
	launch:function()
	{		
		//Ext.Loader.setPath('TransportApp', '/static/sencha/app');
		/*var UserId = get_cookie("rememberUserId");
		
			if(UserId != null && UserId != "")
			{
				InstaPark.UserId=UserId;
			}
		InstaPark.ApplicationPath="http://50.23.221.50/instaparkservice/";*/
		Ext.Viewport.add({xclass:'TransportApp.view.MainView'});
		
		//Ext.Viewport.add({	xclass:'InstaPark.view.SMSView'});
	}
});



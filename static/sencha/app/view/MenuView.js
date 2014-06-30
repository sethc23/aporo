Ext.define("TransportApp.view.MenuView",{
	extend:"Ext.Container",	
	xtype:"MenuView",	
	id:'MenuView',	
	config:	{			
			scrollable:null, 
			layout: {
				pack: 'center',
				type: 'vbox'
			    },
			items:[
					{
						xtype: 'button',
						text: strRegistration,	
						itemId: 'btnRegister',
						ui: "action",
						margin:'2% 15% 0 15%',
					},
					{
						xtype: 'button',
						text: strContactHelp,										
						itemId: 'btnContactHelp',											
						ui: "action",
						margin:'2% 15% 0 15%',
					},
					{
						xtype: 'button',
						text: strVendorMenu,										
						itemId: 'btnVendorMenu',											
						ui: "action",
						margin:'2% 15% 0 15%',
					},
				],
	
			listeners: [
				{
					delegate: "#btnRegister",
					event: "tap",
					fn: "OnRegisterButtonTap"
				},
				{
					delegate: "#btnContactHelp",
					event: "tap",
					fn: "OnContactHelpButtonTap"
				},										
				{
					delegate:"#btnVendorMenu",
					event:"tap",
					fn:"OnVendorMenuButtonTap"
				}
			] 
		},
		OnRegisterButtonTap: function () {
		   // alert("Register ")
			//console.log("OnLoginButtonTap");
			this.fireEvent("RegisterCommand", this);
		},
		OnContactHelpButtonTap: function () {
		   // alert("btnContactHelp ");
		    this.fireEvent("ContactHelpCommand", this);
		},
		OnVendorMenuButtonTap: function () {
		    // alert("OnVendorMenuButtonTap ");
		     this.fireEvent("VendorMenuCommand", this);
		}
	});
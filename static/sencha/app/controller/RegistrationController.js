Ext.define('TransportApp.controller.RegistrationController',{
            extend:'Ext.app.Controller',						
            config:{								
                    refs:{
                                    RegistrationView:'RegistrationView',
                                    MenuView:'MenuView',
                                    MainView:'MainView',
                        },
             control:{					
                    RegistrationView: {// The commands fired 						
                               RegisterCommand : "onRegisterCommand",
                               BackViewCommand :"OnBackViewCommand",
                               BackBtnCommand:"OnBackViewCommand",
                            },
                            MenuView:{
                                    RegisterCommand    : "onRegisterCommand",	
                                    ContactHelpCommand : "onContactHelpCommand",
                                    VendorMenuCommand  :"OnVendorMenuCommand",
                            }
                    }
            },
            slideLeftTransition: { type: 'slide', direction: 'left' },
            slideRightTransition: { type: 'slide', direction: 'right' },
             activateRegisterScreen: function (record) {
				var RegistrationView = this.getRegistrationView();
				RegistrationView.setRecord(record); // load() is deprecated.
			},
            onRegisterCommand:function(){
                Ext.getCmp("MainView").animateActiveItem(Ext.getCmp("RegistrationView"),this.slideLeftTransition);
               
             var RegistrationView = this.getRegistrationView();
				var RegistrationValues = RegistrationView.getRecord();
				var newValues = RegistrationView.getValues();
				
					// Update the current note's fields with form values.
					RegistrationValues.set("fldVendorName", newValues.fldVendorName);
					RegistrationValues.set("fldAddress", newValues.fldAddress);
					RegistrationValues.set("fldPcName", newValues.fldPcName);
					RegistrationValues.set("fldPcNumber", newValues.fldPcNumber);
					RegistrationValues.set("fldPcEmail", newValues.fldPcEmail);
					RegistrationValues.set("fldVendorNumber", newValues.fldVendorNumber);
					RegistrationValues.set("fldVendorEmail", newValues.fldVendorEmail);
                                 var errors = RegistrationValues.validate();
                                 
                                 
                                  var RegisterUser_item = JSON.stringify({
						VendorName :newValues.fldVendorName,
						Address :newValues.fldAddress,
						PcName:newValues.fldPcName,
						PcNumber:newValues.fldPcNumber,
						PcEmail:newValues.fldPcEmail,
						VendorNumber:newValues.fldVendorNumber,
						VendorEmail:newValues.fldVendorEmail	
					});
					errors.each(function (item, index, length) {
					// Each item in the errors collection is an instance of the Ext.data.Error class.						
						Ext.Msg.alert(item.getMessage());
					});					
					//Error Check
					if(errors.getCount() == 0)
					{
						// TransportApp.AppMainController.toggleLoader('show');
						//this.RegisterUser(RegisterUser_item);						
					}
				
               
               
            },
            onContactHelpCommand: function ()
            {
                Ext.getCmp("MainView").animateActiveItem(Ext.getCmp("ContactHelpView"),this.slideLeftTransition);
            },
             OnVendorMenuCommand: function () {	
               // alert('OnVendorMenuCommand');
                 Ext.getCmp("MainView").animateActiveItem(Ext.getCmp("VendorMainView"),this.slideLeftTransition);
            },            
            OnBackViewCommand:function()
            {
                Ext.getCmp("MainView").animateActiveItem(Ext.getCmp("MenuView"),this.slideRightTransition);
            },
            InitRegister:function()
            {
                   var newUser = Ext.create("TransportApp.model.RegistrationModel", {
                           VendorName: "",
                           Address: "",
                           PcName:"",
                           PcNumber:"",
                           PcEmail:"",
                           VendorNumber:"",
                           VendorEmail:""
                   });
                   this.activateRegisterScreen(newUser);
                   TransportApp.RegController = this;
                   
           },
            
            // Base Class functions.
           launch: function () {
                   this.callParent(arguments);      
                   console.log("launch");
                   this.InitRegister();
                  
           },
           init: function () {
                   this.callParent(arguments);
                   console.log("init");
           },
});


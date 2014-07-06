Ext.define('TransportApp.view.RegistrationView',{
	extend:"Ext.form.Panel",
	xtype:'RegistrationView',
	id:'RegistrationView',
			config:{	
					layout:'vbox',
					//scrollable:null,
					align: 'center',
					items: [						
						{
							xtype: 'titlebar',							
							margin:'0 0 10 0',
                            docked:"top",
							height:54,
							title:'TransportApp',
							 items: [
									{
										id: 'btnBackView',
										itemId: 'btnBackView',								
										align: 'right',
										text: 'Back',
									}
								]
						},
						{
							id:'IdRegistrationForm',
							width:'98%',							
							xtype: 'fieldset',
							instructions: '(All fields are mandatory)',								
							items: 
							[																		
								{
									id:  'fldVendorName',
									name: 'VendorName',
									xtype: 'textfield',
									placeHolder:strVendorName,
									margin:'15 5 5 5',
									required: true
								},									
								{
									id: 'fldAddress',
									name: 'Address',
									xtype: 'textfield',
									placeHolder: strAddress,
									margin:'10 5 0 5',
									required: true
								},
								{
									id: 'fldPcName',
									name: 'fldPcName',
									xtype: 'textfield',
									placeHolder: strPCName,
									margin:'10 5 0 5',
									required: true
								},
								{
									id: 'fldPcNumber',
									name: 'fldPcNumber',
									xtype: 'numberfield',
									placeHolder: strPCNumber,
									margin:'10 5 0 5',
									required: true
								},
								{
									id: 'fldPcEmail',
									name: 'fldPcEmail',
									xtype: 'emailfield',
									placeHolder: strPCEmail,
									cls:'clsTextinput',
									margin:'10 5 0 5',
									required: true,
								},
								{
									id: 'fldVendorNumber',
									name: 'fldVendorNumber',
									xtype: 'numberfield',
									placeHolder: strVendorNumber,
									cls:'clsTextinput',
									margin:'10 5 0 5',
									required: true
								},
								{
									id: 'fldVendorEmail',
									name: 'fldVendorEmail',
									xtype: 'textfield',
									placeHolder: strVendorEmail,
									cls:'clsTextinput',
									margin:'10 5 0 5',
									required: true
								},
							],
						},
						{
						xtype:'panel',
						layout:'hbox',
						margin:'0 0 15 0',
						items:[
							{	xtype: 'button',
								text: strSubmit,
								margin:'15 10 15 10',
								itemId: 'RegisterBtn',
								flex:.4,
								ui: "action"
							},
							{	xtype: 'button',
								text: strCancel,
								margin:'15 10 15 10',
								id: 'btCancelRegistration',
								flex:.4,
								ui: "action"
							}
						]
						
						}
					],
					listeners: [
					/*{
						delegate: "#btnRegister",
						event: "tap",
						fn: "OnRegisterButtonTap"
					},*/
					{
						delegate: "#btCancelRegistration",
						event: "tap",
						fn: "OnCancelButtonTap"
					},
					{	
						dalegate:'#RegistrationView',
						 event: 'activeitemchange',  				
						fn:"OnRegistrationViewactivate"
					 },
					 {
						delegate:'#btnBackView',
						event: 'tap',  				
						fn:"OnBackBtn"
					 },
				]  
				},
			/*OnRegisterButtonTap: function () {
				//	alert('in functiond');
				this.fireEvent("RegisterCommand", this);
			},*/
			OnCancelButtonTap:function(){					
				//this.fireEvent("CancelRegisterCommand", this);
				
			},
			OnBackBtn: function () {				
				this.fireEvent("BackBtnCommand", this);
			},
		
});
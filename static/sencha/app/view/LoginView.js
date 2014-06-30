Ext.define("TransportApp.view.LoginView",{
	extend:"Ext.form.Panel",	
	xtype:"LoginView",
	scrollable: false,	 
	id:'LoginView',	
	config:	{	
					layout:'vbox',
					scrollable: false,
					align: 'center',
					items:[
					{
						xtype:'panel',
						flex:1,
						//style:'background-image: url(assets/images/map_bg.jpg);background-repeat:repeat ; border-top:4px #FB8406 solid',	
								items: [							
								{
									id:'IdLoginForm',							
									xtype: 'panel',
									instructions: '(All fields are mandatory)',
									items: 
									[
										{										
											xtype:'panel',
											style:'background: url(assets/images/logo.png) no-repeat center 0px; height:195px;width:100%',										
											padding:4,
											items:[
												{
													xtype:'label',
													html: '<div style="text-align:center;" class="LogoWelcomeCls">WELCOME TO</div>',
												},
												{
													xtype:'label',
													html: '<div style="text-align:center;" class="LogoPunchLineCls">en smartare parkering</div>',
												}
											]
										},
										{
											id:	  'lblUsername',
											name: 'lblUsername',								
											xtype: 'label',
											margin:'0 0 0 38',
											html:strEmail+':',
										},
										{
											id:	  'fldUsername',
											name: 'fldUsername',
											cls:'clsTextinput',
											xtype: 'emailfield',
											placeHolder:strEmail,	
											margin:'2 30 0 33',												
											required: true
										},
										{
											id: 'lblPassword',
											name: 'lblPassword',									
											xtype: 'label',								
											margin:'15 0 0 38',
											html: strPassword
										},
										{
											id: 'fldPassword',
											name: 'fldPassword',
											cls:'clsTextinput',
											xtype: 'textfield',
											placeHolder: strPassword,
											margin:'2 30 0 33',
											inputType: 'password',
											required: true
										},
										{
											xtype:'panel',									
											layout:'hbox',
											items:[
												{
													itemId: 'btnRemember1',
													xtype:'panel',
													flex:.5,
													margin:'20 0 0 33',
													html:"<div id='btnRemember' class='CheckBoxCheck' style='display:block;margin-top:5px; float:left;' ></div><div class='CheckboxFont1' style='display:block; float:left;margin-left:10px;margin-top:5px;'>"+strRemember+"</div>",
												},
												{
													id:	   'fldForgotPassword',
													itemId:'fldForgotPassword',
													name:  'fldForgotPassword',
													xtype: 'button',
													ui: 'plain',													 
													cls:'ClsLink',
													html:"<div>"+strForgotPassword+'?'+"</div>",
													margin:'25 0 0 5',
													flex:.4,													
													handler: function() {
														if (!this.ForgotPassword) {
															this.ForgotPassword = Ext.Viewport.add({
																id:"idForgotPasswordpopup",
																itemId:"idForgotPasswordpopup",
																name:"idForgotPasswordpopup",
																xtype: 'panel',
																modal: true,
																hideOnMaskTap: true,
																showAnimation: {
																	type: 'popIn',
																	duration: 250,
																	easing: 'ease-out'
																},
																hideAnimation: {
																	type: 'popOut',
																	duration: 250,
																	easing: 'ease-out'
																},
																centered: true,
																width:'90%',
																height:200,
																items: [
																	{
																		
																		xtype: 'toolbar',
																		cls:'ClsTitle',
																		height:54,
																		items:[	
																		{
																			xtype:'label',
																			html: strForgotPassword,
																			flex:.8
																		},
																		{
																			xtype: 'button',
																			ui: 'plain',
																			pressedCls:'pressedButtonIconCls',
																			flex:.2	,
																			html: '<div ><img src="assets/images/close_icon.png" width="23px" height="23px"></img></div>',
																				listeners: [
																				{
																					element: 'element',
																					delegate: 'img',
																					event: 'tap',
																					fn: function() {																					
																						Ext.getCmp('idForgotPasswordpopup').hide();	
																					}
																				},														
																			]							
																		}
																		]
																	},
																	{
																		layout:'vbox',
																		xtype:'panel',
																		items:[
																			{
																				id:'fldcontactNumber',
																				name:'fldcontactNumber',
																				xtype: 'numberfield',
																				cls:'clsTextinput',
																				placeHolder:strContactNumber,	
																				margin:'15 5 0 5',
																				required: true
																			},
																			{
																			xtype: 'button',
																			text: strForgotPwdButton,																		
																			id: 'btnForgotPassword',
																			cls:'ClsSmallButton',
																			ui: "action",
																			margin:'20 10% 0 10%',
																			flex:.4
																		}
																		]
																	}
																],
																scrollable: false
															});
														}
														this.ForgotPassword.show();
													}
												}
											]
										},								
									]								
								},							
								{
									layout:'hbox',
									style:'align:center',
									xtype: 'panel',								
									items:[
										{
											xtype: 'button',
											text: strSignIn,	
											itemId: 'btnLogin',											
											cls:'ClsSmallButton',
											ui: "action",
											margin:'20 5 0 40',
											flex:.4
										},
										{
											xtype: 'button',
											text: strRegister,										
											itemId: 'btnRegister',											
											ui: "action",	
											flex:.4,
											cls:'ClsSmallButton',
											margin:'20 30 0 5',
										
										},
										
									]
								}
							]
						}
					],
					listeners: [
					{
						delegate: "#btnLogin",
						event: "tap",
						fn: "OnLoginButtonTap"
					},
					{
						delegate: "#btnRegister",
						event: "tap",
						fn: "OnRegisterButtonTap"
					},
					{
						delegate: "#btnRemember1",
						event: "tap",
						element: 'element',
						fn: "onRememberMeTap"
					},
					{
						delegate: "#fldForgotPassword",
						event: "tap",					
						fn: "onForgotPasswordTap"
						
					},
					{
						delegate:"#btnSubmitPassword",
						event:"tap",
						fn:"OnForgotPasswordSubmitTap"
					}
				] 
			},
			OnLoginButtonTap: function () {					
				//console.log("OnLoginButtonTap");
				this.fireEvent("LoginCommand", this);
			},
			OnRegisterButtonTap: function () {					
				//console.log("OnRegisterButtonTap");
				this.fireEvent("AddRegisterCommand", this);
			},
			onRememberMeTap:function()
			{
			/*	if(document.getElementById('btnRemember').className == "CheckBoxUnCheck")	
				{
					document.getElementById('btnRemember').className="CheckBoxCheck";						
				}
				else																
				{
					document.getElementById('btnRemember').className="CheckBoxUnCheck";
				}*/
				//console.log('onRememberMeTap');
				this.fireEvent("cmdRememberMe", this);
			},
			onForgotPasswordTap:function()
			{
				console.log('onForgotPasswordTap');
			},
			OnForgotPasswordSubmitTap:function()
			{
				console.log('OnForgotPasswordSubmitTap');
			}
	});
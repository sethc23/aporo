
def currier_reg():
    f_name = 'currier_registration'
    # f_additional_forms = ['device_registration']
    f_url = 'http://54.191.47.76/api_view/users'
    f_method = 'POST'
    # f_input_source = 'form'

    f_input = []

    input_params = ['id','type','name','label','required','value','attr']
    # f_input(id,type,name,label,required,value                                     **attr)
    f_input.append(['id_first_name','text','first_name','First Name:','true','',             str({'maxlength':'30'})])
    f_input.append(['id_last_name','text','last_name','Last Name:','true','',    {}])
    f_input.append(['id_addr1','text','addr1','Address 1:','true','',{}])
    f_input.append(['id_addr2','text','addr2','Address 2:','false','',{}])
    f_input.append(['id_zip','zip','zip','Zipcode:','true','',{}])
    f_input.append(['id_email','email','email','Email:','true','',{}])
    f_input.append(['id_cell','phone','cell','Cell:','true','',{}])
    f_input.append(['id_lang','text','lang','Preferred Language:','true','',{}])
    f_input.append(['id_emergency_contact_name','text','emergency_contact_name','Emergency Contact Name:','true','',{}])
    f_input.append(['id_emergency_contact_number','phone','emergency_contact_number','Emergency Contact Number:','true','',{}])
    f_input.append(['id_app_user_type','hidden','app_user_type','','true','currier',{}])

    input_json = []
    x=len(f_input)
    for i in range(0,x):
        input_json.append({'input'+str(i):dict(zip(['input_'+y for y in input_params],f_input[i]))})
    input_json = str(input_json).replace('[','{').replace(']','}')
    # return f_name,f_url,f_method,f_input_source,input_json,f_additional_forms
    return f_name,f_url,f_method,'',input_json,''

def device_registration():
    f_name = 'device_registration'
    f_additional_forms = ['']
    f_url = 'http://54.191.47.76/api_view/devices'
    f_method = 'POST'
    f_input_source = 'phonegap'
    f_input = []

    input_params = ['model','platform','uuid','op_sys_ver','battery_level',
                    'lat','long','coord_accuracy','heading','speed']
    # f_input(id,type,name,label,required,attr                                     **attr)
    f_input.append(['','','','','',
                    '','','','','',])

    input_json = []
    x=len(f_input)
    for i in range(0,x):
        input_json.append({'input'+str(i):dict(zip(['input_'+y for y in input_params],f_input[i]))})
    input_json = str(input_json).replace('[','{').replace(']','}')
    return f_name,f_url,f_method,f_input_source,input_json,f_additional_forms

def vend_manager_registration():
    f_name = 'vendor_manager_registration'
    # f_additional_forms = ['vendor_mgr_registration']
    f_url = 'http://54.191.47.76/api_view/users'
    f_method = 'POST'
    # f_input_source = 'form'
    f_input = []

    input_params = ['id','type','name','label','required','value','attr']
    # f_input(id,type,name,label,required,value                                     **attr)
    f_input.append(['id_first_name','text','first_name','First Name','true','',{}])
    f_input.append(['id_last_name','text','last_name','Last Name','true','',{}])
    f_input.append(['id_username','text','username','Email:','true','',             str({'maxlength':'30'})])
    f_input.append(['id_email','hidden','username','','true','',{}])
    f_input.append(['id_cell','text','cell','Cell','true','',{}])
    f_input.append(['id_lang','text','lang','Preferred Language','true','',{}])

    f_input.append(['id_password1','password','password1','Password:','true','',    {}])
    f_input.append(['id_password2','password','password2','Password (again):','true','',{}])
    f_input.append(['id_app_user_type','hidden','app_user_type','','true','vendor_manager',{}])

    input_json = []
    x=len(f_input)
    for i in range(0,x):
        input_json.append({'input'+str(i):dict(zip(['input_'+y for y in input_params],f_input[i]))})
    input_json = str(input_json).replace('[','{').replace(']','}')
    # return f_name,f_url,f_method,f_input_source,input_json,f_additional_forms
    return f_name,f_url,f_method,'',input_json,''

def user_registration():
    f_name = 'registration'
    # f_additional_forms = []
    f_url = 'http://54.191.47.76/accounts/registration'
    f_method = 'POST'
    # f_input_source = 'form'
    f_input = []

    input_params = ['id','type','name','label','required','value','attr']
    # f_input(id,type,name,label,required,                                          **attr)
    f_input.append(['id_username','text','username','Email:','true','',             str({'maxlength':'30'})])
    f_input.append(['id_password1','password','password1','Password:','true','',    {}])
    f_input.append(['id_password2','password','password2','Password (again):','true','',{}])

    input_json = []
    x=len(f_input)
    for i in range(0,x):
        input_json.append({'input'+str(i):dict(zip(['input_'+y for y in input_params],f_input[i]))})
    input_json = str(input_json).replace('[','{').replace(']','}')
    # return f_name,f_url,f_method,f_input_source,input_json,f_additional_forms
    return f_name,f_url,f_method,'',input_json,''

def vendor_mgr_registration():
    f_name = 'vendor_mgr_registration'
    f_url = 'http://54.191.47.76/api_view/vendors'
    f_method = 'POST'
    # f_input_source = 'form'

    f_input = []

    input_params = ['id','type','name','label','required','value','attr']
    # f_input(id,type,name,label,required,value                                     **attr)
    f_input.append(['id_name','text','name','Business Name:','true','',    {}])
    f_input.append(['id_addr1','text','addr1','Address 1:','true','',{}])
    f_input.append(['id_addr2','text','addr2','Address 2:','false','',{}])
    f_input.append(['id_zip','zip','zip','Zipcode:','true','',{}])
    f_input.append(['id_email','email','email','Email:','true','',{}])
    f_input.append(['id_phone','phone','phone','Phone 1:','true','',{}])
    f_input.append(['id_other_phone','phone','other_phone','Phone 2:','false','',{}])

    input_json = []
    x=len(f_input)
    for i in range(0,x):
        input_json.append({'input'+str(i):dict(zip(['input_'+y for y in input_params],f_input[i]))})
    input_json = str(input_json).replace('[','{').replace(']','}')
    # return f_name,f_url,f_method,f_input_source,input_json,f_additional_forms
    return f_name,f_url,f_method,'',input_json,''

def vend_empl_registration():
    f_name = 'vendor_associate_registration'
    f_url = 'http://54.191.47.76/api_view/users'
    f_method = 'POST'
    # f_input_source = 'form'

    f_input = []

    input_params = ['id','type','name','label','required','value','attr']
    # f_input(id,type,name,label,required,value                                     **attr)
    f_input.append(['id_vendor_id','option1','vendor_id','http://54.191.47.76/reg_vends?format=json','true','',    {}])
    f_input.append(['id_first_name','text','first_name','First Name:','true','',{}])
    f_input.append(['id_last_name','text','last_name','Last Name:','true','',{}])
    f_input.append(['id_email','email','email','Email:','true','',{}])
    f_input.append(['id_cell','phone','cell','Cell:','true','',{}])
    f_input.append(['id_lang','text','lang','Preferred Language:','true','',{}])
    f_input.append(['id_app_user_type','hidden','app_user_type','','true','vendor_associate',{}])

    input_json = []
    x=len(f_input)
    for i in range(0,x):
        input_json.append({'input'+str(i):dict(zip(['input_'+y for y in input_params],f_input[i]))})
    input_json = str(input_json).replace('[','{').replace(']','}')
    # return f_name,f_url,f_method,f_input_source,input_json,f_additional_forms
    return f_name,f_url,f_method,'',input_json,''

def forgot_password():
    f_name = 'forgot_password'
    f_url = 'http://54.191.47.76/api_view/users'
    f_method = 'POST'
    # f_input_source = 'form'

    f_input = []

    input_params = ['id','type','name','label','required','value','attr']
    # f_input(id,type,name,label,required,value                                     **attr)
    f_input.append(['id_cell_email','text','cell_email','Cell or Email:','true','',{}])

    input_json = []
    x=len(f_input)
    for i in range(0,x):
        input_json.append({'input'+str(i):dict(zip(['input_'+y for y in input_params],f_input[i]))})
    input_json = str(input_json).replace('[','{').replace(']','}')
    # return f_name,f_url,f_method,f_input_source,input_json,f_additional_forms
    return f_name,f_url,f_method,'',input_json,''




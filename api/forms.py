
from app.models import Form as F

def currier_reg():
    f_name = 'currier_registration'
    f_additional_forms = ['device_registration']
    f_url = 'http://54.191.47.76/api_view/users'
    f_method = 'POST'
    f_input_source = 'form'
    f_input_types =     [   'text',# 2
                            'text',# 3
                            'text',# 4
                            'text',# 5
                            'zip',# 6
                            'email',# 7
                            'phone',# 8
                            'text',# 9
                            'text',# 10
                            'phone',# 11
                        ]
    f_input_ids =       [   'first_name',# 2
                            'last_name',# 3
                            'addr1',# 4
                            'addr2',# 5
                            'zip',# 6
                            'email',# 7
                            'cell',# 8
                            'lang',# 9
                            'emergency_contact_name',# 10
                            'emergency_contact_number',# 11
                        ]
    f_input_reqd =      [   'true',# 2
                            'true',# 3
                            'true',# 4
                            'false',# 5
                            'true',# 6
                            'true',# 7
                            'true',# 8
                            'true',# 9
                            'true',# 10
                            'true',# 11
                        ]
    f_input_labels =    [   'First Name',# 2
                            'Last Name',# 3
                            'Address 1',# 4
                            'Address 2',# 5
                            'Zipcode',# 6
                            'Email',# 7
                            'Cell',# 8
                            'Preferred Language',# 9
                            'Emergency Contact Name',# 10
                            'Emergency Contact Number',# 11
                        ]

    f_inputs = []
    x=len(f_input_types)
    for i in range(0,x):
        f_inputs.append({  'input_type'     :   f_input_types[i],
                            'input_id'       :   f_input_ids[i],
                            'input_label'    :   f_input_labels[i],
                            'input_value'    :   '',
                            'input_required':   f_input_reqd[i]
                        })

    f_inputs.append({       'input_type'    :   'hidden',
                            'input_id'      :   'app_user_type',
                            'input_label'   :   '',
                            'input_value'   :   'currier',
                            'input_required':   'true'
                        })

    c = F(name=f_name,
          url=f_url,
          method=f_method,
          input_source=f_input_source,
          form_inputs=str(f_inputs),
          additional_forms=f_additional_forms
          )

    c.save()

def device_registration():
    f_name = 'device_registration'
    f_url = 'http://54.191.47.76/api_view/devices'
    f_method = 'POST'
    f_input_source = 'phonegap'
    f_input_ids =   [   'model',
                        'platform',
                        'uuid',
                        'op_sys_ver',
                        'battery_level',
                        'lat',
                        'long',
                        'coord_accuracy',
                        'heading',
                        'speed'
                        ]
    f_inputs = []
    x=len(f_input_ids)
    for i in range(0,x):
        f_inputs.append({  'input_type'     :   'hidden',
                            'input_id'      :   f_input_ids[i],
                            'input_label'   :   '',
                            'input_value'   :   '',
                            'input_required':   'true'
                        })

    c = F(name=f_name,
          url=f_url,
          method=f_method,
          input_source=f_input_source,
          form_inputs=str(f_inputs)
          )

    c.save()

def vend_manager_registration():
    f_name = 'vendor_manager_registration'
    f_additional_forms = ['vendor_registration']
    f_url = 'http://54.191.47.76/api_view/users'
    f_method = 'POST'
    f_input_source = 'form'
    f_input_types =     [   'text',# 2
                            'text',# 3
                            'email',# 7
                            'phone',# 8
                            'text',# 10
                        ]
    f_input_ids =       [   'first_name',# 2
                            'last_name',# 3
                            'email',# 7
                            'cell',# 8
                            'lang',# 10
                        ]
    f_input_labels =    [   'First Name',# 2
                            'Last Name',# 3
                            'Email',# 7
                            'Cell',# 8
                            'Preferred Language',# 10
                        ]
    f_inputs = []
    x=len(f_input_types)
    for i in range(0,x):
        f_inputs.append({  'input_type'     :   f_input_types[i],
                            'input_id'       :   f_input_ids[i],
                            'input_label'    :   f_input_labels[i],
                            'input_value'    :   '',
                            'input_required':   'true'
                        })

    f_inputs.append({       'input_type'    :   'hidden',
                            'input_id'      :   'app_user_type',
                            'input_label'   :   '',
                            'input_value'   :   'vendor_manager',
                            'input_required':   'true'
                        })

    c = F(name=f_name,
          url=f_url,
          method=f_method,
          input_source=f_input_source,
          form_inputs=str(f_inputs),
          additional_forms=f_additional_forms
          )

    c.save()

def vendor_registration():
    f_name = 'vendor_registration'
    f_url = 'http://54.191.47.76/api_view/vendors'
    f_method = 'POST'
    f_input_source = 'form'
    f_input_types =     [   'text',# 2
                            'text',# 4
                            'text',# 5
                            'zip',# 6
                            'email',# 7
                            'phone',# 8
                            'phone',# 9
                        ]
    f_input_ids =       [   'name',# 2
                            'addr1',# 4
                            'addr2',# 5
                            'zip',# 6
                            'email',# 7
                            'phone',# 8
                            'other_phone',# 9
                        ]
    f_input_reqd =      [   'true',# 2
                            'true',# 4
                            'false',# 5
                            'true',# 6
                            'true',# 7
                            'true',# 8
                            'false',# 9
                        ]
    f_input_labels =    [   'Vendor Name',# 2
                            'Address 1',# 4
                            'Address 2',# 5
                            'Zipcode',# 6
                            'Email',# 7
                            'Phone 1',# 8
                            'Phone 2',# 9
                        ]
    f_inputs = []
    x=len(f_input_types)
    for i in range(0,x):
        f_inputs.append({  'input_type'     :   f_input_types[i],
                            'input_id'       :   f_input_ids[i],
                            'input_label'    :   f_input_labels[i],
                            'input_value'    :   '',
                            'input_required':   f_input_reqd[i]
                        })

    c = F(name=f_name,
          url=f_url,
          method=f_method,
          input_source=f_input_source,
          form_inputs=str(f_inputs)
          )

    c.save()

def vend_associate_registration():
    f_name = 'vendor_associate_registration'
    f_url = 'http://54.191.47.76/api_view/users'
    f_method = 'POST'
    f_input_source = 'form'

    f_input_types =     [   'option1',
                            'text',# 2
                            'text',# 3
                            'email',# 7
                            'phone',# 8
                            'text'# 10
                        ]
    f_input_ids =       [   'vendor_id',
                            'first_name',# 2
                            'last_name',# 3
                            'email',# 7
                            'cell',# 8
                            'lang'# 10
                        ]
    f_input_labels =    [   "http://54.191.47.76/reg_vends?format=json",
                            'First Name',# 2
                            'Last Name',# 3
                            'Email',# 7
                            'Cell',# 8
                            'Preferred Language'# 10
                        ]
    f_inputs = []
    x=len(f_input_types)
    for i in range(0,x):
        f_inputs.append({  'input_type'     :   f_input_types[i],
                            'input_id'       :   f_input_ids[i],
                            'input_label'    :   f_input_labels[i],
                            'input_value'    :   '',
                            'input_required' :  'true'})

    f_inputs.append({       'input_type'    :   'hidden',
                            'input_id'      :   'app_user_type',
                            'input_label'   :   '',
                            'input_value'   :   'vendor_associate',
                            'input_required' :  'true'})

    c = F(name=f_name,
          url=f_url,
          method=f_method,
          input_source=f_input_source,
          form_inputs=str(f_inputs)
          )
    c.save()

def forgot_password():
    f_name = 'forgot_password'
    f_url = 'http://54.191.47.76/api_view/users'
    f_method = 'POST'
    f_input_source = 'form'
    f_inputs = []
    f_inputs.append({       'input_type'     :   'phone',
                            'input_id'       :   'phone',
                            'input_label'    :   'Phone',
                            'input_value'    :   ''})

    f_inputs.append({       'input_type'     :   'email',
                            'input_id'       :   'email',
                            'input_label'    :   'Email',
                            'input_value'    :   ''})

    c = F(name=f_name,
          url=f_url,
          method=f_method,
          input_source=f_input_source,
          form_inputs = str(f_inputs)
          )
    c.save()

def load_form_data():
    currier_reg()
    device_registration()
    vend_manager_registration()
    vendor_registration()
    vend_associate_registration()
    forgot_password()

def load_sample_data():
    from app.models import App_User,Vendor,Currier,Device,Order

    # a. Make User One
    # b. Make Vendor Mgr One
    # c. Make Currier One
    # d. Make Order One
    # e. Make Device One

    c = App_User(first_name='ONEfirstName',
          last_name='ONElastName',
          app_user_type='vendor_manager'
          )
    c.save()
    ONE_app_user_id = c.app_user_id

    c = Vendor(app_user_id=ONE_app_user_id,
                name='ONE',
                addr1='ONE_pickup_addr'
          )
    c.save()
    ONE_vendor_id = c.vendor_id
    ONE_pickup_addr = c.addr1

    c = Currier(app_user_id=ONE_app_user_id,
                speed_rating='1.0',
                worktime_rating='10.0'
          )
    c.save()
    ONE_dg_id = c.dg_id

    c = Order(  vendor_id=ONE_vendor_id,
                dg_id=ONE_dg_id,
                web=True,
                pickup_time='10:00',
                pickup_addr=ONE_pickup_addr,
                deliv_addr='ONE_deliv_addr'
          )
    c.save()

    c = Device(  dg_id=ONE_dg_id,
                model='Android',
                op_sys_ver='Ice Cream'
            )
    c.save()

    # a. Make User Two
    # b. Make Vendor Assoc Two
    # c. Make Currier Two
    # d. Make Order Two
    # e. Make Device Two

    c = App_User(first_name='TWOfirstName',
          last_name='TWOlastName',
          app_user_type='vendor_assoc'
          )
    c.save()
    TWO_app_user_id = c.app_user_id

    c = Vendor(app_user_id=TWO_app_user_id,
                name='TWO',
                addr1='TWO_pickup_addr'
          )
    c.save()
    TWO_vendor_id = c.vendor_id
    TWO_pickup_addr = c.addr1

    c = Currier(app_user_id=TWO_app_user_id,
                speed_rating='2.0',
                worktime_rating='20.0'
          )
    c.save()
    TWO_dg_id = c.dg_id

    c = Order(  vendor_id=TWO_vendor_id,
                dg_id=TWO_dg_id,
                call_in=True,
                pickup_time='20:00',
                pickup_addr=TWO_pickup_addr,
                deliv_addr='TWO_deliv_addr'
          )
    c.save()

    c = Device(  dg_id=TWO_dg_id,
                model='Apple',
                op_sys_ver='OS 7'
            )
    c.save()

def load_all_data():
    load_sample_data()
    load_form_data()
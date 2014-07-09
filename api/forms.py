
from app.models import Form as F

def currier_reg():
    f_name = 'currier_registration'
    f_additional_forms = ['device_registration']
    f_url = 'http://54.191.47.76/api_view/users'
    f_method = 'POST'
    f_input_source = 'form'
    f_input_types =     [   'password',  # 1
                            'text',# 2
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
    f_input_ids =       [   'user_pass',# 1
                            'first_name',# 2
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
    f_input_labels =    [   'Password',# 1
                            'First Name',# 2
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
    c = F(name=f_name,
          additional_forms=f_additional_forms,
          url=f_url,
          method=f_method,
          input_source=f_input_source,
          input_types=f_input_types,
          input_ids=f_input_ids,
          input_labels=f_input_labels,
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
    c = F(name=f_name,
          url=f_url,
          method=f_method,
          input_source=f_input_source,
          input_ids=f_input_ids,
          )
    c.save()

def vend_manager_registration():
    f_name = 'vendor_manager_registration'
    f_additional_forms = ['vendor_registration']
    f_url = 'http://54.191.47.76/api_view/users'
    f_method = 'POST'
    f_input_source = 'form'
    f_input_types =     [   'password',# 1
                            'text',# 2
                            'text',# 3
                            'email',# 7
                            'phone',# 8
                            'text',# 10
                        ]
    f_input_ids =       [   'user_pass',# 1
                            'first_name',# 2
                            'last_name',# 3
                            'email',# 7
                            'cell',# 8
                            'lang',# 10
                        ]
    f_input_labels =    [   'Password',# 1
                            'First Name',# 2
                            'Last Name',# 3
                            'Email',# 7
                            'Cell',# 8
                            'Preferred Language',# 10
                        ]

    c = F(name=f_name,
          additional_forms=f_additional_forms,
          url=f_url,
          method=f_method,
          input_source=f_input_source,
          input_types=f_input_types,
          input_ids=f_input_ids,
          input_labels=f_input_labels,
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
    f_input_ids =       [   'vend_name',# 2
                            'addr1',# 4
                            'addr2',# 5
                            'zip',# 6
                            'email',# 7
                            'phone',# 8
                            'other_phone',# 9
                        ]
    f_input_labels =    [   'Vendor Name',# 2
                            'Address 1',# 4
                            'Address 2',# 5
                            'Zipcode',# 6
                            'Email',# 7
                            'Phone 1',# 8
                            'Phone 2',# 9
                        ]

    c = F(name=f_name,
          url=f_url,
          method=f_method,
          input_source=f_input_source,
          input_types=f_input_types,
          input_ids=f_input_ids,
          input_labels=f_input_labels,
          )
    c.save()

def vend_associate_registration():
    f_name = 'vendor_associate_registration'
    f_url = 'http://54.191.47.76/api_view/users'
    f_method = 'POST'
    f_input_source = 'form'
    f_input_types =     [   'option1',
                            'password',# 1
                            'text',# 2
                            'text',# 3
                            'email',# 7
                            'phone',# 8
                            'text',# 10
                        ]
    f_input_ids =       [   'vend_id',
                            'user_pass',# 1
                            'first_name',# 2
                            'last_name',# 3
                            'email',# 7
                            'cell',# 8
                            'lang',# 10
                        ]
    f_input_labels =    [   '',
                            'Password',# 1
                            'First Name',# 2
                            'Last Name',# 3
                            'Email',# 7
                            'Cell',# 8
                            'Preferred Language',# 10
                        ]

    f_input_options = [ "{ 'options1': 'http://54.191.47.76/reg_vends' }"]

    c = F(name=f_name,
          url=f_url,
          method=f_method,
          input_source=f_input_source,
          input_types=f_input_types,
          input_ids=f_input_ids,
          input_labels=f_input_labels,
          input_options=f_input_options,
          )
    c.save()


def load_sample_vendor_data():
    from app.models import Vendor as V

    c = V(name='Test1',
          users_self_reg=False)
    c.save()
    c = V(name='Test2',
          users_self_reg=True)
    c.save()
def load_sample_order_data():
    from app.models import Order as O
    c = O(pickup_time='9:00',
          pickup_addr='1 Address',
          deliv_addr='deliv 1 Address')
    c.save()
    c = O(pickup_time='9:50',
          pickup_addr='2 Address',
          deliv_addr='deliv 2 Address')
    c.save()
def load_sample_currier_data():
    from app.models import Currier as cur
    c = cur(first_name='ONEfirstName',
          last_name='ONElastName')
    c.save()
    c = cur(first_name='TWOfirstName',
          last_name='TWOlastName')
    c.save()
def load_form_data():
    currier_reg()
    device_registration()
    vend_manager_registration()
    vendor_registration()
    vend_associate_registration()

def load_all_data():
    load_sample_vendor_data()
    load_sample_order_data()
    load_sample_currier_data()
    load_form_data()
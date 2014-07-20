from django.shortcuts import render
from forms import save_form
from forms import currier_reg,user_registration,vend_manager_registration
from forms import vendor_mgr_registration,vend_empl_registration,forgot_password

def form_data(request):
    save_form(*currier_reg())
    save_form(*user_registration())
    # save_form(*device_registration())
    save_form(*vend_manager_registration())
    save_form(*vendor_mgr_registration())
    save_form(*vend_empl_registration())
    save_form(*forgot_password())
    return render(request, 'management/success.html', {})
def sample_data(request):
    from app.models import App_User,Vendor,Currier,Device,Order,Location

    # a. Make User Alpha
    # b. Make Vendor Mgr Alpha
    # c. Make User Bravo
    # c. Make Currier Bravo
    # d. Make Order Charlie
    # e. Make Device Delta

    a = App_User(first_name='ALPHA',
          last_name='ALPHA',
          app_user_type='vendor_mgr'
          )
    a.save()
    ONE_app_user_id = a.app_user_id

    c = Vendor(app_user_id=ONE_app_user_id,
                name='ALPHA BIZ',
                addr1='ONE_pickup_addr',
                days='Tue-Thu,Sat-Sun',
                start_times='11:00 AM, 1:00 AM',
                end_times='11:00 PM, 8:00 PM',
                area='Murray Hill',
                holidays=str({"Labor Day" : "closed"}),
                )
    c.save()
    ONE_vendor_id = c.vendor_id
    ONE_pickup_addr = c.addr1

    a.vendor_id = c.vendor_id
    a.save()

    a = App_User(first_name='BRAVO',
          last_name='BRAVO',
          app_user_type='dg'
          )
    a.save()

    THIS_app_user_id = a.app_user_id

    c = Currier(app_user_id=THIS_app_user_id,
                speed_rating='1.0',
                worktime_rating='10.0'
          )
    c.save()
    ONE_dg_id = c.currier_id

    a.currier_id = c.currier_id
    a.save()

    c = Order(  vendor_id=ONE_vendor_id,
                currier_id=ONE_dg_id,
                web=True,
                deliv_addr='ONE_deliv_addr',
          )
    c.save()
    ONE_order_id = c.order_id
    l = Location(order_id=ONE_order_id,
                loc_num=1,
                pickup=True,
                addr=c.vendor.addr1,
          )
    l.save()
    c = Location(order_id=ONE_order_id,
                 loc_num=2,
                 delivery=True,
                 addr=c.deliv_addr,
          )
    c.save()

    c = Order(  vendor_id=ONE_vendor_id,
                currier_id=ONE_dg_id,
                call_in=True,
                req_pickup_time='11:00',
                deliv_addr='TWO_deliv_addr'
          )
    c.save()
    TWO_order_id = c.order_id
    l = Location(order_id=TWO_order_id,
                loc_num=3,
                pickup=True,
                addr=c.vendor.addr1,
          )
    l.save()
    c = Location(order_id=TWO_order_id,
                 loc_num=4,
                 delivery=True,
                 addr=c.deliv_addr,
          )
    c.save()

    c = Device( model='Android',
                op_sys_ver='Ice Cream'
            )
    c.save()



    # a. Make User Delta
    # b. Make Vendor Empl Delta
    # c. Make Currier Two
    # d. Make Order Two
    # e. Make Device Two

    a = App_User(first_name='Delta',
          last_name='Delta',
          app_user_type='vendor_empl'
          )
    a.save()
    TWO_app_user_id = a.app_user_id

    c = Vendor( app_user_id=TWO_app_user_id,
                name='Delta Biz',
                addr1='TWO_pickup_addr',
                days='Tue-Thu,Sat-Sun',
                start_times='11:00 AM, 1:00 AM',
                end_times='11:00 PM, 8:00 PM',
                area='Murray Hill',
                holidays=str({"Labor Day" : "closed"}),
                )
    c.save()

    a.vendor_id = c.vendor_id
    a.save()


    return render(request, 'management/success.html', {})
def all_data(request):
    sample_data(request)
    form_data(request)
    return render(request, 'management/success.html', {})


#form_data()
#sample_data()


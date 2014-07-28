from datetime import timedelta
from datetime import datetime as DT

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

    # . Make User ALPHA
    # . Make Vendor 1 ("vendor_mgr")
    # . Device ALPHA
    # . Make User BRAVO
    # . Make Currier 1
    # . Device BRAVO
    # . Make Order 1
    # . - add locations


    # MAKE VENDOR 1
    a = App_User(first_name='ALPHA',
          last_name='ALPHA',
          app_user_type='vendor_mgr'
          )
    a.save()
    ONE_vendor_app_user_id = a.app_user_id
    c = Vendor(app_user_id=ONE_vendor_app_user_id,
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
    d = Device( vendor_id=ONE_vendor_id,
                model='iphone',
               platform='os7')
    d.save()
    ONE_vendor_device_id = d.device_id
    # add device to vendor entry
    c.device.add(d.device_id)
    c.save()
    # add device to app_user entry
    a.device.add(d.device_id)
    a.vendor_id = c.vendor_id
    a.save()

    # MAKE CURRIER 1
    a = App_User(first_name='BRAVO',
          last_name='BRAVO',
          app_user_type='currier'
          )
    a.save()
    ONE_dg_app_user_id = a.app_user_id
    c = Currier(app_user_id=ONE_dg_app_user_id,
                speed_rating='1.0',
                worktime_rating='10.0'
          )
    c.save()
    ONE_dg_id = c.currier_id
    d = Device( currier_id=ONE_dg_id,
                model='Samsung Galaxy',
               platform='Ice Cream')
    d.save()
    ONE_dg_device_id = d.device_id
    # add device to currier entry
    c.device.add(d.device_id)
    c.save()
    # add device to app_user entry
    a.device.add(d.device_id)
    a.currier_id = c.currier_id
    a.save()

    # MAKE ORDER 1
    c = Order(  vendor_id=ONE_vendor_id,
                vendor_dev_id=ONE_vendor_device_id,
                currier_id=ONE_dg_id,
                currier_dev_id=ONE_dg_device_id,
                web=True,
                deliv_addr='ONE_deliv_addr',
          )
    c.save()
    ONE_order_id = c.order_id
    # add locations for order
    l = Location(order_id=ONE_order_id,
                loc_num=1,
                currier_id=ONE_dg_id,
                web=True,
                call_in=False,
                pickup=True,
                addr=c.vendor.addr1,
          )
    l.save()
    c = Location(order_id=ONE_order_id,
                 loc_num=2,
                 currier_id=ONE_dg_id,
                 web=True,
                 call_in=False,
                 delivery=True,
                 addr=c.deliv_addr,
          )
    c.save()

    # . Make User CHARLIE
    # . Make Vendor 2 ("vendor_empl")
    # . Device CHARLIE
    # . Make User DELTA
    # . Make Currier 2
    # . Device DELTA
    # . Make Order Two

    # MAKE VENDOR 2
    a = App_User(first_name='CHARLIE',
          last_name='CHARLIE',
          app_user_type='vendor_empl'
          )
    a.save()
    TWO_vendor_app_user_id = a.app_user_id
    c = Vendor( app_user_id=TWO_vendor_app_user_id,
                name='Charlie Biz',
                addr1='TWO_pickup_addr',
                days='Tue-Thu,Sat-Sun',
                start_times='11:00 AM, 1:00 AM',
                end_times='11:00 PM, 8:00 PM',
                area='Murray Hill',
                holidays=str({"Labor Day" : "closed"}),
                )
    c.save()
    TWO_vendor_id = c.vendor_id
    d = Device( vendor_id=TWO_vendor_id,
                model='Blackberry',
                platform='something old')
    d.save()
    TWO_vendor_device_id = d.device_id
    # add device to vendor entry
    c.device.add(d.device_id)
    c.save()
    # add device to app_user entry
    a.device.add(d.device_id)
    a.vendor_id = c.vendor_id
    a.save()

    # MAKE CURRIER 2
    a = App_User(first_name='DELTA',
          last_name='DELTA',
          app_user_type='currier'
          )
    a.save()
    TWO_dg_app_user_id = a.app_user_id
    c = Currier(app_user_id=TWO_dg_app_user_id,
                speed_rating='1.0',
                worktime_rating='10.0'
          )
    c.save()
    TWO_dg_id = c.currier_id
    d = Device( currier_id=TWO_dg_id,
                model='Samsung Galaxy',
               platform='Ice Cream')
    d.save()
    TWO_dg_device_id = d.device_id
    # add device to currier entry
    c.device.add(d.device_id)
    c.save()
    # add device to app_user entry
    a.device.add(d.device_id)
    a.currier_id = c.currier_id
    a.save()

    # MAKE ORDER 2
    time_in_90 = DT.now() + timedelta(hours=1,minutes=30)
    c = Order(  vendor_id=TWO_vendor_id,
                vendor_dev_id=TWO_vendor_device_id,
                currier_id=TWO_dg_id,
                currier_dev_id=TWO_dg_device_id,
                call_in=True,
                req_pickup_time=time_in_90.isoformat(),
                deliv_addr='TWO_deliv_addr'
          )
    c.save()
    TWO_order_id = c.order_id
    # add locations
    l = Location(order_id=TWO_order_id,
                 currier_id=TWO_dg_id,
                 web=False,
                 call_in=True,
                loc_num=3,
                pickup=True,
                addr=c.vendor.addr1,
          )
    l.save()
    c = Location(order_id=TWO_order_id,
                 loc_num=4,
                 currier_id=TWO_dg_id,
                 web=False,
                 call_in=True,
                 delivery=True,
                 addr=c.deliv_addr,
          )
    c.save()

    return render(request, 'management/success.html', {})
def all_data(request):
    sample_data(request)
    form_data(request)
    return render(request, 'management/success.html', {})


#form_data()
#sample_data()


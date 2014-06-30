# from django.contrib.auth.models import User
# from tastypie.authorization import Authorization
# from tastypie import fields
from tastypie.resources import ModelResource#, ALL, ALL_WITH_RELATIONS
from app.models import Vendor,Order,Currier

class VendorResource(ModelResource):

    class Meta:
        # class Meta:
        queryset = Vendor.objects.all()
        resource_name = 'vendor'
        # excludes = ['email', 'password', 'etc...']

        # fields = ['vend_id','language','name','addr1','addr2','zipcode',
        #           'primary_first_name','primary_last_name','primary_cell','primary_email',
        #           'secondary_first_name','secondary_last_name','secondary_cell','secondary_email',
        #           'bus_email','bus_phone','registration_date_time','rating']

        # allowed_methods = ['get']

class OrderResource(ModelResource):

    class Meta:
        # class Meta:
        queryset = Order.objects.all()
        resource_name = 'order'

        # fields = ['order_id','pickup_time','pickup_date','pickup_addr',
        #           'check_time','deliv_time','deliv_date','deliv_addr']

class CurrierResource(ModelResource):

    class Meta:
        # class Meta:
        queryset =  Currier.objects.all()
        resource_name = 'currier'

        # fields = ['dg_id','language','first_name','last_name','addr1','addr2','zipcode','cell',
        #               'email','emergency_contact_name','emergency_contact_number','payment_method',
        #               'registration_date_time','rating']

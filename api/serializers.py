# from django.contrib.auth.models import User, Group
from rest_framework import serializers
from app.models import Vendor,Order,Currier


class VendorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Vendor
        fields = ['vend_id','language','name','addr1','addr2','zipcode',
                  'primary_first_name','primary_last_name','primary_cell','primary_email',
                  'secondary_first_name','secondary_last_name','secondary_cell','secondary_email',
                  'bus_email','bus_phone','registration_date_time','rating']


class OrderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Order
        fields = ['order_id','pickup_time','pickup_date','pickup_addr',
                  'check_time','deliv_time','deliv_date','deliv_addr']

class CurrierSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Currier
        fields = ['dg_id','language','first_name','last_name','addr1',
                  'addr2','zipcode','cell','email','emergency_contact_name',
                  'emergency_contact_number','payment_method',
                  'registration_date_time','rating']
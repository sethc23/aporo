# from django.contrib.auth.models import User, Group
from rest_framework import serializers
from app.models import App_User,Vendor,Order,Currier,Form,Device


class App_UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = App_User
class VendorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Vendor
        # fields = ['vend_id','name','addr1','addr2','zip','email','phone','other_phone',
        #           'primary_user_id','reg_date_time','ready_rating','users_self_reg','area']
class OrderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Order
        # fields = ['order_id','pickup_time','pickup_date','pickup_addr',
        #           'check_time','deliv_time','deliv_date','deliv_addr']
class CurrierSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Currier
        # fields = ['dg_id','lang','first_name','last_name','addr1',
        #           'addr2','zip','cell','email','emergency_contact_name',
        #           'emergency_contact_number','payment_method',
        #           'registration_date_time','rating']
class FormSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Form
        #fields = '__all__'
        # fields = ['name']
class DeviceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Device
        #fields = '__all__'
        # fields = ['name']



class FilteredVendorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Vendor
        fields = ['vend_id','name','phone']
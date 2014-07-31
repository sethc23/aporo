# from django.contrib.auth.models import User, Group
from rest_framework import serializers
from app.models import App_User,Vendor,Order,Currier,Form,Device
from app.models import Contract,Schedule,Location

class App_UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = App_User
class VendorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Vendor
class OrderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Order
class CurrierSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Currier
class FormSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Form
class DeviceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Device
class ContractSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Contract
class ScheduleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Schedule
class LocationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Location

# TODO: what serialized objects would perform better if restore_object was defined.  See http://www.django-rest-framework.org/api-guide/serializers#declaring-serializers

class FilteredCurrierSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Currier
        fields = ['currier_id']
class FilteredVendorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Vendor
        fields = ['vendor_id','name','phone']
class FilteredContractSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Contract
        fields = ['contract_id','start_datetime','start_day',
                  'start_time','hour_period','area','curriers']
    curriers = FilteredCurrierSerializer(many=True)
    # def transform_curriers(self, c_obj, c_value):
    #     a = FilteredCurrierSerializer(many=True)
    #     b = a.transform_dg_id(obj=c_obj, value=c_value)
    #     # (k_serializer,dg_id)
    #     return b
class FilteredScheduleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Schedule
        fields = ['start_datetime','start_day','start_time','hour_period','area',
                  'check_in_datetime','check_out_datetime',
                  'total_breaktime','total_deliveries']
class FilteredLocationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Location
        fields = ['loc_num','location_id','tag','web','web_url','call_in','pickup','delivery'
                  'req_datetime','addr','cross_street','end_datetime','price','tip','comments']
        # exclude = ['batt_level','currier','dev_updated','lat','long','order']
class FilteredDeviceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Device
        fields = ['update_frequency','is_active']
        # exclude = ['batt_level','currier','dev_updated','lat','long','order']
class FilteredOrderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Order
        fields = ['order_id','tag','web','call_in',
                  'contact_num','deliv_addr','apt_num','deliv_cross_street',
                  'req_pickup_time','price','tip','comment','end_datetime']
        exclude = ['created','vendor','vendor_dev','currier','currier_dev',
                   'web_url','deliv_lat','deliv_long']

class CurrierScheduleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Currier
        fields = ['dg_schedule']

    dg_schedule = FilteredScheduleSerializer(many=True)


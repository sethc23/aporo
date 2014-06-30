# from django import forms
from django.forms import ModelForm
from models import Vendor,Order,Currier

# class ContactForm(forms.Form):
#     subject = forms.CharField(max_length=100)
#     message = forms.CharField()
#     sender = forms.EmailField()
#     cc_myself = forms.BooleanField(required=False)

class VendorSerializer(ModelForm):
    class Meta:
        model = Vendor
        # fields = ['vend_id','language','name','addr1','addr2','zipcode',
        #           'primary_first_name','primary_last_name','primary_cell','primary_email',
        #           'secondary_first_name','secondary_last_name','secondar_cell','secondary_email',
        #           'bus_email','bus_phone','registration_date_time','rating']
        fields = '__all__'

class OrderSerializer(ModelForm):
    class Meta:
        model = Order
        fields = '__all__'
        # fields = ['order_id','pickup_time','pickup_date','pickup_addr',
        #           'check_time','deliv_time','deliv_date','deliv_addr']

class CurrierSerializer(ModelForm):
    class Meta:
        model = Currier
        fields = '__all__'
        # fields = ['dg_id','language','first_name','last_name','addr1',
        #           'addr2','zipcode','cell','email','emergency_contact_name',
        #           'emergency_contact_number','payment_method',
        #           'registration_date_time','rating']

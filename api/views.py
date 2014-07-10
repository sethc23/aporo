# from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import filters
from serializers import App_UserSerializer,VendorSerializer,OrderSerializer,CurrierSerializer
from serializers import FormSerializer,DeviceSerializer,FilteredVendorSerializer
from app.models import App_User,Vendor,Order,Currier,Form,Device

from django.shortcuts import render
# from django.views.decorators.csrf import csrf_exempt
#@csrf_exempt
def index(request):
    return render(request, 'api/index.html', {})

class App_UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = App_User.objects.all()
    serializer_class = App_UserSerializer
class VendorViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer
class OrderViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
class CurrierViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Currier.objects.all()
    serializer_class = CurrierSerializer
class FormViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Form.objects.all()
    serializer_class = FormSerializer
class DeviceViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer

from rest_framework import generics

class FilteredVendorViewSet(generics.ListAPIView):
    serializer_class = FilteredVendorSerializer

    def get_queryset(self):
        queryset = Vendor.objects.filter(users_self_reg=True)
        return queryset
class FilteredFormViewSet(generics.ListAPIView):
    serializer = FormSerializer
    # filter_fields = ('vend_id','name','phone')
    # queryset = Form.objects.all()
    # serializer_class = FormSerializer
    # filter_class = FormFilter

    def get_queryset(self):
        f_name = self.request.QUERY_PARAMS.get('name', None)
        queryset = Form.objects.filter(name=f_name)

        # queryset = Form.objects.filter(name=self.request.kwargs['name'])
        return queryset


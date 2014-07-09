# from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import filters
from serializers import VendorSerializer,OrderSerializer,CurrierSerializer,FormSerializer
from app.models import Vendor,Order,Currier,Form

# from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
#@csrf_exempt
def index(request):
    return render(request, 'api/index.html', {})

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


from rest_framework import generics

class FilteredVendorViewSet(generics.ListAPIView):
    serializer_class = VendorSerializer

    def get_queryset(self):
        queryset = Vendor.objects.filter(users_self_reg=True)
        return queryset
class FilteredFormViewSet(generics.ListAPIView):
    serializer = FormSerializer
    def get_queryset(self):
        f_name = self.request.QUERY_PARAMS.get('name', None)
        queryset = Form.objects.filter(name=f_name)
        # queryset = Form.objects.filter(name=self.request.kwargs['name'])
        return queryset
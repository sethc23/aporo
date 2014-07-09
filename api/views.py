# from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from serializers import VendorSerializer, OrderSerializer, CurrierSerializer

from app.models import Vendor,Order,Currier

from django.views.decorators.csrf import csrf_exempt


from django.shortcuts import render

#@csrf_exempt
def index(request):
    return render(request, 'api/index.html', {})

#@csrf_exempt
class VendorViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer

#@csrf_exempt
class OrderViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

#@csrf_exempt
class CurrierViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Currier.objects.all()
    serializer_class = CurrierSerializer

from django.http import HttpResponse

def registration(request,user_type):
    latest_poll_list = eval(user_type+"objects.order_by('-pub_date')[:5]")
    output = ', '.join([p.question for p in latest_poll_list])
    return HttpResponse(output)
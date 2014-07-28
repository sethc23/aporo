# from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import filters
from serializers import App_UserSerializer,VendorSerializer,OrderSerializer,CurrierSerializer
from serializers import FormSerializer,DeviceSerializer,FilteredDeviceSerializer
from serializers import FilteredVendorSerializer, FilteredContractSerializer, FilteredScheduleSerializer
from serializers import ContractSerializer,ScheduleSerializer,CurrierScheduleSerializer
from serializers import LocationSerializer,FilteredLocationSerializer
from app.models import App_User,Vendor,Order,Currier,Form,Device
from app.models import Contract,Schedule,Location

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
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
class CurrierViewSet(viewsets.ModelViewSet):
    queryset = Currier.objects.all()
    serializer_class = CurrierSerializer
class FormViewSet(viewsets.ModelViewSet):
    queryset = Form.objects.all()
    serializer_class = FormSerializer
class DeviceViewSet(viewsets.ModelViewSet):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer
class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
class ContractViewSet(viewsets.ModelViewSet):
    queryset = Contract.objects.all()
    serializer_class = ContractSerializer
class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

from rest_framework import generics

class FilteredVendorViewSet(generics.ListAPIView):
    serializer_class = FilteredVendorSerializer

    def get_queryset(self):
        queryset = Vendor.objects.filter(users_self_reg=True)
        return queryset
class FilteredFormViewSet(generics.ListAPIView):
    serializer = FormSerializer

    def get_queryset(self):
        f_name = self.request.QUERY_PARAMS.get('name', None)
        queryset = Form.objects.filter(name=f_name)
        return queryset

# from django.http import HttpResponse
# from rest_framework.renderers import JSONRenderer
# from rest_framework.parsers import JSONParser
#
# class JSONResponse(HttpResponse):
#     """
#     An HttpResponse that renders its content into JSON.
#     """
#     def __init__(self, data, **kwargs):
#         content = JSONRenderer().render(data)
#         kwargs['content_type'] = 'application/json'
#         super(JSONResponse, self).__init__(content, **kwargs)

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

def get_sencha_json(request_data):
    return eval(request_data.keys()[0].replace('null','"null"'))

@api_view(['GET', 'POST'])
def new_currier(request):

    if request.method == 'GET':
        snippets = App_User.objects.all()
        serializer = App_UserSerializer(snippets, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':

        x = get_sencha_json(request.DATA)

        serializer = App_UserSerializer(data=x) # NOTE:  only 1 data pt here
        if serializer.is_valid():
            c = serializer.save()
            this_user_type = c.app_user_type

            if this_user_type == 'dg' or this_user_type == 'vend_mgr':
                this_user_id = c.app_user_id
                x.update({'app_user_id':this_user_id})

                if this_user_type == 'dg':
                    n = Currier(app_user_id=this_user_id)
                    n.save()
                    this_dg_id = n.currier_id
                    x.update({'currier_id':this_dg_id})

            # if this_user_type == 'vend_empl': no action needed

            return Response(x, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def new_vendor(request):

    if request.method == 'GET':
        snippets = App_User.objects.all()
        serializer = App_UserSerializer(snippets, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':

        #   1. break apart form and rename tagged keys, e.g., "biz_name" to "name"
        #   2. save user data, get app_user_id
        #   3. append app_user_id to vendor data, save vendor data, get vendor_id
        #   4. get user

        x = get_sencha_json(request.DATA)

        user_data,vend_data={},{}
        for k,v in x.iteritems():
            if k.find('biz') != -1: vend_data.update({ k[4:]:v })
            else: user_data.update({k:v})

        user_serializer = App_UserSerializer(data=user_data)
        if user_serializer.is_valid():
            u = user_serializer.save()
            return_data = user_data

            v = Vendor(**vend_data)
            v.app_user_id = u.app_user_id
            v.save()

            u.vendor_id = v.vendor_id
            u.save()

            return_data.update( vend_data )
            return Response(return_data, status=status.HTTP_201_CREATED)

        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from django.db.models import F,Q
# from django.core import serializers

from datetime import datetime as DT

@api_view(['GET', 'POST'])
def dg_contracts(request):

    x = request.DATA
    # TODO: schedules(request.method=='GET') needs user authentication
    if request.method == 'GET':
        try:
            it = x[0]
            k = Contract.objects.filter(Q(is_open=True) | Q(curriers__in=it['currier_id']))
        except:
            k = Contract.objects.filter(is_open=True)
        serializer = FilteredContractSerializer(k, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':

        x = [get_sencha_json(request.DATA)]

        #   . receive JSON from DG -- DONE
        #   . create/edit Schedule entries
        #   . update Contract entries
        #   .

        add_entries,del_entries = [],[]
        for it in x:
            if it['action'].lower()=='add':
                del it['action']
                add_entries.append(it)
            elif it['action'].lower()=='remove':
                del it['action']
                del_entries.append(it)
            elif it['action'].lower()=='get':   # function always returns this ...
                k = Contract.objects.filter(Q(is_open=True) | Q(curriers__in=it['currier_id']))
                serializer = FilteredContractSerializer(k, many=True)
                return Response(serializer.data)

        dg_id = 1#it['currier_id']

        def ACTION_add(add_entries):
            for it in add_entries:
                try:
                    hour_period = it['hour_period']
                    sdt = it['start_datetime']
                    AREA = it['area']

                    s = Schedule(   contract_id=it['contract_id'],
                                    currier_id=dg_id,
                                    start_datetime=sdt,
                                    start_day=it['start_day'],
                                    start_time=it['start_time'],
                                    hour_period=hour_period,
                                    area=AREA)
                    s.save()

                    c = Currier.objects.get(currier_id=dg_id)
                    c.dg_schedule.add(s.schedule_id)
                    c.save()

                    k = Contract.objects.get(start_datetime=sdt,
                                             area=AREA)
                    k.curriers.add(dg_id)
                    # TODO: apply wgt to dg_units, where wgt = f(dg history)
                    new_dg_units = k.dg_units + hour_period
                    vend_units = k.vendor_units
                    if new_dg_units >= vend_units:
                        k.is_open = False
                    k.dg_units = F('dg_units') + hour_period
                    k.save()
                except:
                    pass
        def ACTION_remove(del_entries):
            for it in del_entries:
                try:
                    # AREA = it['area']
                    sdt = it['start_datetime']
                    k = Contract.objects.get(contract_id=it['contract_id'],
                                             start_datetime=sdt,
                                             area=it['area'])
                    c = Currier.objects.get(currier_id=dg_id)
                    k.curriers.remove(c)
                    s = Schedule.objects.get(currier_id=dg_id,
                                             start_datetime=sdt)
                    s.delete()
                except:
                    pass

        if add_entries != []:   ACTION_add(add_entries)
        if del_entries != []:   ACTION_remove(del_entries)

        k = Contract.objects.filter(Q(is_open=True) | Q(curriers__in=str(dg_id)))
        k_serializer = FilteredContractSerializer(k, many=True)
        # t = k_serializer.data[0]['curriers']
        # TODO: redefine FilteredContractSerializer to replace "curriers" field with "is_contracted"
        # k_custom = k_serializer.transform_curriers(k_serializer,dg_id)
        c = Currier.objects.get(currier_id=dg_id)
        c_serializer = CurrierScheduleSerializer(c).data['dg_schedule']
        all_data = {"work.json" : c_serializer,
                     "contracts.json" : k_serializer.data,}
        return Response(all_data)

@api_view(['GET', 'POST'])
def work(request):

    # TODO: when authenticating, change dg_id=1 in api.view.work(request)
    dg_id = 1

    if request.method == 'GET':
        k = Currier.objects.get(currier_id=dg_id)
        serializer = CurrierScheduleSerializer(k)
        return Response(serializer.data)

    elif request.method == 'POST':
        it = get_sencha_json(request.DATA)

        if it['action'].lower()=='get':
            k = Currier.objects.get(currier_id=dg_id)
            serializer = CurrierScheduleSerializer(k)
            return Response(serializer.data)
        elif it['action'][:6].lower()=='check_':
            c = Currier.objects.get(currier_id=dg_id)
            if it['action'][6:].lower()=='in': c.is_active,i = True,'True'
            else: c.is_active,i = False,'False'
            c.save()
            return Response({"is_active":i})
        elif it['action'].lower()=='history':
            now = DT.utcnow().strftime("%Y-%m-%d")
            s = Schedule.objects.filter( Q(currier_id=dg_id) , Q(check_out_datetime__lt=now) )
            serializer = FilteredScheduleSerializer(s, many=True)
            return Response(serializer.data)

        # for testing purposes ...
        elif it['action'].lower()=='make_old':
            s = Schedule.objects.filter( Q(currier_id=dg_id) ).iterator()
            try:
                while True == True:
                    t = s.next()
                    t.check_out_datetime = DT(2014,1,2,12,30,0)
                    t.save()
                    break
            except StopIteration:
                pass
            return Response({"make_old":"True"})

@api_view(['GET', 'POST'])
def device(request):
    # TODO: when authenticating, change dg_id=1 in api.view.device(request)
    dg_id = 1  # set by "currier_id"

    if request.method == 'GET':
        d = Device.objects.get(currier_id=dg_id)
        serializer = DeviceSerializer(d)
        return Response(serializer.data)

    elif request.method == 'POST':
        x = get_sencha_json(request.DATA)
        # TODO account for an unregistered device posting update

        if x['action'].lower()=='update':
            d = Device.objects.filter(currier_id=dg_id)
            p = x['device']
            p.update({'is_active':True})
            # TODO adjust update frequency here
            p.update({'update_frequency':60})
            d.update(**p)

            # d = Device.objects.get(currier_id=currier_id)
            dev_serializer = FilteredDeviceSerializer(d, context={'request': request}, many=True)
            l = Location.objects.filter(currier_id=dg_id)
            loc_serializer = LocationSerializer(l, context={'request': request}, many=True)
            z = {'Device.JSON':dev_serializer.data[0],
                 'Locations.JSON':loc_serializer.data}

            return Response(z)
            # serializer = FilteredDeviceSerializer(d)
            # return Response(serializer.data)

        return Response(x)

@api_view(['GET', 'POST'])
def order(request):
    # TODO: when authenticating, change vend_id=1 in api.view.order(request)
    vendor_id = 1  # set by "currier_id"
    x = request.DATA[0]

    if request.method == 'GET':
        d = Order.objects.get(vendor_id=vendor_id)
        serializer = DeviceSerializer(d)
        return Response(serializer.data)

    elif request.method == 'POST':
        x = eval(x.keys()[0])
        # TODO account for an unregistered device posting update

        if x['action'].lower()=='new':
            o = Order(**x)
            o.save()
            return Response(o)

        return Response(x)

@api_view(['GET', 'POST'])
def update(request):
    # TODO: when authenticating, change currier_id=1 in api.view.update(request)
    currier_id = 1  # set by "currier_id"

    if request.method == 'GET':
        d = Location.objects.get(currier_id=currier_id)
        serializer = DeviceSerializer(d)
        return Response(serializer.data)

    elif request.method == 'POST':
        x = get_sencha_json(request.DATA)
        # TODO account for an unregistered device posting update

        if x['action'].lower()=='update':
            d = Device.objects.get(currier_id=currier_id)
            dev_serializer = FilteredDeviceSerializer(d)
            l = Location.objects.filter(currier_id=currier_id)
            loc_serializer = LocationSerializer(l)
            z = {'Device.JSON':dev_serializer.data,
                 'Locations.JSON':loc_serializer.data}

            return Response(z)

        return Response(x)
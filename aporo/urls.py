from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

from rest_framework import routers
from api.views import App_UserViewSet,VendorViewSet,OrderViewSet,CurrierViewSet
from api.views import FormViewSet,DeviceViewSet
from api.views import FilteredVendorViewSet,FilteredFormViewSet

from app.models import Vendor,Form

router = routers.DefaultRouter()
router.register(r'users', App_UserViewSet)
router.register(r'vendors', VendorViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'curriers', CurrierViewSet)
router.register(r'forms', FormViewSet)
router.register(r'devices', DeviceViewSet)



# from cal.api import CalResource, EventResource
# cal_resource = CalResource()
# event_resource = EventResource()


# from api.resources import VendorResource,OrderResource,CurrierResource
#
# vendor_resource = VendorResource()
# order_resource = OrderResource()
# currier_resource = CurrierResource()

urlpatterns = patterns('',
    # Admin page
    url(r'^admin/', include(admin.site.urls)),

    url(r'xmin/', include('xmin.urls')),

    # Templates
    # url(r'^', include('cal.urls')),

    # RESTful URLs
    # url(r'^', include(cal_resource.urls)),
    # url(r'^', include(event_resource.urls)),

    # # Templates
    url(r'^api', include('api.urls')),
    url(r'^app', include('app.urls', namespace='app')),

    # # RESTful URLs
    # url(r'^api/', include(vendor_resource.urls)), # /api/vendor/?format=json
    # url(r'^api/', include(order_resource.urls)),
    # url(r'^api/', include(currier_resource.urls)),

    # Django Rest Framework
    url(r'^api_view/', include(router.urls)),
    url(r'^reg_vends/', FilteredVendorViewSet.as_view(model=Vendor), name='vend-list'),
    url(r'^get_form/', FilteredFormViewSet.as_view(model=Form), name='get_form-list'),

    url(r'^phonegap/', include('phonegap.urls')),

    #url(r'^login/', include('login.urls')),

    # url(r'^minimal_extjs4_app/', include('minimal_extjs4_app.urls')),

    # url(r'^app/', include('app.urls',namespace='app')),
    # url(r'^api/', include(router.urls)),
    # url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
    # Examples:
    # url(r'^$', 'aporo.views.home', name='home'),
    # url(r'^aporo/', include('aporo.urls')),
    # url(r'^api/', include(v1_api.urls)),

    # (r'^api/', include('cigar_example.restapi.urls', namespace="cigars")),


    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

)

from django.contrib.staticfiles.urls import staticfiles_urlpatterns
urlpatterns += staticfiles_urlpatterns()

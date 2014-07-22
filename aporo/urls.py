from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

from rest_framework import routers
from api.views import App_UserViewSet,VendorViewSet,OrderViewSet,CurrierViewSet
from api.views import FormViewSet,DeviceViewSet
from api.views import FilteredVendorViewSet,FilteredFormViewSet
from api.views import ScheduleViewSet,ContractViewSet,LocationViewSet

from app.models import Vendor,Form

router = routers.DefaultRouter()
router.register(r'users', App_UserViewSet)
router.register(r'vendors', VendorViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'curriers', CurrierViewSet)
router.register(r'forms', FormViewSet)
router.register(r'devices', DeviceViewSet)
router.register(r'contracts', ContractViewSet)
router.register(r'schedules', ScheduleViewSet)
router.register(r'locations', LocationViewSet)

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^accounts/', include('registration.backends.simple.urls')),
    url(r'^password_reset/', include('password_reset.urls')),

    # Django Rest Framework
    url(r'^api_view/', include(router.urls)),
    url(r'^api/', include('api.urls', namespace='api')),

    url(r'^app/', include('app.urls', namespace='app')),
    url(r'^management/', include('management.urls', namespace='mgmt')),
    url(r'^phonegap/', include('phonegap.urls')),
    url(r'^xmin/', include('xmin.urls')),
    # url(r'^login/', include('login.urls')),

    # TODO refactor some api/api_view urls in Sencha
    # delete these after refactor
    url(r'^reg_vends/', FilteredVendorViewSet.as_view(model=Vendor), name='vend-list'),
    url(r'^get_form/', FilteredFormViewSet.as_view(model=Form), name='get_form-list'),

)

from django.contrib.staticfiles.urls import staticfiles_urlpatterns
urlpatterns += staticfiles_urlpatterns()

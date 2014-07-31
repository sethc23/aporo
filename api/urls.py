from django.conf.urls import patterns, url

from api import views
from app.models import Vendor,Form

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^get_form/', views.FilteredFormViewSet.as_view(model=Form), name='get_form-list'),
    url(r'^new_currier/$', views.new_currier, name='new_currier'),
    url(r'^reg_vends/', views.FilteredVendorViewSet.as_view(model=Vendor), name='vend-list'),
    url(r'^new_vendor/$', views.new_vendor, name='new_vendor'),
    url(r'^dg_contracts/$', views.dg_contracts, name='dg_contracts'),
    url(r'^work/$', views.work, name='work'),
    url(r'^device/$', views.device, name='device'),
    url(r'^order/$', views.order, name='order'),
    url(r'^update/$', views.update, name='update'),
)
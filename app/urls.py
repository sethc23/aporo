from django.conf.urls import patterns, url
from django.views.generic import TemplateView
from app import views

urlpatterns = patterns('',
    # url(r'^$', views.IndexView.as_view(), name='index'),
    # url(r'^$', views.VendorView.as_view(), name='vendor'),
    url(r'^$', views.index, name='index'),
    # url(r'^$', TemplateView.as_view(template_name='app/index.html')),

    # { 'document_root' : site_media },
    # url(r'^vendor/$', views.VendorView.as_view(), name='vendor'),
    # url(r'^(?P<pk>\d+)/results/$', views.ResultsView.as_view(), name='results'),
    # url(r'^(?P<poll_id>\d+)/vote/$', views.vote, name='vote'),
)

from django.contrib.staticfiles.urls import staticfiles_urlpatterns
urlpatterns += staticfiles_urlpatterns()

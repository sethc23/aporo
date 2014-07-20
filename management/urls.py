from django.conf.urls import patterns, url
import load
import maintenance

urlpatterns = patterns('',
    url(r'^load_sample_data/$', load.sample_data, name='load_sample_data'),
    url(r'^load_form_data/$', load.form_data, name='load_form_data'),
    url(r'^load_all_data/$', load.all_data, name='load_all_data'),
    url(r'^new_contracts/$', maintenance.create_empty_contracts_by_datetime,
        name='new_contracts'),
    url(r'^update_contracts/$', maintenance.update_contracts_by_vendor,
        name='update_contracts'),
)

from django.contrib.staticfiles.urls import staticfiles_urlpatterns
urlpatterns += staticfiles_urlpatterns()

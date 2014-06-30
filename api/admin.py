from django.contrib import admin

# Register your models here.
from app.models import Vendor,Order,Currier

admin.site.register(Vendor)
admin.site.register(Order)
admin.site.register(Currier)
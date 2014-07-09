from django.contrib import admin

# Register your models here.
from app.models import Vendor,Order,Currier,Form

admin.site.register(Vendor)
admin.site.register(Order)
admin.site.register(Currier)
admin.site.register(Form)
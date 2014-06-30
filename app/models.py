from django.db import models

class Vendor(models.Model):
    vend_id = models.AutoField(max_length=11,primary_key=True)
    language = models.TextField(blank=True, null=True)
    name = models.TextField(blank=True, null=True)
    addr1 = models.TextField(blank=True, null=True)
    addr2 = models.TextField(blank=True, null=True)
    zipcode = models.SmallIntegerField(blank=True, null=True, max_length=5)
    primary_first_name = models.TextField(blank=True, null=True)
    primary_last_name = models.TextField(blank=True, null=True)
    primary_cell = models.SmallIntegerField(blank=True, null=True, max_length=10)
    primary_email = models.EmailField(blank=True, null=True)
    secondary_first_name = models.TextField(blank=True, null=True)
    secondary_last_name = models.TextField(blank=True, null=True)
    secondary_cell = models.SmallIntegerField(blank=True, null=True, max_length=10)
    secondary_email = models.EmailField(blank=True, null=True)
    bus_email = models.EmailField(blank=True, null=True)
    bus_phone = models.SmallIntegerField(blank=True, null=True, max_length=10)
    registration_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)
    rating = models.IntegerField(blank=True, null=True)

    def __unicode__(self):
        return ' '.join([
                self.vend_id,
                self.language,
                self.name,
                self.addr1,
                self.addr2,
                self.zipcode,
                self.primary_first_name,
                self.primary_last_name,
                self.primary_cell,
                self.primary_email,
                self.secondary_first_name,
                self.secondary_last_name,
                self.secondary_cell,
                self.secondary_email,
                self.bus_email,
                self.bus_phone,
                self.registration_date_time,
                self.rating,
            ])


class Order(models.Model):
    order_id = models.AutoField(max_length=11,primary_key=True)
    pickup_time = models.TimeField(blank=True, null=True, auto_now=False, auto_now_add=False)
    pickup_date = models.DateField(blank=True, null=True, auto_now=False, auto_now_add=False)
    pickup_addr = models.TextField(blank=True, null=True)
    check_time = models.TimeField(blank=True, null=True, auto_now=True, auto_now_add=False)
    deliv_time = models.TimeField(blank=True, null=True, auto_now=False, auto_now_add=False)
    deliv_date = models.DateField(blank=True, null=True, auto_now=False, auto_now_add=False)
    deliv_addr = models.TextField(blank=True, null=True)

    def __unicode__(self):
        return ' '.join([
                self.order_id,
                self.pickup_time,
                self.pickup_date,
                self.pickup_addr,
                self.check_time,
                self.deliv_time,
                self.deliv_date,
                self.deliv_addr,
            ])


class Currier(models.Model):
    dg_id = models.AutoField(max_length=11,primary_key=True)
    language = models.TextField(blank=True, null=True)
    first_name = models.TextField(blank=True, null=True)
    last_name = models.TextField(blank=True, null=True)
    addr1 = models.TextField(blank=True, null=True)
    addr2 = models.TextField(blank=True, null=True)
    zipcode = models.SmallIntegerField(blank=True, null=True, max_length=5)
    cell = models.SmallIntegerField(blank=True, null=True, max_length=10)
    email = models.EmailField(blank=True, null=True)
    emergency_contact_name = models.TextField(blank=True, null=True)
    emergency_contact_number = models.SmallIntegerField(blank=True, null=True, max_length=10)
    payment_method = models.TextField(blank=True, null=True)
    registration_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)
    rating = models.IntegerField(blank=True, null=True)

    def __unicode__(self):
        return ' '.join([
                self.dg_id,
                self.language,
                self.first_name,
                self.last_name,
                self.addr1,
                self.addr2,
                self.zipcode,
                self.cell,
                self.email,
                self.emergency_contact_name,
                self.emergency_contact_number,
                self.payment_method,
                self.registration_date_time,
                self.rating,
            ])
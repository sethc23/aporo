from django.db import models

class Vendor(models.Model):
    vend_id = models.AutoField(max_length=11,primary_key=True)
    name = models.TextField(blank=True, null=True)
    addr1 = models.TextField(blank=True, null=True)
    addr2 = models.TextField(blank=True, null=True)
    zip = models.SmallIntegerField(blank=True, null=True, max_length=5)
    email = models.EmailField(blank=True, null=True)
    phone = models.SmallIntegerField(blank=True, null=True, max_length=10)
    other_phone = models.SmallIntegerField(blank=True, null=True, max_length=10)
    primary_user_id = models.TextField(blank=True, null=True)
    reg_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)
    ready_rating = models.IntegerField(blank=True, null=True)
    users_self_reg = models.BooleanField(default=True)
    area = models.TextField(blank=True, null=True)

    def __unicode__(self):
        return ' '.join([
                self.vend_id,
                self.name,
                self.addr1,
                self.addr2,
                self.zip,
                self.email,
                self.phone,
                self.other_phone,
                self.primary_user_id,
                self.reg_date_time,
                self.ready_rating,
                self.users_self_reg,
                self.area
            ])


class Order(models.Model):
    order_id = models.AutoField(max_length=11,primary_key=True)
    vendor_id = models.SmallIntegerField(blank=True, null=True, max_length=11)
    dg_id = models.SmallIntegerField(blank=True, null=True, max_length=11)
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
                self.vendor_id,
                self.dg_id,
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
    lang = models.TextField(blank=True, null=True)
    first_name = models.TextField(blank=True, null=True)
    last_name = models.TextField(blank=True, null=True)
    addr1 = models.TextField(blank=True, null=True)
    addr2 = models.TextField(blank=True, null=True)
    zip = models.SmallIntegerField(blank=True, null=True, max_length=5)
    cell = models.SmallIntegerField(blank=True, null=True, max_length=10)
    email = models.EmailField(blank=True, null=True)
    emergency_contact_name = models.TextField(blank=True, null=True)
    emergency_contact_number = models.SmallIntegerField(blank=True, null=True, max_length=10)
    payment_method = models.TextField(blank=True, null=True)
    reg_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)
    rating = models.IntegerField(blank=True, null=True)

    def __unicode__(self):
        return ' '.join([
                self.dg_id,
                self.lang,
                self.first_name,
                self.last_name,
                self.addr1,
                self.addr2,
                self.zip,
                self.cell,
                self.email,
                self.emergency_contact_name,
                self.emergency_contact_number,
                self.payment_method,
                self.reg_date_time,
                self.rating,
            ])


class Form(models.Model):
    form_id = models.AutoField(max_length=11,primary_key=True)
    name = models.TextField(blank=True, null=True)
    additional_forms = models.TextField(blank=True, null=True)
    url = models.TextField(blank=True, null=True)
    method = models.TextField(blank=True, null=True)
    input_source = models.TextField(blank=True, null=True)
    input_types = models.TextField(blank=True, null=True)
    input_labels = models.TextField(blank=True, null=True)
    input_ids = models.TextField(blank=True, null=True)
    input_options = models.TextField(blank=True, null=True)

    def __unicode__(self):
        return ' '.join([
                self.form_id,
                self.name,
                self.additional_forms,
                self.url,
                self.method,
                self.input_types,
                self.input_labels,
                self.input_ids,
                self.input_options
            ])


class Device(models.Model):
    dev_id = models.SmallIntegerField(primary_key=True, max_length=11)
    dg_id = models.SmallIntegerField(blank=True, null=True, max_length=11)
    model = models.TextField(blank=True, null=True)
    platform = models.TextField(blank=True, null=True)
    uuid = models.TextField(blank=True, null=True)
    op_sys_ver = models.TextField(blank=True, null=True)
    battery_level = models.SmallIntegerField(blank=True, null=True, max_length=3)
    lat = models.DecimalField(blank=True, null=True, max_digits=10,decimal_places=5)
    long = models.DecimalField(blank=True, null=True, max_digits=10,decimal_places=5)
    coord_accuracy = models.FloatField(blank=True, null=True)
    heading	 = models.FloatField(blank=True, null=True)
    speed = models.FloatField(blank=True, null=True)
    last_updated = models.DateTimeField(blank=True, null=True)

    def __unicode__(self):
        return ' '.join([
                self.dev_id,
                self.dg_id,
                self.model,
                self.platform,
                self.uuid,
                self.op_sys_ver,
                self.battery_level,
                self.lat,
                self.long,
                self.coord_accuracy,
                self.heading,
                self.speed,
                self.last_updated
            ])
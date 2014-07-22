from django.db import models

class App_User(models.Model):
    app_user_id = models.AutoField(max_length=11, primary_key=True)
    created = models.DateTimeField(auto_now=True)
    app_user_type = models.TextField(blank=True)
    auth_user_key = models.IntegerField(max_length=11, blank=True, null=True)
    vendor = models.ForeignKey('Vendor', related_name='Vendor', unique=False, blank=True, null=True)
    currier = models.ForeignKey('Currier', related_name='Currier', unique=False, blank=True, null=True)
    device = models.ManyToManyField('Device', related_name='Device', unique=False, blank=True, null=True)
    first_name = models.TextField(blank=True)
    last_name = models.TextField(blank=True)
    addr1 = models.TextField(blank=True)
    addr2 = models.TextField(blank=True)
    zip = models.SmallIntegerField(blank=True, null=True, max_length=5)
    email = models.EmailField(blank=True, null=True)
    cell = models.TextField(blank=True)
    other_phone = models.TextField(blank=True)
    lang = models.TextField(blank=True)
    emergency_contact_name = models.TextField(blank=True)
    emergency_contact_number = models.TextField(blank=True)
    payment_method = models.TextField(blank=True)

    def __unicode__(self):
        # x = App_User.__doc__.replace('App_User(','').strip('()').split()
        return ' '.join([
                self.app_user_id,
                self.created,
                self.app_user_type,
                self.auth_user_key,
                self.vendor,
                self.currier,
                self.device,
                self.first_name,
                self.last_name,
                self.addr1,
                self.addr2,
                self.zip,
                self.email,
                self.cell,
                self.other_phone,
                self.lang,
                self.emergency_contact_name,
                self.emergency_contact_number,
                self.payment_method,
            ])

class Vendor(models.Model):
    vendor_id = models.AutoField(max_length=11, primary_key=True)
    created = models.DateTimeField(auto_now=True)
    app_user = models.ForeignKey('App_User', related_name='vendor_app_user', unique=False)
    device = models.ManyToManyField('Device', related_name='vendor_device', unique=False)
    name = models.TextField(blank=True)
    addr1 = models.TextField(blank=True)
    addr2 = models.TextField(blank=True)
    zip = models.SmallIntegerField(blank=True, null=True, max_length=5)
    lat = models.DecimalField(blank=True, null=True, max_digits=10, decimal_places=5)
    long = models.DecimalField(blank=True, null=True, max_digits=10, decimal_places=5)
    email = models.EmailField(blank=True, null=True)
    phone = models.TextField(blank=True)
    other_phone = models.TextField(blank=True)
    reg_date_time = models.DateTimeField(auto_now=False, auto_now_add=True)
    # intesity_rating = models.FloatField(blank=True, null=True)
    ready_rating = models.FloatField(blank=True, null=True)
    users_self_reg = models.BooleanField(default=True)
    days = models.TextField(blank=True)
    start_times = models.TextField(blank=True)
    end_times = models.TextField(blank=True)
    area = models.TextField(blank=True)
    holidays = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    last_processed = models.DateTimeField(blank=True, null=True, auto_now=False, auto_now_add=False)
    processed_through = models.DateTimeField(blank=True, null=True, auto_now=False, auto_now_add=False)
    last_updated = models.DateTimeField(blank=True, auto_now=True, auto_now_add=False)

    def __unicode__(self):
        return ' '.join([
                self.vendor_id,
                self.created,
                self.app_user,
                self.device,
                self.name,
                self.addr1,
                self.addr2,
                self.zip,
                self.email,
                self.phone,
                self.other_phone,
                self.reg_date_time,
                # self.intensity_rating,
                self.ready_rating,
                self.users_self_reg,
                self.days,
                self.start_times,
                self.end_times,
                self.area,
                self.holidays,
                self.is_active,
                self.last_processed,
                self.processed_through,
                self.last_updated
            ])

class Currier(models.Model):
    currier_id = models.AutoField(max_length=11, primary_key=True)
    created = models.DateTimeField(auto_now=True)
    app_user = models.ForeignKey('App_User', related_name='dg_app_user', unique=True)
    device = models.ManyToManyField('Device', related_name='dg_device', unique=False)
    speed_rating = models.FloatField(blank=True, null=True)
    worktime_rating = models.FloatField(blank=True, null=True)
    punct_rating = models.FloatField(blank=True, null=True)
    dg_schedule = models.ManyToManyField('Schedule', related_name='dg_schedule', unique=False)
    is_active = models.BooleanField(default=False)

    def __unicode__(self):
        return ' '.join([
                self.currier_id,
                self.created,
                self.app_user,
                self.device,
                self.speed_rating,
                self.worktime_rating,
                self.punct_rating,
                self.dg_schedule,
                self.is_active,
            ])

class Order(models.Model):
    order_id = models.AutoField(max_length=11, primary_key=True)
    created = models.DateTimeField(auto_now=True)
    vendor = models.ForeignKey('Vendor', related_name='order_vendor', unique=False, blank=True, null=True)
    vendor_dev = models.ForeignKey('Device', related_name='order_vendor_dev', unique=False, blank=True, null=True)
    currier = models.ForeignKey('Currier', related_name='order_currier', unique=False, blank=True, null=True)
    currier_dev = models.ForeignKey('Device', related_name='order_currier_dev', unique=False, blank=True, null=True)
    tag = models.TextField(blank=True, null=True)
    web = models.BooleanField(default=False)
    web_url = models.TextField(blank=True)
    call_in = models.BooleanField(default=False)
    req_pickup_time = models.TimeField(blank=True, null=True, auto_now=False, auto_now_add=False)
    deliv_addr = models.TextField(blank=True)
    deliv_cross_street = models.TextField(blank=True)
    deliv_lat = models.DecimalField(blank=True, null=True, max_digits=10, decimal_places=5)
    deliv_long = models.DecimalField(blank=True, null=True, max_digits=10, decimal_places=5)
    price = models.DecimalField(blank=True, null=True, max_digits=10, decimal_places=2)
    tip = models.DecimalField(blank=True, null=True, max_digits=10, decimal_places=2)
    comments = models.TextField(blank=True)

    def __unicode__(self):
        return ' '.join([
                self.order_id,
                self.created,
                self.vendor,
                self.vendor_dev,
                self.currier,
                self.currier_dev,
                self.tag,
                self.web,
                self.web_url,
                self.call_in,
                self.req_pickup_time,
                self.deliv_addr,
                self.deliv_cross_street,
                self.deliv_lat,
                self.deliv_long,
                self.price,
                self.tip,
                self.comments,
            ])

class Location(models.Model):
    location_id = models.AutoField(max_length=11, primary_key=True)
    loc_num = models.SmallIntegerField(blank=True, null=True, max_length=5)
    order = models.ForeignKey('Order', related_name='location_order', unique=False)
    # via order, dg, device
    pickup = models.BooleanField(default=True)
    delivery = models.BooleanField(default=False)
    req_datetime = models.TimeField(blank=True, null=True, auto_now=False, auto_now_add=False)
    addr = models.TextField(blank=True)
    cross_street = models.TextField(blank=True)
    end_datetime = models.TimeField(blank=True, null=True, auto_now=False, auto_now_add=False)
    lat = models.DecimalField(blank=True, null=True, max_digits=10, decimal_places=5)
    long = models.DecimalField(blank=True, null=True, max_digits=10, decimal_places=5)
    batt_level = models.SmallIntegerField(blank=True, null=True, max_length=3)
    dev_updated = models.TimeField(blank=True, null=True, auto_now=False, auto_now_add=False)

    def __unicode__(self):
        return ' '.join([
                self.location_id,
                self.loc_num,
                self.order,
                self.pickup,
                self.delivery,
                self.req_datetime,
                self.addr,
                self.cross_street,
                self.end_datetime,
                self.lat,
                self.long,
                self.batt_level,
                self.dev_updated,
            ])

class Device(models.Model):
    device_id = models.AutoField(max_length=11, primary_key=True)
    created = models.DateTimeField(auto_now=True)
    currier = models.ForeignKey('Currier', related_name='device_currier', unique=False, blank=True, null=True)
    vendor = models.ForeignKey('Vendor', related_name='device_vendor', unique=False, blank=True, null=True)
    model = models.TextField(blank=True)
    platform = models.TextField(blank=True)
    uuid = models.TextField(blank=True)
    op_sys_ver = models.TextField(blank=True)
    battery_level = models.SmallIntegerField(blank=True, null=True, max_length=3)
    update_frequency = models.IntegerField(blank=True, null=True, max_length=11)
    lat = models.DecimalField(blank=True, null=True, max_digits=10, decimal_places=5)
    long = models.DecimalField(blank=True, null=True, max_digits=10, decimal_places=5)
    coord_accuracy = models.FloatField(blank=True, null=True)
    heading	= models.FloatField(blank=True, null=True)
    speed = models.FloatField(blank=True, null=True)
    last_updated = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=False)

    def __unicode__(self):
        return ' '.join([
                self.device_id,
                self.created,
                self.currier,
                self.vendor,
                self.model,
                self.platform,
                self.uuid,
                self.op_sys_ver,
                self.battery_level,
                self.update_frequency,
                self.lat,
                self.long,
                self.coord_accuracy,
                self.heading,
                self.speed,
                self.last_updated,
                self.is_active,
            ])

class Form(models.Model):
    form_id = models.AutoField(max_length=11, primary_key=True)
    created = models.DateTimeField(auto_now=True)
    name = models.TextField(blank=True)
    additional_forms = models.TextField(blank=True)
    url = models.TextField(blank=True)
    method = models.TextField(blank=True)
    input_source = models.TextField(blank=True)
    form_inputs = models.TextField(blank=True)

    def __unicode__(self):
        return ' '.join([
                self.form_id,
                self.created,
                self.name,
                self.additional_forms,
                self.url,
                self.method,
                self.input_source,
                self.form_inputs,
            ])

class Contract(models.Model):
    contract_id = models.AutoField(max_length=11, primary_key=True)

    start_datetime = models.DateTimeField(blank=True, null=True, auto_now=False, auto_now_add=False)
    start_day = models.TextField(blank=True)
    start_time = models.TextField(blank=True)
    hour_period = models.SmallIntegerField(max_length=5, blank=True, null=True)
    area = models.TextField(blank=True)

    is_open = models.BooleanField(default=False)
    vendor_units = models.IntegerField(max_length=10, default=0, blank=True, null=True)
    dg_units = models.SmallIntegerField(max_length=5, default=0, blank=True, null=True)
    curriers = models.ManyToManyField(Currier)

    class meta:
        ordering = ['area','-start_datetime']

    def __unicode__(self):
        return ' '.join([
                self.contract_id,
                self.start_datetime,
                self.start_day,
                self.start_time,
                self.hour_period,
                self.area,
                self.is_open,
                self.vendor_units,
                self.dg_units,
                self.curriers,
            ])

class Schedule(models.Model):
    schedule_id = models.AutoField(max_length=11, primary_key=True)
    created = models.DateTimeField(auto_now=True)
    contract = models.ForeignKey('Contract', related_name='schedule_contract', blank=True, null=True, unique=False)
    currier = models.ForeignKey('Currier', related_name='schedule_currier',blank=True, null=True, unique=False)

    # TODO (future) consider whether models can be related more efficiently. See here below.
    start_datetime = models.DateTimeField(blank=True, null=True, auto_now=False, auto_now_add=False)
    start_day = models.TextField(blank=True)
    start_time = models.TextField(blank=True)
    hour_period = models.SmallIntegerField(max_length=5, blank=True, null=True)
    area = models.TextField(blank=True)

    check_in_datetime = models.DateTimeField(blank=True, null=True, auto_now=False, auto_now_add=False)
    check_out_datetime = models.DateTimeField(blank=True, null=True, auto_now=False, auto_now_add=False)
    total_breaktime = models.SmallIntegerField(max_length=5, blank=True, null=True)
    total_deliveries = models.SmallIntegerField(max_length=5, blank=True, null=True)
    pay = models.DecimalField(blank=True, null=True, max_digits=10, decimal_places=2)

    def __unicode__(self):
        # TODO: use logging to analyze performance of below
        # a = ''
        # d = [ a.join( list( self.serializable_value(it) ) ) for it in self.__dict__.iterkeys() ]
        # return a
        return ' '.join([
                self.schedule_id,
                self.created,
                self.contract,
                self.currier,
                self.start_datetime,
                self.start_day,
                self.start_time,
                self.hour_period,
                self.area,
                self.check_in_datetime,
                self.check_out_datetime,
                self.total_breaktime,
                self.total_deliveries,
                self.pay,
            ])
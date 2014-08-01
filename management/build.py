
from os import chdir as os_chdir
from os import system as os_system
from time import sleep as delay
from uuid import getnode as get_mac


macs = {'Macbook':'105773427819682',
        'MacBookPro':'117637351435',}

this_mac = get_mac()
if str(this_mac)==macs['Macbook']:   #   MB
    os_chdir('/Users/sethchase/Dropbox/BD_Scripts/django/Dropbox/aporo')
elif str(this_mac)==macs['MacBookPro']:   #   MBP
    os_chdir('/Users/admin/django/Dropbox/aporo')

print '\n\tRe-Building Content and Testing...\n'
os_system('bin/python manage.py reset_db --noinput')
os_system('bin/python manage.py syncdb --noinput')

print '\n\tStarting Development Server ...'
os_system('bin/python manage.py runserver 0.0.0.0:8080 &')
delay(6)

os_system('bin/python management/initialize.py')                    # Load data
os_system('bin/python management/tests.py "dev"')                # Run Tests

os_system('pkill -f "python manage.py runserver"')


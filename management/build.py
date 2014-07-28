
from os import chdir as os_chdir
from os import system as os_system
from time import sleep as delay

print '\n\tRe-Building Content and Testing...\n'
os_chdir('/Users/sethchase/Dropbox/BD_Scripts/django/Dropbox/aporo')
os_system('bin/python manage.py reset_db --noinput')
os_system('bin/python manage.py syncdb --noinput')

print '\n\tStarting Development Server ...'
os_system('bin/python manage.py runserver 0.0.0.0:8080 &')
delay(6)

os_system('bin/python management/initialize.py')                    # Load data
os_system('bin/python management/tests.py')                         # Run Tests

os_system('pkill -f "python manage.py runserver"')


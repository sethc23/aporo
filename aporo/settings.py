from os import path as os_path

DEBUG = True
TEMPLATE_DEBUG = DEBUG

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.redirects',
    'django_extensions',
    'app',
    'api',
    'rest_framework',
    #'cal',
    # 'xmin',
    'phonegap',
    #'login',
    'corsheaders',
    'registration',
    'password_reset',

)

DATABASES = {
    'default': {
       'ENGINE': 'django.db.backends.mysql',
        'NAME': 'aporo',
        'USER': 'root',
        'PASSWORD': 'Delivery100%',
    }
}

MIDDLEWARE_CLASSES = (
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.contrib.redirects.middleware.RedirectFallbackMiddleware',
    # Uncomment the next line for simple clickjacking protection:
    # 'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'aporo.urls'
WSGI_APPLICATION = 'aporo.wsgi.application'

SECRET_KEY = 'kj2=wf4vc=t_t3*vpjwuf#y8tp%rgw9ur7*y=v(wxxh^flk_yc'
ADMINS =    (
    # ('superuser', 'superuser@superuser.com'),
            )
MANAGERS = ADMINS

# Hosts/domain names that are valid for this site; required if DEBUG is False
# See https://docs.djangoproject.com/en/1.5/ref/settings/#allowed-hosts
ALLOWED_HOSTS = []
TIME_ZONE = 'America/New_York' # http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
LANGUAGE_CODE = 'en-us' # http://www.i18nguy.com/unicode/language-identifiers.html
SITE_ID = 1
# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True
# If you set this to False, Django will not format dates, numbers and
# calendars according to the current locale.
USE_L10N = True

USE_TZ = False

# from pytz import timezone
# localtz = timezone('Europe/Lisbon')
# dt_aware = localtz.localize(dt_unware)

# import dateutil.tz
# import datetime
# localtz = dateutil.tz.tzlocal()
# localoffset = localtz.utcoffset(datetime.datetime.now())
# UTC_OFFSET_hr = (localoffset.days * 86400 + localoffset.seconds) / 3600
    # which equals -4
# UTC_OFFSET_min = (localoffset.days * 86400 + localoffset.seconds) / 60

UTC_OFFSET_hr = -4

DAYS_SCHEDULED_AHEAD = 28
DG_K_PERIOD = 4


PROJECT_ROOT = os_path.dirname(os_path.dirname(__file__))
STATIC_ROOT = os_path.join(PROJECT_ROOT, 'static/')
STATIC_URL = '/static/'

MEDIA_ROOT = '' # "/var/www/example.com/media/"
MEDIA_URL = '' # '/media/'

# Django serves static files differently on development server.
# This makes Django treat static files the same for devel or production.
from sys import argv
try:
    if argv[1] == 'runserver':
        STATIC_ROOT = os_path.join(PROJECT_ROOT, 'static1/')
        STATICFILES_DIRS = (
            os_path.join(PROJECT_ROOT, 'static/'), #project-wide static files
            # Put strings here, like "/home/html/static" or "C:/www/django/static".
            # use absolute paths, not relative paths.
        )
except: pass

TEMPLATE_DIRS = (
    os_path.join(PROJECT_ROOT, 'templates/'), # project-wide templates, absolute paths
)

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
#    'django.contrib.staticfiles.finders.DefaultStorageFinder',
)

TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
#     'django.template.loaders.eggs.Loader',
)

LOGGING = { # See http://docs.djangoproject.com/en/dev/topics/logging
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'formatters': {
        'verbose': {
            'format': '%(levelname)s %(asctime)s %(module)s %(process)d %(thread)d %(message)s',
        },
        'simple': {
            'format': '%(levelname)s %(message)s',
        },
    },
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        },
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'loggers': {
        'django.request': {
            # 'handlers': ['mail_admins'],
            'handlers': ['console'],
            'level': 'ERROR',
            'propagate': True,
        },
    }
}

REST_FRAMEWORK = {
    # Use hyperlinked styles by default.
    # Only used if the `serializer_class` attribute is not set on a view.
    'DEFAULT_MODEL_SERIALIZER_CLASS':
        'rest_framework.serializers.HyperlinkedModelSerializer',
    'DEFAULT_FILTER_BACKENDS': ('rest_framework.filters.DjangoFilterBackend',),

    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        # 'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
        'rest_framework.permissions.AllowAny'
    ]
}

# SERIALIZATION_MODULES = {
#     'json': 'wadofstuff.django.serializers.json'
# }

TASTYPIE_DEFAULT_FORMATS = ['json']
APPEND_SLASH = True
TASTYPIE_ALLOW_MISSING_SLASH=False

CORS_ORIGIN_ALLOW_ALL = True
CORS_ORIGIN_WHITELIST = ()
CORS_URLS_REGEX = r'^/api_view/.*$'
CORS_ALLOW_METHODS = (
        'GET',
        'POST',
        'PUT',
        'PATCH',
        'DELETE',
        'OPTIONS'
    )
CORS_ALLOW_HEADERS = (
        'x-requested-with',
        'content-type',
        'accept',
        'origin',
        'authorization',
        'x-csrftoken'
    )
CORS_EXPOSE_HEADERS = ()
CORS_PREFLIGHT_MAX_AGE = 86400
CORS_ALLOW_CREDENTIALS = True

# CELERY_CACHE_BACKEND = 'dummy'
# EMAIL_BACKEND = 'kopio.core.mailer.backend.DBBackend'
# MAILER_EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# SESSION_ENGINE = 'django.contrib.sessions.backends.signed_cookies'
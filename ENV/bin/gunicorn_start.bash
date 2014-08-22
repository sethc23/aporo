#!/bin/bash

NAME="Aporo"
BASE_DJANGO_DIR=/Users/sethchase/Dropbox/BD_Scripts/django/Dropbox
DJANGODIR=$BASE_DJANGO_DIR/aporo
SOCKFILE=$DJANGODIR/ENV/run/gunicorn.sock  # we will communicte using this unix socket
BIND_SERVER=0.0.0.0:8001
#USER=hello                                        # the user to run as
#GROUP=webapps                                     # the group to run as
NUM_WORKERS=3                                     # how many worker processes should Gunicorn spawn
DJANGO_SETTINGS_MODULE=aporo.settings             # which settings file should Django use
DJANGO_WSGI_MODULE=aporo.wsgi                     # WSGI module name


echo "Starting $NAME as `whoami`"

# Activate the virtual environment
cd $DJANGODIR
source $DJANGODIR/ENV/bin/activate
export DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE
export PYTHONPATH=$DJANGODIR:$PYTHONPATH

# Create the run directory if it doesn't exist
RUNDIR=$(dirname $SOCKFILE)
test -d $RUNDIR || mkdir -p $RUNDIR

# Start your Django Unicorn
# Programs meant to be run under supervisor should not daemonize themselves (do not use --daemon)
exec $DJANGODIR/ENV/bin/gunicorn ${DJANGO_WSGI_MODULE}:application \
--name $NAME \
--workers $NUM_WORKERS \
--bind=$BIND_SERVER \
--log-level=debug \
--log-file=-
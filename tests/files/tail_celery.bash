#!/bin/bash

USER=ub2
SERVER=SERVER2
SERV_HOME=/home/$USER/$SERVER


cd $SERV_HOME/aprinto
source ENV/bin/activate


celery -A sync_app --workdir=$SERV_HOME/aprinto/celery events --dump > /tmp/aprinto_celery_tail &
echo $!
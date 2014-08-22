#OpenResty + Nginx + Supervisor + Gunicorn + Django

The [Nginx primer](http://blog.martinfjordvald.com/2010/07/nginx-primer/) is good and these [resources](http://wiki.nginx.org/Configuration) seem quite useful.  OpenResty was one of several top performers [here](http://www.techempower.com/benchmarks/#section=data-r9&hw=peak&test=update&s=2&l=1z4&d=6).

##OpenResty Variant of Nginx

####Configuration
This [folder](http://...aporo/ENV/archive) contains with configuration parameters and source of the OpenResty variant of Nginx along with the numerous additional modules built and installed in the present version.  Nginx had been previously installed and was integrated with this OpenResty variant.  

####Modifying Users in Mac OS X 
	
	sudo dscl . -create /Groups/webapps
	sudo dscl . -append /Groups/webapps gid 8000
	sudo dscl . -append /Groups/webapps passwd "*"
	sudo dscl . -create /Users/aporo
	sudo dscl . -append /Users/aporo shell /bin/bash
	sudo dscl . -append /Users/aporo home /Users/sethchase/Dropbox/BD_Scripts/django/Dropbox/aporo
	sudo dscl . -append /Users/aporo realname "Aporo"
	sudo dscl . -append /Users/aporo UniqueID 8001
	sudo dscl . -append /Users/aporo PrimaryGroupID 8000
	sudo dscl . -passwd /Users/aporo money
	sudo dscl . -append /Groups/webapps GroupMembership aporo
	sudo dscl . -append /Groups/webapps GroupMembership sethchase
	sudo defaults write /Library/Preferences/com.apple.loginwindow HiddenUsersList -array-add aporo

######Get all groups:

	dscacheutil -q group

####Initial Configuration

######FilePath:
	
	/opt/local/etc/nginx/nginx.conf
		
######Contents:
	
	worker_processes  3;
	#pid        /Users/sethchase/Dropbox/BD_Scripts/django/Dropbox/aporo/ENV/run/nginx.pid;
	events {
	    worker_connections  1024;
	}
	http {
	#    include       mime.types;
	    default_type  application/octet-stream;
	    access_log /Users/sethchase/Dropbox/BD_Scripts/django/Dropbox/aporo/ENV/run/logs/nginx-access.log;
	    error_log /Users/sethchase/Dropbox/BD_Scripts/django/Dropbox/aporo/ENV/run/logs/nginx-error.log;
	    sendfile        on;
	    #tcp_nopush     on;
	    #keepalive_timeout  0;
	    keepalive_timeout  65;
	    upstream hello_app_server {
	      server 0.0.0.0:8001;
	    }
	    server {
	        listen   80 default;
	        server_name *.aporodelivery.com aporodelivery.com;
	        client_max_body_size 4G;
	        
	        location /static/ {
	            root   /Users/sethchase/Dropbox/BD_Scripts/django/Dropbox/aporo/static/;
	        }
	        location /media/ {
	            alias   /Users/sethchase/Dropbox/BD_Scripts/django/Dropbox/aporo/media/;
	        }
	        location / {
	            allow all;
	            try_files $uri @proxy_to_app;
	        }
	        location @proxy_to_app {
	            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	            proxy_set_header Host $http_host;
	            #proxy_redirect off;
	            proxy_pass http://hello_app_server;
	        }
	        error_page 500 502 503 504 /500.html;
	        location = /500.html {
	            root /Users/sethchase/Dropbox/BD_Scripts/django/Dropbox/aporo/static/;
	        }
	    }
	}
######Usage:

	sudo nginx -p /Users/sethchase/Dropbox/BD_Scripts/django/Dropbox/aporo/ENV/run -c /opt/local/etc/nginx/nginx.conf

	sudo launchctl load -w /opt/local/etc/LaunchDaemons/org.macports.nginx/org.macports.nginx.plist

####Other Comments

This [blog](http://michal.karzynski.pl/blog/2013/06/09/django-nginx-gunicorn-virtualenv-supervisor/), it's sequal [here](http://michal.karzynski.pl/blog/2013/10/29/serving-multiple-django-applications-with-nginx-gunicorn-supervisor/), and [source](http://supervisord.org/running.html), suggest adding symbolic links between "sites-available" and "sites-enabled" as a method of separating applications.  Git for this blog is [here](https://gist.github.com/postrational/5747293#file-gunicorn_start-bash).

	Link From	/opt/local/etc/nginx/sites-available/aporo
	To			/opt/local/etc/nginx/sites-enabled/aporo

##Gunicorn
Purpose:  allow asynchonistic, multi-threading, light-weight DB transactions.

######Installation [ from within virtualenv ]

	pip install gunicorn

######Usage

	#!/bin/bash
	# filepath = "/Users/sethchase/Dropbox/BD_Scripts/django/Dropbox/aporo/ENV/bin/gunicorn_start.bash"
	
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

##Supervisor
######Installation [ *global install* ]

	sudo pip install supervisor

######General Configuration:

	# filepath = "/etc/supervisor/conf.d/supervisord.conf"
	
	[unix_http_server]
	file=/Users/sethchase/Dropbox/BD_Scripts/django/Dropbox/aporo/ENV/run/gunicorn.sock
	chmod=0700
	
	[supervisord]
	serverurl = unix:///Users/sethchase/Dropbox/BD_Scripts/django/Dropbox/aporo/ENV/run/gunicorn.sock
	logfile = /Users/sethchase/Dropbox/BD_Scripts/django/Dropbox/aporo/ENV/run/logs/supervisord.log
	logfile_maxbytes = 50MB
	logfile_backups=10
	loglevel = info
	directory = /Users/sethchase/Dropbox/BD_Scripts/django/Dropbox/aporo
	
	[supervisorctl]
	serverurl = unix:///Users/sethchase/Dropbox/BD_Scripts/django/Dropbox/aporo/ENV/run/gunicorn.sock
	
	[rpcinterface:supervisor]
	supervisor.rpcinterface_factory = supervisor.rpcinterface:make_main_rpcinterface
	
	[include]
	files = /etc/supervisor/conf.d/*.conf

######Aporo Confguration

	# filepath = /etc/supervisor/conf.d/aporo.conf

	[program:aporo]
	command = /Users/sethchase/Dropbox/BD_Scripts/django/Dropbox/aporo/ENV/bin/gunicorn_start.bash
	
	#command = /Users/sethchase/Dropbox/BD_Scripts/django/Dropbox/aporo/ENV/bin/gunicorn aporo.wsgi:application --bind 0.0.0.0:8001 --log-level=debug --log-file=/Users/sethchase/Dropbox/BD_Scripts/django/Dropbox/aporo/ENV/run/logs/supervisor_gunicorn_aporo.log
	
	directory=/Users/sethchase/Dropbox/BD_Scripts/django/Dropbox/aporo
	stdout_logfile = /Users/sethchase/Dropbox/BD_Scripts/django/Dropbox/aporo/ENV/run/logs/supervisor_gunicorn_aporo_stdout.log
	redirect_stderr = true
	environment=LANG=en_US.UTF-8,LC_ALL=en_US.UTF-8
	autostart=false
	autorestart=true

####Usage
	
	supervisord -n -c /etc/supervisor/conf.d/supervisord.conf
	
A nifty XML to create a launch daemon was obtained [here](http://nicksergeant.com/running-supervisor-on-os-x/) and looks like this:

	<?xml version="1.0" encoding="UTF-8"?>
	<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
	<plist version="1.0">
	<dict>
	    <key>KeepAlive</key>
	    <dict>
	        <key>SuccessfulExit</key>
	        <false/>
	    </dict>
	    <key>Label</key>
	    <string>com.agendaless.supervisord</string>
	    <key>ProgramArguments</key>
	    <array>
	        <string>/usr/local/share/python/supervisord</string>
	        <string>-n</string>
	        <string>-c</string>
	        <string>/usr/local/share/supervisor/supervisord.conf</string>
	    </array>
	    <key>RunAtLoad</key>
	    <true/>
	</dict>
	</plist>

####Extended Usage:

	launchctl load -w /Library/LaunchDaemons/com.agendaless.supervisord.plist
	
	sudo supervisorctl
	
		(then something like "start aporo")

######[even more Supervisor info](http://supervisord.org/running.html)

#END USE:
1. `sudo launchctl load -w /opt/local/etc/LaunchDaemons/org.macports.nginx/org.macports.nginx.plist`

2. `launchctl load -w /Library/LaunchDaemons/com.agendaless.supervisord.plist`

3. (make sure autostart=True for appropriate cases)

		



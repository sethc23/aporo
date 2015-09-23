from os                 import environ          as os_environ
from os                 import path             as os_path
from os                 import system           as os_cmd
from sys                import path             as py_path
py_path.append(os_path.join(os_environ['SERV_HOME'],'aporo'))
from aporo              import Aporo
AP                      =   Aporo()


# Check if DB exists and make 'aprinto' if not
cmd             =   "sudo -u postgres psql postgres -h 0.0.0.0 --port=%s -l | grep %s | wc -l"%(AP.T.DB_PORT,AP.T.APORO_DB)
proc            =   AP.T.sub_popen([''.join(cmd)], stdout=AP.T.sub_PIPE, shell=True)
(t, err)        =   proc.communicate()
if t.strip()=='0':
    cmd         =   "sudo -u postgres psql postgres -h 0.0.0.0 --port=%s -c 'CREATE DATABASE %s;'"%(AP.T.DB_PORT,AP.T.APORO_DB)
    os_cmd(cmd)

# Load DB
f               =   ['aporo_extensions.sql',
                     'aporo_initial_functions.sql',
                     'aporo_tables.sql',
                     ]

BASE_BUILD_DIR  =   os_path.join(os_environ['SERV_HOME'],'BUILD/files/aporo/setup')

for it in f:
    cmd         =   """sudo -u postgres psql postgres -h 0.0.0.0 --port=%s --dbname=%s
                        -c '\i %s/%s'
                    """%(AP.T.DB_PORT,AP.T.APORO_DB,BASE_BUILD_DIR,it)
    proc        =   AP.T.sub_popen([''.join(cmd.replace('\n','').replace('\t',''))], stdout=AP.T.sub_PIPE, shell=True)
    (t, err)    =   proc.communicate()


import json
from urllib2 import urlopen,Request

from datetime import datetime as DT

THE_PAST = DT(2014,1,2,12,30,0).isoformat()
BASE_URL = 'http://0.0.0.0:8080'


def post_form(f_url, FORM_HTML, BASE_URL):
    from mechanize import Browser,_form
    br=Browser()
    br.open(f_url)
    br._factory.is_html = True
    res = _form.ParseString(FORM_HTML, BASE_URL)
    br.form = res[1]
    br.submit()
    x=br.response().read()
    print x

def post_json(all_data,p_url):
    json_data = json.dumps(all_data)
    headers = {'Content-type': 'application/json'}
    req = Request(p_url, json_data, headers)
    f = urlopen(req)
    response = f.read()
    f.close()
    return response

def new_currier():
    data = [{"app_user_type":"dg",
            "first_name":"John10",
            "last_name":"Smith10",
            "addr1":"Address10",
            "addr2":"Address20",
            "zip":"10010",
            "email":"personal@email.com",
            "cell":"3553555555",
            "lang":"English-ish",
            "emergency_contact_name":"Mama John",
            "emergency_contact_number":"555-555-5555",
            }]
    p_url = BASE_URL+'/api/new_currier/'
    resp = post_json(data,p_url)
    print '\t\tnew currier','\n\t\t\tURL:',p_url,'\n\t\t\t--> SUCCESS\n'
    return resp

def new_vendor(vend_type='mgr'):

    data = [{"app_user_type":"vend_"+vend_type,
            "first_name":"John10",
            "last_name":"Smith10",
            "biz_name":"Business1",
            "biz_addr1":"Address10",
            "biz_addr2":"Address20",
            "biz_zip":"10010",
            "biz_email":"business@email.com",
            "biz_phone":"5555555555",
            "biz_other_phone":"2552552555",
            "biz_days":'Tue-Thu,Sat-Sun',
            "biz_start_times":'11:00 AM, 1:00 AM',
            "biz_end_times":'11:00 PM, 8:00 PM',
            "biz_area":'Murray Hill',
            "biz_holidays":str({"Labor Day":"closed"}),
            "email":"personal@email.com",
            "cell":"3553555555",
            "lang":"English-ish",
            }]

    p_url = BASE_URL+'/api/new_vendor/'
    resp = post_json(data,p_url)
    print '\t\tnew vendor',vend_type,'\n\t\t\tURL:',p_url,'\n\t\t\t--> SUCCESS\n'
    return resp

def schedule(post_action='add',show_resp=False):

    # get first DG
    g_url = BASE_URL+'/api_view/curriers/?format=json'
    x = urlopen(g_url).read().replace('null',"''")
    x = x.replace('false',"False").replace('true',"True")
    x = eval(str(x))
    x = x[0]['url'].strip('/')
    first = x[x.rfind('/')+1:]

    # get all schedules for first DG
    data =      [{   'action':'GET',
                    'currier_id':first
                }]
    p_url = BASE_URL+'/api/dg_contracts/'
    x = post_json(data,p_url)
    x = x.replace('null',"''")
    schedule = eval(str(x))

    all_data = []
    for i in range(0,5):
        data = schedule[i]
        data.update({'currier_id':first,
                     'action':post_action,
                     'check_out_datetime':THE_PAST,
                     })
        all_data.append(data)

    p_url = BASE_URL+'/api/dg_contracts/'
    resp = post_json(all_data,p_url)
    parsed = json.loads(resp)
    print '\t\tschedule, with post-action:',post_action.upper(),'\n\t\t\tURL:',p_url
    if show_resp == True:
        print '\t\t\tServer Response:\n'
        print json.dumps(parsed, indent=4, sort_keys=True)
    print '\n\t\t\t--> SUCCESS\n'
    return resp

def work(post_action='history',show_resp=False):
    if post_action=='history':
        data = [{
                "currier_id" : "1",
                "action" : 'make_old'
            }]
        p_url = BASE_URL+'/api/work/'
        post_json(data,p_url)

    data = [{
                "currier_id" : "1",
                "action" : post_action
            }]
    p_url = BASE_URL+'/api/work/'
    resp = post_json(data,p_url)
    parsed = json.loads(resp)
    print '\n\t\twork',post_action,'\n\t\t\tURL:',p_url
    if show_resp == True:
        print '\t\t\tServer Response:\n'
        print json.dumps(parsed, indent=4, sort_keys=True)
    print '\n\t\t\t--> SUCCESS\n'
    return resp

def device(show_post=False,show_resp=False):
    p_url = BASE_URL+'/api/device/'
    print '\t\tdevice','\n\t\t\tURL:',p_url
    data = {
                "action" : 'update',
                "currier_id" : "1",
            }
    last_updated = str(DT(2014,07,17,12,45,0).isoformat())
    dev_data = {"currier_id" : "1",
			    "model" : "XT926",
                "platform" : "Android",
                "uuid" : "398923",
                "op_sys_ver" : "4.2",
                "battery_level" : "50",
                "update_frequency" : "120",
                "lat" : "0.0045",
                "long" : "0.8983",
                "coord_accuracy" : "1.0",
                "heading" : "0.4444",
                "speed" : "1.508",
                "last_updated" : last_updated,
                "is_active" : "True",
            }
    data.update({"device":dev_data})
    all_data = [data]
    if show_post == True:
        print '\t\t\tJSON Posted:\n'
        print json.dumps(all_data, indent=4, sort_keys=True)
    resp = post_json(all_data,p_url)
    parsed = json.loads(resp)
    if show_resp == True:
        print '\t\t\tServer Response:\n'
        print json.dumps(parsed, indent=4, sort_keys=True)
    print '\n\t\t\t--> SUCCESS\n'
    return resp

print '\n\tTesting...\n'
print '\tBase URL:',BASE_URL,'\n'

new_vendor(vend_type='mgr')
new_vendor(vend_type='empl')
new_currier()
schedule(post_action='add',show_resp=False)
schedule(post_action='remove',show_resp=False)
schedule(post_action='add',show_resp=True)
work(post_action='GET',show_resp=True)
work(post_action='check_in',show_resp=True)
work(post_action='history',show_resp=True)
work(post_action='check_out',show_resp=True)

device(show_post=True,show_resp=True)

print '\n\tTesting COMPLETE\n'


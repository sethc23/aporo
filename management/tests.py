

from sys import argv
import json
from urllib2 import urlopen,Request
from datetime import timedelta
from datetime import datetime as DT


def adjust_json_for_sencha(data):
    # When Django receives post url requests from the Sencha app,
    # all the data is delivered in the first key of a dictionary.
    # The value for the key is null.
    return { str(data[0]): '' }

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

def get_json(p_url,show_resp=False):
    g_url = p_url+'?format=json'
    response = urlopen(g_url).read()
    if show_resp == True:
        parsed = json.loads(response)
        print '\t\t\tServer Response to GET request:\n'
        print json.dumps(parsed, indent=4, sort_keys=True)
    return response

def post_json(all_data,p_url,show_post=False,show_resp=False):
    adj_data = adjust_json_for_sencha(all_data)

    if show_post == True:
        print '\t\t\tJSON Posted:\n'
        print json.dumps(adj_data, indent=4, sort_keys=True)

    json_data = json.dumps(adj_data)
    headers = {'Content-type': 'application/json'}
    req = Request(p_url, json_data, headers)
    f = urlopen(req)
    response = f.read()
    f.close()

    if show_resp == True:
        parsed = json.loads(response)
        print '\t\t\tServer Response:\n'
        print json.dumps(parsed, indent=4, sort_keys=True)

    return response

def new_currier(show_post=False,show_resp=False):
    p_url = BASE_URL+'/api/new_currier/'
    print '\t\tnew currier','\n\t\t\tURL:',p_url

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

    resp = post_json(data,p_url,show_post,show_resp)
    print '\n\t\t\t--> SUCCESS\n'
    return resp

def new_vendor(vend_type='mgr',show_post=False,show_resp=False):
    p_url = BASE_URL+'/api/new_vendor/'
    print '\t\tnew vendor',vend_type,'\n\t\t\tURL:',p_url

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
    resp = post_json(data,p_url,show_post,show_resp)

    print '\n\t\t\t--> SUCCESS\n'
    return resp

def schedule(post_action='add',show_post=False,show_resp=False):
    p_url = BASE_URL+'/api/dg_contracts/'
    print '\t\tschedule, with post-action:',post_action.upper(),'\n\t\t\tURL:',p_url

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

    resp = post_json(all_data,p_url,show_post,show_resp)

    print '\n\t\t\t--> SUCCESS\n'
    return resp

def work(post_action='history',show_post=False,show_resp=False):
    p_url = BASE_URL+'/api/work/'
    print '\n\t\twork',post_action,'\n\t\t\tURL:',p_url

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

    resp = post_json(data,p_url,show_post,show_resp)
    print '\n\t\t\t--> SUCCESS\n'
    return resp

def device(post_action='update',show_post=False,show_resp=False):
    p_url = BASE_URL+'/api/device/'
    print '\t\tdevice','\n\t\t\tURL:',p_url
    data = {
                "action" : post_action,
                "currier_id" : "1",
            }
    last_updated = str(DT(2014,07,17,12,45,0).isoformat())
    dev_data = {"model" : "XT926",
                "platform" : "Android",
                "uuid" : "398923",
                "op_sys_ver" : "4.2",
                "battery_level" : "50",
                "lat" : "0.0045",
                "long" : "0.8983",
                "coord_accuracy" : "1.0",
                "heading" : "0.4444",
                "speed" : "1.508",
                "last_updated" : last_updated,
                "update_frequency" : "120",
                "is_active" : "True",
            }
    data.update({"device":dev_data})
    all_data = [data]
    resp = post_json(all_data,p_url,show_post,show_resp)
    print '\n\t\t\t--> SUCCESS\n'
    return resp

def order(post_action='get',show_post=False,show_resp=False):
    p_url = BASE_URL+'/api/order/'
    print '\t\torder',post_action,'\n\t\t\tURL:',p_url
    data = {"vendor_id" : "1",
            'action': 'get'}
    all_data = [data]
    if post_action.lower()=='get':
        resp = post_json(all_data,p_url,show_post=show_post,show_resp=show_resp)
        print '\n\t\t\t--> SUCCESS\n'
        return resp
    else:
        resp = post_json(all_data,p_url,show_post=False,show_resp=False)
        P = json.loads(resp)
        data = { "vendor_id" : "1" }
        dev_data = []
        if post_action=='remove':
            for i in range(0,len(P)):   # W[0]['url'][W[0]['url'][:-1].rfind('/')+1:-1]
                order_id = P[i]['url'][P[i]['url'][:-1].rfind('/')+1:-1]
                time_soon = DT.now() + timedelta(hours=1,minutes=5*i)
                dev_data.append({"action" : 'remove',
                            "order_id" : order_id,
                            "call_in" : "True",
                            "web" : "False",
                            "req_pickup_time" : time_soon.isoformat(),
                            "deliv_addr" : "Order_Deliv_one_hour",
                            "deliv_cross_street" : "",
                            "price" : "20.00",
                            "comment" : "5th Floor",
                            })
        elif post_action=='add':
            time_in_one_hour = DT.now() + timedelta(hours=1)
            dev_data.append({"action" : 'add',
                            "call_in" : "True",
                            "web" : "False",
                            "req_pickup_time" : time_in_one_hour.isoformat(),
                            "deliv_addr" : "Order_Deliv_one_hour",
                            "deliv_cross_street" : "",
                            "price" : "20.00",
                            "comment" : "5th Floor",
                            })
            time_in_two_hour = DT.now() + timedelta(hours=2)
            dev_data.append({"action" : 'add',
                        "call_in" : "False",
                        "web" : "True",
                        "req_pickup_time" : time_in_two_hour.isoformat(),
                        "deliv_addr" : "Order_Deliv_two_hour",
                        "deliv_cross_street" : "",
                        "price" : "25.00",
                        "comment" : "10th Floor",
                        })

        data.update({"Orders.JSON":dev_data})
        all_data = [data]
        resp = post_json(all_data,p_url,show_post,show_resp)
        print '\n\t\t\t--> SUCCESS\n'
        return resp

def update(post_action='get',show_post=False,show_resp=False):
    p_url = BASE_URL+'/api/update/'
    print '\t\tupdate','\n\t\t\tURL:',p_url
    data = {
                "action" : post_action,
                "currier_id" : "1",
            }
    all_data = [data]
    resp = post_json(all_data,p_url,show_post,show_resp)

    print '\n\t\t\t--> SUCCESS\n'
    return resp

if __name__ == '__main__':
    try:
        test_server = argv[1]
    except:
        # test_server = 'dj_dev'
        test_server = 'local'
        # test_server = 'ec2'

    THE_PAST = DT(2014,1,2,12,30,0).isoformat()

    SERVERS = {'dj_dev' :   'http://0.0.0.0:8080',
               'local'  :   'http://0.0.0.0',
               'ec2'    :   'http://54.191.47.76',
               'ec3'    :   'http://54.186.48.182'}

    BASE_URL = SERVERS[test_server]

    print '\n\tTesting "'+test_server+'"...\n'
    print '\tBase URL:',BASE_URL,'\n'

    # new_vendor(vend_type='mgr')
    # new_vendor(vend_type='empl')
    # new_currier()
    # schedule(post_action='add',show_resp=False)
    # schedule(post_action='remove',show_resp=False)
    # schedule(post_action='add',show_resp=True)
    # work(post_action='GET',show_resp=True)
    # work(post_action='check_in',show_resp=True)
    # work(post_action='history',show_resp=True)
    # work(post_action='check_out',show_resp=True)
    # device(post_action='update',show_post=True,show_resp=True)
    ## update(post_action='update',show_post=True,show_resp=True)
    order(post_action='get',show_post=True,show_resp=True)
    # order(post_action='add',show_resp=False)
    # order(post_action='remove',show_resp=False)
    # order(post_action='add',show_post=True,show_resp=True)

    print '\n\tTesting COMPLETE\n'
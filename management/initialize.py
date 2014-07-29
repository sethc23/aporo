

# from mechanize import Browser,_form
# br=Browser()
# br.open(f_url)

from urllib2 import urlopen

print '\n\tLoading...\n'
g_url = 'http://0.0.0.0:8080/management/load_all_data/'
x = urlopen(g_url).read()
print '\t\tSample and Form Data Loaded'

g_url = 'http://0.0.0.0:8080/management/new_contracts/'
x = urlopen(g_url).read()
print '\t\tEmpty Contracts Created'

g_url = 'http://0.0.0.0:8080/management/update_contracts/'
x = urlopen(g_url).read()
print '\t\tContracts Populated by Vendor'

print '\n\tLoading COMPLETE'

    URL: base_url + /api/order

    JSON:
        {
            "url": "http://aporo.ngrok.com/api_view/orders/1/",
            "created": "2014-07-29T16:05:24",
            "vendor": "http://aporo.ngrok.com/api_view/vendors/1/",
            "vendor_dev": "http://aporo.ngrok.com/api_view/devices/1/",
            "currier": "http://aporo.ngrok.com/api_view/curriers/1/",
            "currier_dev": "http://aporo.ngrok.com/api_view/devices/2/",
            "tag": null,
            "web": true,
            "web_url": "",
            "call_in": false,
            "req_pickup_time": null,
            "deliv_addr": "ONE_deliv_addr",
            "deliv_cross_street": "",
            "deliv_lat": null,
            "deliv_long": null,
            "price": null,
            "tip": null,
            "comment": null
        }

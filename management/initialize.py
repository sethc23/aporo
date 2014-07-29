

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


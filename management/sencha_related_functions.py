

def adjust_json_for_sencha(data):
    # When Django receives post url requests from the Sencha app,
    # all the data is delivered in the first key of a dictionary.
    # The value for the key is null.
    return { str(data[0]): '' }

def handle_dict_strings(x):
    x = x.replace('"null"','None')
    x = x.replace('null','None')
    # x = x.replace('"null"','null')
    x = x.replace('"true"','true').replace('"True"','True')
    x = x.replace('true','True').replace('True','True')
    # x = x.replace('"true"','true').replace('"True"','True')
    x = x.replace('"false"','false').replace('"False"','False')
    x = x.replace('false','False').replace('False','False')
    # x = x.replace('"false"','false').replace('"False"','False')
    return x

def get_sencha_json(request_data):
    x=request_data.keys()[0]
    x=handle_dict_strings(x)
    return eval(x)
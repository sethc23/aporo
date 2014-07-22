from django.shortcuts import render

def index(request):
    return render(request, 'phonegap/phonegap_index.html', {})
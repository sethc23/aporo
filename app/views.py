from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse,HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.views import generic

from app.models import Vendor,Order,Currier

from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def index(request):
    return render(request, 'app/index.html', {})




class IndexView(generic.ListView):
    template_name = 'poll/index.html'
    context_object_name = 'latest_poll_list'

    def get_queryset(self):
        """Return the last five published polls."""
        return Order.objects.order_by('-pub_date')[:5]


class VendorView(generic.DetailView):
    model = Vendor
    template_name = 'polls/registration.html'

class ResultsView(generic.DetailView):
    model = Currier
    template_name = 'polls/results.html'



def registration(request,user_type):
    latest_poll_list = eval(user_type+"objects.order_by('-pub_date')[:5]")
    output = ', '.join([p.question for p in latest_poll_list])
    return HttpResponse(output)
from django.conf.urls.defaults import patterns, url
from .views import api_root, PaymentList, PaymentDetail

urlpatterns = patterns('',
    url(r'^$', api_root),

    # Payments
    url(r'^payment$', PaymentList.as_view(), name='payment-list'),
    url(r'^payment/(?P<pk>[0-9]+)$', PaymentDetail.as_view(), name='payment-detail'),

)
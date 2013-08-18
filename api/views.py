from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from fish.models import Payment
from .serializers import PaymentSerializer


@api_view(('GET',))
def api_root(request, format=None):
    return Response({
        'Payment': reverse('payment-list', request=request),
        # 'repository': reverse('repository-list', request=request),
        # 'deployment': reverse('deployment-list', request=request),
        # 'favoritebranch': reverse('favoritebranch-list', request=request),
        # 'customenvironment': reverse('customenvironment-list', request=request),
    })


class PaymentList(generics.ListAPIView):

    model = Payment
    serializer_class = PaymentSerializer


class PaymentDetail(generics.RetrieveDestroyAPIView):
    model = Payment
    serializer_class = PaymentSerializer
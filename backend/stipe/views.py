from django.shortcuts import render
import stripe
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import PaymentIntentSerializer




@api_view(['POST'])
def create_checkout_session(request):
    serializer = PaymentIntentSerializer(data=request.data)
    
    if serializer.is_valid():
        ammount = serializer.validated_data.get('amount')
        stripe.api_key = 'sk_test_51O6vvcKJHCvj1zk0J8FVNDIGfNjHuAXGTFxGggCmCPYJ2u23hVsEVfpswsWNg7sdPoZnzAHeER8dfZvMqNoFKPtk00OtjWDgtv'
        initiate = stripe.PaymentIntent.create(
            amount=ammount,
            currency='usd',
            payment_method_types=['card'],
        )

        return Response({'id': initiate.client_secret})
    else:
        return Response(serializer.errors, status=400)


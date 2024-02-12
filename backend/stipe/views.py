from django.shortcuts import render, redirect
import stripe
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response 
from django.http import HttpResponse
from .serializer import PaymentIntentSerializer
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
def create_checkout_session(request):
    currency_code = "usd"
    
    total = 20 
    stripe.api_key = "sk_test_51O6vvcKJHCvj1zk0J8FVNDIGfNjHuAXGTFxGggCmCPYJ2u23hVsEVfpswsWNg7sdPoZnzAHeER8dfZvMqNoFKPtk00OtjWDgtv"
    unit_amount = int(total) * 100
    
    # Add the line items to the checkout session
    checkout_session = stripe.checkout.Session.create(
        currency='usd',
        line_items=[
            {
                'price_data': {
                    'currency': 'usd',
                    'unit_amount': int(unit_amount),
                    'product_data': {
                        'name': 'T-shirt',
                        'images': ['https://media.istockphoto.com/id/1501781167/photo/black-t-shirt-isolated-on-white.jpg?s=1024x1024&w=is&k=20&c=Y8-K7Fnrxje1eYzJJ28aNdfxJ7cWPm0gapZv3F71ghA'],
                        'description': 'Comfortable cotton t-shirt',
                    },
                },
                'quantity': 1,
            }
        ],
        success_url=f'http://127.0.0.1:5173/success/{{CHECKOUT_SESSION_ID}}',
        mode='payment',
    )

    return Response({'id': checkout_session.id, 'url': checkout_session.url})



@api_view(['GET'])
def success(request):
    
    session_id = request.GET.get('session_id')
    print(request.body)
    print(session_id)
   
    if session_id:
        stripe.api_key = "sk_test_51O6vvcKJHCvj1zk0J8FVNDIGfNjHuAXGTFxGggCmCPYJ2u23hVsEVfpswsWNg7sdPoZnzAHeER8dfZvMqNoFKPtk00OtjWDgtv"
        session = stripe.checkout.Session.retrieve(session_id)
        
        print(session)
        if session.payment_status == 'paid':
       
            print(f"Payment succeeded for session {session.id}")
            return Response({'message': 'Payment successful'})
    
    return Response({'message': 'Payment not successful'})
import React,{useState, useEffect} from 'react'
import { CardElement,PaymentElement ,LinkAuthenticationElement, useElements , useStripe } from '@stripe/react-stripe-js'
import { toast } from 'react-toastify';


const PaymentForm = ({ ammout }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
   
    useEffect(() => {
        // Fetch the client secret from your Django backend
        fetch('http://127.0.0.1:8000/checkout/create-checkout-session/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: ammout*100 }),
        })
          .then(response => response.json())
          .then(data => {
            setClientSecret(data.id);
          });
      }, []);

    const handlePayment = async (e) => {
      e.preventDefault();
  
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
  
      if (error) {
        console.error(error);
      } else {
        // Payment succeeded
        console.log(paymentIntent);
        toast.success('Payment Successfull');
        if(paymentIntent.status === 'succeeded'){
          console.log('Payment Succeeded')
        }
      }
    };
  
    return (
      <form onSubmit={handlePayment}>
      <CardElement />
     
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    );
  };
  
  export default PaymentForm;

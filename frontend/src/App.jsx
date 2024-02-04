import { useState , useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './componets/payment';
  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const stripePromise = loadStripe('pk_test_51O6vvcKJHCvj1zk01KmpFNEkH2FDoXSTh4i20Y07eEcrYIlYSDBVwv5XxeEP0VloLCS7WGQ3kBW5A6WX4sxMa3SF007d5pZLko');

const App = () => {
  const product = { id: 1, name: 'Your Product', price: 30 }; // Fetch this from your Django backend

  



  return (


 

    <div>
          <ToastContainer />
      <h1>{product.price}</h1>
      
      <Elements stripe={stripePromise}  >
        <PaymentForm ammout={product.price}  />
     </Elements>
    </div>
  );
};

export default App;

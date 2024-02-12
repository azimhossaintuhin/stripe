import React from 'react'


const PaymentForm = ({ ammout }) => {
  const handler = ()=>{
    fetch("http://127.0.0.1:8000/checkout/create-checkout-session/")
    .then((res) => res.json())
    .then((session) => {
      window.location.replace(session.url);
    })
  };



  return (
<button onClick={handler}>Checkout</button>
  );
  };
  
  export default PaymentForm;

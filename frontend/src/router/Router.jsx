import React from 'react'
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import PaymentForm from '../componets/payment'
import Success from '../componets/Success'
const Router = () => {
  return (
   <BrowserRouter>
    <Routes>
        <Route path="/" element = {<PaymentForm/>} />
        <Route path="/success/:session_id" element = {<Success/>} />
    </Routes>gut 
    </BrowserRouter>
  )
}

export default Router

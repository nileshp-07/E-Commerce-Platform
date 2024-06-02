import React from 'react'
import paymentSuccessImage from "../assets/payment-success.jpg"
import { Link } from 'react-router-dom'
const PaymentSuccess = () => {
  return (
    <div className='h-[calc(100vh-3.5rem)] w-full grid place-items-center'>
        <img
            src={paymentSuccessImage}
            className=' w-[300px] h-[300px] md:w-[600px] md:h-[600px]'
        />
        <Link to="/profile/orders">
           <p className='mt-[-50px] font-medium bg-royal-blue-500 text-white py-2 px-5 rounded-md'>Go to orders</p>
        </Link>
    </div>
  )
}

export default PaymentSuccess
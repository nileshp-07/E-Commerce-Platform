import React from 'react'
import { FaTruckFast } from "react-icons/fa6";
import { RiCustomerService2Line } from "react-icons/ri";
import { RiSecurePaymentLine } from "react-icons/ri";

const Benefits = () => {
  return (
    <div className='flex justify-center my-20'>

        <div className='flex justify-evenly items-center w-[90%] border py-10 rounded-lg bg-gray-100'>
            <div className='flex flex-col items-center'>
                <div className='p-2 rounded-full flex justify-center items-center bg-[#c1c1c1]' >
                    <div className='p-3 rounded-full flex justify-center items-center bg-black' >
                        <FaTruckFast size={35} fill='white'/>
                    </div>
                </div>
                <h2 className='text-xl font-semibold uppercase mt-5'>Free and fast delivery</h2>
                <p className='text-[14px] mt-1'>Free delivery for all product above ₹500</p>
            </div>

            <div className='flex flex-col items-center'>
                <div className='p-2 rounded-full flex justify-center items-center bg-[#c1c1c1] ' >
                    <div className='p-3 rounded-full flex justify-center items-center bg-black' >
                       <RiCustomerService2Line size={35} fill='white'/>
                    </div>
                </div>
                <h2 className='text-xl font-semibold uppercase mt-5'>24/7 customer service</h2>
                <p className='text-[14px] mt-1'>Friendly 24/7 customer support</p>
            </div>
            <div className='flex flex-col items-center'>
                <div className='p-2 rounded-full flex justify-center items-center bg-[#c1c1c1]' >
                    <div className='p-3 rounded-full flex justify-center items-center bg-black' >
                      <RiSecurePaymentLine size={35} fill='white'/>
                    </div>
                </div>
                <h2 className='text-xl font-semibold uppercase mt-5'>secure transaction</h2>
                <p className='text-[14px] mt-1'>secure online transaction</p>
            </div>

        </div>
    </div>
  )
}

export default Benefits
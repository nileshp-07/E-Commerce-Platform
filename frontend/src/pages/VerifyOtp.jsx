import React, { useEffect, useState } from 'react'
import OtpInput from "react18-input-otp"
import VerifyOtpImage from "../assets/VerifyOtpImage.jpg"
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { sendOtp, signup } from '../services/operations/authAPI';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

const VerifyOtp = () => {
  const {credentials} = useSelector((state) => state.user);
  const [otp , setOtp] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    if(!credentials)
    {
        navigate("/signup");
    }
  },[])

  const submitHandler = () => {
     if(!otp)
     {
        toast.error("Please enter code");
        return;
     }
     signup(credentials, otp, navigate);
  }
  return (
    <div className='h-[calc(100vh-3.5rem)] flex items-center justify-center'>
       <div className='lg:min-h-[500px] lg:w-[900px] md:w-[500px] w-[350px] md:px-16 px-8  md:py-12 py-6 rounded-xl flex justify-between custom-shadow'>
          <div className='flex flex-col justify-center gap-4'>
             <Link to="/signup">
                <p className='flex gap-1 items-center text-[14px] font-medium text-[#313131]'>
                   <IoIosArrowBack/>
                   back to signup
                </p>
             </Link>

             <h2 className='md:text-3xl text-2xl  font-semibold'>Verify Code</h2>

             <p className='text-[14px] text-[#313131] -mt-3'>an authentication code has been sent to your email</p>

             <p className='label-style mt-1'>Enter Code</p>
             <OtpInput 
                value={otp} 
                numInputs={6} 
                separator={<span>-</span>} 
                onChange={(value)  => setOtp(value)} 
                inputStyle={"otp-style"}
                isInputNum = {true}
                className='-mt-3'
              />

            <div className='-mt-1 text-[15px] font-medium'>
                 Didn't receive a code? {" "}
                <button className='text-[#fb736e]' onClick={() => {
                                                                    setOtp("");
                                                                    sendOtp(credentials.email , navigate)}}>
                   Resend
                </button>
            </div>

            <button
                onClick={submitHandler}
                type='submit'
                className='bg-royal-blue-500 w-full text-center text-white py-2 text-[16px] rounded-md font-medium mt-6'>
                Verify Code
            </button>
          </div>
          <img
            src={VerifyOtpImage}
            alt='verifyOtpImage'
            loading='lazy'
            width={300}
            height={470}
            className='hidden md:block'
          />
       </div>
    </div>
  )
}

export default VerifyOtp
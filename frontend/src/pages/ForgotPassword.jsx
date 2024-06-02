import React, { useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import forgotPasswordImage from "../assets/forgotPasswordImage.jpg"
import { toast } from 'sonner';
import { sendResetPasswordToken } from '../services/operations/authAPI';

const ForgotPassword = () => {
    const [email , setEmail] = useState("");
    const [mailSent , setMailSent] = useState(false)


    const submitHandler = async (e) => {
        e.preventDefault();

        if(!email)
        {
            toast.error("Please enter email first");
            return;
        }

        sendResetPasswordToken(email , setMailSent);
    }


  return (
    <div className='h-[calc(100vh-3.5rem)] flex items-center justify-center'>
        <div className='lg:min-h-[500px] lg:w-[900px] md:w-[500px] w-[350px] md:px-16 px-8  md:py-12 py-6  rounded-xl flex justify-between custom-shadow'>
        <div className='flex flex-col justify-center gap-4 max-w-[400px]'>
            <Link to="/login">
                <p className='flex gap-1 items-center text-[14px] font-medium text-[#313131]'>
                    <IoIosArrowBack/>
                    back to login
                </p>
            </Link>

            <h2 className='md:text-3xl text-2xl font-semibold'>Forgot Your Password?</h2>

            <p className='text-[14px] text-[#313131] -mt-2'>Don’t worry, happens to all of us. Enter your email below to recover your password</p>


            <form>
                <div className='flex flex-col'>
                    <label htmlFor='email' className='label-style'>Email</label>
                    <input
                        type='email'
                        required
                        disabled = {mailSent}
                        id='email'
                        name='email'
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='info@xyz.com'
                        className='field-style'
                    />
                </div>


                <button
                    onClick={submitHandler}
                    type='submit'
                    className='bg-royal-blue-500 w-full text-center text-white py-2 text-[16px] rounded-md font-medium md:mt-10 mt-7 cursor-pointer'>
                    {
                        mailSent ? "Resend mail" : "Submit"
                    }
                </button>
            </form>
            
        </div>
        <img
            src={forgotPasswordImage}
            alt='verifyOtpImage'
            loading='lazy'
            width={300}
            height={470}
            className='hidden lg:block'
        />
        </div>
    </div>
  )
}

export default ForgotPassword
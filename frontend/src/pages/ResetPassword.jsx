import React, { useState } from 'react'
import resetPasswordImage from "../assets/forgotPasswordImage.jpg"
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { toast } from 'sonner';
import { resetPassword } from '../services/operations/authAPI';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  let {token} = useParams();
  const [password , setPassword] = useState("");
  const [confirmPassword , setConfirmPassword] = useState("");
  const [showPassword , setShowPassword] = useState(false);
  const [showConfirmPassword , setShowConfirmPassword] = useState(false);


  const submitHandler = async (e) => {
    e.preventDefault();

    if(!password || !confirmPassword)
    {
        toast.error("Please enter the fields first");
        return;
    }


    if(password !== confirmPassword)
    {
        toast.error("Password Mis-matched");
        return;
    }

    resetPassword(password , confirmPassword ,token, navigate)


  }
  return (
    <div className='h-[calc(100vh-3.5rem)] flex items-center justify-center'>
        <div className='lg:min-h-[500px] lg:w-[900px] md:w-[500px] w-[350px]  md:px-16 px-8  md:py-12 py-6  rounded-xl flex justify-between custom-shadow'>
            <div className='flex flex-col justify-center gap-4 max-w-[400px]'>
                
                <h2 className='md:text-3xl text-2xl font-semibold'>Set a new password</h2>

                <p className='text-[14px] text-[#313131] -mt-2'>Your previous password has been reseted. Please set a new password for your account.</p>


                <form
                    onSubmit={submitHandler}>

                    <div className='flex flex-col mt-2 relative'>
                        <label htmlFor='password' className='label-style'>create password:</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            id='password'
                            name='password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder='xxxxxxx'
                            className='field-style'
                        />
                        <span 
                            className='absolute right-3 top-[53%] cursor-pointer'
                            onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? (<IoMdEyeOff size={20}/>) : (<IoEye size={20}/>)
                            }
                        </span>
                    </div>

                    <div className='flex flex-col mt-4 relative'>
                        <label htmlFor='confirmPassword' className='label-style'>re-enter password:</label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            required
                            id='confirmPassword'
                            name='confirmPassword'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            placeholder='xxxxxxx'
                            className='field-style'
                        />
                        <span 
                            className='absolute right-3 top-[53%] cursor-pointer'
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {
                                showConfirmPassword ? (<IoMdEyeOff size={20}/>) : (<IoEye size={20}/>)
                            }
                        </span>
                    </div>


                    <button
                        type='submit'
                        className='bg-royal-blue-500 w-full text-center text-white py-2 text-[16px] rounded-md font-medium mt-10 cursor-pointer'>
                            Set Password
                    </button>
                </form>
                
            </div>
            <img
                src={resetPasswordImage}
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

export default ResetPassword
import React, { useState } from 'react'
import LoginImage from "../assets/VerifyOtpImage.jpg"
import { Link, useNavigate } from 'react-router-dom'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { toast } from 'sonner';
import { login } from '../services/operations/authAPI';
import { useDispatch } from 'react-redux';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword , setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password , setPassword] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();

        if(!password || !email)
        {
            toast.error("All fileds are required");
            return;
        }

        login(email , password, navigate, dispatch)
    }
  return (
    <div className='grid place-items-center h-[calc(100vh-3.5rem)]'>
        <div className='md:min-h-[500px] lg:w-[1000px] md:w-[500px] w-[350px] md:px-16 px-8  md:py-12 py-6 custom-shadow rounded-xl flex justify-between'>
            <div className='flex flex-col gap-4 justify-center'>
                <div className='md:text-3xl text-2xl font-semibold mb-2'>
                    <span className='text-royal-blue-500'>Welcome Back!</span>
                    <p>Login to Access Your World</p>
                </div>

                <form
                  onSubmit={submitHandler}
                  className='w-full relative'>
                    <div className='flex flex-col'>
                        <label htmlFor='email' className='label-style'>Email:</label>
                        <input 
                            type='email'
                            required
                            id='email'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='info@xyz.com'
                            className='field-style'
                            />
                    </div>

                    <div className='flex flex-col mt-4 relative'>
                        <label htmlFor='password' className='label-style'>Password:</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            name='password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='xxxxxxxxx'
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

                    <Link to="/forgot-password">
                      <p className='text-[14px] font-medium text-[#fb736e] cursor-pointer w-fit inline absolute right-0'>Forgot Password</p>
                    </Link>

                    <button 
                      type='submit'
                      className='bg-royal-blue-500 w-full text-center text-white py-2 text-[16px] rounded-md font-medium mt-12'>
                        Login
                    </button>


                    <p className='mt-3 text-center text-[15px] font-medium'>Don't have an account?  {" "} 
                        <Link to="/signup">
                          <span className='text-[#fb736e]'>Signup</span>
                        </Link>
                    </p>
                </form>
            </div>
            <img
                src={LoginImage}
                loading='lazy'
                alt='LoginImage'
                width={340}
                className='hidden lg:block'
            />
        </div>
    </div>
  )
}

export default Login
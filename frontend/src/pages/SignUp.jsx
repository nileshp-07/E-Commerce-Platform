import React, { useState } from 'react'
import signUpImage from "../assets/signUpImage.jpg"
import { Link, useNavigate } from 'react-router-dom'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import {toast} from "sonner"
import { useDispatch } from 'react-redux';
import { setCredentails } from '../redux/slices/userSlice';
import { sendOtp } from '../services/operations/authAPI';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword , setShowPassword] = useState(false)
    const [showConfirmPassword , setShowConfirmPassword] = useState(false);
    const [termAndPolicy , setTermAndPolicy] = useState(false);
    const [formData , setFormData] = useState({
        name : "",
        email : "",
        password : "",
        confirmPassword : "",
    })


    const changeHandler = (e) => {
        const {name , value} = e.target;
        
        setFormData((prev) => (
            {
                ...prev ,
                [name] : value
            }
        ))
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if(!formData.name || !formData.email  || !formData.password || !formData.confirmPassword)
        {
            toast.error("All fields are required");
            return;
        }

        if(!termAndPolicy)
        {
            toast.error("Please accept terms and privacy policy");
            return;
        }


        if(formData.password !== formData.confirmPassword)
        {
            toast.error("Password does not match");
            formData.password = "";
            formData.confirmPassword = "";
            return;
        }


        // save the signp Credential to redux store
        dispatch(setCredentails(formData));


        // send the verication otp to user email 
        sendOtp(formData.email , navigate);


        // reset the fields 
        setFormData({
            name : "",
            email : "",
            password : "",
            confirmPassword : "",
        });

        setTermAndPolicy(false);
    }
  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-3.5rem)] my-5'>

        <div className='lg:w-[1000px] md:w-[500px] w-[350px] lg:min-h-[500px]  md:px-16 px-8  md:py-12 py-6 rounded-xl flex justify-between custom-shadow ' >
            <img
                src={signUpImage}
                alt='signupImage'
                loading='lazy'
                width={340}
                height={570}
                className='hidden lg:block'
            />

            <div className='flex flex-col items-center'>
                <h2 className='md:text-3xl text-2xl font-semibold mb-5'>
                   Fashion Awaits Your Signature <br/>
                   <span className='text-royal-blue-500'>Join Now for Exclusive Offers!</span>
                </h2>

                <form onSubmit={submitHandler}
                    className=' w-full'>
                    <div className='flex flex-col'>
                        <label htmlFor='name' className='label-style'>Name:</label>
                        <input
                            type='text'
                            name='name'
                            id='name'
                            value={formData.name}
                            onChange={changeHandler}
                            placeholder='Enter your name'
                            className='field-style'
                        />
                    </div>
                   
                    <div className='flex flex-col mt-4'>
                        <label htmlFor='email' className='label-style'>Email:</label>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            value={formData.email}
                            placeholder='info@xyz.com'
                            className='field-style'
                            onChange={changeHandler}
                        />
                    </div>
                    

                    <div className='flex flex-col mt-4 relative'>
                        <label htmlFor='password' className='label-style'>Password:</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name='password'
                            id='password'
                            value={formData.password}
                            onChange={changeHandler}
                            placeholder='xxxxxxxxxx'
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
                        <label htmlFor='confirmPassword' className='label-style'>Confirm Password:</label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name='confirmPassword'
                            id='confirmPassword'
                            value={formData.confirmPassword}
                            onChange={changeHandler}
                            placeholder='xxxxxxxxxx'
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


                    <div className='space-x-2 flex items-center mt-2'>
                        <input
                            type='checkbox'
                            name='termAndPolicy'
                            id='termAndPolicy'
                            onChange={() => setTermAndPolicy(!termAndPolicy)}
                            checked = {termAndPolicy}
                            className='cursor-pointer h-[14px] w-[14px]'
                        />
                        <label html="T&C" className='text-[14px] font-medium'>I agree with all the <span className='text-[#fb736e] cursor-pointer'>Terms</span> and <span className='text-[#fb736e] cursor-pointer'>Privacy Policy</span></label>
                    </div>


                    <button 
                        type='submit'
                        className='bg-royal-blue-500 w-full text-center text-white py-2 text-[16px] rounded-md font-medium mt-5'>
                        Create Account
                    </button>

                    <div className='mt-3 text-center text-[15px] font-medium'>
                        Already having an account? {" "}
                        <Link to="/login">
                            <button className='text-[#fb736e]'>
                                Login
                            </button>
                        </Link>
                    </div>
                    
                </form>
            </div>
        </div>
    </div>
  )
}

export default SignUp
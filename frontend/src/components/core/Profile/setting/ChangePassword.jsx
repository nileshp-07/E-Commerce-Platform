import React, { useState } from 'react'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

const ChangePassword = () => {
    const [password , setPassword] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");
    const [showPassword , setShowPassword] = useState(false);
    const [showConfirmPassword , setShowConfirmPassword] = useState(false);
  return (
    <div>
       <div className='profile-shadow rounded-md py-6 px-10 border'>
           <h2 className='text-xl font-semibold mb-5'>Change Password</h2>
           <form>
              
                <div className='flex gap-5'>
                    <div className='flex flex-col relative w-[50%]'>
                        <label htmlFor='password'>Current Password:</label>
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

                    <div className='flex flex-col relative w-[50%]'>
                        <label htmlFor='confirmPassword'>New password:</label>
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
                </div>

                <div className='flex justify-end mt-8'>
                    <button className='py-2 px-4 rounded-md bg-royal-blue-500 text-white font-medium'>
                       Update Password
                    </button>
                </div>
           </form>
       </div>
    </div>
  )
}

export default ChangePassword
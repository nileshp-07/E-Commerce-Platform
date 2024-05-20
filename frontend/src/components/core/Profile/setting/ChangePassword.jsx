import React, { useState} from 'react'
import {useSelector } from 'react-redux'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import {toast} from "sonner"
import { changePassword } from '../../../../services/operations/profileAPI';

const ChangePassword = () => {
    const {token} = useSelector((state) => state.user);
    const [password , setPassword] = useState("");
    const [newPassword , setNewPassword] = useState("");
    const [showPassword , setShowPassword] = useState(false);
    const [showNewPassword , setShowNewPassword] = useState(false);

    const handleChangePassword = async () => {
        if(!password || !newPassword)
        {
            toast.error("password and new password required");
            return;
        }

        await changePassword({password , newPassword}, token);

        setPassword("");
        setNewPassword("");
    }
  return (
    <div>
       <div className='profile-shadow rounded-md md:py-6 py-3 md:px-10 px-6 border'>
           <h2 className='text-xl font-semibold mb-5'>Change Password</h2>              
                <div className='flex md:flex-row flex-col gap-5'>
                    <div className='flex flex-col relative md:w-[50%]'>
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

                    <div className='flex flex-col relative md:w-[50%]'>
                        <label htmlFor='confirmPassword'>New password:</label>
                        <input
                            type={showNewPassword ? "text" : "password"}
                            required
                            id='newPassword'
                            name='newPassword'
                            onChange={(e) => setNewPassword(e.target.value)}
                            value={newPassword}
                            placeholder='xxxxxxx'
                            className='field-style'
                        />
                        <span 
                            className='absolute right-3 top-[53%] cursor-pointer'
                            onClick={() => setShowNewPassword(!showNewPassword)}>
                            {
                                newPassword ? (<IoMdEyeOff size={20}/>) : (<IoEye size={20}/>)
                            }
                        </span>
                    </div>  
                </div>

                <div className='flex justify-end mt-8'>
                    <button 
                       onClick={handleChangePassword}
                       className='md:py-2 py-1 px-4 rounded-md bg-royal-blue-500 text-white font-medium'>
                       Update Password
                    </button>
                </div>
       </div>
    </div>
  )
}

export default ChangePassword
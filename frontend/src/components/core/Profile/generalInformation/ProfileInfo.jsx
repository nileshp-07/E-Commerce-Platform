import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const ProfileInfo = () => {
  const {user} = useSelector((state) => state.user)
  const [isEdit , setIsEdit] = useState(false);

  console.log(user);
  return (
    <div>
        <h2 className='text-2xl font-semibold'>General Information</h2>

        <div>
            <div className='py-6 px-8 border rounded-md flex items-center gap-5' >
                <div>
                    <img
                        src={user.profileImage}
                        className='h-[120px] w-[120px] aspect-square rounded-full'
                    />
                </div>
                <div>
                    <p className='text-[18px] font-semibold text-gray-900'>{user.name}</p>
                    <button className='py-2 px-5 bg-royal-blue-500 rounded-md text-white mt-3'>
                        Change
                    </button>
                </div>
            </div>

            <div className='flex justify-end'>
                <button className='py-2 px-5 bg-royal-blue-500 rounded-md text-white mt-10 mb-3'>
                    {
                        isEdit ? "Save Changes" : "Edit"
                    }
                </button>
            </div>
            <div className='py-6 px-10 rounded-md border'>
                <div className='flex justify-between gap-10'>
                    <div className='flex flex-col w-[50%]'>
                        <label htmlFor='name'>Name:</label>
                        <input
                            type='text'
                            name='name'
                            value={user.name}
                            className='field-style w-full'
                        />
                    </div>

                    <div className='flex flex-col w-[50%]'>
                        <label htmlFor='email'>Email:</label>
                        <input
                            type='email'
                            name='email'
                            value={user.email}
                            className='field-style'
                        />
                    </div>
                </div>

                <div className='flex justify-between gap-10 mt-5'>
                    <div className='flex flex-col w-[50%]'>
                        <label htmlFor='DOB'>Date of Birth:</label>
                        <input
                            type='text'
                            name='DOB'
                            value={user.profileDetails.dateOfBirth}
                            placeholder='dd/mm/yyyy'
                            className='field-style w-full'
                        />
                    </div>

                    <div className='flex flex-col w-[50%]'>
                        <label htmlFor='gender'>Gender:</label>
                        <input
                            type='text'
                            name='gender'
                            placeholder='gender'
                            value={user.profileDetails.gender}
                            className='field-style'
                        />
                    </div>
                </div>

                <div className='flex flex-col w-[48%] mt-5'>
                    <label htmlFor='contactNumber'>Contact Number:</label>
                    <input
                        type='number'
                        name='contactNumber'
                        value={user.profileDetails.contactNumber}
                        placeholder='123456789'
                        className='field-style'
                    />
                </div>

                <div className='flex flex-col w-full mt-5'>
                    <label htmlFor='contactNumber'>About:</label>
                    <textarea
                        name='about'
                        className='outline w-full h-[100px]'
                    ></textarea>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileInfo
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const ProfileInfo = () => {
  const {user} = useSelector((state) => state.user)
  const [isEdit , setIsEdit] = useState(false);
  const [formData , setFormData] = useState({
     name : user.name,
     email : user.email,
     gender : user.profileDetails.gender,
     dateOfBirth : user.profileDetails.dateOfBirth,
     contactNumber : user.profileDetails.contactNumber,
     about : user.profileDetails.bio
  })

  console.log("FORMDATA : " ,formData)

  const editProfileDetails = () => {

  }

  const changeHandler = (e) => {
    const {name , value} = e.target;
    setFormData( (prev) => (
        {
            ...prev,
            [name] : value
        }
    ))
  }

  console.log(user);
  return (
    <div className='pb-10'>
        <h2 className='text-2xl font-semibold mb-10 '>General Information</h2>

        <div>
            <div className='py-6 px-8 border rounded-md flex items-center gap-5 profile-shadow' >
                <div>
                    <img
                        src={user.profileImage}
                        className='h-[120px] w-[120px] aspect-square rounded-full'
                    />
                </div>
                <div>
                    <p className='text-[18px] font-medium text-gray-900'>{user.name}</p>
                    <button className='py-[6px] px-4 bg-royal-blue-500 rounded-md text-white mt-3'>
                        Change
                    </button>
                </div>
            </div>

            <div className='flex justify-end'>
                <button 
                     onClick={isEdit ? editProfileDetails : () => setIsEdit(true)}    
                    className='py-[6px] px-4 bg-royal-blue-500 rounded-md text-white mt-10 mb-3 '>
                    {
                        isEdit ? "Save Changes" : "Edit"
                    }
                </button>
            </div>
            <div className='py-6 px-10 rounded-md border profile-shadow'>
                <div className='flex justify-between gap-10'>
                    <div className='flex flex-col w-[50%]'>
                        <label htmlFor='name'>Name:</label>
                        <input
                            type='text'
                            name='name'
                            value={isEdit ? formData.name : user.name}
                            onChange={changeHandler}                              
                            disabled ={!isEdit}
                            className={`field-style w-full text-[18px] ${!isEdit && "text-gray-800"}`}
                        />
                    </div>

                    <div className='flex flex-col w-[50%]'>
                        <label htmlFor='email'>Email:</label>
                        <input
                            type='email'
                            name='email'
                            value={isEdit ? formData.email : user.email}
                            onChange={changeHandler}
                            disabled ={!isEdit}
                            className={`field-style w-full text-[18px] ${!isEdit && "text-gray-800"}`}
                        />
                    </div>
                </div>

                <div className='flex justify-between gap-10 mt-5'>
                    <div className='flex flex-col w-[50%]'>
                        <label htmlFor='DOB'>Date of Birth:</label>
                        <input
                            type={isEdit ? "date" : "text"}
                            name='DOB'
                            // value={!isEdit && user.profileDetails.dateOfBirth}
                            // onChange={changeHandler}
                            disabled ={!isEdit}
                            placeholder='dd/mm/yyyy'
                            className={`field-style w-full text-[18px] ${!isEdit && "text-gray-800"}`}
                            />
                    </div>

                    <div className='flex flex-col w-[50%]'>
                        <label htmlFor='gender'>Gender:</label>
                        <select
                         name='gender'
                         disabled={!isEdit}
                         onChange={changeHandler}
                         value={isEdit ? formData.gender : user.profileDetails.gender}
                         className={`field-style w-full text-[18px]`}>
                            <option disabled selected>Select</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>
                </div>

                <div className='flex flex-col w-[48%] mt-5'>
                    <label htmlFor='contactNumber'>Contact Number:</label>
                    <div className='flex gap-2'>
                        <select
                            name='countryCode'
                            className='field-style w-fit'>
                            <option selected>+91</option>
                        </select>
                        <input
                            type='number'
                            name='contactNumber'
                            value={isEdit ? formData.contactNumber : user.profileDetails.contactNumber}
                            onChange={changeHandler}
                            disabled ={!isEdit}
                            placeholder='123456789'
                            className={`field-style w-full text-[18px] ${!isEdit && "text-gray-800"}`}
                        />
                    </div>
                </div>

                <div className='flex flex-col w-full mt-5'>
                    <label htmlFor='contactNumber'>About:</label>
                    <textarea
                        name='about'
                        className='w-full h-[130px] field-style'
                        placeholder='Write about yourself..'
                        onChange={changeHandler}
                        value={isEdit ? formData.about : user.profileDetails.bio}
                        disabled = {!isEdit}
                    ></textarea>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileInfo
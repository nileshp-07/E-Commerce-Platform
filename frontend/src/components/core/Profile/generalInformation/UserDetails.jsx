import React, { useState } from 'react'


const UserDetails = ({user}) => {
    const [isEdit , setIsEdit] = useState(false);
    const [formData , setFormData] = useState({
       name : user.name,
       email : user.email,
       gender : user.profileDetails.gender,
       dateOfBirth : user.profileDetails.dateOfBirth,
       contactNumber : user.profileDetails.contactNumber,
       about : user.profileDetails.bio
    })

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
  
    const formattedDateOfBirth = (date) => {
      // const parts = formData.dateOfBirth.split('-');
      const parts = date.split('-');
      if (parts.length === 3) {
          console.log(`Date : ${parts[2]}-${parts[1]}-${parts[0]}`)
          return `${parts[0]}-${parts[1]}-${parts[2]}`;
      }
      return ''; // Invalid date format, return empty string or handle error
    };

  return (
    <div className='mt-20'>
        <div className='flex justify-between items-center mb-3'>
            <h2 className='text-xl font-semibold'>Profile Details</h2>
            <button 
                 onClick={isEdit ? editProfileDetails : () => setIsEdit(true)}    
                className='py-[6px] px-4 bg-royal-blue-500 rounded-md text-white'>
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
                    <label htmlFor='dateOfBirth'>Date of Birth:</label>
                    <input
                        type={isEdit ? "date" : "text"}
                        name='dateOfBirth'
                        value={isEdit ? formattedDateOfBirth(formData.dateOfBirth) : user.profileDetails.dateOfBirth}
                        onChange={changeHandler}
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
  )
}

export default UserDetails
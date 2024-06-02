import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileDetails } from '../../../../services/operations/profileAPI';


const UserDetails = ({user, setLoading}) => {
    const [isEdit , setIsEdit] = useState(false);
    const {token} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [formData , setFormData] = useState({
       name : user.name,
       email : user.email,
       gender : user.profileDetails.gender,
       dateOfBirth : user.profileDetails.dateOfBirth,
       contactNumber : user.profileDetails.contactNumber,
       about : user.profileDetails.bio
    })

    const editProfileDetails = async () => {

        setLoading(true);

        await updateProfileDetails(formData, token , dispatch);

        setLoading(false);

        setIsEdit(false);

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
      const parts = date?.split('-');
      if (parts?.length === 3) {
          return `${parts[0]}-${parts[1]}-${parts[2]}`;
      }
      return ''; // Invalid date format, return empty string or handle error
    };

  return (
    <div className='md:mt-20 mt-16'>
        <div className='flex justify-between items-center mb-3'>
            <h2 className='md:text-xl text-lg font-semibold'>Profile Details</h2>
            {
                !isEdit  && (
                    <button 
                        onClick={() => setIsEdit(true)}    
                        className='md:py-[6px] py-[5px] px-5  bg-royal-blue-500 rounded-md text-white'>
                        Edit
                    </button>
                )
            }
        </div>
        <div className='md:py-6 py-3 md:px-10 px-6 rounded-md border profile-shadow'>
            <div className='flex md:flex-row flex-col justify-between md:gap-10 gap-5'>
                <div className='flex flex-col md:w-[50%]'>
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

                <div className='flex flex-col md:w-[50%]'>
                    <label htmlFor='email'>Email:</label>
                    <input
                        type='email'
                        name='email'
                        value={isEdit ? formData.email : user.email}
                        onChange={changeHandler}
                        disabled
                        className={`field-style w-full text-[18px] ${!isEdit && "text-gray-800"}`}
                    />
                </div>
            </div>

            <div className='flex justify-between md:gap-10 gap-5 mt-5'>
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

            <div className='flex flex-col md:w-[48%] mt-5'>
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
                    className='w-full md:h-[130px] h-[100px] field-style'
                    placeholder='Write about yourself..'
                    onChange={changeHandler}
                    value={isEdit ? formData.about : user.profileDetails.bio}
                    disabled = {!isEdit}
                ></textarea>
            </div>
            {
                isEdit && (
                    <div className='flex justify-end gap-5 mt-4'>
                        <button 
                            onClick={() => setIsEdit(false)}    
                            className='md:py-[6px] py-[5px] px-4 border rounded-md text-black'>
                            Cancel
                        </button>

                        <button 
                            onClick={editProfileDetails}    
                            className='md:py-[6px] py-[5px] px-4 bg-royal-blue-500 rounded-md text-white'>
                            Save Changes
                        </button>
            
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default UserDetails
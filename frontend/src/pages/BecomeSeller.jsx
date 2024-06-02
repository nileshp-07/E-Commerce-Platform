import React, { useState } from 'react'
import { becomeSeller } from '../services/operations/profileAPI';
import {useSelector} from "react-redux"

const BecomeSeller = () => {
    const {token} = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        name : "",
        email : "",
        contactNumber : "",
        address : {
            street : "",
            city : "",
            postalCode: "",
            state: "",
            country : "India"
        },
        productCategories : ""
    })


  const changeHandler = (e) => {
      const {name , value} = e.target;

      setFormData((prev) => (
        {
            ...prev,
            [name] : value
        }
      ))
  }

  const addressChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        address: {
        ...prevFormData.address,
        [name]: value,
        },
    }));
  }


  const submitHandler = async (e) => {
    e.preventDefault();
     await becomeSeller(formData, token);

     setFormData(
        {
            name : "",
            email : "",
            contactNumber : "",
            address : {
                street : "",
                city : "",
                postalCode: "",
                state: "",
                country : "India"
            },
            productCategories : ""
        }
     )
  }
  return (
    <div className=' w-full'>
        <div className='w-11/12 max-w-[1200px] mx-auto my-6'>
            <h2 className='text-xl font-semibold'>Want to become a seller!!</h2>
            <p className='mt-2 text-lg md:max-w-[60%]'>
               Excited to start selling products on our platform? Fill out the form below, 
               and we'll be in touch with you shortly to kickstart your journey as a seller!
            </p>

            <div className='md:w-[700px] mx-auto md:px-7 px-5 py-3 mt-7 rounded-md border custom-shadow'>
               <form onSubmit={submitHandler}>
                <div className='flex flex-col'>
                    <label htmlFor='name'>Name:</label>
                    <input
                        type = "text"
                        name = "name"
                        required
                        value={formData.name}
                        placeholder='Enter your name'
                        onChange={changeHandler}
                        className='field-style'
                    />
                </div>

                <div className='flex flex-col md:flex-row gap-3 md:gap-5 mt-3'>
                    <div className='flex flex-col md:w-[48%]'>
                        <label htmlFor='email'>Email:</label>
                        <input
                            type = "email"
                            name = "email"
                            required
                            value={formData.email}
                            placeholder='Enter your email address'
                            onChange={changeHandler}
                            className='field-style '
                        />
                    </div>

                    <div className='flex flex-col md:w-[48%]'>
                        <label htmlFor='contactNumber'>Contact Number:</label>
                        <input
                            type = "Number"
                            name = "contactNumber"
                            required
                            value={formData.contactNumber}
                            placeholder='Enter your Contact Number'
                            onChange={changeHandler}
                            className='field-style'
                        />
                    </div>
                </div>

                <div className='mt-3 flex flex-col '>
                    <label htmlFor='productCategories'>Product Categories:</label>
                    <input
                        type = "text"
                        name = "productCategories"
                        value={formData.productCategories}
                        placeholder='category of your products'
                        onChange={changeHandler}
                        className='field-style'
                    />
                </div>

                <div className='md:w-[70%] mt-3'>
                    <div className='flex flex-col'>
                        <label htmlFor='street'>Street Address:</label>
                        <input
                            type = "text"
                            name = "street"
                            required
                            value={formData.address.street}
                            placeholder='street Address'
                            onChange={addressChangeHandler}
                            className='field-style'
                        />
                    </div>

                    <div className='flex md:gap-5 gap-3 mt-3 w-full'>
                        <div className='flex flex-col w-[48%]'>
                            <label htmlFor='city'>City:</label>
                            <input
                                type = "text"
                                name = "city"
                                required
                                value={formData.address.city}
                                placeholder='city'
                                onChange={addressChangeHandler}
                                className='field-style'
                            />
                        </div>
                        <div className='flex flex-col w-[48%]'>
                            <label htmlFor='postalCode'>Postal Code:</label>
                            <input
                                type = "text"
                                name = "postalCode"
                                required
                                value={formData.address.postalCode}
                                placeholder='Postal Code'
                                onChange={addressChangeHandler}
                                className='field-style '
                            />
                        </div>
                    </div>

                    <div className='flex md:gap-5 gap-3 mt-3 w-full'>
                        <div className='flex flex-col w-[48%]'>
                            <label htmlFor='state'>State:</label>
                            <input
                                type = "text"
                                name = "state"
                                required
                                value={formData.address.state}
                                placeholder='state'
                                onChange={addressChangeHandler}
                                className='field-style'
                            />
                        </div>
                        <div className='flex flex-col w-[48%]'>
                            <label htmlFor='country'>Country:</label>
                            <input
                                type = "text"
                                name = "country"
                                disabled
                                value={formData.address.country}
                                placeholder='country'
                                className='field-style'
                            />
                        </div>
                    </div>
                </div>
                

                    <div className='mt-5 flex justify-end mb-2'>
                        <button
                           onClick={submitHandler}
                           type='submit' 
                           className='md:py-2 py-1 px-5 text-white bg-royal-blue-500 rounded-md font-medium'>
                            Submit
                        </button>
                    </div>
               </form>
            </div>
        </div>
    </div>
  )
}

export default BecomeSeller
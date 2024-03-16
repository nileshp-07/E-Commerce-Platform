import React, { useState } from 'react'
import { MdModeEditOutline, MdOutlineModeEditOutline } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

const Address = ({addr}) => {
  const [isEdit , setIsEdit] = useState(false)
  const [address , setAddress] = useState(addr)


  const changeHandler = (e) => {
     const {name , value} = e.target;

     setAddress( (prev) => (
        {
            ...prev,
            [name] : value
        }
    ))
  }
  
  return (
    <div className='p-4 rounded-md border  mb-7'>
        <div className='flex justify-end gap-5 mb-2'>
             <button
               onClick={() => setIsEdit(true)}
               disabled={isEdit}
               className="disabled:text-gray-500">
               <MdModeEditOutline size={24}/>
             </button>
             <button>
               <MdDeleteOutline size={24}/>
             </button>
        </div>
 
        <form>
            <div className='w-full relative'>
                <label htmlFor='street' className='absolute left-5 -top-[13px] bg-white'>Street Address</label>
                <div>
                    <input
                        type='text'
                        name='street'
                        disabled={!isEdit}
                        value={address.street}
                        onChange={changeHandler}
                        className='px-[10px] py-[13px] border border-gray-400 rounded-md bg-white w-full'
                    />
                </div>
            </div>

            <div className='flex gap-10 mt-6'>
                <div className='w-[50%] relative'>
                    <label htmlFor='city' className='absolute left-5 -top-[13px] bg-white'>City</label>
                    <div>
                        <input
                            type='text'
                            name='city'
                            disabled={!isEdit}
                            value={address.city}
                            onChange={changeHandler}
                            className='px-[10px] py-[13px] border border-gray-400  rounded-md bg-white w-full'
                        />
                    </div>
                </div>
                <div className='w-[50%] relative'>
                    <label htmlFor='postalCode' className='absolute left-5 -top-[13px] bg-white'>Postal Code</label>
                    <div>
                        <input
                            type='text'
                            name='postalCode'
                            disabled={!isEdit}
                            value={address.postalCode}
                            onChange={changeHandler}
                            className='px-[10px] py-[13px] border border-gray-400  rounded-md bg-white w-full'
                        />
                    </div>
                </div>
            </div>

            <div className='flex gap-10 mt-6'>
                <div className='w-[50%] relative'>
                    <label htmlFor='state' className='absolute left-5 -top-[13px] bg-white'>State</label>
                    <div>
                        <input
                            type='text'
                            name='state'
                            value={address.state}
                            onChange={changeHandler}
                            disabled={!isEdit}
                            className='px-[10px] py-[13px] border border-gray-400  rounded-md bg-white w-full'
                        />
                    </div>
                </div>
                <div className='w-[50%] relative'>
                    <label htmlFor='country' className='absolute left-5 -top-[13px] bg-white'>Country</label>
                    <div>
                        <input
                            type='text'
                            name='country'
                            value={"India"}
                            disabled
                            className='px-[10px] py-[13px] border border-gray-400  rounded-md bg-white w-full'
                        />
                    </div>
                </div>
            </div>

            {
                isEdit && (
                    <div className='mt-3 flex justify-end gap-3'>
                        <button 
                            onClick={() => {
                                setIsEdit(false);
                                setAddress(addr)
                            }}
                            className='py-2 px-4 rounded-md border'>
                            Cancel
                        </button>

                        <button className='py-2 px-4 rounded-md bg-royal-blue-500 text-white'>
                            Save Changes
                        </button>
                    </div>
                )
            }
        </form>
    </div>
  )
}

export default Address
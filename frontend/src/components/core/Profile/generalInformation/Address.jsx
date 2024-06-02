import React, { useState } from 'react'
import { MdModeEditOutline, MdOutlineModeEditOutline } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { deleteAddress, editAddress } from '../../../../services/operations/profileAPI';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from "sonner"

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const Address = ({addr, isNewAddress, setNewAddress, setLoading}) => {
  const {token} = useSelector((state) => state.user);
  const [isEdit , setIsEdit] = useState(false)
  const [address , setAddress] = useState(addr)
  const [open, setOpen] = useState(false);


  const changeHandler = (e) => {
     const {name , value} = e.target;

     setAddress( (prev) => (
        {
            ...prev,
            [name] : value
        }
    ))

    if(isNewAddress)
    {
        setNewAddress( (prev) => (
            {
                ...prev,
                [name] : value
            }
        ))
    }
  }



  const updateAddress = async (e) =>{
    e.preventDefault();

     if(addr.street === address.street &&
        addr.city === address.city &&
        addr.postalCode === address.postalCode &&
        addr.state === address.state)
        {
            toast.error("No Changes Done")
            return;
        }
     
    setLoading(true);
    const response = await editAddress(address ,addr._id , token)

    if(response)
    {
        setAddress(response);
    }

     setIsEdit(false)
  }


  const handleDeleteAddress = async () => {
      setLoading(true);
      const response = await deleteAddress(addr._id , token);

      if(response)
      {
        setAddress(response);
      }
      setLoading(false);
      setOpen(false)
  }
  
  return (
    <div className='md:p-6 p-4 rounded-md border mb-7'>
        {
            !isNewAddress && (
                <div className='flex justify-end md:gap-5 gap-2 mb-2 -mt-2'>
                    <button
                    onClick={() => setIsEdit(true)}
                    disabled={isEdit}
                    className="disabled:text-gray-500">
                    <MdModeEditOutline size={24}/>
                    </button>

                    <button
                      onClick={() => setOpen(true)}>
                    <MdDeleteOutline size={24}/>
                    </button>
                </div>
            )
        }
 
        <form>
            <div className='w-full relative'>
                <label htmlFor='street' className='absolute left-5 -top-[13px] bg-white'>Street Address</label>
                <div>
                    <input
                        type='text'
                        name='street'
                        disabled={!isEdit && !isNewAddress}
                        value={address.street}
                        onChange={changeHandler}
                        className='px-[10px] py-[10px] border border-gray-400 rounded-md bg-white w-full'
                    />
                </div>
            </div>

            <div className='flex md:gap-10 gap-5 mt-6'>
                <div className='w-[50%] relative'>
                    <label htmlFor='city' className='absolute left-5 -top-[13px] bg-white'>City</label>
                    <div>
                        <input
                            type='text'
                            name='city'
                            disabled={!isEdit && !isNewAddress}
                            value={address.city}
                            onChange={changeHandler}
                            className='px-[10px] py-[10px] border border-gray-400  rounded-md bg-white w-full'
                        />
                    </div>
                </div>
                <div className='w-[50%] relative'>
                    <label htmlFor='postalCode' className='absolute left-5 -top-[13px] bg-white'>Postal Code</label>
                    <div>
                        <input
                            type='text'
                            name='postalCode'
                            disabled={!isEdit && !isNewAddress}
                            value={address.postalCode}
                            onChange={changeHandler}
                            className='px-[10px] py-[10px] border border-gray-400  rounded-md bg-white w-full'
                        />
                    </div>
                </div>
            </div>

            <div className='flex md:gap-10 gap-5 mt-6'>
                <div className='w-[50%] relative'>
                    <label htmlFor='state' className='absolute left-5 -top-[13px] bg-white'>State</label>
                    <div>
                        <input
                            type='text'
                            name='state'
                            value={address.state}
                            onChange={changeHandler}
                            disabled={!isEdit && !isNewAddress}
                            className='px-[10px] py-[10px] border border-gray-400  rounded-md bg-white w-full'
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
                            className='px-[10px] py-[10px] border border-gray-400  rounded-md bg-white w-full'
                        />
                    </div>
                </div>
            </div>

            {
                isEdit && (
                    <div className='mt-5 flex justify-end gap-3'>
                        <button 
                            onClick={() => {
                                setIsEdit(false);
                                setAddress(addr)
                            }}
                            className='md:py-2 py-1 px-4 rounded-md border'>
                            Cancel
                        </button>

                        <button 
                            onClick={updateAddress}
                            className='md:py-2 py-1 px-4 rounded-md bg-royal-blue-500 text-white'>
                            Save Changes
                        </button>
                    </div>
                )
            }
        </form>
        <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
              <p className='text-[18px] font-medium'>Are you sure you want to delete this address?</p>
              <div className='flex justify-around mt-8'>
                 <button
                    onClick={handleDeleteAddress} 
                    className='py-2 px-4 bg-royal-blue-600 text-white rounded-md hover:bg-royal-blue-500 transition-all duration-200'>Yes, Delete</button>

                 <button 
                    onClick={() => setOpen(false)}
                    className='py-2 px-4 border border-black rounded-md hover:bg-gray-100 transition-all duration-200'>Cancel</button>
              </div>
            </Box>
        </Modal>
    </div>
  )
}

export default Address
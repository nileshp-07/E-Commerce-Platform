import React, { useState } from 'react'
import { FiTrash2 } from "react-icons/fi"


import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { deleteUserAccount } from '../../../../services/operations/profileAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken, setUser } from '../../../../redux/slices/userSlice';

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

const DeleteAccount = () => {
  const [open , setOpen] = useState(false);
  const {token} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
   

  const handelDeleteAccount = async () => {
     await deleteUserAccount(token);

     setOpen(false);

     dispatch(setUser(null))
     dispatch(setToken(null))
     localStorage.removeItem('user');
     localStorage.removeItem('token');
     localStorage.removeItem('cartItems');
     localStorage.removeItem('wishlists');
     localStorage.removeItem('recentlyViewedProducts');

     navigate("/");
  }
  return (
    <div className='md:my-20 my-14 rounded-md md:p-8 md:px-12 py-4 px-6 border profile-shadow flex sm:flex-row flex-col gap-4'>
        <div className='w-14 h-14 aspect-square rounded-full flex items-center justify-center bg-pink-700'>
        <FiTrash2 className='text-3xl text-pink-200'/>
        </div>
        <div className='flex flex-col gap-y-2 text-black'>
          <h2 className='text-lg font-semibold'>Delete Account</h2>
          <p >Would you like to delete account?</p>
          <p className='lg:w-3/'>Deleting your account is permanent and will result in the loss of access to your shopping history and any associated data with your account </p>
          <button
              onClick={() => setOpen(true)}
              className='w-fit italic text-pink-400 font-medium'>
              I want to delete my account.
          </button>
        </div>

        <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
              <h2 className='text-xl font-semibold mb-1'>Are you sure??</h2>
              <p>Do you really want to Delete your account?</p>
              <div className='flex justify-around mt-8'>
                  <button
                    onClick={handelDeleteAccount} 
                    className='py-2 px-4 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-all duration-200'>
                      Yes, Delete
                  </button>

                  <button 
                    onClick={() => setOpen(false)}
                    className='py-2 px-4 border border-black rounded-md hover:bg-gray-100 transition-all duration-200'>
                       Cancel
                  </button>
              </div>
            </Box>
        </Modal>

    </div>
  )
}

export default DeleteAccount
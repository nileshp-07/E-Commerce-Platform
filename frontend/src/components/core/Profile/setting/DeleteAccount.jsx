import React from 'react'
import { FiTrash2 } from "react-icons/fi"

const DeleteAccount = () => {
  return (
    <div className='my-20 rounded-md md:p-8 md:px-12 p-6 border profile-shadow flex sm:flex-row flex-col gap-x-5'>
        <div className='w-14 h-14 aspect-square rounded-full flex items-center justify-center bg-pink-700'>
        <FiTrash2 className='text-3xl text-pink-200'/>
        </div>
        <div className='flex flex-col gap-y-2 text-black'>
            <h2 className='text-lg font-semibold'>Delete Account</h2>
            <p >Would you like to delete account?</p>
            <p className='lg:w-3/'>Deleting your account is permanent and will result in the loss of access to your shopping history and any associated data with your account </p>
        <button
            className='w-fit italic text-pink-400 font-medium'>
            I want to delete my account.
        </button>
        </div>

        {/* {confimationModal && <ConfimationModal modalData={confimationModal}/>} */}
    </div>
  )
}

export default DeleteAccount
import React, { useState } from 'react'
import Address from './Address';


const UserAddress = ({user}) => {
  return (
    <div className='my-20'>
        <h2 className='text-xl font-semibold'>Addresses</h2>
        <div className='py-6 px-8 rounded-md border profile-shadow mt-2'>
            {
                user.addresses.length < 1 && (
                    <div className='w-full h-[100px] flex items-center justify-center'>
                        <h2 className='text-xl font-medium text-gray-900'>No addresses</h2>
                    </div>
                )
            }
            {
                user.addresses.length > 0 && user.addresses.map((address, id) => (
                   <Address key={id} addr={address}/>
                ) ) 
            }
            <div className='flex justify-end'>
                <button 
                   className='py-1 px-3 rounded-md bg-royal-blue-500 text-white font-medium'>
                    Add new Address
                </button>
            </div>
        </div>
    </div>
  )
}

export default UserAddress
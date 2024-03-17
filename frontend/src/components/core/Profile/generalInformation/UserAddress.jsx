import React, { useEffect, useRef, useState } from 'react'
import Address from './Address';
import { MdAdd, MdAddLocationAlt } from "react-icons/md";


const UserAddress = ({user}) => {
  const [isNewAddress , setisNewAddress] = useState(false);
  const childRef = useRef(null);

//   const scrollToChild = () => {
//     if (childRef.current) {
//         childRef.current.scrollIntoView({ behavior: 'smooth' });
//       }
//   };

  
  useEffect(() => {
    if (isNewAddress && childRef.current) {
      childRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isNewAddress]);


  return (
    <div className='my-20'>
        <div className='flex justify-between items-center'>
            <h2 className='text-xl font-semibold'>Addresses</h2>
            <div 
                onClick={() => setisNewAddress(true)}
                // className='p-2 rounded-full bg-black flex items-center justify-center'
                className='flex py-[6px] px-4 items-center justify-center gap-1 border border-black rounded-full mr-2 cursor-pointer font-medium'
                >
                  Add New 
                  <MdAddLocationAlt size={20} />
            </div>
        </div>
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
            {
                isNewAddress && (
                    <div ref={childRef}>
                        <Address addr={{
                                    street : "",
                                    city : "",
                                    postalCode : "",
                                    state : "",
                                }}
                                isNewAddress={isNewAddress}/>
                    </div>
                )
            }
            {
                isNewAddress && ( 
                    <div className='flex gap-5 justify-end'>
                        <button 
                            onClick={() => setisNewAddress(false)} 
                            className='py-1 px-3 rounded-md border font-medium'>
                                Cancel
                        </button>

                        <button  
                            className='py-1 px-3 rounded-md bg-royal-blue-500 text-white font-medium'>
                                Add new Address
                        </button>  
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default UserAddress
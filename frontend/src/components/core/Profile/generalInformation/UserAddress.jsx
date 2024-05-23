import React, { useEffect, useRef, useState } from 'react'
import Address from './Address';
import { MdAddLocationAlt } from "react-icons/md";
import { useSelector,useDispatch } from 'react-redux';
import { addNewAddress, getAllAddresses } from '../../../../services/operations/profileAPI';



const UserAddress = ({user}) => {
  const {token} = useSelector((state) => state.user);
  const [addresses , setAddresses] = useState([]);
  const [isNewAddress , setisNewAddress] = useState(false);
  const [loading , setLoading] = useState(false);
  const [newAddress , setNewAddress] = useState({
                                                    street : "",
                                                    postalCode : "",
                                                    city : "",
                                                    state : ""
                                                })
  const childRef = useRef(null);


  const CreateNewAddress = async() => {
    setLoading(true);
    const response = await addNewAddress(newAddress , token);

    if(response)
    {
      setAddresses(response);
    }
    setLoading(false);

    setisNewAddress(false);

    setNewAddress({
        street : "",
        postalCode : "",
        city : "",
        state : ""
    })
     
  }
 

  
  useEffect(() => {
    if (isNewAddress && childRef.current) {
      childRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isNewAddress]);


  const fetchAllAddresses = async () => {

      setLoading(true);

      const response = await getAllAddresses(token);

      if(response)
      {
          setAddresses(response);
      }

      setLoading(false);
  }


  useEffect(() => {

    fetchAllAddresses();

  },[])




  return (
    <div className='md:my-20 my-16'>
        <div className='flex justify-between items-center'>
            <h2 className='md:text-xl text-lg font-semibold'>Addresses</h2>
            <div 
                onClick={() => setisNewAddress(true)}
                className='flex md:py-[6px] py-[5px] px-4 items-center justify-center gap-1 border border-black rounded-full mr-2 cursor-pointer font-medium'
                >
                  Add New 
                  <MdAddLocationAlt size={20} />
            </div>
        </div>
        <div className='md:py-6 md:px-8 py-3 px-5 rounded-md border profile-shadow mt-2'>
            {
               (addresses.length < 1 && !isNewAddress) && (
                    <div className='w-full h-[100px] flex items-center justify-center'>
                        <h2 className='text-xl font-medium text-gray-900'>No addresses</h2>
                    </div>
                )
            }
            {
                addresses.length > 0 && addresses.map((address, id) => (
                   <Address key={id} addr={address} setLoading={setLoading}/>
                ) ) 
            }
            {
                isNewAddress && (
                    <div ref={childRef}>
                        <Address addr={newAddress} setNewAddress={setNewAddress} setLoading = {setLoading}
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
                            onClick={CreateNewAddress} 
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
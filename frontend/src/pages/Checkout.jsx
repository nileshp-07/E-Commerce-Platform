import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllAddresses } from '../services/operations/profileAPI';

const Checkout = () => {
  const {user} = useSelector((state) => state.user);
  const {token} = useSelector((state) => state.user);
  const [addreses , setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contactNumber , setContactNumber] = useState(user?.contactNumber)
  const [selectedAddress, setSelectedAddress] = useState({
                                                        street : "",
                                                        city : "",
                                                        postalCode : "",
                                                        state : "",
                                                        country : "India"
                                                      })

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
    <div className='h-full w-full'>
      <div className='w-11/12 max-w-[1200px] flex justify-between mx-auto my-10'>
        <div className='w-full'>
          <h2 className='text-2xl font-semibold mb-8'>General Information</h2>
          
          <div className='flex flex-col gap-3'>
            <div className='flex flex-col gap-[2px]'>
                <label htmlFor='name' className='font-medium'>Name</label>
                <input
                  type='text'
                  name='name'
                  className='field-style w-[70%] text-gray-600'
                  value={user.name}
                  disabled
                />
            </div>
            <div className='flex flex-col gap-[2px]'>
                <label htmlFor='email' className='font-medium'>Email</label>
                <input
                  type='email'
                  name='email'
                  className='field-style w-[70%] text-gray-600'
                  value={user.email}
                  disabled
                />
            </div>
            <div className='flex flex-col gap-[2px]'>
                <label htmlFor='contactNumber' className='font-medium'>Contact number</label>
                <input
                  type='Number'
                  name='contactNumber'
                  className='field-style w-[70%]'
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
            </div>
            <div className='flex flex-col gap-[2px]'>
                <label htmlFor='street' className='font-medium'>Street Address</label>
                <input
                  type='text'
                  name='street'
                  value={selectedAddress.street}
                  className='field-style w-[70%]'
                />
            </div>

            <div className='flex gap-5'>
                <div className='flex flex-col gap-[2px]'>
                    <label htmlFor='city' className='font-medium'>City</label>
                    <input
                      type='text'
                      name='city'
                      value={selectedAddress.city}
                      className='field-style'
                    />
                </div>
                <div className='flex flex-col gap-[2px]'>
                    <label htmlFor='postalCode' className='font-medium'>Postal Code</label>
                    <input
                      type='email'
                      name='postalCode'
                      value={selectedAddress.postalCode}
                      className='field-style'
                    />
                </div>
            </div>

            <div className='flex gap-5'>
              <div className='flex flex-col gap-[2px]'>
                  <label htmlFor='state' className='font-medium'>State</label>
                  <input
                    type='email'
                    name='state'
                    value={selectedAddress.state}
                    className='field-style'
                  />
              </div>
              <div className='flex flex-col gap-[2px]'>
                  <label htmlFor='country' className='font-medium'>Country</label>
                  <input
                    type='email'
                    name='country'
                    value={selectedAddress.country}
                    className='field-style'
                  />
              </div>
            </div>
          </div>


          <h2 className='text-lg font-semibold mt-10'>Select Saved Address</h2>
          <div className='flex flex-col gap-5 mt-3'>
            {
              addreses?.map((address) => (
                 <div key={address._id} className={`border rounded-md w-fit min-w-[500px] py-3 px-5 cursor-pointer`}
                      onClick={() => 
                      setSelectedAddress({
                        street : address?.street,
                        city : address?.city,
                        postalCode : address?.postalCode,
                        state : address?.state,
                        country : address?.country
                      })}>
                    <div className='flex gap-2 mb-1'>
                      <p className='font-medium'> Street :</p>
                      <p>{address?.street}</p>
                    </div>

                    <div className='flex gap-5 mb-1'>
                      <div  className='flex gap-2'>
                        <p className='font-medium'>City :</p>
                        <p>{address?.city}</p>
                      </div>
                      <div  className='flex gap-2'>
                        <p className='font-medium'>Postal Code :</p>
                        <p>{address?.postalCode}</p>
                      </div>
                    </div>

                    <div className='flex gap-5'>
                      <div  className='flex gap-2'>
                        <p className='font-medium'>State :</p>
                        <p>{address?.state}</p>
                      </div>
                      <div className='flex gap-2'>
                        <p className='font-medium'>Country :</p>
                        <p>India</p>
                      </div>
                    </div>
                 </div>
               ))
            }
          </div>

        </div>
        <div className='w-[450px] h-[500px] bg-royal-blue-300 rounded-md'>

        </div>
      </div>
    </div>
  )
}

export default Checkout
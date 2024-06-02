import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAllAddresses } from '../services/operations/profileAPI';
import { buyProducts } from '../services/operations/PaymentAPI';
import { toast } from 'sonner';

const Checkout = () => {
  const {user} = useSelector((state) => state.user);
  const {token} = useSelector((state) => state.user);
  const [addreses , setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contactNumber , setContactNumber] = useState(user?.profileDetails?.contactNumber)
  const {order} = useSelector((state)  => state.order);
  const [paymentMethod , setPaymentMethod] = useState("");
  const [selectedAddress, setSelectedAddress] = useState({
                                                        street : "",
                                                        city : "",
                                                        postalCode : "",
                                                        state : "",
                                                        country : "India"
                                                      })


  const handleChangeAddress = (e) => {
     const {name, value} = e.target;

     setSelectedAddress(prevState => (
       {
         ...prevState,
         [name] : value
       }
     ))
  }



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


  const handleBuyProducts = async () => {

  if(!contactNumber || !selectedAddress.street || !selectedAddress?.city || !selectedAddress?.state)
    {
      toast.error("Please fill all the details to checkout");
      return;
    }
 
  if(!paymentMethod)
  {
    toast.error("Select Payment method first")
    return;
  }

  const isCOD = paymentMethod === "Cash" ? true :  false;
 setLoading(true);

 await buyProducts(order,isCOD,JSON.stringify(selectedAddress),contactNumber, token);

 setLoading(false);
}
  
  return ( 
    <div className='h-full w-full'>
      <div className='w-11/12 max-w-[1200px] flex flex-col md:flex-row lg:gap-0 gap-10 justify-between mx-auto my-10'>
        <div className='w-full '>
          <h2 className='md:text-2xl text-xl font-semibold mb-8'>General Information</h2>
          
          <div className='flex flex-col gap-3 w-[350px] md:w-[400px] lg:w-[800px]'>
            <div className='flex flex-col gap-[2px]'>
                <label htmlFor='name' className='font-medium'>Name</label>
                <input
                  type='text'
                  name='name'
                  className='field-style lg:w-[70%] text-gray-600'
                  value={user.name}
                  disabled
                />
            </div>
            <div className='flex flex-col gap-[2px]'>
                <label htmlFor='email' className='font-medium'>Email</label>
                <input
                  type='email'
                  name='email'
                  className='field-style lg:w-[70%] text-gray-600'
                  value={user.email}
                  disabled
                />
            </div>
            <div className='flex flex-col gap-[2px]'>
                <label htmlFor='contactNumber' className='font-medium'>Contact number</label>
                <input
                  type='Number'
                  name='contactNumber'
                  className='field-style lg:w-[70%]'
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
            </div>
            <div className='flex flex-col gap-[2px]'>
                <label htmlFor='street' className='font-medium'>Street Address</label>
                <input
                  required
                  type='text'
                  name='street'
                  value={selectedAddress.street}
                  onChange={handleChangeAddress}
                  className='field-style lg:w-[70%]'
                />
            </div>

            <div className='flex gap-5'>
                <div className='flex flex-col gap-[2px]'>
                    <label htmlFor='city' className='font-medium'>City</label>
                    <input
                      required
                      type='text'
                      name='city'
                      value={selectedAddress.city}
                      onChange={handleChangeAddress}
                      className='field-style w-full'
                    />
                </div>
                <div className='flex flex-col gap-[2px]'>
                    <label htmlFor='postalCode' className='font-medium'>Postal Code</label>
                    <input
                      required
                      type='email'
                      name='postalCode'
                      value={selectedAddress.postalCode}
                      onChange={handleChangeAddress}
                      className='field-style w-full'
                    />
                </div>
            </div>

            <div className='flex gap-5'>
              <div className='flex flex-col gap-[2px]'>
                  <label htmlFor='state' className='font-medium'>State</label>
                  <input
                    required
                    type='email'
                    name='state'
                    value={selectedAddress.state}
                    onChange={handleChangeAddress}
                    className='field-style w-full'
                  />
              </div>
              <div className='flex flex-col gap-[2px]'>
                  <label htmlFor='country' className='font-medium'>Country</label>
                  <input
                    disabled
                    type='email'
                    name='country'
                    value={selectedAddress.country}
                    className='field-style w-full'
                  />
              </div>
            </div>
          </div>


          <h2 className='text-lg font-semibold mt-10'>Select Saved Address</h2>
          <div className='flex flex-col gap-5 mt-3'>
            {
              addreses?.map((address) => (
                 <div key={address._id} className={`border rounded-md w-fit lg:min-w-[500px] py-3 px-5 cursor-pointer`}
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

        <div className='md:w-[550px] md:mt-20 mt-0 h-fit max-h-[500px] border rounded-md p-3  flex flex-col justify-between'>
            <div className=' overflow-y-scroll'>
              {
                 order.map((product, index) => (
                  <div key={index}
                     className={`flex ${index !== order.length-1 && "border-b pb-2"}`}>
                     <div className='p-4 max-h-[100px] max-w-[100px] flex items-center justify-center'>
                        <img
                          src={product?.productId?.thumbnail}
                          className='h-full w-full object-contain'
                        />
                     </div>
                     <div className='py-2'>
                        <div>
                          <p className='text-[14px] pr-2'>{product?.productId?.title}</p>
                          <p className='text-gray-500 text-[14px]'>Qty. {product?.qty}</p>
                        </div>

                        <p className='flex text-caribbeangreen-600 text-[14px]'>Rs. {product?.productId?.discountedPrice}</p>
                     </div>
                     
                  </div>
                 ))
              }
            </div>
            <div>
               <p className='font-medium text-[17px] mb-2 mt-5'>Payment Method</p>
               <div>
                  <div className='flex gap-2 cursor-pointer'>
                      <input
                        type='radio'
                        name='paymentMethod'
                        value="Cash"
                        onChange={() => setPaymentMethod("Cash")}
                        id='cash'
                      />
                      <label htmlFor='cash' className='cursor-pointer'>Cash on delivery</label>
                  </div>
                  <div className='flex gap-2 cursor-pointer'>
                      <input
                        type='radio'
                        name='paymentMethod'
                        value="Online"
                        onChange={() => setPaymentMethod("Online")}
                        id='online'
                      />
                      <label htmlFor='online' className='cursor-pointer'>Online</label>
                  </div>
               </div>

               <button 
                 onClick={handleBuyProducts}
                 className='py-2 px-5 w-full rounded-md bg-royal-blue-500 text-white font-medium mt-5'>
                 Proceed to Checkout
               </button>
            </div> 
        </div>
      </div>
    </div>
  )
}

export default Checkout
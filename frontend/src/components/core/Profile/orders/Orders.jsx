import React, { useEffect, useState } from 'react'
import { getBuyersOrders } from '../../../../services/operations/profileAPI';
import {useSelector} from "react-redux"
import dateFormatter  from "../../../../util/dateFormatter"

const Orders = () => {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(false);
  const {token} = useSelector((state) => state.user);

  const getBuyesAllOrdersHandler = async () => {
     setLoading(true);
     const response = await getBuyersOrders(token);

     if(response)
     {
       setOrders(response);
     }

     setLoading(false);
  }
  useEffect(() => {
    getBuyesAllOrdersHandler();
  }, [])

  if(loading)
  {
    return (
      <div className='h-[calc(100vh-3.5rem)] w-full grid place-items-center'>
        <div className='spinner'></div>
      </div>
    )
  }
  return (
    <div className='my-10'>
       <h2 className='text-2xl font-semibold '>Orders</h2>
       <div className='mt-8 flex flex-col gap-3'>
        {
           orders?.length > 0 ? (
              orders?.map((order) => (
                <div key={order._id} 
                     className='flex justify-between border'>
                  <div className='flex gap-3'>
                      <div className='p-6 bg-gray-200 w-fit rounded-md'>
                        <img
                          src={order?.product?.thumbnail}
                          alt ="ProductThumbnail"
                          className='w-[120px] h-[120px] object-contain'
                          style={{ mixBlendMode: 'multiply' }}
                        />
                      </div>
                      <div>
                        <p className='text-lg font-medium'>{order?.product?.title}</p>
                        <div className='flex gap-1'>
                          <p className='font-medium'>Seller: </p>
                          <p className='text-[17px]'>{order?.seller?.name}</p>
                        </div>
                        <div className='flex gap-1'>
                          <p className='font-medium'>Quantity : </p>
                          <p>{order?.qty}</p>
                        </div>
                        <p className='font-semibold text-[#037957]'>Rs. {order.totalPrice}</p>
                      </div>
                  </div>

                  <div className='mr-4 mt-2'>
                      <div className={`pb-[3px] px-5${order?.deliveryStatus?.status === "Processing" ? "bg-[#fbffe7]" : order?.deliveryStatus?.status === "Shipped" ? "bg-[#fff5c5]" : "bg-[#e9f5e3]" } rounded-full w-fit`}>
                       <p className={`${order?.deliveryStatus?.status === "Processing" ? "text-[#FFD700]" : order?.deliveryStatus?.status === "Shipped" ? "text-[#FFA500]" : " text-[#61a146]" }`}>{order?.deliveryStatus?.status}</p>
                      </div>
                      <div className='flex flex-col mt-3'>
                        <p className='font-medium'>Ordered At:</p>
                        <p>{dateFormatter(Date.now())}</p>
                      </div>
                  </div>
                </div>
              ))
           ) : (
             <div>
               <div>
                 <p>No Orders Found</p>
               </div>
             </div>
           )
        }
       </div>
    </div>
  )
}

export default Orders
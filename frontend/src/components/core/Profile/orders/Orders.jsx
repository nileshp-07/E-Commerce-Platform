import React, { useEffect, useState } from 'react'
import { getBuyersOrders, getSellersOrders } from '../../../../services/operations/profileAPI';
import {useSelector} from "react-redux"
import dateFormatter  from "../../../../util/dateFormatter"
import { useNavigate } from 'react-router-dom'

const deliveryStatus = ["Processing", "Shipped" , "Delivered" , "Cancelled" , "Cancel Request"];
const Orders = () => {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(false);
  const {token} = useSelector((state) => state.user);
  const {user} = useSelector((state) => state.user);
  const navigate  = useNavigate() 


  const sortOrdersByStatus = (e) => {
     const status = e.target.value;

     if (status !== "Select Status") {
       const ordersWithStatus = orders.filter(order => order.deliveryStatus.status === status);
       const ordersWithoutStatus = orders.filter(order => order.deliveryStatus.status !== status);
  
      setOrders([...ordersWithoutStatus, ...ordersWithStatus]);
    } else {
      getAllOrdersHandler();
    }
  }

  const getAllOrdersHandler = async () => {
     setLoading(true);
     let response;

     if(user.isSeller)
     {
        response = await getSellersOrders(token);
     }
     else{
       response = await getBuyersOrders(token);
     }

     if(response)
     {
       setOrders(response);
     }

     setLoading(false);
  }
  useEffect(() => {
    getAllOrdersHandler();
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
       <h2 className='md:text-2xl text-xl font-semibold '>Orders</h2>
       {
         user.isSeller && (
           <div className='flex items-center gap-2 justify-end mt-4'>
              <p className='font-medium'>Sort Orders By:</p>
              <select name='deliveryStatus'
                      className='flex outline-none rounded-md py-2 md:px-4 px-2 bg-[#EEEEEE]'
                      onChange={sortOrdersByStatus} >
                  <option value="Select Status">Select Status</option>
                  {
                     deliveryStatus.map((item, index) => (
                       <option key={index} value={item}>{item}</option>
                     ))
                  }
              </select>
           </div>
         )
       }
       <div className='mt-8 flex flex-col gap-5 md:gap-3'>
        {
           orders?.length > 0 ? (
              orders?.reverse()?.map((order) => (
                <div key={order._id} 
                     className='flex flex-col md:flex-row justify-between border-b pb-5 md:pb-3'>
                  <div 
                    onClick={() => navigate(`/order/${order._id}`)}
                    className='flex flex-row gap-3 md:w-[70%] cursor-pointer'>
                      <div className='w-[150px] min-w-[150px] h-[150px] min-h-[150px] md:min-h-[170px] md:w-[170px] md:min-w-[170px] md:h-[170px]  p-6 bg-gray-200 rounded-md '>
                        <img
                          src={order?.product?.thumbnail}
                          alt ="ProductThumbnail"
                          className='h-full w-full object-contain'
                          style={{ mixBlendMode: 'multiply' }}
                        />
                      </div>
                      <div className='md:py-1'>
                        <p className='md:text-lg font-medium'>{order?.product?.title}</p>
                       
                           {
                             user.isSeller ? (
                              <div className='flex gap-1'>
                                <p className='font-medium'>Buyer: </p>
                                <p className='text-[17px]'>{order?.buyer?.name}</p>
                              </div>
                             ) : (
                              <div className='flex gap-1'>
                                <p className='font-medium'>Seller: </p>
                                <p className='text-[17px]'>{order?.seller?.name}</p>
                              </div>
                             )
                           }
                       
                        <div className='flex gap-1'>
                          <p className='font-medium'>Quantity : </p>
                          <p>{order?.qty}</p>
                        </div>
                        <p className='font-semibold text-[#037957]'>Rs. {order.totalPrice}</p>
                      </div>
                  </div>

                  <div className='mr-4 mt-2 flex md:flex-col gap-3 md:gap-0 items-center'>
                      <div className={`pb-[3px] px-5 ${order?.deliveryStatus?.status === "Processing" ? "bg-[#FCFFC1]" : order?.deliveryStatus?.status === "Shipped" ? "bg-[#fff5c5]" : order?.deliveryStatus?.status === "Cancel Request" ? "" : order?.deliveryStatus?.status === "Cancelled" ? "bg-[#ffdddd]" : "bg-[#e9f5e3]" } rounded-full w-fit`}>
                       <p className={`${order?.deliveryStatus?.status === "Processing" ? "text-[#FFD500]" : order?.deliveryStatus?.status === "Shipped" ? "text-[#FFA500]" : order?.deliveryStatus?.status === "Cancel Request" ? "text-[#ff2323]" : order?.deliveryStatus?.status === "Cancelled" ? "text-[#ff2323]" : " text-[#61a146]" }`}>{order?.deliveryStatus?.status}</p>
                      </div>
                      <div className='flex md:flex-col md:mt-3 w-fit'>
                        <p className='font-medium'>Ordered At:</p>
                        <p >{dateFormatter(order.createdAt)}</p>
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
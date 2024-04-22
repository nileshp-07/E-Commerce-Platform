import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { changeOrdersDeliveryStatus, getOrderFullDetails } from '../../../../services/operations/profileAPI';
import { useSelector } from 'react-redux';
import formatDate from '../../../../util/dateFormatter';
import timeFormatter from '../../../../util/timeFormatter';
import RatingStars from '../../../common/RatingStars';
import { IoMdAlert } from "react-icons/io";
import { toast } from 'sonner';


const Address = {
   street : "125/A jay nagar",
   city : "Pithampur",
   postalCode : 473819,
   state : "Madhya pradesh",
   country : "India"
}
const description = "This will help you identify if any of these values are null or undefined, or if the structure of your data is different from what you expect. Once you identify the issue, you can adjust your code accordingly."
const deliveryStatus = ["Processing", "Shipped" , "Delivered" , "Cancelled"];
const OrderDetails = () => {
  const {token} = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState("");
  const {id} = useParams()
  const {user} = useSelector((state) => state.user);
  const [selectedStatus , setSelectedStatus] = useState("");

  const getOrdersFullDetailsHandler = async () => {
      setLoading(true);

      const response = await getOrderFullDetails(id, token);

      if(response)
      {
        setOrder(response);
        setSelectedStatus(response?.order?.status)
      }
      setLoading(false);
  }  

  const deliveryStatusChangeHandler = async () => {
    console.log(selectedStatus)
      if(order?.deliveryStatus?.status === selectedStatus)
      {
         toast.error("Please select another status")
         return;
      }

      setLoading(true);

      await changeOrdersDeliveryStatus(order._id, selectedStatus, token);

      setLoading(false);
  }

  useEffect(() => {
       getOrdersFullDetailsHandler();
  }, [])

  console.log(selectedStatus)

  if(loading)
  {
     return (
       <div className='h-[calc(100vh-3.5rem)] w-full grid place-items-center'>
          <div className='spinner'></div>
       </div>
     )
  }
  
  return (
    <div className='w-full h-[calc(100vh-3.5rem)]'>
       <div className='w-11/12 max-w-[1200px] mx-auto my-10'>
          <h2 className='text-2xl font-semibold  mb-14'>Order Details</h2>
          {
             order?.deliveryStatus?.status === "Cancel Request" && (
               <div className='flex items-center gap-2 justify-end py-2 mb-4'>
                  <IoMdAlert size={20} fill='#ff2323' className='mt-1'/>
                  <p className='text-[14px] text-[#ff2323]'> customer has requested to cancel an order. Please review and take necessary action.</p>
               </div>
             )
          }
          <div className='flex justify-between'>
              <div className=''>
                  <div className='flex gap-1'>
                    <p className='font-medium'>Order id :</p>
                    <p>{id}</p>
                  </div>

                  <div className='flex gap-1'>
                    <p className='font-medium'>Ordered at :</p>
                    <p>{formatDate(order.createdAt)} at {timeFormatter(order.createdAt)}</p>
                  </div>

                  <div className='mt-8 flex gap-10'>
                      <div className='max-w-[350px]'>
                          <p className='font-medium text-lg'>Delivery Address</p>
                          <p>{order?.buyer?.name}</p>

                          <div>
                            {Address.street}, {Address.city}, {Address.postalCode}, {Address.state}, {Address.country}
                          </div>

                          <p className='font-medium mt-2'>Contact Number</p>
                          <p>{order?.buyersContactNumber || "not available"}</p>
                      </div>

                      <div>
                        <h2 className='font-medium text-lg'>Payment Method</h2>
                        <p>{order?.paymentMethod}</p>
                      </div>

                  </div>
              </div>
              <div>
                 <div>
                    <div className={`pb-[3px] px-5 ${order?.deliveryStatus?.status === "Processing" ? "bg-[#FCFFC1] text-[#FFD500]" : order?.deliveryStatus?.status === "Shipped" ? "bg-[#fff5c5] text-[#FFA500]" : order?.deliveryStatus?.status === "Cancel Request" ? "text-[#ff2323]" : order?.deliveryStatus?.status === "Cancelled" ? "bg-[#ffdddd] text-[#ff2323]" : "bg-[#e9f5e3] text-[#61a146]" } rounded-full w-fit`}>{order?.deliveryStatus?.status === "Processing" ? "Order Confirmed" : order?.deliveryStatus?.status}</div>
                    <p className='font-medium mt-2'>at {formatDate(order?.deliveryStatus?.updatedAt)} | {timeFormatter(order?.deliveryStatus?.updatedAt)}</p>
                 </div>
                 {
                   user.isSeller  && (
                     <div className='mt-5'>
                       <p className='text-lg'>Change Delivery Status</p>
                       <div className='flex flex-col gap-2 items-end'>
                       <select
                          name='deliveryStatus'
                          className='flex outline-none rounded-md py-2 px-4 bg-[#EEEEEE] w-full mt-2'
                          value={selectedStatus} // Set the value to the current status
                          onChange={(e) => setSelectedStatus(e.target.value)} // Update the current status when a different option is selected
                          >
                          {/* Map through delivery statuses to create options */}
                          {deliveryStatus.map((status, index) => (
                            <option key={index} value={status} selected={status === order?.deliveryStatus?.status}>{status}</option>
                          ))}
                        </select>
                          <button 
                            onClick={deliveryStatusChangeHandler}
                            className='py-2 w-fit px-4 rounded-md bg-royal-blue-500 text-white'>
                            Change
                          </button>
                       </div>
                     </div>
                   )
                 }
              </div>
          </div>

          <div 
              className='flex justify-between profile-shadow p-2 rounded-md max-w-[800px] mt-10'>
              <Link to={`/product/${order?.product?._id}`}>
                  <div className='flex gap-3 w-full' >
                      <div className='p-8 bg-[#DCDCDC] min-h-[200px] max-h-[200px] max-w-[300px] min-w-[300px] rounded-md flex items-center justify-center'>
                        <img
                            src={order?.product?.thumbnail}
                            className='h-[140px] w-[250px] object-contain'
                            style={{ mixBlendMode: 'multiply' }}
                        />
                      </div>
                      <div className='flex flex-col gap-[2px]'>
                        <p className='text-lg font-medium'>{order?.product?.title}</p>
                        <p className='font-medium text-gray-500 -mt-1'>{order?.product?.categories?.[0].name}</p>
                        <p className='mt-1'>{description.length > 110 ? `${description.slice(0, 110)}...` : description}</p>
                        <div className='flex flex-col my-1'>
                            <div className='flex gap-1'>
                              <p className='font-medium'>Quantity:</p>
                              <p>{order?.qty}</p>
                            </div>
                            <p className='text-[#DB4444] font-me'>Rs.{order?.totalPrice}</p>
                             
                        </div>
                        <div className='flex gap-2 items-center'>
                            <RatingStars RatingCount={order?.product?.avgRating}/>
                            <p className='font-medium text-gray-500'>({order?.product?.ratingAndReviews?.length})</p>
                        </div>
                      </div>
                  </div>
              </Link>
          </div>
       </div>
    </div>
  )
}

export default OrderDetails
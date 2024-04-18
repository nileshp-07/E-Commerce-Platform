import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getOrderFullDetails } from '../../../../services/operations/profileAPI';
import { useSelector } from 'react-redux';
import formatDate from '../../../../util/dateFormatter';
import timeFormatter from '../../../../util/timeFormatter';
import RatingStars from '../../../common/RatingStars';


const Address = {
   street : "125/A jay nagar",
   city : "Pithampur",
   postalCode : 473819,
   state : "Madhya pradesh",
   country : "India"
}
const description = "This will help you identify if any of these values are null or undefined, or if the structure of your data is different from what you expect. Once you identify the issue, you can adjust your code accordingly."

const OrderDetails = () => {
  const {token} = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState("");
  const {id} = useParams()

  const getOrdersFullDetailsHandler = async () => {
      setLoading(true);

      const response = await getOrderFullDetails(id, token);

      if(response)
      {
        setOrder(response);
      }
      setLoading(false);
  }  


  useEffect(() => {
       getOrdersFullDetailsHandler();
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
    <div className='w-full h-[calc(100vh-3.5rem)]'>
       <div className='w-11/12 max-w-[1200px] mx-auto my-10'>
          <h2 className='text-2xl font-semibold'>Order Details</h2>
          <div className='mt-5 flex gap-1'>
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
          <div className='my-10 flex justify-center'>
             Delivery status step bar
          </div>

          <div 
              className='flex justify-between profile-shadow p-2 rounded-md max-w-[800px]'>
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
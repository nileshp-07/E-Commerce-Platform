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
  return (
    <div>
       <h2>Orders</h2>
       <div>
        {
           orders?.length > 0 ? (
              orders?.map((order) => (
                <div key={order._id}>
                  <div>
                      <div>
                        <img
                          src={order?.product?.thumbnail}
                          alt ="ProductThumbnail"
                          className='w-[100px] h-[100px] object-contain'
                        />
                      </div>
                      <div>
                        <p>{order?.product?.title}</p>
                        <div>
                          <p>Seller: </p>
                          <p>{order?.seller?.name}</p>
                        </div>
                        <p>Rs{order.product.discountedPrice}</p>
                      </div>
                  </div>

                  <div>
                     <div>
                       <p>{order?.deliveryStatus?.status}</p>
                       <div>
                        <p>Ordered At:</p>
                        <p>{dateFormatter(Date.now())}</p>
                       </div>
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
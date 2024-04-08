import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux"
import { getSellerProducts } from '../../../services/operations/profileAPI';
import { Link, } from 'react-router-dom';
import RatingStars from '../../common/RatingStars';

const description = "This will help you identify if any of these values are null or undefined, or if the structure of your data is different from what you expect. Once you identify the issue, you can adjust your code accordingly."
const SellerProducts = () => {
  const [products , setProducts] = useState([]);
  const [loading , setLoading] = useState(false);
  const {token} = useSelector((state) => state.user);

  const fetchSellerProducts = async () => {
     setLoading(true);

     const response = await getSellerProducts(token);

     if(response)
     {
       setProducts(response);
     }

     setLoading(false);
  }


  useEffect(() => {
      fetchSellerProducts();
  },[])

  if(loading)
  {
     return (
       <div className='h-[500px] w-full grid place-items-center'>
         <div className='spinner'></div>
       </div>
     )
  }

  return (
    <div className='my-10'>
       <h2 className='text-2xl font-semibold mb-8'>Products</h2>
        
        <div className='flex flex-col gap-5 items-center justify-center'>
          {
             products.length < 0 ? (
                (
                   products.map((product) => (
                     <div key={product._id}
                          className='flex justify-between profile-shadow p-2 rounded-md'>
                        <Link to={`/product/${product._id}`} className='max-w-[80%]'>
                            <div className='flex gap-3 w-full' >
                                <div className='p-8 bg-[#DCDCDC] min-h-[200px] max-h-[200px] max-w-[300px] min-w-[300px] rounded-md flex items-center justify-center'>
                                  <img
                                      src={product?.thumbnail}
                                      className='h-[140px] w-[250] object-contain'
                                      style={{ mixBlendMode: 'multiply' }}
                                  />
                                </div>
                                <div className='flex flex-col gap-[2px]'>
                                  <p className='text-lg font-medium'>{product?.title}</p>
                                  <p className='font-medium text-gray-500 -mt-1'>{product?.categories?.[0].name}</p>
                                  <p className='mt-1'>{description.length > 110 ? `${description.slice(0, 110)}...` : description}</p>
                                  <div className='flex gap-2 my-1'>
                                      <p className='text-[#DB4444] font-me'>Rs.{product?.discountedPrice}</p>
                                      <p className='flex line-through font-medium text-gray-400'>Rs.{product.price}</p>
                                      <p className='font-medium text-[#008000] text-[14px]'>{product?.discount}% off</p>
                                  </div>
                                  <div className='flex gap-2 items-center'>
                                      <RatingStars RatingCount={product?.avgRating}/>
                                      <p className='font-medium text-gray-500'>({product?.ratingAndReviews?.length})</p>
                                  </div>
                                </div>
                            </div>
                        </Link>
                        <div className='flex gap-5 font-medium mx-3'>
                           <p>
                             Edit
                           </p>
                           <p>
                             delete
                           </p>
                        </div>
                     </div>
                   ))
                )
             ) : (
                <div className='h-[300px] flex flex-col justify-center items-center gap-5'>
                   <p className='text-lg font-medium'>You have'nt created Any product yet</p>
                    <Link to="/profile/add-product">
                        <button className='py-2 px-5 bg-royal-blue-500 font-medium text-white rounded-md'>
                          Create now
                        </button>
                    </Link>
                </div>
             )
          }
        </div>
    </div>
  )
}

export default SellerProducts
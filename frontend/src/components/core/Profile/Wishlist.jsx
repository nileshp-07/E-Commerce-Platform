import React, { useEffect, useState } from 'react'
import ProductCard from '../../common/ProductCard'
import {useSelector} from "react-redux"



const Wishlist = () => {
  const [products , setProducts] = useState([]);
  const {loading} = useSelector((state) => state.user);  

  useEffect(() => {
    const wishlists = JSON.parse(localStorage.getItem("wishlists")) || [];

    if(wishlists)
    {
      setProducts(wishlists);
    }
  }, [loading])

  return (
    <div className='my-10'>
       <h2 className='md:text-2xl text-xl font-semibold mb-8'>Wishlists</h2>
       <div className='lg:px-14 grid place-items-center min-h-[300px]'>
          {
             products.length > 0 ? (
              <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 lg:gap-5 gap-3 place-items-center'>
                {
                  products?.map((product) => (
                  <ProductCard product={product} key={product._id}/> 
                ))
                }
              </div>
              
             ) : (
                  <h2 className='text-xl font-medium text-[#7D7D7D]'>
                    No products into wishlists
                  </h2>
             )
          }
       </div>
    </div>
  )
}

export default Wishlist
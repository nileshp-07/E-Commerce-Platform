import React from 'react'
import ProductCard from '../../common/ProductCard'
import { Link } from 'react-router-dom'
import { FaC, FaCartArrowDown } from "react-icons/fa6";
import { GoHeart } from "react-icons/go";
import RatingStars from '../../common/RatingStars';



   
const ProductLists = ({loading, products}) => {
  

  return (
     <>
        {
            loading ? (
                <div className='w-full h-[500px] grid place-items-center'>
                    <div className='spinner'></div>
                </div>
            ) : (
                <div className='grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-5 mt-5'>
                {
                    products.map((product) => (
                      <ProductCard product={product} key={product._id}/>
                    ))
                }
                </div>
            )
        }
     </>
  )
}

export default ProductLists
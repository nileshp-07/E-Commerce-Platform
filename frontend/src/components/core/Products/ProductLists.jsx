import React from 'react'
import ProductCard from '../../common/ProductCard'
import { Link } from 'react-router-dom'
import { FaC, FaCartArrowDown } from "react-icons/fa6";
import { GoHeart } from "react-icons/go";
import RatingStars from '../../common/RatingStars';
import ProductsNotFound from "../../../assets/noProductFound.jpg"



   
const ProductLists = ({loading, products, page}) => {
  

  return (
     <>
        {
            loading ? (
                <div className='w-full h-[500px] grid place-items-center'>
                    <div className='spinner'></div>
                </div>
            ) : (
                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-5 mt-5'>
                {
                   products?.length > 0 ? (
                    products.slice( (page-1)*18 , (page-1)*18+18).map((product) => (
                      <ProductCard product={product} key={product._id}/>
                    ))
                   ) : (
                     <div className='flex items-center justify-center lg:w-[900px] md:w-[750px] w-[350px] my-5'>
                        <img
                            src={ProductsNotFound}
                            className='object-contain md:h-[650px] h-[300px] w-[300px] md:w-[650px]'
                        />
                     </div>
                   )
                }
                </div>
            )
        }
     </>
  )
}

export default ProductLists
import React from 'react'
import { toast } from 'sonner';
import { TiStarOutline } from "react-icons/ti";
import { TiStarHalfOutline } from "react-icons/ti";
import { TiStarFullOutline } from "react-icons/ti";
import { FaC, FaCartArrowDown } from "react-icons/fa6";
import { Link, Navigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import RatingStars from './RatingStars';

const ProductCard = ({product, isBestDeal}) => {
    const addToWislists = (e) => {
        // e.stopPropagation();
        e.preventDefault();

        toast.success("Product added to wishlists")
    } 

    const addToCart = (e) => {
        e.preventDefault();

        toast.success("Product added to Cart")

    } 
  return (
     <>
        <Link to={`/product/${product.id}`}>
            <div className='p-3 w-[280px] min-h-[410px] custom-shadow rounded-md hover:scale-105 duration-200 transition-all relative group'>
                <div
                  onClick={addToWislists}
                  className='absolute right-4 top-4 p-2 bg-white rounded-full flex items-center justify-center'>
                  <GoHeart size={20}/>
                </div>
                {
                    isBestDeal && (
                        <div className='absolute top-4 left-4 w-[55px] bg-[#AFE1AF] text-[#008000] font-medium px-[7px] py-[1px] rounded-3xl'>
                           -{100*Math.random().toFixed(1)}%
                        </div>
                    )
                }
                <div className='rounded-md bg-gray-200 p-6 flex items-center justify-center'>
                    <img
                        src={product.image}
                        alt='ProductImage'
                        loading='lazy'
                        className='h-[190px] w-[190px] object-contain'
                        style={{ mixBlendMode: 'multiply' }}
                    />
                </div> 
                <div className='py-2'>
                    <p className='text-[17px] font-medium leading-[1.3rem]'>
                       {product.title.split("").length > 30 ? `${product.title.split("").splice(0,50).join("")}...` : (product.title)}
                    </p>
                    <p className='font-medium text-gray-500'>{product.category}</p>
                    <div className='flex gap-2 my-1'>
                        <p className='text-[#DB4444] font-me'>Rs.{product.price}</p>
                        <p className='flex line-through font-medium text-gray-400'>Rs.{2*product.price}</p>
                        <p className='font-medium text-[#008000] text-[14px]'>{100*Math.random().toFixed(1)}% off</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <RatingStars RatingCount={product.rating.rate}/>
                        <p className='font-medium text-gray-500'>({product.rating.count})</p>
                    </div>
                </div>
                <div 
                   onClick={addToCart}
                   className=' p-3 rounded-full bg-black absolute right-3 bottom-3 text-white font-medium  justify-center items-center hidden group-hover:flex duration-200 transition-all'>
                    <FaCartArrowDown size={23}/>
                </div>
            </div>
        </Link>
     </>
  )
}

export default ProductCard
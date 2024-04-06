import React from 'react'
import { toast } from 'sonner';
import { TiStarOutline } from "react-icons/ti";
import { TiStarHalfOutline } from "react-icons/ti";
import { TiStarFullOutline } from "react-icons/ti";
import { Link, Navigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { FaC, FaCartArrowDown } from "react-icons/fa6";
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
        <Link to={`/product/${product?._id}`}>
            <div className='p-3 w-[280px] min-h-[410px] custom-shadow rounded-md hover:scale-105 duration-200 transition-all relative group'>
                <div
                  onClick={addToWislists}
                  className='absolute right-4 top-4 p-2 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-all duration-200'>
                  <GoHeart size={20}/>
                </div>
                {
                    isBestDeal && (
                        <div className='absolute top-4 left-4 w-[55px] bg-[#AFE1AF] text-[#008000] font-medium px-[7px] py-[1px] rounded-3xl'>
                           -{product?.discount}%
                        </div>
                    )
                }
                <div className='rounded-md bg-gray-200 p-6 flex items-center justify-center'>
                    <img
                        src={product?.thumbnail}
                        alt='ProductThumbnail'
                        loading='lazy'
                        className='h-[190px] w-[190px] object-contain'
                        style={{ mixBlendMode: 'multiply' }}
                    />
                </div> 
                <div className='py-2'>
                    <p className='text-[17px] font-medium leading-[1.3rem]'>
                       {product?.title?.split("").length > 30 ? `${product?.title?.split("").splice(0,50).join("")}...` : (product.title)}
                    </p>
                    <p className='font-medium text-gray-500'>{product?.categories?.[0].name}</p>
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

                <div
                  className='absolute right-2 bottom-2  p-[6px] hover:bg-[#c1c1c1] justify-center items-center rounded-full hidden group-hover:flex duration-200 transition-all'
                  onClick={addToCart}>
                    <div 
                    className='p-3 rounded-full bg-black text-white font-medium flex justify-center items-center'>
                        <FaCartArrowDown size={23}/>
                    </div>
                </div>
            </div>
        </Link>
     </>
  )
}

export default ProductCard
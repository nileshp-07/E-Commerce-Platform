import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaC, FaCartArrowDown } from "react-icons/fa6";
import { toast } from 'sonner';
import ReactStar from "react-rating-stars-component"
import { TiStarOutline } from "react-icons/ti";
import { TiStarHalfOutline } from "react-icons/ti";
import { TiStarFullOutline } from "react-icons/ti";


// / Import Swiper styles
import "swiper/css";
import "../../../App.css";

// import required modules
import {Autoplay, FreeMode} from "swiper/modules";


const ProductCards = ({products, heading, isBestDeal}) => {
    const [loading , setLoading] = useState(false);


    const addToWislists = (e) => {
        // e.stopPropagation();
        e.preventDefault();

        toast.success("Product added to wishlists")
    } 

    const addToCart = (e) => {
        e.preventDefault();

        toast.success("Product added to Cart")

    } 

    console.log(products)


    if(loading)
    {
        return (
            <div className='h-full w-full flex items-center justify-center'>
                <div className='spinner'></div>
            </div>
        )
    }
  return (
    <div className='my-20'>
         <div className='flex items-center gap-2 mb-5'>
            <div className='w-[15px] h-[40px] bg-royal-blue-500 rounded-[4px]'></div>
            <h2 className='text-3xl font-semibold'>{heading}</h2>
         </div>


          <Swiper
            slidesPerView={4}
            spaceBetween={-70}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}
            loop={true}
            freeMode = {true}
            //    modules={[Autoplay,FreeMode]}
            //    modules={[FreeMode]}
            >
                {
                    products && products.map((product, id) => (
                     <SwiperSlide key={id}
                        className='m-4 mr-10'>
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
                                        {/* <div className='flex gap-1'>
                                            <FaStar/>
                                            <FaStar/>
                                            <FaStar/>
                                            <FaStar/>
                                        </div> */}
                                        <ReactStar
                                            count = {5}
                                            value={product.rating.rate}
                                            edit={false}
                                            size={20}
                                            isHalf = {true}
                                            emptyIcon={<TiStarOutline/>}
                                            halfIcon={<TiStarHalfOutline/>}
                                            fullIcon = {<FaCartArrowDown/>}
                                            // activeColor="#ffd700"
                                        />
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
                    </SwiperSlide>
                    ))
                }
          </Swiper>
        </div>
  )
}

export default ProductCards
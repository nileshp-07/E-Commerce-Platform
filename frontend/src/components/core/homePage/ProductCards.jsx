import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { Swiper, SwiperSlide } from 'swiper/react';

// / Import Swiper styles
import "swiper/css";
import "../../../App.css";

// import required modules
import {Autoplay, FreeMode} from "swiper/modules";


const ProductCards = ({products, heading}) => {
    const [loading , setLoading] = useState(false);


    const addToWislists = (e) => {
        // e.stopPropagation();
        e.preventDefault();
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
                            <div className='p-3 w-[280px] h-[420px] custom-shadow rounded-md hover:scale-105 duration-200 transition-all relative group'>
                                <div
                                  onClick={addToWislists}
                                  className='absolute right-4 top-4 p-2 bg-white rounded-full flex items-center justify-center'>
                                  <GoHeart size={20}/>
                                </div>
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
                                    <p className='text-[17px] font-medium leading-[1.3rem]'>{product.title.split("").splice(0,70)}...</p>
                                    <p className='font-medium text-gray-500'>{product.category}</p>
                                    <div className='flex gap-2 my-1'>
                                        <p className='text-[#DB4444]'>Rs.{product.price}</p>
                                        <p className='flex line-through font-medium text-gray-400'>Rs.{2*product.price}</p>
                                        <p className='font-medium'>{100*Math.random().toFixed(1)}%</p>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <div className='flex gap-1 py-1'>
                                            <FaStar/>
                                            <FaStar/>
                                            <FaStar/>
                                            <FaStar/>
                                        </div>
                                        <p className='font-medium text-gray-500'>({product.rating.count})</p>
                                    </div>
                                </div>
                                <div className='h-[50px] bg-black rounded-b-md absolute bottom-0 left-0 w-[280px] text-white font-xl font-medium hidden justify-center items-center group-hover:flex duration-200 transition-all'>
                                    Add to Cart
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
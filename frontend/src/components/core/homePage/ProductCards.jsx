import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaC, FaCartArrowDown } from "react-icons/fa6";
import { toast } from 'sonner';
import { TiStarOutline } from "react-icons/ti";
import { TiStarHalfOutline } from "react-icons/ti";
import { TiStarFullOutline } from "react-icons/ti";
import ProductCard from '../../common/ProductCard';



// / Import Swiper styles
import "swiper/css";
import "../../../App.css";

// import required modules
import {Autoplay, FreeMode} from "swiper/modules";


const ProductCards = ({products, heading, isBestDeal}) => {
    const [loading , setLoading] = useState(false);

    // console.log(products)


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
            <div className='w-[13px] h-[35px] bg-royal-blue-500 rounded-[4px]'></div>
            <h2 className='text-[26px] font-semibold'>{heading}</h2>
         </div>


          <Swiper
            slidesPerView={4}
            spaceBetween={-70}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}
            // loop={true}
            freeMode = {true}
            //    modules={[Autoplay,FreeMode]}
            //    modules={[FreeMode]}
            >
                {
                    products && products.map((product, id) => (
                     <SwiperSlide key={id}
                        className='m-4 mr-10'>
                        <ProductCard product={product} isBestDeal={isBestDeal}/>
                    </SwiperSlide>
                    ))
                }
          </Swiper>
        </div>
  )
}

export default ProductCards
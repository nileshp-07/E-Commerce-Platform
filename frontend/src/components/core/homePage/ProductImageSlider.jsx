import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../../App.css";

// import required modules
import { Pagination, Navigation, Autoplay, Keyboard } from "swiper/modules";

import { Link } from 'react-router-dom';



import { sliderImagesLinks } from '../../../data/homePageData';

const ProductImageSlider = () => {
  return (
    <>
        <Swiper
            pagination={{
            dynamicBullets: true,
            }}
            keyboard={{
            enabled: true,
            }}
            autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            }}
            navigation={true}
            loop={true}
            modules={[Pagination, Navigation, Autoplay, Keyboard]}
            className="mySwiper h-[200px] md:h-[550px]"
        >
          {
             sliderImagesLinks.map((image,  index) => (
                <SwiperSlide key={index}>
                    <Link to={image.link}>
                        <div className='h-[200px] md:h-[550px] w-full'>
                            <img
                                src={image.image}
                                alt='ProductSliderImage'
                                loading='lazy'
                                className="h-full w-full"
                            />
                        </div>
                    </Link>
                </SwiperSlide>
             ))
          }
      </Swiper>
    </>
  )
}

export default ProductImageSlider
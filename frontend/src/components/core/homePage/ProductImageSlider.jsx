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

import sliderImage1  from "../../../assets/ProductImageSlider/sliderImage1.png"
import sliderImage2  from "../../../assets/ProductImageSlider/sliderImage2.jpg"
import sliderImage3  from "../../../assets/ProductImageSlider/sliderImage3.jpg"
import sliderImage4  from "../../../assets/ProductImageSlider/sliderImage4.jpg"
import sliderImage5  from "../../../assets/ProductImageSlider/sliderImage5.jpg"

const sliderImages = [
    {
        image : sliderImage1,
        link : "/search?query=iphone"
    },
    {
        image : sliderImage2,
        link : "/search?query=shoes"
    },
    {
        image : sliderImage3,
        link : "/search?query=shoes"
    },
    {
        image : sliderImage4,
        link : "/search?query=speakers"
    },
    {
        image : sliderImage5,
        link : `/search?query=${encodeURIComponent("women's fashion")}`
    },
]

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
            className="mySwiper h-[250px] md:h-[550px]"
        >
          {
             sliderImages.map((image,  index) => (
                <SwiperSlide key={index}>
                    <Link to={image.link}>
                        <div className='h-[250px] md:h-[550px] w-full'>
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
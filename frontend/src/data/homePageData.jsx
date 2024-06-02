import mobile from "../assets/Categories/mobiles.png"
import computer from "../assets/Categories/computer.png"
import smartwatch from "../assets/Categories/smartwatch.png"
import headphone from "../assets/Categories/headphones.png"
import shoes from "../assets/Categories/shoes.png"
import fashion from "../assets/Categories/fashion.png"

import sliderImage1  from "../assets/ProductImageSlider/sliderImage1.png"
import sliderImage2  from "../assets/ProductImageSlider/sliderImage2.jpg"
import sliderImage3  from "../assets/ProductImageSlider/sliderImage3.jpg"
import sliderImage4  from "../assets/ProductImageSlider/sliderImage4.jpg"
import sliderImage5  from "../assets/ProductImageSlider/sliderImage5.jpg"

export const categories = [
    {
        icon : mobile,
        category : "Mobiles",
        link : "/search?query=mobiles"
    },
    {
        icon : computer,
        category : "Computers",
        link : "/search?query=computers"
    },
    {
        icon : smartwatch,
        category : "SmartWatch",
        link : "/search?query=smartwatch"
    },
    {
        icon : headphone,
        category : "Headphones",
        link : "/search?query=headphones"
    },
    {
        icon : shoes,
        category : "Shoes",
        link : "/search?query=shoes"
    },
    {
        icon : fashion,
        category: "Fashion",
        link : "/search?query=fashion"
    }
]



export const sliderImagesLinks = [
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

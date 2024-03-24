import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import ProductImages from '../components/core/productDetails.jsx/ProductImages';
import ProductInfo from '../components/core/productDetails.jsx/ProductInfo';
import {TiStarFullOutline} from "react-icons/ti"
import Reviews from '../components/core/productDetails.jsx/Reviews';
import Specifications from '../components/core/productDetails.jsx/Specifications';


const products = {
    "id": 0,
    "url": "http://www.flipkart.com/alisha-solid-women-s-cycling-shorts/p/itmeh2ffvzetthbb?pid=SRTEH2FF9KEDEFGF",
    "name": "Alisha Solid Women's Cycling Shorts",
    "categories": ["Clothing >> Women's Clothing >> Lingerie, Sleep & Swimwear >> Shorts >> Alisha Shorts >> Alisha Solid Women's Cycling Shorts"],
    "price": 999,
    "discounted_price": 379,
    "discount" : 67,
    "image_urls": [
       "http://img5a.flixcart.com/image/short/u/4/a/altht-3p-21-alisha-38-original-imaeh2d5vm5zbtgg.jpeg",
       "http://img5a.flixcart.com/image/short/p/j/z/altght4p-26-alisha-38-original-imaeh2d5kbufss6n.jpeg",
       "http://img5a.flixcart.com/image/short/p/j/z/altght4p-26-alisha-38-original-imaeh2d5npdybzyt.jpeg",
       "http://img5a.flixcart.com/image/short/z/j/7/altght-7-alisha-38-original-imaeh2d5jsz2ghd6.jpeg"
    ],
    "description": "Key Features of Alisha Solid Women's Cycling Shorts Cotton Lycra Navy, Red, Navy,Specifications of Alisha Solid Women's Cycling Shorts Shorts Details Number of Contents in Sales Package Pack of 3 Fabric Cotton Lycra Type Cycling Shorts General Details Pattern Solid Ideal For Women's Fabric Care Gentle Machine Wash in Lukewarm Water, Do Not Bleach Additional Details Style Code ALTHT_3P_21 In the Box 3 shorts",
    "rating": 4,
    "ratingCount" : 120,
    "sold": 1244,
    "brand": "Alisha",
    "product_specification": {
       "Number of Contents in Sales Package": "Pack of 3",
       "Fabric": "Cotton Lycra",
       "Type": "Cycling Shorts",
       "Pattern": "Solid",
       "Ideal For": "Women's",
       "Fabric Care": "Gentle Machine Wash in Lukewarm Water, Do Not Bleach",
       "Style Code": "ALTHT_3P_21",
       "In the Box": "3 shorts"
    },
    "seller" : {

        "name" : "ronaldo chora",
        "email" : "ronaldokachora@gmail.com",
        "sellerRating" : 3.5,
        "bio" : "we provides the best product with lowest price range and with the best service",
        "image" : "https://res.cloudinary.com/dlwlo89mc/image/upload/v1710694848/E-Commerce/hv63rumvuflwvaawjlj6.jpg"
    },
    "stock" : 8,
 }


const ProductDetails = () => {
    const navigate = useNavigate();
    const [isReview ,setIsReviews] = useState(false);
  return (
    <div>
        <div 
            onClick={() => navigate(-1)}
            className='flex items-center gap-2 mt-5 ml-5 cursor-pointer'>
            <FaArrowLeftLong/>
            <p className='text-xl font-medium'> Back</p>
        </div>

        <div className='mt-10 mx-20 '>
            <div className='flex gap-10'>
                 {/* images  */}
                <ProductImages images={products.image_urls}/>

                {/* details  */}
                <ProductInfo
                    product = {products}
                />
            </div>


               {/* Seller Information  */}
            <div className='w-fit my-24'>
                <h2 className='text-2xl font-semibold'>Seller Information</h2>
                <div className='flex items-center gap-5 bg-royal-blue-50 mt-4 p-6 border border-black rounded-md'>
                    <div className='h-[100px] w-[100px] rounded-full border border-black'>
                        <img
                            src={products.seller.image}
                            alt='sellerImage'
                            loading='lazy'
                            className='h-full w-full rounded-full object-cover'
                        />
                    </div>

                    <div>
                        <div className='flex items-center gap-10'>
                            <h2 className='text-xl font-medium'> 
                                {products.seller.name}
                            </h2>

                            <div className='flex gap-1 items-center'>
                            <p className='font-semibold'>{products?.seller?.sellerRating}</p>
                            <TiStarFullOutline fill='#FFAD33' size={24}/>
                            </div>
                        </div>

                        <div>
                            <p className='text-lg text-gray-700'>{products?.seller?.email}</p>
                            <p className='mt-2'>{products?.seller?.bio}</p>
                        </div>
                    </div>
                </div>
            </div>


            {/* Specifications and Reivews  */}
            <div className='mb-10'>
                <div className='flex gap-14'>
                    <h2 
                        onClick={() => setIsReviews(false)}
                        className={`text-lg font-bold px-1 cursor-pointer ${isReview ? "text-gray-700" : "border-b-4  border-royal-blue-500"} `}>
                        Specifications
                    </h2>

                    <h2 
                        onClick={() => setIsReviews(true)}
                        className={`text-lg font-bold px-1 cursor-pointer ${isReview ? "border-b-4 border-royal-blue-500" : "text-gray-700"} `}>
                        Reviews
                    </h2>
                </div>
                {
                    isReview ? (
                        <Reviews/>
                    ) : (
                        <Specifications productSpecification = {products.product_specification}/>
                    )
                }
            </div>
        </div>

     


        

        

       
    </div>
  )
}

export default ProductDetails
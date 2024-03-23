import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import ProductImages from '../components/core/productDetails.jsx/ProductImages';
import ProductInfo from '../components/core/productDetails.jsx/ProductInfo';

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
    "stock" : 8,
 }


const ProductDetails = () => {
    const navigate = useNavigate();
  return (
    <div>
        <div className='flex items-center gap-2 mt-5 ml-5'>
            <FaArrowLeftLong/>
            <p className='text-xl font-medium'> Back</p>
        </div>

        <div className='mt-10 mx-20 flex gap-10'>
            {/* images  */}
            <ProductImages images={products.image_urls}/>

            {/* details  */}
            <ProductInfo
                product = {products}
            />

            
        </div>
    </div>
  )
}

export default ProductDetails
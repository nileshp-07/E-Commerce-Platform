import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import ProductImages from '../components/core/productDetails.jsx/ProductImages';
import ProductInfo from '../components/core/productDetails.jsx/ProductInfo';
import {TiStarFullOutline} from "react-icons/ti"
import Reviews from '../components/core/productDetails.jsx/Reviews';
import Specifications from '../components/core/productDetails.jsx/Specifications';
import ProductCards from '../components/core/homePage/ProductCards';
import Footer from '../components/common/Footer';
import { getProductDetails, getRelatedProducts } from '../services/operations/productAPI';
const MAX_RECENTLY_VIEWED = 10;


const ProductDetails = () => {
    const [product , setProduct] = useState("");
    const {id} = useParams();
    const [loading , setLoading ] = useState(false);
    const navigate = useNavigate();
    const [isReview ,setIsReviews] = useState(false);
    const [relatedProducts, setRelatedProducts] = useState([]);

    const addProductToRecentlyViewed = (product) => {
        let recentlyViewedProducts = JSON.parse(localStorage.getItem("recentlyViewedProducts")) || [];

        // Check if the product is already in the recently viewed list
        const index = recentlyViewedProducts?.findIndex(p => p?._id === product._id);
  
        if (index !== -1) {
            // If the product already exists, remove it from its current position
            recentlyViewedProducts.splice(index, 1);
        }
  
        // Add the product to the beginning of the list
        recentlyViewedProducts.unshift(product);
  
        // Ensure that the length of the list does not exceed the maximum limit
        if (recentlyViewedProducts.length > MAX_RECENTLY_VIEWED) {
            recentlyViewedProducts = recentlyViewedProducts.slice(0, MAX_RECENTLY_VIEWED);
        }
  
        // Store the updated list back in localStorage
        localStorage.setItem("recentlyViewedProducts", JSON.stringify(recentlyViewedProducts));
    }
  

    const fetchProductDetails  = async () => {
       setLoading(true);

       const response = await getProductDetails(id);

       if(response)
       {
         setProduct(response);
         addProductToRecentlyViewed(response);
       }

       setLoading(false)
    }


    const fetchRelatedProducts  = async () => {
        if(!product)
        return;
       setLoading(true);

       const response = await getRelatedProducts(product?.categories[0]._id);

       if(response)
       {
          const products = response.filter((item) => item._id !== product._id);
          setRelatedProducts(products);
       }
       

       setLoading(false);
    }

    useEffect(() => {
       fetchProductDetails();
    }, [id])

    useEffect(() => {
      fetchRelatedProducts();
    }, [product])

    if(loading)
    {
        return (
            <div className='h-[calc(100vh-3.5rem)] w-full grid place-items-center'>
                <div className='spinner'></div>
            </div>
        )
    }
  return (
    <div>
        <div 
            onClick={() => navigate(-1)}
            className='flex items-center gap-2 mt-5 ml-5 cursor-pointer'>
            <FaArrowLeftLong/>
            <p className='md:text-xl text-lg font-medium'> Back</p>
        </div>

        <div className='mt-10 lg:mx-20 md:mx-10 mx-5 '>
            <div className='flex flex-col lg:flex-row gap-10'>
                <ProductImages images={product?.images}/>

                <ProductInfo
                    product = {product}
                />
            </div>


            <div className='w-fit my-24'>
                <h2 className='md:text-2xl text-xl font-semibold'>Seller Information</h2>
                <div className='flex items-start w-[350px] md:w-full md:gap-5 gap-2 bg-royal-blue-50 mt-4 md:p-6 p-4 border border-black rounded-md'>
                    <div className='md:h-[100px] md:w-[100px] min-h-[70px] min-w-[70px] rounded-full border border-black'>
                        <img
                            src={product?.seller?.profileImage}
                            alt='sellerImage'
                            loading='lazy'
                            className='h-full w-full rounded-full object-cover'
                        />
                    </div>

                    <div>
                        <div className='flex items-center gap-10'>
                            <h2 className='text-xl font-medium'> 
                                {product?.seller?.name}
                            </h2>

                            <div className='flex gap-1 items-center'>
                            <p className='font-semibold'>{product?.seller?.sellerRating}</p>
                            <TiStarFullOutline fill='#FFAD33' size={24}/>
                            </div>
                        </div>

                        <div>
                            <p className='text-lg text-gray-700'>{product?.seller?.email}</p>
                            <p className='mt-2'>{product?.seller?.profileDetails?.bio}</p>
                        </div>
                    </div>
                </div>
            </div>


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
                        <Reviews avgRating={product?.avgRating}/>
                    ) : (
                      <Specifications productSpecification = {product?.specifications}/>
                    )
                }
            </div>


            {
                relatedProducts.length > 0 && (
                    <div className='mx-[-10px]'>
                       <ProductCards products ={relatedProducts} heading={"Related Products"}/>
                    </div>

                )
            }
        </div>

        <Footer/>
       
    </div>
  )
}

export default ProductDetails
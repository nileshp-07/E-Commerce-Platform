import React, { useEffect, useState } from 'react'
import { Link, } from 'react-router-dom';
import { FaCartArrowDown } from "react-icons/fa6";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import RatingStars from './RatingStars';
import { addToCart, addToWishlists, removeFromWishlists } from '../../services/operations/profileAPI';
import { useSelector,useDispatch } from 'react-redux'
import { setLoading } from '../../redux/slices/userSlice';


const ProductCard = ({product, isBestDeal}) => {
    const {token} = useSelector((state) => state.user);
    const {loading} = useSelector((state) => state.user);  
    const dispatch = useDispatch();
    const [wishlists , setWishlists] = useState([]);
    const [cartItems , setCartItems] = useState([]);
   
    useEffect(() => {
        const wishlistsProducts = JSON.parse(localStorage.getItem("wishlists")) ||  [];
        const cartProducts = JSON.parse(localStorage.getItem("cartItems")) ||  [];

        if(wishlistsProducts)
        {
            setWishlists(wishlistsProducts);
        }

        if(cartProducts)
        {
            setCartItems(cartProducts)
        }

    }, [loading])


    const addToWislistsHandler = async (e) => {
        // e.stopPropagation();
        e.preventDefault();
        
        dispatch(setLoading(true))
        
        await addToWishlists(product._id, token);
        dispatch(setLoading(false))
    } 

    const removeFromWishlistsHandler = async (e) => {
        e.preventDefault();

        dispatch(setLoading(true))
        await removeFromWishlists(product._id, token);
        dispatch(setLoading(false))
    }

    const addToCartHandler =async (e) => {
        e.preventDefault();

        dispatch(setLoading(true))

        await addToCart(product._id, 1 , token);

        dispatch(setLoading(false))
    } 
  return (
     <>
        <Link to={`/product/${product?._id}`}>
            <div className='lg:p-3 p-2 lg:w-[280px] w-[170px] lg:min-h-[410px] min-h-[331px] custom-shadow rounded-lg hover:scale-105 duration-200 transition-all relative group'>
                <div>
                    {
                        wishlists?.some(item => item._id === product._id) ? (
                            <div 
                                onClick={removeFromWishlistsHandler}
                                className='absolute lg:right-4 right-[11px] lg:top-4 top-[11px] lg:p-2 p-[6px] bg-white rounded-full flex items-center justify-center hover:scale-105 transition-all duration-200'>
                                    <GoHeartFill fill='#DE3163' className='lg:text-[20px] text-[17px]'/>
                            </div>
                        ) : (
                            <div
                                onClick={addToWislistsHandler}
                                className='absolute lg:right-4 right-[11px] lg:top-4 top-[11px] lg:p-2 p-[6px] bg-white rounded-full flex items-center justify-center hover:scale-105 transition-all duration-200'>
                                    <GoHeart  className='lg:text-[20px] text-[17px] '/>
                            </div>
                        )
                    }
                </div>
                {
                    isBestDeal && (
                        <div className='absolute top-4 left-4 lg:w-[55px] w-fit bg-[#AFE1AF] text-[#008000] lg:text-[16px] text-[12px] font-medium px-[7px] py-[1px] rounded-3xl'>
                           -{product?.discount}%
                        </div>
                    )
                }
                <div className='rounded-lg bg-gray-200 lg:p-6 p-5 flex items-center justify-center'>
                    <img
                        src={product?.thumbnail}
                        alt='ProductThumbnail'
                        loading='lazy'
                        className='lg:h-[190px] h-[130px] w-[130px] lg:w-[190px] object-contain'
                        style={{ mixBlendMode: 'multiply' }}
                    />
                </div> 
                <div className='md:pt-2 pt-1'>
                    <div className='max-h-[50px] overflow-hidden'>
                        <p className='lg:text-[17px] text-[15px] font-medium md:leading-[1.3rem] leading-[1.1rem] '>
                        {product?.title?.split("").length > 30 ? `${product?.title?.split("").splice(0,50).join("")}...` : (product.title)}
                        </p>
                    </div>
                    <p className='font-medium text-gray-500 lg:text-[16px] text-[14px]'>{product?.categories?.[0].name}</p>
                    <div className='flex flex-wrap gap-x-2 md:my-1'>
                        <p className='text-[#DB4444] font-medium lg:text-[16px] text-[15px]'>Rs.{product?.discountedPrice}</p>
                        <p className='flex line-through font-medium text-gray-400 lg:text-[16px] text-[15px]'>Rs.{product.price}</p>
                        <p className='font-medium text-[#008000] text-[14px]'>{product?.discount}% off</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <RatingStars RatingCount={product?.avgRating}/>
                        <p className='font-medium text-gray-500'>({product?.ratingAndReviews?.length})</p>
                    </div>
                </div>

                {
                    !cartItems?.some(item => item.productId._id === product._id) && (
                        <div
                        className='absolute right-2 bottom-2  p-[6px] hover:bg-[#c1c1c1] justify-center items-center rounded-full hidden lg:group-hover:flex duration-200 transition-all'
                        onClick={addToCartHandler}>
                            <div 
                            className='lg:p-3 p-2 rounded-full bg-black text-white font-medium flex justify-center items-center'>
                                <FaCartArrowDown className='text-[17px] lg:text-[23px]'/>
                            </div>
                        </div>
                    )
                }
            </div>
        </Link>
     </>
  )
}

export default ProductCard
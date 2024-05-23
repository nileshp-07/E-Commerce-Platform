import React, { useEffect, useState } from 'react'
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { GoHeart } from "react-icons/go";
import RatingStars from '../../common/RatingStars';
import { MdDone } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { BsDash } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { GrPowerCycle } from "react-icons/gr";
import { GoHeartFill } from "react-icons/go";
import { addToCart, addToWishlists, removeFromWishlists } from '../../../services/operations/profileAPI';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { setOrder } from '../../../redux/slices/orderSlice';


const ProductInfo = ({product}) => {
    const {token} = useSelector((state) => state.user);
    const [stock , setStock] = useState(1);
    const [loading, setLoading] = useState(false);
    const [wishlists, setWishlists] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addToWishlistsHandler = async ()  => {
        setLoading(true);

        await addToWishlists(product._id , token);
        setLoading(false);
    }

    const removeFromWishlistsHandler = async () => {
        setLoading(true);
        await removeFromWishlists(product._id, token);
        setLoading(false);        
    }

    const addToCartHandler = async () => {
        setLoading(true);
        await addToCart(product._id , stock, token)
        setLoading(false);
    }


    const handleBuyProduct = () => {
        const order= [
            {
                productId : product,
                qty : stock
            }
        ]

        dispatch(setOrder(order));

        navigate("/checkout")
    }


    useEffect(() => {
        const wishlistsProducts = JSON.parse(localStorage.getItem("wishlists")) || [];
        const cartProducts = JSON.parse(localStorage.getItem("cartItems"));
        if(wishlistsProducts)
        {
            setWishlists(wishlistsProducts);
        }

        if(cartProducts)
        {
            setCartItems(cartProducts);
        }

    }, [loading])

    if(loading)
    {
        return (
            <div className='h-[calc(100vh-3.5rem)] w-full flex items-center justify-center'>
                <div className='spinner'></div>
            </div>
        )
    }
  return (
    <div className='w-full'>
        <div className='md:px-5 pb-3 border-b border-gray-400'>
            <div className='flex justify-between w-full'>
                {
                    product?.stocks > 1 ? (
                        <div className='flex gap-1 items-center text-caribbeangreen-500 font-medium'>
                                <TiTick/>
                                <p>In Stock</p>
                        </div>
                    ) : (
                        <div className='flex gap-1 items-center text-pink-400 font-medium'>
                            <RxCross2/>
                            <p>Out of Stock</p>
                        </div>
                    )
                }
                

                <div>
                    {
                        wishlists?.some(item => item._id === product._id) ? (
                            <div 
                                onClick={removeFromWishlistsHandler}
                                className='p-2 border rounded-full hover:scale-105 transition-all duration-200 cursor-pointer'>
                                    <GoHeartFill size={20} fill='#DE3163'/>
                            </div>
                        ) : (
                            <div
                                onClick={addToWishlistsHandler}
                                className='p-2 border rounded-full hover:scale-105 transition-all duration-200 cursor-pointer'>
                                    <GoHeart size={20}/>
                            </div>
                        )
                    }
                </div>
            </div>

            <h2 className='md:text-3xl text-xl font-medium w-[90%]'>
                {
                    product?.title
                }
            </h2>

            {
                product?.brand && (
                    <div className='flex gap-8 my-2 md:text-[17px]'>
                        <p className='font-semibold'>Brand:</p>
                        <p>{product?.brand}</p>
                    </div>
                )
            }
        </div>

        <div className='md:px-5'>
            <div className='flex  md:gap-14 gap-5 my-3 '>
                <div className='flex gap-5'>
                    <div className='flex gap-1 items-center'>
                        <p>{parseFloat(product?.avgRating).toFixed(1)}</p>
                        <RatingStars RatingCount={product?.avgRating}/>
                    </div>
                    <div>
                        ({product?.ratingAndReviews?.length} Ratings)
                    </div>
                </div>

                <div className='flex items-center gap-1 font-medium'>
                    <MdDone fontSize='25'/>
                    <p>{product?.sold} Sold</p>
                </div>
            </div>


            <div className='flex gap-4 items-end select-none'>
                <p className='md:text-3xl text-2xl font-bold text-caribbeangreen-500'>Rs.{product?.discountedPrice}</p>
                <p className=' line-through font-medium text-gray-600 ' >Rs.{product?.price}</p>
                <p className='py-[1px] md:px-[5px] px-[4px] bg-caribbeangreen-300 rounded-md text-white select-none'>{product?.discount}%</p>
            </div>


            <div className='flex items-center mt-8 gap-5'>
                {/* stock  */}
                <div className='md:h-[50px] h-[43px] flex items-center'>
                    <div className='md:w-[45px] w-[35px] h-full flex items-center justify-center border border-black rounded-l-md cursor-pointer'
                         onClick={() => {
                            if(stock > 1)
                            setStock(stock-1)
                         }}>
                        <BsDash size={30}/>
                    </div>
                    <div className='md:w-[90px] w-[50px] h-full flex items-center justify-center border-y border-black text-xl font-medium select-none' >
                        {stock}
                    </div>
                    <div className={`md:w-[45px] w-[35px] h-full flex items-center justify-center rounded-r-md text-white cursor-pointer ${stock === product?.stocks ? "bg-gray-300 " : "bg-royal-blue-500"}`}
                         onClick={() => {
                            if(stock < product?.stocks)
                            setStock(stock+1)
                         }}>
                        <FaPlus size={24}/>
                    </div>
                </div>

                {/* buy now  */}
                
                <button 
                onClick={handleBuyProduct}
                className='bg-royal-blue-600 rounded-md md:py-3 py-2 md:px-14 px-[68px] text-[18px] font-medium text-white w-fit cursor-pointer  hover:bg-royal-blue-500 transition-all duration-200'>
                    Buy Now
                </button>
               

                {/* cart  */}
                {
                    !cartItems?.some(item => item.productId._id === product._id) && (
                        <div 
                          className='hidden md:block border rounded-md p-2 cursor-pointer border-black'
                          onClick={addToCartHandler}>
                           <FaCartArrowDown size={34}/>
                        </div>
                    )
                }
            </div>
            {
                !cartItems?.some(item => item.productId._id === product._id) && (
                    <div 
                      className='md:hidden mt-5 flex border rounded-md p-2 cursor-pointer bg-royal-blue-600 text-white justify-center gap-4 text-lg font-semibold items-center'
                      onClick={addToCartHandler}>
                       Add to Cart
                       <FaCartArrowDown size={24}/>
                    </div>
                )
            }

            <div className='border border-black rounded-md mt-14'>
                <div className='flex items-center gap-5 border-b border-black md:py-4 py-2 px-5'>
                    <div>
                        <FaTruckFast size={35}/>
                    </div>
                    <div>
                        <h2 className='md:text-[20px] text-[18px] font-medium'>Free Delivery</h2>
                        <p className='text-[16px]'>Free delivery for the product more than 500rs</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 md:py-4 py-2 px-5'>
                    <div>
                        <GrPowerCycle size={35}/>
                    </div>
                    <div>
                        <h2 className='md:text-[20px] text-[18px] font-medium'>Return Delivery</h2>
                        <p className='text-[16px]'>Free 30 Days Delivery Returns. Details</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default ProductInfo
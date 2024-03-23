import React, { useState } from 'react'
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { GoHeart } from "react-icons/go";
import RatingStars from '../../common/RatingStars';
import DoneIcon from '@mui/icons-material/Done';
import { FaPlus } from "react-icons/fa6";
import { BsDash } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { GrPowerCycle } from "react-icons/gr";

const ProductInfo = ({product}) => {
    const [stock , setStock] = useState(1);
  return (
    <div className='w-full'>
        <div className='px-5 pb-3 border-b border-gray-400'>
            <div className='flex justify-between w-full'>
                {
                    product.stock > 1 ? (
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
                
                <div className='p-2'>
                    <GoHeart size={26}/>
                </div>
            </div>

            <h2 className='text-3xl font-semibold w-[90%]'>
                {
                    product?.name
                }
            </h2>

            <div className='flex gap-8 my-2'>
                <p className='font-semibold'>Brand:</p>
                <p className="text-[17px]">{product.brand}</p>
            </div>
        </div>

        <div className='px-5'>
            <div className='flex  gap-14 my-3 '>
                <div className='flex gap-5'>
                    <div className='flex gap-1 items-center'>
                        <p>{parseFloat(product.rating).toFixed(1)}</p>
                        <RatingStars RatingCount={4.4}/>
                    </div>
                    <div>
                        ({product.ratingCount} Ratings)
                    </div>
                </div>

                <div className='flex items-center gap-1 font-medium'>
                    <DoneIcon fontSize='25'/>
                    <p>{product.sold} Sold</p>
                </div>
            </div>


            <div className='flex gap-4 items-end select-none'>
                <p className='text-3xl font-bold text-caribbeangreen-500'>Rs.{product.discounted_price}</p>
                <p className=' line-through font-medium text-gray-600 ' >Rs.{product.price}</p>
                <p className='py-[1px] px-[5px] bg-caribbeangreen-300 rounded-md text-white select-none'>{product.discount}%</p>
            </div>


            <div className='flex items-center  mt-8 gap-5'>
                {/* stock  */}
                <div className='h-[50px] flex items-center'>
                    <div className='w-[45px] h-full flex items-center justify-center border border-black rounded-l-md cursor-pointer'
                         onClick={() => {
                            if(stock > 1)
                            setStock(stock-1)
                         }}>
                        <BsDash size={30}/>
                    </div>
                    <div className='w-[90px] h-full flex items-center justify-center border-y border-black text-xl font-medium select-none' >
                        {stock}
                    </div>
                    <div className={`w-[45px] h-full flex items-center justify-center rounded-r-md text-white cursor-pointer ${stock == product.stock ? "bg-gray-300 " : "bg-royal-blue-500"}`}
                         onClick={() => {
                            if(stock < product.stock)
                            setStock(stock+1)
                         }}>
                        <FaPlus size={24}/>
                    </div>
                </div>

                {/* buy now  */}
                <div className='flex bg-royal-blue-600 rounded-md py-3 px-14 text-[18px] font-medium text-white w-fit'>
                    Buy Now
                </div>

                {/* cart  */}
                <div className='border border-black p-3 rounded-md'>
                    <FaCartArrowDown size={25}/>
                </div>
            </div>


            <div className='border border-black rounded-md mt-10'>
                <div className='flex items-center gap-5 border-b border-black py-4 px-5'>
                    <div>
                        <FaTruckFast size={35}/>
                    </div>
                    <div>
                        <h2 className='text-[20px] font-medium'>Free Delivery</h2>
                        <p className='text-[16px] font-medium'>Free delivery for the product more than 500rs</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 py-4 px-5'>
                    <div>
                        <GrPowerCycle size={35}/>
                    </div>
                    <div>
                        <h2 className='text-[20px] font-medium'>Return Delivery</h2>
                        <p className='text-[16px] font-medium'>Free 30 Days Delivery Returns. Details</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default ProductInfo
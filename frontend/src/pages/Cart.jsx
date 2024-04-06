import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import ProductCards from '../components/core/homePage/ProductCards';
import { removeFromCart } from '../services/operations/profileAPI';
import {useSelector} from "react-redux"
import { Link } from 'react-router-dom';


const Cart = () => {
    const {token} = useSelector((state) => state.user);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem("cartItems"));

        if (cartItems) {
        setProducts(cartItems.products);
    }
    }, [loading])


    const calculatePrices = () => {
        let total = 0;
        let discount = 0;
        let totalPrice;
        console.log(products);
        products.forEach((product) => {
            const {price , discountedPrice} = product.productId;
            const qty = product.qty;

            total += qty*price;
            discount += qty*(price - discountedPrice);
        })

        totalPrice = total - discount;
        
        return {total , discount , totalPrice}
    }

    const {total , discount , totalPrice} = calculatePrices();


    const quantityChangeHandler = (e, productId) => {
        const updatedProducts = products.map((product) => {
            if(product?.productId?._id === productId)
            {
                return {
                    ...product,
                    qty : parseInt(e.target.value)
                }
            }
            else{
                return product
            }
        })

        setProducts(updatedProducts);
    }

    const removeFromCartHandler = async (productId) => {
        setLoading(true);
        await removeFromCart(productId , token);
        setLoading(false);
    }

    if(loading)
    {
        return (
            <div className='h-[calc(100vh-3.5rem)] w-full flex items-center justify-center'>
                <div className='spinner'></div>
            </div>
        )
    }
  return (
    <div className='w-full h-full'>
        <div className='w-11/12 max-w-[1200px] mx-auto my-10'>
            <h2 className='text-2xl font-semibold'>Shopping Cart</h2>

            <div className='mt-5 flex gap-10'>
                <div className='rounded-md bg-gray-100 p-4 flex flex-col gap-5 max-h-[570px] overflow-auto '>
                    {
                        products?.map((product, index) => (
                            <div key={product?.productId?._id} className={`flex justify-between ${index !== products.length - 1 && " border-b-2 border-[#d1d6d9a8]  pb-5"}`}>
                                <Link to={`/product/${product?.productId?._id}`} className='w-[70%]'>
                                    <div className='flex gap-4 max-w-[70%]'>
                                        <div className='h-[150px] min-w-[150px] max-w-[150px] p-3 bg-white rounded-md'>
                                            <img
                                                src={product?.productId?.thumbnail}
                                                alt='productThumbnail'
                                                loading='lazy'
                                                className='h-full w-full object-contain'
                                            />
                                        </div>


                                        <div>
                                            <h2 className='text-xl font-semibold'>{product?.productId?.title}</h2>
                                            <p className='text-lg text-gray-900'>seller : {product?.productId?.seller?.name}</p>
                                            <div className=' mt-2 flex items-center gap-2 '>
                                            <p className='text-caribbeangreen-600 text-lg font-semibold'>Rs.{product.qty*product?.productId?.discountedPrice}</p>
                                            <p className='font-semibold line-through text-gray-700 2'>Rs.{product.qty*product?.productId?.price}</p>
                                            </div>

                                        </div>
                                    </div>
                                </Link>

                                <div>
                                    
                                    <select 
                                        value={product?.qty}
                                        onChange={(e) => quantityChangeHandler(e, product?.productId?._id)}
                                        className='rounded-[8px] px-[10px] py-[8px] outline-none'>
                                        {
                                            [...Array(product.productId?.stocks).keys()].map((item, index) => (
                                                <option 
                                                   key={index} 
                                                   value={index + 1} 
                                                   className='field-style'>Qty: { item + 1}</option>
                                            ))
                                        }
                                    </select>

                                    <div className='flex items-center gap-1 mt-2 text-[#FF2323] hover:bg-[#FF2323] hover:text-white py-1 px-3 rounded-md border border-[#FF2323] cursor-pointer transition-all duration-200 '
                                       onClick={() => removeFromCartHandler(product?.productId?._id)}>
                                        <p className='text-lg'>Remove</p>
                                        <MdDelete size={24}/>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                
                <div className='rounded-md bg-gray-100 py-3 px-6 h-fit w-[350px]'>
                    <h2 className='text-lg font-semibold pb-4 border-b-2 border-[#E4E9EE]'>Products Summary</h2>

                    <div className='my-4 flex flex-col gap-1'>
                        <div className='flex justify-between pr-10'>
                            <p className='font-medium'>Total:</p>
                            <p>Rs. {total}</p>
                        </div>
                        <div className='flex justify-between pr-10'>
                            <p className='font-medium'>Discount:</p>
                            <p className='text-caribbeangreen-600'>- Rs. {discount} </p>
                        </div>
                        <div className='flex justify-between pr-10'>
                            <p className='font-medium'>Tax & Fees:</p>
                            <p>+ Rs. 0</p>
                        </div>
                    </div>

                    <div className='pt-4 border-t-2 border-[#E4E9EE] flex justify-between pr-10'>
                        <p className='font-medium'>Total Price:</p>
                        <p className='text-caribbeangreen-600 font-medium'>Rs. {totalPrice}</p>
                    </div>

                    <button className='mt-8 mb-3 bg-royal-blue-500 py-2 px-5 w-full text-white font-medium rounded-md'>
                        Process to checkout
                    </button>
                </div>

            </div>


            {/* <ProductCards heading={"Recently Viewed Products"} products={products} /> */}

        </div>

    </div>
  )
}

export default Cart
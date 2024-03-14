import React from 'react'
import { FaLinkedin } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";

import visa from "../../assets/footerPaymentMethods/visa.png"
import masterCard from "../../assets/footerPaymentMethods/mastercard.png"
import upi from "../../assets/footerPaymentMethods/upi.png"
import paypal from "../../assets/footerPaymentMethods/paypal.png"

const quickLinks = [
    {
        title : "About Us",
        link : "/about-us"
    },
    {
        title : "Contact Us",
        link : "/contact-us"
    },
    {
        title : "Products",
        link : "/products"
    },
    {
        title : "Login",
        link : "/login"
    },
    {
        title : "Signup",
        link : "/signup"
    },
]

const account = [
    {
        title : "Orders",
        link : "/Orders"
    },
    {
        title : "Wishlist",
        link : "/wishlists"
    },
    {
        title : "Payment Info",
        link : "/payment-info"
    },
    {
        title : "Address",
        link : "/profile/address"
    },
    {
        title : "Personal Info",
        link : "/profile/my-info"
    },
]


const supports = [
    {
        title : "Payment Guide",
        link : "/payment-guide"
    },
    {
        title : "Help Center",
        link : "/help-center"
    },
    {
        title : "Privacy Policy",
        link : "/privacy-policy"
    },
    {
        title : "Return Policy",
        link : "/return-policy"
    },
    {
        title : "FAQs",
        link : "/faqs"
    },
]
const Footer = () => {
  return (
    <div className='pt-10 '>
        <div className='w-11/12 max-[1200px] mx-auto border-t border-gray-700 pt-10 ' >
            <div className='flex justify-between w-full p-5 pb-10'>
                <div>
                    <h2 className='text-5xl font-bold'>LOGO</h2>

                    <a href='tel:'>
                        <div className='flex items-center gap-2 mt-8 text-gray-700 font-medium'>
                            <FaPhoneAlt size={18}/>
                            <p>+123 456 7869</p>
                        </div>
                    </a>

                    <a href='mailto:mycommerce@gmail.com'>
                        <div class='flex items-center gap-2 text-gray-700 font-medium mt-2'>
                            <MdEmail size={20}/>
                            <p>mycommerce@gmail.com</p>
                        </div>
                    </a>
                    <div className='flex  mt-3'>
                        <div className='flex items-center justify-center p-[6px] hover:bg-[#c1c1c1] transition-all duration-200 rounded-full'>
                          <div className='flex justify-center items-center p-2 bg-black rounded-full text-white cursor-pointer'><FaLinkedin size={20}/></div>
                        </div>

                        <div className='flex items-center justify-center p-[6px] hover:bg-[#c1c1c1] transition-all duration-200 rounded-full'>
                          <div className='flex justify-center items-center p-2 bg-black rounded-full text-white cursor-pointer' ><FaTwitter size={20}/></div>
                        </div>

                        <div className='flex items-center justify-center p-[6px] hover:bg-[#c1c1c1] transition-all duration-200 rounded-full'>
                          <div className='flex justify-center items-center p-2 bg-black rounded-full text-white cursor-pointer'><FaInstagram size={20}/></div>
                        </div>

                        <div className='flex items-center justify-center p-[6px] hover:bg-[#c1c1c1] transition-all duration-200 rounded-full'>
                          <div className='flex justify-center items-center p-2 bg-black rounded-full text-white cursor-pointer'><FaFacebookSquare size={20}/></div>
                        </div>
                    </div>
                </div>
                <div className='flex gap-28'> 
                   <div>
                      <h2 className='text-[17px] font-semibold'>Quick Links</h2>
                      <div className='mt-3'>
                        {
                            quickLinks.map((link , index) => (
                                <p key={index} className='text-gray-900 font- hover:text-black duration-200 transition-all mt-2'>
                                    <Link to={link.link}>
                                      {link.title}
                                    </Link>
                                </p>
                            ))
                        }
                      </div>
                   </div>

                   <div>
                      <h2 className='text-[17px] font-semibold'>Account</h2>
                      <div className='mt-3'>
                        {
                            account.map((link , index) => (
                                <p key={index} className='text-gray-900 font- hover:text-black duration-200 transition-all mt-2'>
                                    <Link to={link.link}>
                                      {link.title}
                                    </Link>
                                </p>
                            ))
                        }
                      </div>
                   </div>

                   <div>
                      <h2 className='text-[17px] font-semibold'>Supports</h2>
                      <div className='mt-3'>
                        {
                            supports.map((link , index) => (
                                <p key={index} className='text-gray-900 font- hover:text-black duration-200 transition-all mt-2'>
                                    <Link to={link.link}>
                                      {link.title}
                                    </Link>
                                </p>
                            ))
                        }
                      </div>
                   </div>
                </div>

                <div>
                   <div>
                      <h2 className='text-[17px] font-semibold mb-4'>Newsletter</h2>
                      <form 
                        className='relative'>
                        <input
                            type='email'
                            name='email'
                            placeholder='enter your email address..'
                            className='border py-[10px] px-2 rounded-lg bg-gray-200 w-[250px] placeholder-[#555555]' 
                        />
                        <button className='py-3 absolute top-0 right-0 bottom-0 px-4 bg-royal-blue-500 rounded-r-lg text-white'>
                            <FaArrowRightLong/>
                        </button>
                      </form>
                   </div>

                   <div className='mt-6'>
                     <h2 className='text-[17px] font-semibold mb-2'>Payments</h2>
                     <div className='flex gap-2'>
                        {
                            [visa , masterCard, upi , paypal].map((image , index) => (
                                <img src={image} key={index}
                                     alt='paymentMethod'
                                     loading='lazy'
                                     height={50}
                                     width={50}
                                />
                            ))
                        }
                     </div>
                   </div>
                </div>
            </div>
        </div>
        <div className='flex justify-between bg-black text-white py-4 px-8'>
            <div className='text-[15px] text-gray-200'>
                Copyright © 2024 All Right Reserved
            </div>

            <div className='text-[15px] text-gray-200'>
                Made with ❤️ by Nilesh
            </div>
        </div>
    </div>
  )
}

export default Footer
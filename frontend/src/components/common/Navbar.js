import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdKeyboardArrowDown } from "react-icons/md";
import { GrFavorite } from "react-icons/gr";
import { GrCart } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";
import { RiSearch2Line } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { BsShopWindow } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import Logo from "../../assets/logo_white.png"

const Navbar = () => {
  const [searchInput , setSearchInput] = useState("")
  const {token} = useSelector((state) => state.user);
  const {user} = useSelector((state) => state.user);
  const navigate = useNavigate();

  const searchHandler = async (e) => {
    e.preventDefault();

    console.log(searchInput)

    navigate(`/search?query=${encodeURIComponent(searchInput)}`)
  }


  return (
    <div className='h-[3.5rem] bg-royal-blue-500 text-white'>
        <div className='w-11/12 max-w-[1200px] mx-auto flex justify-between items-center h-full '>
           <Link to="/">
             {/* <h2 className='text-4xl font-bold'>LOGO</h2> */}
             <div className='-ml-10'>
               <img
                  src={Logo}
                  className='h-[60px]'
                  // style={{ mixBlendMode: 'multiply' }}
               />
             </div>
           </Link>


           <div className='flex gap-10 items-center'>

              <div className='flex gap-3'>
                  <div className='flex items-center gap-1 group'>
                    <p>Categories</p>
                    <MdKeyboardArrowDown className='group-hover:rotate-180'/>
                  </div>

                  <div className='flex relative'>
                    
                    <form
                      onSubmit={searchHandler}>
                      <input
                        type='text'
                        name='search'
                        id='search'
                        placeholder='what are you looking for?'
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className='w-[500px] h-[40px] rounded-md px-5 text-black focus:outline-gray-500'
                      />
                      <button
                        type='submit'
                        className='cursor-pointer text-black absolute right-2 top-[50%] -translate-y-[50%]'>
                        <RiSearch2Line size={24}/>
                      </button>
                    </form>

                  </div>
              </div>

            {
                token && (
                   user?.isSeller ? (
                     <Link to={"/profile/add-product"}>
                        <div className='py-[6px] px-5 border rounded-md flex items-center gap-2'>
                            <p className='font-medium'>Add Product</p>
                            <FaPlus/>
                        </div>
                     </Link>
                   ) : (
                    <Link to="/become-seller">
                      <div className='flex gap-2 items-center'>
                        <BsShopWindow size={20}/>
                        <p className='font-medium'>Become a Seller</p>
                      </div>
                  </Link>
                   )
                )
            }

            {
              token ? (
                <div className='flex gap-4 items-center'>
                    <Link to="/profile/wishlists">
                        <GrFavorite size={22} className='hover:scale-110 duration-200 transition-all'/>
                    </Link>
                    
                    <Link to="/cart">
                      <div className='flex relative hover:scale-110 duration-200 transition-all'>
                          <GrCart size={22}/>
                          <p className='flex items-center justify-center absolute -top-[5px] left-[10px] h-[10px] p-[8px] w-[10px] rounded-full bg-caribbeangreen-200 text-xs'>
                            2
                          </p>
                      </div>
                    </Link>

                    <Link to="/profile/info">
                      <div className='flex items-center justify-center p-[10px] bg-[#DB4444] rounded-full '>
                          <FaRegUser size={18}/>
                      </div>
                    </Link>
                </div>
              ) : (
                <div className='flex gap-5'>
                   <Link to="/login">
                     <p className='font-medium text-[18px]'>Login</p>
                   </Link>


                   <Link to="/signup">
                     <p className='font-medium text-[18px]'>Register</p>
                   </Link>
                </div>
              )
            }
           </div>
        </div>
    </div>
  )
}

export default Navbar

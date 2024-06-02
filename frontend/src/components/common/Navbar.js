import React, { useEffect, useState } from 'react'
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
import { getAllCategories } from "../../services/operations/productAPI"

const Navbar = () => {
  const [searchInput , setSearchInput] = useState("")
  const {token} = useSelector((state) => state.user);
  const {user} = useSelector((state) => state.user);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([])
  const [subSubCategories, setSubSubCategories] = useState([])
  const navigate = useNavigate();

  const searchHandler = async (e) => {
    e.preventDefault();


    navigate(`/search?query=${encodeURIComponent(searchInput)}`)
  }


  const getAllCategoriesHandler = async () => {
     const response = await getAllCategories();

     if(response)
      {
        setCategories(response);
      }
  }

  const handleMouseEnterMain = (subCategories) => {
    setSubCategories(subCategories);
    setSubSubCategories([]);
  };

  const handleMouseEnterSub = (subSubCategories) => {
    setSubSubCategories(subSubCategories);
  };

  const handleMouseLeaveMain = () => {
    setSubCategories([]);
    setSubSubCategories([]);
  };

  useEffect(() => {
    getAllCategoriesHandler();
  }, [])

  return (
    <div className='h-[3.5rem] bg-royal-blue-500 text-white relative'>
        <div className='w-11/12 max-w-[1200px] mx-auto flex justify-between items-center h-full '>
           <Link to="/">
             {/* <h2 className='text-4xl font-bold'>LOGO</h2> */}
             <div className='lg:-ml-10 -ml-3'>
               <img
                  src={Logo}
                  className='h-[45px]  md:h-[60px] md:w-full'
                  // style={{ mixBlendMode: 'multiply' }}
               />
             </div>
           </Link>


           <div className='flex gap-10 items-center'>

              <div className='flex gap-3 relative'>

                  <div className="relative group">
                      <div className="lg:flex hidden items-center gap-1 cursor-pointer">
                        <p>Categories</p>
                        <MdKeyboardArrowDown className="group-hover:rotate-180 transition-transform" />
                      </div>

                      <div className="absolute hidden group-hover:flex bg-white z-[1000] text-black  p-2 shadow-lg"
                          onMouseLeave={handleMouseLeaveMain}>
                        <div className='w-[280px]'>
                          {categories.map((mainCategory, index) => (
                            <div
                              key={index}
                              onMouseEnter={() => handleMouseEnterMain(mainCategory.subCategories)}
                              className="py-2 px-4 hover:bg-gray-200 cursor-pointer group"
                            >
                              {mainCategory.name}
                            </div>
                          ))}
                        </div>

                        <div className='border-l border-r'>
                          {subCategories.map((subCategory, index) => (
                            <div
                              key={index}
                              onMouseEnter={() => handleMouseEnterSub(subCategory.subSubCategories || [])}
                              className="py-2 px-4 hover:bg-gray-200 cursor-pointer group w-[200px]"
                            >
                              {subCategory.name}
                            </div>
                          ))}
                        </div>

                        <div>
                          {subSubCategories.map((subSubCategory, index) => (
                            <div key={index} className="py-2 px-4 hover:bg-gray-200 cursor-pointer w-[200px]"
                                 onClick={() => navigate(`/search?query=${encodeURIComponent(subSubCategory?.name)}`)}>
                              {subSubCategory.name}
                            </div>
                          ))}
                        </div>
                      </div>
                  </div>

                  <div className='relative hidden lg:block'>
                    
                    <form
                      onSubmit={searchHandler}>
                      <input
                        type='text'
                        name='search'
                        id='search'
                        placeholder='what are you looking for?'
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className='w-[500px] h-[40px] rounded-md px-5 text-black focus:outline-gray-500 bg-royal-blue-50'
                      />
                      <button
                        type='submit'
                        className='cursor-pointer text-black absolute right-2 top-[50%] -translate-y-[50%]'>
                        <RiSearch2Line size={24}/>
                      </button>
                    </form>

                  </div>
              </div>

            <div className='md:block hidden'>
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
            </div>

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
                            {
                              JSON.parse(localStorage.getItem("cartItems"))?.length > 0 ? JSON.parse(localStorage.getItem("cartItems"))?.length : 0
                            }
                          </p>
                      </div>
                    </Link>

                    <Link to="/profile/info">
                      <div className='flex items-center justify-center lg:p-[10px] p-[8px] bg-[#DB4444] rounded-full '>
                          <FaRegUser size={18}/>
                      </div>
                    </Link>
                </div>
              ) : (
                <div className='flex md:gap-5 gap-3'>
                   <Link to="/login">
                     <p className='font-medium md:text-[18px]'>Login</p>
                   </Link>


                   <Link to="/signup">
                     <p className='font-medium md:text-[18px]'>Register</p>
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

import React from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { GoGear } from "react-icons/go";
import { IoIosLogOut } from "react-icons/io";



const Sidebar = () => {
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({path :route} , location.pathname);
  }

  return (
    <div className='min-w-[250px] sidebar-shadow h-[calc(100vh-3.5rem)] py-10 flex flex-col'>
        <Link to="/profile/info">
            <div className={`flex gap-2 items-center font-medium transition-all duration-200  px-5 py-2 ${matchRoute("/profile/info") ? "border-l-[5px] bg-royal-blue-50 text-royal-blue-700 border-royal-blue-500" : "border-l-[5px] border-white"}`}>
                <GoGear/>
                <p>General Information</p>
            </div>
        </Link>

        <Link to="/profile/orders">
            <div className={`flex gap-2 items-center font-medium transition-all duration-200 px-5 py-2 ${matchRoute("/profile/orders") ? "border-l-[5px] bg-royal-blue-50 text-royal-blue-700 border-royal-blue-500" : "border-l-[5px] border-white"}`}>
                <GoGear/>
                <p>Orders</p>
            </div>
        </Link>
        
        <Link to="/profile/wishlists">
            <div className={`flex gap-2 items-center font-medium transition-all duration-200 px-5 py-2 ${matchRoute("/profile/wishlists") ? "border-l-[5px] bg-royal-blue-50 text-royal-blue-700 border-royal-blue-500" : "border-l-[5px] border-white"}`}>
                <GoGear/>
                <p>Wishlist</p>
            </div>
        </Link>
        
        <Link to="/profile/setting">
            <div className={`flex gap-2 items-center font-medium transition-all duration-200 px-5 py-2 ${matchRoute("/profile/setting") ? "border-l-[5px] bg-royal-blue-50 text-royal-blue-700 border-royal-blue-500" : "border-l-[5px] border-white"}`}>
                <GoGear/>
                <p>Settings</p>
            </div>            
        </Link>

        <div className='px-5 bg-gray-200 h-[1px] w-[85%] mx-auto my-4'></div>


        <button className='flex gap-2 items-center font-medium px-5 py-2'>
           <IoIosLogOut/>
            Logout
        </button>
    </div>
  )
}

export default Sidebar
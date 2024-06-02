import React, { useState } from 'react'
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { GoGear } from "react-icons/go";
import { IoIosLogOut } from "react-icons/io";
import { setToken, setUser } from '../../../redux/slices/userSlice';
import { toast } from 'sonner';
import { FaRegUser } from "react-icons/fa";
import { RiDashboardLine } from "react-icons/ri"
import { FaRegHeart } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { BsFillHandbagFill } from "react-icons/bs";
import { MdOutlineAddCircle } from "react-icons/md";
import { LiaUserLockSolid } from "react-icons/lia";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};


const Sidebar = () => {
  const location = useLocation();
  const dispatch  = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const {user} = useSelector((state) => state.user);

  const matchRoute = (route) => {
    return matchPath({path :route} , location.pathname);
  }

  const Logout = () => {
     dispatch(setUser(null))
     dispatch(setToken(null))
     localStorage.removeItem('user');
     localStorage.removeItem('token');
     localStorage.removeItem('cartItems');
     localStorage.removeItem('wishlists');
     localStorage.removeItem('recentlyViewedProducts');

     toast.success("Logout successfully")
     navigate("/")

  }

  return (
    <div className='md:min-w-[250px] w-[230px] sidebar-shadow min-h-[calc(100vh-3.5rem)] py-10 flex flex-col bg-white'>
        <Link to="/profile/info">
            <div className={`flex gap-2 items-center font-medium transition-all duration-200  px-5 py-2 ${matchRoute("/profile/info") ? "border-l-[5px] bg-royal-blue-50 text-royal-blue-700 border-royal-blue-500" : "border-l-[5px] border-white hover:bg-gray-100"} mr-3 rounded-r-full`}>
                <FaRegUser/>
                <p>General Information</p>
            </div>
        </Link>

       
        <Link to="/profile/orders">
            <div className={`flex gap-2 items-center font-medium transition-all duration-200 px-5 py-2 ${matchRoute("/profile/orders") ? "border-l-[5px] bg-royal-blue-50 text-royal-blue-700 border-royal-blue-500" : "border-l-[5px] border-white hover:bg-gray-100"}  mr-3 rounded-r-full`}>
                <BsBoxSeam/>
                <p>Orders</p>
            </div>
        </Link>
         

        {
          user.isSeller && (
             <div>
                <Link to="/profile/products" >
                    <div className={`flex gap-2 items-center font-medium transition-all duration-200 px-5 py-2 ${matchRoute("/profile/products") ? "border-l-[5px] bg-royal-blue-50 text-royal-blue-700 border-royal-blue-500" : "border-l-[5px] border-white hover:bg-gray-100"}  mr-3 rounded-r-full`}>
                      <BsFillHandbagFill/>
                      <p>Products</p>
                    </div>
                </Link>

                <Link to="/profile/add-product" >
                    <div className={`flex gap-2 items-center font-medium transition-all duration-200 px-5 py-2 ${matchRoute("/profile/add-product") ? "border-l-[5px] bg-royal-blue-50 text-royal-blue-700 border-royal-blue-500" : "border-l-[5px] border-white hover:bg-gray-100"}  mr-3 rounded-r-full`}>
                      <MdOutlineAddCircle/>
                      <p>Add Product</p>
                    </div>
                </Link>
                
                <Link to="/profile/dashboard" >
                    <div className={`flex gap-2 items-center font-medium transition-all duration-200 px-5 py-2 ${matchRoute("/profile/dashboard") ? "border-l-[5px] bg-royal-blue-50 text-royal-blue-700 border-royal-blue-500" : "border-l-[5px] border-white hover:bg-gray-100"}  mr-3 rounded-r-full`}>
                      <RiDashboardLine/>
                      <p>Dashboard</p>
                    </div>
                </Link>
             </div>
          )
        }
        {
           !user.isSeller && (
             <Link to="/become-seller">
                <div className={`flex gap-2 items-center font-medium transition-all duration-200 px-5 py-2 ${matchRoute("/become-seller") ? "border-l-[5px] bg-royal-blue-50 text-royal-blue-700 border-royal-blue-500" : "border-l-[5px] border-white hover:bg-gray-100"}  mr-3 rounded-r-full`}>
                   <LiaUserLockSolid size={20}/>
                   <p>Become Seller</p> 
                </div>
             </Link>
           )
        }
        
        <Link to="/profile/wishlists">
            <div className={`flex gap-2 items-center font-medium transition-all duration-200 px-5 py-2 ${matchRoute("/profile/wishlists") ? "border-l-[5px] bg-royal-blue-50 text-royal-blue-700 border-royal-blue-500" : "border-l-[5px] border-white hover:bg-gray-100"}  mr-3 rounded-r-full`}>
                <FaRegHeart/>
                <p>Wishlist</p>
            </div>
        </Link>
        
        <Link to="/profile/setting">
            <div className={`flex gap-2 items-center font-medium transition-all duration-200 px-5 py-2 ${matchRoute("/profile/setting") ? "border-l-[5px] bg-royal-blue-50 text-royal-blue-700 border-royal-blue-500" : "border-l-[5px] border-white hover:bg-gray-100"}  mr-3 rounded-r-full`}>
                <GoGear/>
                <p>Settings</p>
            </div>            
        </Link>

        <div className='px-5 bg-gray-200 h-[1px] w-[85%] mx-auto my-4'></div>


        <button className='flex gap-2 items-center font-medium px-5 py-2'
          onClick={() =>setOpen(true)}>
           <IoIosLogOut/>
            Logout
        </button>


        <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
              <h2 className='text-xl font-semibold mb-1'>Are you sure??</h2>
              <p>Do you really want to logout?</p>
              <div className='flex justify-around mt-8'>
                 <button
                    onClick={Logout} 
                    className='py-2 px-4 bg-royal-blue-600 text-white rounded-md hover:bg-royal-blue-500 transition-all duration-200'>Logout</button>

                 <button 
                    onClick={() => setOpen(false)}
                    className='py-2 px-4 border border-black rounded-md hover:bg-gray-100 transition-all duration-200'>Cancel</button>
              </div>
            </Box>
        </Modal>
    </div>
  )
}

export default Sidebar
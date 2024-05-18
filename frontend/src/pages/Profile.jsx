import React, { useState } from 'react'
import Sidebar from '../components/core/Profile/Sidebar'
import { Outlet } from 'react-router-dom'
import { RiMenuFill } from "react-icons/ri";
import { RiMenuFoldLine } from "react-icons/ri";

const Profile = () => {
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <div className='flex relative  h-[calc(100vh-3.5rem)]'>

        {
           showSideBar ? (
            <div 
              onClick={() => setShowSideBar(false)}
              className='block lg:hidden absolute top-2 left-2 z-[1000]'>
               <RiMenuFoldLine size={22}/>
            </div>
           ) : (
            <div
            onClick={() => setShowSideBar(true)} 
            className='block lg:hidden absolute top-2 left-2'>
                <RiMenuFill size={22}/>
            </div>
           )
        }
        
        

        {
           showSideBar && (
            <div className='absolute bg-white z-[100]'>
              <Sidebar/>
            </div>
           )
        }



        <div className='hidden lg:block'>
           <Sidebar/>
        </div>

        <div className='h-[cal(100vh-3.5rem)] flex-1 overflow-auto w-full'>  
            
            <div className='w-11/12 max-w-[1000px] mx-auto '>
                <Outlet/>
            </div>
        </div> 
    </div>
  )
}

export default Profile
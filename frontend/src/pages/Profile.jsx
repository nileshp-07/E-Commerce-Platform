import React from 'react'
import Sidebar from '../components/core/Profile/Sidebar'
import { Outlet } from 'react-router-dom'

const Profile = () => {
  return (
    <div className='flex relative  h-[calc(100vh-3.5rem)]'>

        <div className='hidden lg:block'>
           <Sidebar/>
        </div>

        <div className='h-[cal(100vh-3.5rem)] flex-1 overflow-auto w-full '>  
            
            <div className='w-11/12 max-w-[1000px] mx-auto py-10'>
                <Outlet/>
            </div>
        </div> 
    </div>
  )
}

export default Profile
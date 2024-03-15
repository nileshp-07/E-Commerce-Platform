import React from 'react'
import Sidebar from '../components/core/Profile/Sidebar'
import { Outlet } from 'react-router-dom'

const Profile = () => {
  return (
    <div className='flex gap-5'>
        <Sidebar/>


        <div className='py-10 h-[calc(100vh-3.5rem)] w-11/12 max-w-[1000px] mx-auto'>
          <Outlet/>
        </div>
    </div>
  )
}

export default Profile
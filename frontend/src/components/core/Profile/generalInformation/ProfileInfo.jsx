import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import ProfileImage from './ProfileImage';
import UserDetails from './UserDetails';
import UserAddress from './UserAddress';

const ProfileInfo = () => {
  const {user} = useSelector((state) => state.user)
  const [loading , setLoading] = useState(false);

 
  if(loading)
  {
     return (<div className='h-[calc(100vh-3.5rem)] grid place-items-center'>
        <div className='spinner'></div>
     </div>)
  }
  return (
    <div className='pb-10'>
        <h2 className='md:text-2xl text-xl font-medium lg:mb-10 py-10 '>General Information</h2>
        
        <ProfileImage user={user} setLoading = {setLoading}/>

        <UserDetails user={user} setLoading = {setLoading}/> 

        <UserAddress user={user} setLoading = {setLoading}/>
    </div>
  )
}

export default ProfileInfo
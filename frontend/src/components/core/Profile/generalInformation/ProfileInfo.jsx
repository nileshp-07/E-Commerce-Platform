import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import ProfileImage from './ProfileImage';
import UserDetails from './UserDetails';
import UserAddress from './UserAddress';

const ProfileInfo = () => {
  const {user} = useSelector((state) => state.user)
  const {loading} = useSelector((state) => state.user)

 
  console.log(user);

  if(loading)
  {
     return (<div className='h-[calc(100vh-3.5rem)] grid place-items-center'>
        <div className='spinner'></div>
     </div>)
  }
  return (
    <div className='pb-10'>
        <h2 className='text-2xl font-semibold mb-10 py-10 '>General Information</h2>
        
        <ProfileImage user={user}/>

        <UserDetails user={user}/> 

        <UserAddress user={user}/>
    </div>
  )
}

export default ProfileInfo
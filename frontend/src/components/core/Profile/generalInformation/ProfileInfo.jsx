import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import ProfileImage from './ProfileImage';
import UserDetails from './UserDetails';
import UserAddress from './UserAddress';

const ProfileInfo = () => {
  const {user} = useSelector((state) => state.user)

 
  console.log(user);
  return (
    <div className='pb-10'>
        <h2 className='text-2xl font-semibold mb-10 '>General Information</h2>
        
        <ProfileImage user={user}/>

        <UserDetails user={user}/> 

        <UserAddress user={user}/>
    </div>
  )
}

export default ProfileInfo
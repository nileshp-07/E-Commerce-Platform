import React from 'react'

const ProfileImage = ({user}) => {
  return (
    <div className='py-6 px-8 border rounded-md flex items-center gap-5 profile-shadow' >
        <div>
            <img
                src={user.profileImage}
                className='h-[120px] w-[120px] aspect-square rounded-full border'
            />
        </div>
        <div>
            <p className='text-[18px] font-medium text-gray-900'>{user.name}</p>
            <button className='py-[6px] px-4 bg-royal-blue-500 rounded-md text-white mt-3'>
                Change
            </button>
        </div>
    </div>
  )
}

export default ProfileImage
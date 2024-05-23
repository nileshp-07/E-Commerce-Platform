import React from 'react'
import ChangePassword from './ChangePassword'
import DeleteAccount from './DeleteAccount'

const Settings = () => {
  return (
    <div className='my-10'>
       <h2 className='md:text-2xl text-xl font-semibold md:mb-8 mb-5'>Settings</h2>
       <ChangePassword/>

       <DeleteAccount/>
    </div>
  )
}

export default Settings
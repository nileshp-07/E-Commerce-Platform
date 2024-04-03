import React from 'react'
import ChangePassword from './ChangePassword'
import DeleteAccount from './DeleteAccount'

const Settings = () => {
  return (
    <div className='my-10'>
       <h2 className='text-2xl font-semibold mb-8'>Settings</h2>
       <ChangePassword/>

       <DeleteAccount/>
    </div>
  )
}

export default Settings
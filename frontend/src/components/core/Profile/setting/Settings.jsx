import React from 'react'
import ChangePassword from './ChangePassword'
import DeleteAccount from './DeleteAccount'

const Settings = () => {
  return (
    <div>
       <h2 className='text-2xl font-semibold mb-10'>Settings</h2>
       <ChangePassword/>

       <DeleteAccount/>
    </div>
  )
}

export default Settings
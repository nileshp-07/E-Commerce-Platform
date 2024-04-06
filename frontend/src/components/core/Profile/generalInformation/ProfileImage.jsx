import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner';
import { updateProfileImage } from '../../../../services/operations/profileAPI';

const ProfileImage = ({user, setLoading}) => {
  const {token} = useSelector((state) => state.user);
  const [image, setImage] = useState("");
  const dispatch  = useDispatch();
  const inputRef = useRef(null);

  console.log(user);

  console.log(image);

  const changeProfileImage = async () => {
        if(!image) {
            toast.error("Please select image first");
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("image" , image);

        await updateProfileImage(formData ,token , dispatch);

        setLoading(false);
        
        
  }

  return (
    <div className='py-6 px-8 border rounded-md flex items-center gap-5 profile-shadow' >
        <div>
            <img
                src={image ? URL.createObjectURL(image) : user.profileImage}
                className='h-[120px] w-[120px] aspect-square rounded-full border'
            />
        </div>
        <div>
            <p className='text-[18px] font-medium text-gray-900'>{user.name}</p>
            <input
                type="file"
                id='profileImage'
                ref={inputRef}
                accept="image/*"
                onChange= {(e) => setImage(e.target.files[0])}
                className='hidden'
            />
            <div className='flex gap-5'>
                <button 
                    onClick={() => inputRef.current.click()}
                    className='py-[6px] px-4 bg-royal-blue-500 rounded-md text-white mt-3'>
                    Change
                </button>

                {
                    image && (
                        <button 
                            onClick={changeProfileImage}
                            className='py-[6px] px-4 bg-royal-blue-500 rounded-md text-white mt-3'>
                            Upload
                        </button>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default ProfileImage
import React from 'react'
import image from "../../assets/page_not_found_image.png"


const Error = () => {
  return (
    <div className='w-full h-[calc(100vh-3.5rem)] flex items-center justify-center'>
        <div className='text-7xl text-center font-bold'>
            <img
              src={image}
              className='md:h-[600px] h-[300px] w-[300px] md:w-[600px]'
            />
        </div>
    </div>
  )
}

export default Error
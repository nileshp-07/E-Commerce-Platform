import React, { useState } from 'react'

const ProductImages = ({images}) => {
    const [selectedImage , setSelectedImage] = useState(images[0]);
  return (
    <div className='flex gap-5'>
        <div className='flex flex-col gap-2'>
            {
                images.map((url , index) => (
                    <div key={index}  
                         className={`h-[119px] w-[120px] p-3 bg-gray-100 cursor-pointer ${selectedImage === url && "border-2 border-royal-blue-500 scale-105"}`}
                         onClick={() => setSelectedImage(url)}>
                       <img
                            src={url}
                            alt='productImages'
                            className='object-contain h-full w-full'
                            style={{ mixBlendMode: 'multiply' }}
                       />
                    </div>
                ))
            }
        </div>
        <div className='h-[500px] w-[500px] p-6 bg-gray-100 flex items-center justify-center' >
            <img
                src={selectedImage}
                alt='productImages'
                loading='lazy'
                style={{ mixBlendMode: 'multiply' }}
                className='h-full object-contain'
            />
        </div>
    </div>
  )
}

export default ProductImages
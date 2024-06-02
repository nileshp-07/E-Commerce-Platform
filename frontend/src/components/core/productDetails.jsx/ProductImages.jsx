import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";

const ProductImages = ({images}) => {
    const [selectedImage , setSelectedImage] = useState(images ? images[0] : null);
  return (
    <div className='flex gap-5 flex-col-reverse md:flex-row mx-auto md:mt-0 -mt-5 '>
        <div className='max-h-[500px] h-fit relative p-1 w-[350px] md:w-fit' style={{ position: 'relative', overflow: 'hidden' }}>
            <div className='overflow-y-auto h-fit max-h-[500px] p-1 flex flex-row md:flex-col gap-2' style={{ paddingRight: '16px', marginRight: '-16px' }}>
                {
                    images?.map((url , index) => (
                        <div key={index}  
                            className={`md:min-h-[117px] md:h-[117px] md:min-w-[120px] md:w-[120px] min-h-[100px] h-[100px] min-w-[100px] p-3 bg-gray-100 cursor-pointer ${selectedImage === url && "border-2 border-royal-blue-500 scale-105"}`}
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
            {
                images?.length > 4 && (
                    <div className='hidden  md:block absolute md:bottom-1 md:left-[58px] '>
                        <IoIosArrowDown size={24} fill='black'/>
                    </div>
                )
            }
        </div>

        <div className='md:h-[500px] md:w-[500px] h-[350px] w-[350px] p-6 bg-gray-100 flex items-center justify-center' >
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
import React, { useRef, useState } from 'react'
import { FiUpload } from "react-icons/fi";
import { toast } from 'sonner';
import { RiDeleteBin5Line } from "react-icons/ri";

const ProductImages = () => {
  const thumbnailRef = useRef();
  const imagesRef = useRef();
  const [thumbnail, setThumbnail] = useState("");
  const [images , setImages] = useState([]);


  const handleThumbnailInput = (e) => {
    const productThumbnail = e.target.files[0];

    setThumbnail(productThumbnail);
  }


  const handleImagesInput = (e) => {
    const productImages = Array.from(e.target.files).slice(0, 5);

    if(productImages.length + images.length > 5)
    {
      toast.error("maximum 5 product images are allowed");
      return;
    }
    setImages(prevImages => [...prevImages, ...productImages])
  }

  
  return (
    <div>
        <h2 className='font-medium'>Product thumbnail</h2>
        
        <div>
            {
              thumbnail ? (
                <div className='w-[300px] h-[180px] mt-3 rounded-md relative group'>
                   <img
                     src={URL.createObjectURL(thumbnail)}
                     alt='thumbnail'
                     loading='lazy'
                     className='w-full h-full  rounded-md object-cover'
                   />
                   <div 
                       onClick={() => setThumbnail("")}
                       className='hidden group-hover:flex hover:scale-105 text-pink-200 cursor-pointer absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] transition-all duration-200 p-4 bg-pink-25 rounded-full'>
                     <RiDeleteBin5Line size={30}/>
                   </div>
                </div>
               ) : (
              <div 
                onClick={() => thumbnailRef.current.click()}
                className='w-[300px] h-[180px] mt-3 rounded-md flex flex-col items-center justify-center gap-3 bg-royal-blue-50 text-royal-blue-500 cursor-pointer'>
                  <FiUpload size={30}/>
                  <p className='text-[18px] font-medium '>
                    choose thumbnail
                  </p>
              </div>
               )
            }
            <input
              type='file'
              name='thumbnail'
              ref={thumbnailRef}
              multiple = {false}
              accept="image/*" 
              onChange={handleThumbnailInput}
              className='hidden'
            />
        </div>
       

        <h2 className='font-medium mt-10 mb-3'>Add product photos (max 5)</h2>
        <div className='border-dashed border-[3px] py-5 px-8 grid grid-cols-3 gap-x-5 gap-y-3'>
            <input
                type='file'
                name='images'
                ref={imagesRef}
                multiple
                accept="image/*" 
                onChange={handleImagesInput}
                className='hidden'
              />
            <div 
               onClick={() => imagesRef.current.click()}
               className='w-[300px] h-[180px] rounded-md flex flex-col items-center justify-center gap-3 bg-royal-blue-50 text-royal-blue-500 cursor-pointer'>
                <FiUpload size={30}/>
                <p className='text-[18px] font-medium '>
                  choose images
                </p>
            </div>
            {
               images.map((image , index) => (
                <div className='w-[300px] h-[180px] rounded-md relative group' key={index}>
                   <img
                     src={URL.createObjectURL(image)}
                     alt='productImage'
                     loading='lazy'
                     className='w-full h-full rounded-md'
                   />
                   <div className=' hidden group-hover:flex hover:scale-105 text-pink-200 cursor-pointer absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] transition-all duration-200 p-4 bg-pink-25 rounded-full'
                        onClick={() => {
                           const newImages = [...images];
                           newImages.splice(index , 1);
                           setImages(newImages);

                           if(images.length === 0)
                           setImages([]);
                        }}>
                     <RiDeleteBin5Line size={30}/>
                   </div>
                </div>
               ))
            }

        </div>

        <div className='my-9 mx-auto flex justify-end px-16'>
            <button className=' flex items-center gap-2 py-1 pt-2 px-5 bg-royal-blue-500 rounded-md text-white'>
                <p className='mb-1'>Add Product</p>
            </button>
        </div>
    </div>
  )
}

export default ProductImages
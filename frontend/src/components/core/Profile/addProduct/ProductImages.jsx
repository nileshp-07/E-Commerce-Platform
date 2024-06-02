import React, { useEffect, useRef, useState } from 'react'
import { FiUpload } from "react-icons/fi";
import { toast } from 'sonner';
import { RiDeleteBin5Line } from "react-icons/ri";
import {useSelector, useDispatch} from "react-redux"
import { addProduct, editProductDetails } from '../../../../services/operations/productAPI';
import { useNavigate, useSearchParams } from 'react-router-dom'
import { resetProduct } from '../../../../redux/slices/productSlice';


const ProductImages = ({setStep}) => {
  const thumbnailRef = useRef();
  const navigate = useNavigate();
  const imagesRef = useRef();
  const dispatch = useDispatch()
  const [thumbnail, setThumbnail] = useState("");
  const [images , setImages] = useState([]);
  const {product, isEdit} = useSelector((state) => state.product);
  const {token} = useSelector((state) => state.user)


  const handleThumbnailInput = (e) => {
    const productThumbnail = e.target.files[0];
    setThumbnail(productThumbnail);
  }

  useEffect(() => {
    if(isEdit)
    {
       setThumbnail(product.thumbnail);
       setImages(product.images)

      //  setImages(product.images);
    }
  }, [])


  const handleImagesInput = (e) => {
    const productImages = Array.from(e.target.files).slice(0, 5);

    if(productImages.length + images.length > 5)
    {
      toast.error("maximum 5 product images are allowed");
      return;
    }
    setImages(prevImages => [...prevImages, ...productImages])
  }

  const handleAddProduct = async () => {
      if(!thumbnail || !images.length===0)
      {
         toast.error("Please select the thumbnail and image to add product");
         return;
      }


      const newProduct = {...product};

      newProduct.thumbnail = thumbnail; 
      newProduct.images = images;

      const formData = new FormData();

      formData.append("title", newProduct.title);
      formData.append("price", newProduct.price);
      formData.append("brand", newProduct.brand);
      formData.append("categories", newProduct.categories);
      formData.append("thumbnail", newProduct.thumbnail);
      // formData.append("images", newProduct.images);

      newProduct.images.forEach((image, index) => {
        formData.append('images', image);
      });
      formData.append("stocks", newProduct.stocks);
      formData.append("discountedPrice", newProduct.discountedPrice);
      formData.append("discount", newProduct.discount);
      formData.append("description", newProduct.description);
      formData.append("specifications", JSON.stringify(newProduct.specifications));


       await addProduct(formData,token)
       dispatch(resetProduct())
       navigate("/profile/products");

  }


  const handleSaveChanges = async () => {
    const formData = new FormData();

    formData.append("productId", product._id);
    formData.append("title", product.title);
    formData.append("price", product.price);
    formData.append("brand", product.brand);
    formData.append("categories", product.categories);
    // formData.append("thumbnail", product.thumbnail);

    // product.images.forEach((image, index) => {
    //   formData.append('images', image);
    // });
    formData.append("stocks", product.stocks);
    formData.append("discountedPrice", product.discountedPrice);
    formData.append("discount", product.discount);
    formData.append("description", product.description);
    formData.append("specifications", JSON.stringify(product.specifications));


     await editProductDetails(formData,token)
     dispatch(resetProduct())

     navigate("/profile/products");
  }
  
  return (
    <div>
        <h2 className='font-medium'>Product thumbnail</h2>
        
        <div>
            {
              thumbnail ? (
                <div className='w-[350px] h-[190px] mt-3 rounded-md relative group'>
                   <img
                    src = {isEdit ? thumbnail  : URL.createObjectURL(thumbnail)}
                     alt='thumbnail'
                     loading='lazy'
                     className='w-full h-full  rounded-md object-contain p-2'
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
                className='w-[350px] h-[190px] mt-3 rounded-md flex flex-col items-center justify-center gap-3 bg-royal-blue-50 text-royal-blue-500 cursor-pointer'>
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
        <div className='border-dashed border-[3px] py-5 px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-3'>
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
                     src = {isEdit ? image : URL.createObjectURL(image)}
                     alt='productImage'
                     loading='lazy'
                     className='w-full h-full rounded-md object-contain p-2'
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

        {
          isEdit ? ( 
            <div className='my-9 mx-auto flex justify-end md:px-16'>
                <button 
                  onClick={handleSaveChanges}
                  className=' flex items-center gap-2 py-1 pt-2 px-5 bg-royal-blue-500 rounded-md text-white'>
                    <p className='mb-1'>Save Changes</p>
                </button>
            </div>
          ) : (
            <div className='my-9 mx-auto flex justify-end md:px-16'>
                <button 
                  onClick={handleAddProduct}
                  className=' flex items-center gap-2 py-1 pt-2 px-5 bg-royal-blue-500 rounded-md text-white'>
                    <p className='mb-1'>Add Product</p>
                </button>
            </div>
          )
        }
    </div>
  )
}

export default ProductImages
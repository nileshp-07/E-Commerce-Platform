import React, { useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { IoMdAddCircle } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import {useDispatch, useSelector} from "react-redux"
import { setProduct } from '../../../../redux/slices/productSlice';
import {toast} from "sonner"

const ProductDescription = ({setStep}) => {
  const [specifications , setSpecifications] = useState({})
  const {product, isEdit} = useSelector((state) => state.product);
  const dispatch = useDispatch();

  console.log("Edit product : ",product);

  const {
     register ,
     setValue,
     getValues,
     formState: { errors },
     handleSubmit ,
     watch,
  } = useForm();


    // Watch for changes in price and discount fields
    const price = watch("price");
    const discount = watch("discount");


    useEffect(() => {
        if(isEdit)
        {
            setValue("title", product.title);
            setValue("brand", product.brand);
            setValue("stocks", product.stocks);
            setValue("description", product.description);
            setValue("price", product.price);
            setValue("discount", product.discount);
            setValue("discountedPrice", product.discountedPrice);
            setSpecifications(product.specifications);
        }
    }, [])
  
    useEffect(() => {
      // Recalculate discounted price when price or discount changes
      if (price && discount) {
        const originalPrice = parseFloat(price);
        const discountPercentage = parseFloat(discount) / 100;
        const discountedPrice = originalPrice - (originalPrice * discountPercentage);
        setValue("discountedPrice", discountedPrice.toFixed(2));
      }
    }, [price, discount, setValue]);



    const addSpecification = () => {
        const key = watch("key");
        const value = watch("value");

        if(!key || !value)
        {
            return;
        }
    
        setSpecifications({...specifications, [key] : value});
    
    
        setValue("key", "")
        setValue("value", "")
    }


  const onSubmit = () => {
  
    const values = getValues();
    const discountedPrice = watch("discountedPrice")
    
    const productDetails = {};

    productDetails.title = values.title;
    productDetails.description = values.description;
    productDetails.discount = parseInt(values.discount);
    productDetails.price = parseInt(values.price);
    productDetails.discountedPrice = parseInt(values.discountedPrice);
    productDetails.stocks = parseInt(values.stocks);
    productDetails.brand = values.brand;
    productDetails.specifications = specifications;

    if(!productDetails.title || !productDetails.price || !productDetails?.stocks)
    {
        toast.error("Please  fill the required details to proceed");
        return;
    }

    dispatch(setProduct(productDetails));

    setStep(2);
  }


  const handleEditProduct = (e) => {
    e.preventDefault();
    const values = getValues();

    const editedProduct = {...product};

    editedProduct.title = values.title
    editedProduct.discount = parseInt(values.discount);
    editedProduct.description = values.description;
    editedProduct.price = parseInt(values.price);
    editedProduct.discountedPrice = parseInt(values.discountedPrice);
    editedProduct.stocks = parseInt(values.stocks);
    editedProduct.brand = values.brand;
    editedProduct.specifications = specifications;

    dispatch(setProduct(editedProduct))

    setStep(2);
  }
  return (
    <div>
        <h2 className='font-medium md:mb-8 mb-5'>Fill in the basic information about your product</h2>

        <form onSubmit={handleSubmit(onSubmit)}
           className='md:w-[700px] '>
                {/* title  */}
                <div className='flex flex-col w-full'>
                    <label htmlFor='title' className='font-medium text-[14px]'>Title<sup className='text-pink-200'>*</sup></label>
                    <input
                        type='text'
                        id='title'
                        placeholder='Enter product title'
                        className='field-style'
                        {...register("title", {required : true, maxLength:"60"})}
                    />
                    {
                        errors.title?.type === "required"  && (
                            <span className='ml-2 text-xs text-pink-200 tracking-wide'>
                                Product title is required
                            </span>
                        )
                    }
                    {
                        errors.title?.type === "maxLength"  && (
                            <span className='ml-2 text-xs text-pink-200 tracking-wide'>
                               Maximum length exceeded ie (60 characters)
                            </span>
                        )
                    }
                </div>

                {/* brand and stocks  */}
                <div className='flex gap-5 mt-5'>
    
                    <div className='flex flex-col'>
                        <label htmlFor='brand' className='font-medium text-[14px]'>Brand</label>
                        <input
                            type='text'
                            id='brand'
                            placeholder='Enter products brand'
                            className='field-style'
                            {...register("brand")}
                        />
                    </div>
    
                    <div className='flex flex-col w-[120px]'>
                        <label htmlFor='stocks' className='font-medium text-[14px]'>Stocks<sup className='text-pink-200'>*</sup></label>
                        <input
                            type='text'
                            id='stocks'
                            placeholder='Availability'
                            className='field-style'
                            {...register("stocks", {required : true , pattern: /^[0-9]*$/ })}
                        />
                        {
                            errors.stocks?.type === "required" && (
                                <span className='ml-2 text-xs text-pink-200 tracking-wide'>
                                    please enter the stocks
                                </span>
                            )
                        }
                        {
                            errors.stocks?.type === "pattern" && (
                                <span className='ml-2 text-xs text-pink-200 tracking-wide'>
                                  Only numbers are allowed
                                </span>
                            )
                        }
                        
                    </div>
                </div>
                
                {/* description */}
                <div className='flex flex-col w-full mt-5'>
                    
                    <label htmlFor='description' className='font-medium text-[14px]'>Description</label>
                    <textarea
                        name='description'
                        id='description'
                        placeholder='Enter product description'
                        className='field-style  min-h-[150px] max-h-[150px]'
                        {...register("description" , {maxLength: "300"})}
    
                    />
                    {
                        errors.description && (
                            <span className='ml-2 text-xs text-pink-200 tracking-wide'>
                                 product description length should be less than 300 characters
                            </span>
                        )
                    }
                </div>

                {/* prices  */}
                <div className='flex flex-wrap gap-5 md:gap-9 mt-5'>
                    <div className='flex flex-col w-[160px] md:w-[200px]'>
                        <label htmlFor='price' className='font-medium text-[14px]'>Price<sup className='text-pink-200'>*</sup></label>
                        <input
                            type='text'
                            id='price'
                            placeholder='Enter product price'
                            className='field-style'
                            {...register("price", {required : true, pattern: /^[0-9]*$/ })}
                        />
                        {
                            errors.price?.type === "required"  && (
                                <span className='ml-2 text-xs text-pink-200 tracking-wide'>
                                    Product price is required
                                </span>
                            )
                        }
                        {
                            errors.price?.type === "pattern"  && (
                                <span className='ml-2 text-xs text-pink-200 tracking-wide'>
                                    Only Numbers are allowed
                                </span>
                            )
                        }
                    </div>
    
                    <div className='flex flex-col w-[160px] md:w-[200px]'>
                        <label htmlFor='discount' className='font-medium text-[14px]'>Discount</label>
                        <input
                            type='text'
                            id='discount'
                            placeholder='Enter products discount'
                            className='field-style'
                            {...register("discount" , {min : 1, max : 99,  pattern: /^[0-9]*$/ })}
                        />
                        {
                            errors.discount?.type === "pattern"  && (
                                <span className='ml-2 text-xs text-pink-200 tracking-wide'>
                                    Only Numbers are allowed
                                </span>
                            )
                        }
                        {errors.discount?.type === "min" && (
                            <span className='ml-2 text-xs text-pink-200 tracking-wide'>
                            Discount must be at least 1
                            </span>
                        )}
                        {errors.discount?.type === "max" && (
                            <span className='ml-2 text-xs text-pink-200 tracking-wide'>
                            Discount cannot exceed 99
                            </span>
                        )}
                    </div>
    
                    <div className='flex flex-col  w-[160px] md:w-[200px]'>
                        <label htmlFor='discountedPrice' className='font-medium text-[14px]'>Selling Price<sup className='text-pink-200'>*</sup></label>
                        <input
                            type='text'
                            id='discountedPrice'
                            disabled
                            placeholder='Selling Price of product'
                            className='field-style  text-gray-600'
                            {...register("discountedPrice")}
                        />
                    </div>
                </div>

            
                <div className='mt-5'>
                   <div className='flex flex-col md:flex-row md:gap-8 gap-5 md:items-center'>
                        <div className='flex flex-col w-[200px]'>
                            <label htmlFor='key' className='font-medium text-[14px]'>Specification key</label>
                            <input
                                type='text'
                                id='key'
                                placeholder='Enter specification key'
                                className='field-style'
                                {...register("key")}
                            />
                        </div>
                        <div className='flex gap-2 items-center'>
                            <div className='flex flex-col'>
                                <label htmlFor='value' className='font-medium text-[14px]'>Specification value</label>
                                <input
                                    type='text'
                                    id='value'
                                    placeholder='Enter specification value'
                                    className='field-style md:w-[465px] w-[320px]'
                                    {...register("value")}
                                />
                            </div>

                            <div onClick={addSpecification} className='mt-4'>
                            <IoMdAddCircle size={30}/>
                            </div>
                        </div>
                   </div>
                   {
                    Object.keys(specifications).length > 0 && (
                        <h2 className='text-[14px] font-semibold mt-5 '>Specifications</h2>
                    )
                   }
                   {
                        Object.keys(specifications).length > 0 && (
                      <div className='bg-[#EEEEEE] outline-none rounded-md p-2 w-full flex flex-col gap-1'>
                          {
                            Object.entries(specifications).map(([key , value], index) => (
                                <div key={index} className='relative flex gap-5 py-2 px-5 rounded-md hover:bg-gray-200 group'>
                                    <p className='font-medium'>{key} : </p>
                                    <p>{value}</p>
                                    <div
                                        onClick={() => {
                                            const newSpecifications = {...specifications};
                                            delete newSpecifications[key];
                                            setSpecifications(newSpecifications);
                                        }} 
                                        className='absolute right-1 top-1 cursor-pointer p-[2px] hidden group-hover:flex hover:bg-gray-300 rounded-full'>
                                        <RxCross2 size={14}/>
                                    </div>
                                </div>
                            ))
                          }
                      </div>
                      )
                   }
                </div>

                {
                    isEdit ? (
                        <div className='md:my-14 my-8 mx-auto flex justify-end md:px-10'>
                            <button onClick={handleEditProduct}
                                    className=' flex items-center gap-2 py-1 pt-2 px-5 bg-royal-blue-500 rounded-md text-white'>
                                <p className='mb-1'>Save</p>
                                <FaArrowRightLong/>
                            </button>
                        </div>
                    ) : (
                        <div className='md:my-14 my-8 mx-auto flex justify-end md:px-10 '>
                            <button  onClick={onSubmit}
                                     type='submit'
                                    className=' flex items-center gap-2 py-1 pt-2 px-5 bg-royal-blue-500 rounded-md text-white'>
                                <p className='mb-1'>Next</p>
                                <FaArrowRightLong/>
                            </button>
                        </div>
                    )
                }
            </form>
    </div>
  )
}

export default ProductDescription
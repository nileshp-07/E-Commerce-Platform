import React, { useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { IoMdAddCircle } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";

const ProductDescription = () => {
  const [specifications , setSpecifications] = useState({})

  const {
     register ,
     setValue,
     getValues,
     formState: { errors },
     handleSubmit ,
     watch,
     control
  } = useForm();


    // Watch for changes in price and discount fields
    const price = watch("price");
    const discount = watch("discount");
  
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
    
    console.log(values, discountedPrice);

  }
  return (
    <div>
        <h2 className='font-medium mb-10'>Fill in the basic information about your product</h2>

        <form onSubmit={handleSubmit(onSubmit)}
           className='w-[700px] '>
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
                <div className='flex gap-8 mt-8'>
    
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
                <div className='flex flex-col w-full mt-8'>
                    
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
                <div className='flex gap-9 mt-8'>
                    <div className='flex flex-col'>
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
    
                    <div className='flex flex-col'>
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
    
                    <div className='flex flex-col'>
                        <label htmlFor='discountedPrice' className='font-medium text-[14px]'>Selling Price<sup className='text-pink-200'>*</sup></label>
                        <input
                            type='text'
                            id='discountedPrice'
                            disabled
                            placeholder='Selling Price of product'
                            className='field-style w-[180px] text-gray-600'
                            {...register("discountedPrice")}
                        />
                    </div>
                </div>

            
                <div className='mt-8'>
                   <div className='flex gap-8 items-center'>
                        <div className='flex flex-col'>
                        <label htmlFor='key' className='font-medium text-[14px]'>Specification key</label>
                        <input
                            type='text'
                            id='key'
                            placeholder='Enter specification key'
                            className='field-style'
                            {...register("key")}
                        />
                        </div>
                        <div className='flex flex-col'>
                        <label htmlFor='value' className='font-medium text-[14px]'>Specification value</label>
                        <input
                            type='text'
                            id='value'
                            placeholder='Enter specification value'
                            className='field-style w-[465px]'
                            {...register("value")}
                        />
                        </div>

                        <div onClick={addSpecification} className='mt-4 -ml-5'>
                           <IoMdAddCircle size={30}/>
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
                                <div key={index} className='flex gap-5 py-2 px-5 rounded-md hover:bg-gray-200'>
                                    <p className='font-medium'>{key} : </p>
                                    <p>{value}</p>
                                </div>
                            ))
                          }
                      </div>
                      )
                   }
                </div>

                <div className='my-14 mx-auto flex justify-end px-10'>
                    <button type='submit'
                            className=' flex items-center gap-2 py-1 pt-2 px-5 bg-royal-blue-500 rounded-md text-white'>
                        <p className='mb-1'>Next</p>
                        <FaArrowRightLong/>
                    </button>
                </div>
            </form>
    </div>
  )
}

export default ProductDescription
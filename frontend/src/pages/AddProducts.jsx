import React, { useState } from 'react'

import { BiEdit } from "react-icons/bi";
import { TbCategoryPlus } from "react-icons/tb";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import doneIcon from "../assets/done-icon.png"
import ProductDescription from '../components/core/Profile/addProduct/ProductDescription';
import Categories from '../components/core/Profile/addProduct/Categories';
import ProductImages from '../components/core/Profile/addProduct/ProductImages';
import {useSelector} from "react-redux"
import { useSearchParams } from 'react-router-dom';

const AddProducts = () => {
    const [step , setStep] = useState(1);
    const {isEdit} = useSelector((state) => state.product);
   
  return (
    <div className='w-full pt-10'>

        <h2 className='md:text-2xl text-xl font-semibold mb-8'>
            {
                isEdit ? "Edit Product" : "Add Product"
            }
        </h2>
        <div className='flex justify-between md:w-[600px] w-[350px] mx-auto items-center'>

            <div className='flex flex-col items-center'>
                <div 
                    className={`md:p-3 p-2 relative rounded-full w-fit  ${step === 1 ? "bg-royal-blue-500 text-white" : "bg-royal-blue-100 text-royal-blue-600"}`}>
                    <BiEdit className='md:text-[30px] text-[27px]'/>
                    {
                        step > 1 && (
                            <div  className='absolute  left-[60%] bottom-[-2px]'>
                                <img
                                    src={doneIcon}
                                    className='md:h-[25px] md:w-[25px] h-[20px] w-[20px] aspect-square'
                                />
                            </div>
                        )
                    }

                    <p className={`md:w-[250px] w-[110px] border-dashed border-b-[3px]  absolute z-[-10] left-10 md:bottom-6 bottom-5 ${step > 1 ? "border-royal-blue-600" : "border-royal-blue-300"}`}></p>
                </div>
                <p className='font-medium mt-1'>Description</p>
            </div>


           <div className='flex flex-col items-center'>
                <div className={`md:p-3 p-2 relative rounded-full w-fit  ${step === 2 ? "bg-royal-blue-500 text-white" : "bg-royal-blue-100 text-royal-blue-600"}`}>
                    <TbCategoryPlus className='md:text-[30px] text-[27px]'/>
                    {
                        step > 2 && (
                            <div className='absolute  left-[60%] bottom-[-2px]'>
                                <img
                                    src={doneIcon}
                                    className='h-[25px] w-[25px] aspect-square'
                                />
                            </div>
                        )
                    }
                    <p className={`md:w-[250px] w-[110px] border-dashed border-b-[3px] absolute z-[-10] left-10 md:bottom-6 bottom-5 ${step > 2 ? "border-royal-blue-600" : "border-royal-blue-300"}`}></p>
                </div>
                <p className='font-medium mt-1'>Categories</p>
           </div>


            <div className='flex flex-col items-center'>
                <div className={`md:p-3 p-2 relative rounded-full w-fit ${step === 3 ? "bg-royal-blue-500 text-white" : "bg-royal-blue-100 text-royal-blue-600"}`}>
                    <MdOutlineAddPhotoAlternate className='md:text-[30px] text-[27px]'/>
                    {
                        step > 3 && (
                            <div className='absolute  left-[60%] bottom-[-2px]'>
                                <img
                                    src={doneIcon}
                                    className='h-[25px] w-[25px] aspect-square'
                                />
                            </div>
                        )
                    }
                </div>
                <p className='font-medium mt-1'>Images</p>
            </div>

        </div>
        
        <div className='md:mt-14 mt-10'>
            {
                step == 1 ? (<ProductDescription setStep= {setStep}/>) : 
                            (step == 2 ? (<Categories setStep={setStep}/>) : (<ProductImages setStep={setStep}/>))
            }
        </div>
    </div>
  )
}

export default AddProducts
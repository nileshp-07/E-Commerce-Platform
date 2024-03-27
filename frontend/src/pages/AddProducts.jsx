import React, { useState } from 'react'

import { BiEdit } from "react-icons/bi";
import { TbCategoryPlus } from "react-icons/tb";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import doneIcon from "../assets/done-icon.png"

const AddProducts = () => {
    const [step , setStep] = useState(1);
  return (
    <div className='w-full pt-10'>
        <div className='relative  w-[500px]  mx-auto'>
            <p className='border-dashed border-b-[3px] border-royal-blue-600 h-[10px] mt-10'></p>

            <div className={`p-3  rounded-full w-fit  absolute left-[-16px] top-[-17px] ${step === 1 ? "bg-royal-blue-500 text-white" : "bg-royal-blue-100 text-royal-blue-600"}`} >
                <BiEdit size={30}/>
                {
                    step > 1 && (
                        <div className='absolute  left-[60%] bottom-[-2px]'>
                            <img
                                src={doneIcon}
                                className='h-[25px] w-[25px] aspect-square'
                            />
                        </div>
                    )
                }
            </div>
            <p className='font-medium absolute left-[-27px] top-[40px]'>Description</p>

            <div className={`p-3 rounded-full w-fit  absolute top-[-17px] left-[48%] ${step === 2 ? "bg-royal-blue-500 text-white" : "bg-royal-blue-100 text-royal-blue-600"}`}>
                <TbCategoryPlus size={30}/>
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
            </div>
            <p className='font-medium absolute top-[40px] left-[46%]'>Categories</p>

            <div className={`p-3 rounded-full w-fit absolute right-[-16px] top-[-17px] ${step === 3 ? "bg-royal-blue-500 text-white" : "bg-royal-blue-100 text-royal-blue-600"}`}>
                <MdOutlineAddPhotoAlternate size={30}/>
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
            <p className='font-medium absolute top-[40px]  right-[-17px]'>Images</p>

        </div>
    </div>
  )
}

export default AddProducts
import React from 'react'

const Specifications = ({productSpecification}) => {
    const specificationsArray = Object?.entries(productSpecification ?? {}).map(([key, value]) => ({ key, value }));
  return (
    <div className='my-10'>
        {
            specificationsArray?.length < 12 ? (
                <div className='flex gap-5 justify-between'>
                    <div className='w-[47%] flex flex-col gap-3'>
                        {
                            specificationsArray && specificationsArray?.slice(0,6).map((item , index) => (
                                <div key={index} className='flex gap-5'>
                                    <span className='text-lg font-medium'>{item?.key}: </span>
                                    <span className='text-lg'>{item?.value}</span>
                                </div>
                            ))
                        }
                    </div>

                    <div className='w-[47%] flex flex-col gap-3'>
                        {
                            specificationsArray && specificationsArray?.slice(6,12).map((item , index) => (
                                <div key={index} className='flex gap-5'>
                                    <span  className='text-lg font-medium'>{item?.key}: </span>
                                    <span className='text-lg'>{item?.value}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            ) : (
                <div className='flex gap-5 justify-between'> 
                   <div className='w-[47%] flex flex-col gap-3'>
                        {
                            specificationsArray && specificationsArray?.slice(0,specificationsArray.length/2).map((item , index) => (
                                <div key={index}  className='flex gap-5'>
                                    <span className='text-lg font-medium'>{item?.key}: </span>
                                    <span className='text-lg'>{item?.value}</span>
                                </div>
                            ))
                        }
                    </div>

                    <div className='w-[47%] flex flex-col gap-3'>
                        {
                            specificationsArray && specificationsArray?.slice(specificationsArray.length/2,specificationsArray.length).map((item , index) => (
                                <div key={index} className='flex gap-5'>
                                    <span className='text-lg font-medium'>{item?.key}: </span>
                                    <span className='text-lg'>{item?.value}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )
        }

    </div>
  )
}

export default Specifications
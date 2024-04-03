import React from 'react'

import mobile from "../../../assets/Categories/mobiles.png"
import computer from "../../../assets/Categories/computer.png"
import smartwatch from "../../../assets/Categories/smartwatch.png"
import headphone from "../../../assets/Categories/headphones.png"
import shoes from "../../../assets/Categories/shoes.png"
import fashion from "../../../assets/Categories/fashion.png"
import { Link } from 'react-router-dom'


const categories = [
    {
        icon : mobile,
        category : "Mobiles",
        link : "/search?query=mobiles"
    },
    {
        icon : computer,
        category : "Computers",
        link : "/search?query=computers"
    },
    {
        icon : smartwatch,
        category : "SmartWatch",
        link : "/search?query=smartwatch"
    },
    {
        icon : headphone,
        category : "Headphones",
        link : "/search?query=headphones"
    },
    {
        icon : shoes,
        category : "Shoes",
        link : "/search?query=shoes"
    },
    {
        icon : fashion,
        category: "Fashion",
        link : "/search?query=fashion"
    }
]


const Categories = () => {
  return (
    <div className='my-20'>

        <div className='flex items-center gap-2 mb-10'>
            <div className='w-[15px] h-[40px] bg-royal-blue-500 rounded-[4px]'></div>
            <h2 className='text-3xl font-semibold'>Browse By Category</h2>
        </div>

        <div className='flex gap-2 justify-between'>
            {
                categories.map((category , index) => (
                    <Link key={index} to={category.link}>
                        <div className='border rounded-md w-[170px] h-[145px] flex flex-col items-center justify-between p-4 group hover:bg-royal-blue-500 duration-200 transition-all'>
                            <img 
                               src={category.icon} 
                               alt={category.category}
                               loading='lazy'
                               height={70}
                               width={70}
                               className='group-hover:invert duration-200 transition-all'
                               />
                            <p className='font-medium group-hover:text-white duration-200 transition-all'>{category.category}</p>
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>
  )
}

export default Categories
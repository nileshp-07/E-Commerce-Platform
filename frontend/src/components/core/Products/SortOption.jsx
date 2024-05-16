import React, { useEffect } from 'react'

const sortOptions = [
    {
        name : "Highest Rated",
        value : "highest_rated"
    },
    {
        name : "Price: Low to High",
        value : "lowest_price"
    },
    {
        name : "Price: High to Low",
        value : "highest_price"
    },
    {
        name : "Newest First",
        value : "newest_first"
    },
    {
        name : "Most Discount",
        value : "most_discounted"
    }
]

const SortOption = ({sortBy ,setSortBy}) => {
  return (
    <div className='lg:flex gap-2 items-center hidden'>
        <p className='font-medium'>Sort By: </p>
        <div className='flex gap-3'>
            {
                sortOptions.map((sort, index) => (
                    <div className={`text-[17px] py-1 px-3 rounded-full cursor-pointer ${sortBy === sort.value && "text-royal-blue-500 bg-royal-blue-100"}`} 
                         key={index}
                         onClick={() => setSortBy(sort.value)}>
                        {sort.name}
                    </div>
                ) )
            }
        </div>
    </div>
  )
}

export default SortOption
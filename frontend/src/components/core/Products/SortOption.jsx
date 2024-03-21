import React from 'react'



const SortOption = ({sortBy , setSortBy}) => {
  return (
    <div className='flex gap-2 items-center'>
        <p className='font-medium'>Sort By: </p>
        <div className='flex gap-3'>
            {
                ["Popularity" , "Price: Low to High" , "Price:  High to Low" ,  "Newest First" , "Most Discounted"]
                .map((sort, index) => (
                    <div className={`text-[17px] py-1 px-3 rounded-full cursor-pointer ${sortBy === sort && "text-royal-blue-500 bg-royal-blue-100"}`} 
                         key={index}
                         onClick={() => setSortBy(sort)}>
                        {sort}
                    </div>
                ) )
            }
        </div>
    </div>
  )
}

export default SortOption
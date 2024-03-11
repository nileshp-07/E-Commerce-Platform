import React from 'react'
import ProductImageSlider from '../components/core/homePage/ProductImageSlider'
import Categories from '../components/core/homePage/Categories'

const HomePage = () => {
  return (
    <div className='mx-auto mt-10'>

        {/* product swiper  */}
        <ProductImageSlider/>
        
         <div className='w-11/12 max-w-[1200px] mx-auto'>
            
            <Categories/>
         </div>
     </div>
  )
}

export default HomePage
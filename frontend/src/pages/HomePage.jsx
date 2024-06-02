import React, { useEffect, useState } from 'react'
import ProductImageSlider from '../components/core/homePage/ProductImageSlider'
import Categories from '../components/core/homePage/Categories'
import ProductCards from '../components/core/homePage/ProductCards'
import Benefits from '../components/core/homePage/Benefits'
import Footer from '../components/common/Footer'
import { RiSearch2Line } from "react-icons/ri";
import { getHomePageProducts } from '../services/operations/productAPI'
import { useNavigate } from 'react-router-dom'




const HomePage = () => {
  const [loading , setLoading] = useState(false);
  const [products , setProducts] = useState([]);
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([])
  const [searchInput , setSearchInput] = useState("")
  const navigate = useNavigate();

  const searchHandler = async (e) => {
    e.preventDefault();

    navigate(`/search?query=${encodeURIComponent(searchInput)}`)
  }


  const fetchHomePageProducts = async () => {
     setLoading(true);

     const response = await getHomePageProducts();

     if(response)
     {
        setProducts(response);
     }

     setLoading(false);
  }
  useEffect(() => {
    
    fetchHomePageProducts();

    const viewedProducts = JSON.parse(localStorage.getItem("recentlyViewedProducts"))  || [];

    if(viewedProducts)
    {
       setRecentlyViewedProducts(viewedProducts);
    }

  }, [])

  if(loading)
  {
      return (
          <div className='h-[calc(100vh-3.5rem)] w-full flex items-center justify-center'>
              <div className='spinner'></div>
          </div>
      )
  }
  return (
    <div className='mx-auto lg:mt-10 '>
        <div className='w-[360px] md:w-[600px] mx-auto relative lg:hidden block my-1 lg:my-0'>  
          <form
            onSubmit={searchHandler}>
            <input
              type='text'
              name='search'
              id='search'
              placeholder='what are you looking for?'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className='w-full h-[40px] rounded-md px-5 text-black focus:outline-gray-500 bg-royal-blue-50'
            />
            <button
              type='submit'
              className='cursor-pointer text-black absolute right-2 top-[50%] -translate-y-[50%]'>
              <RiSearch2Line size={24}/>
            </button>
          </form>
        </div>
        {/* product swiper  */}
        <ProductImageSlider/>
        
         <div className=''>
            
            <Categories/>

            <ProductCards heading={"Best Deals"} products={products.bestDealsProducts} isBestDeal = {true} />

            {
               recentlyViewedProducts?.length > 0 &&  (
                 <ProductCards heading={"Recently Viewed Products"} products={recentlyViewedProducts} />
               )
            }
            <ProductCards heading={"Best Selling Products"} products={products.bestSellingProducts} /> 

            <Benefits/>
         </div>
        
        <Footer/>
     </div>
  )
}

export default HomePage
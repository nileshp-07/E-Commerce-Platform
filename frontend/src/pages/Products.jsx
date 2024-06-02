import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { IoIosArrowDown } from "react-icons/io";
import Filters from '../components/core/Products/filters/Filters';
import SortOption from '../components/core/Products/SortOption';
import ProductLists from '../components/core/Products/ProductLists';
import Footer from '../components/common/Footer';
import { searchProducts } from '../services/operations/productAPI';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { RiSearch2Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom'
import {sortOptions} from "../data/sortOptions"





const Products = () => {
  const [products, setProducts] = useState([])
  const [searchParams] = useSearchParams();
  const searchQuery = decodeURIComponent(searchParams.get("query"));
  const [loading , setLoading] = useState(false);
  const [filtersData, setFiltersData] = useState("");
  const [page ,setPage] = useState(1);
  const [totalPages, setTotalPages] = useState("")
  const productPerPage = 18;
//   const totalProducts = 250;
  const [sortBy , setSortBy] = useState("");
  const [firstRender, setFirstRender] = useState(true);
  const [filters , setFilters] = useState({
      brands : [],
      minPrice : filtersData?.minPrice || "1",
      maxPrice : filtersData?.maxPrice || "10000",
      discount : "",
      cusRating: "",
      location : []
  });
  const [showFilter , setShowFilter] = useState(false);
  const [searchInput , setSearchInput] = useState("")
  const navigate = useNavigate();

  const searchHandler = async (e) => {
    e.preventDefault();

    navigate(`/search?query=${encodeURIComponent(searchInput)}`)
  }


  const searchProductsHandler = async () => {
      setLoading(true);
      
      const response = await searchProducts(searchQuery, filters, sortBy);

      if(response?.products)
      {
        setProducts(response?.products);

        if(response.filtersData && firstRender)
        setFiltersData(response?.filtersData);
        setFirstRender(false);
      }
      setLoading(false);
      calculateTotalPagesCount(response?.products?.length);
  }

  useEffect(() => {
       searchProductsHandler();
  },[sortBy, filters])

  useEffect(() => {
    // Set initial filters state using filtersData
    if (filtersData) {
        setFilters(prevFilters => ({
            ...prevFilters,
            minPrice: filtersData.minPrice,
            maxPrice: filtersData.maxPrice 
            }));
        }
    }, []);
    
    useEffect(() => {
      
        if(!firstRender)
        {
           setFirstRender(true);
           searchProductsHandler();
        }
    }, [searchQuery])


    const handleChange = (event, value) => {
        setPage(value);
    };

    const calculateTotalPagesCount = (totalProducts) => {
       
        let pages=  Math.floor(totalProducts/productPerPage);
        if(totalProducts%productPerPage > 0)
            pages += 1;


        setTotalPages(pages)

    }

  return (
    <div>
        <div className='w-[360px] md:w-[600px] mx-auto relative lg:hidden block my-2 lg:my-0 mb-4'>  
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
        <div className='md:mx-10 mx-5 lg:mt-10 mt-2'>
            <h2 className='md:text-3xl text-xl font-medium '>{`Showing products for "${searchQuery}"`}</h2>
            <p className='md:text-[17px] text-[16px] text-gray-800'>{`Showing ${(page - 1)*productPerPage + 1}-${Math.min(page*productPerPage, products.length)} products of ${products.length} products`}</p>
        </div>
        <div className='md:mt-10 mt-5 flex gap-12 px-5 md:pl-14 md:w-fit relative w-full'>

            {/* filters  */}
            <div className={`${showFilter ? "block" : "hidden"} absolute z-10 left-3 md:left-12 top-20`}>
                <Filters
                    filters={filters}
                    filtersData = {filtersData}
                    setFilters ={setFilters}
                />
            </div>

            <div className='hidden lg:block'>
                <Filters
                    filters={filters}
                    filtersData = {filtersData}
                    setFilters ={setFilters}
                />
            </div>
            {/* products and sortBy  */}
            <div className='w-full'>
               <h2 className='md:text-2xl text-lg font-semibold mb-1 '>Products</h2>
               <div className='flex gap-5 lg:hidden '>
                    <div 
                        className={`flex gap-1 items-center py-[2px] px-3 rounded-full text-[15px] h-fit w-fit ${showFilter ? "text-royal-blue-500 bg-royal-blue-100 border border-transparent" : "border"}`}
                        onClick={() => setShowFilter(!showFilter)}>
                        <span>Filters</span>
                        <HiOutlineAdjustmentsHorizontal/>
                    </div>
                    <div className='flex gap-2 lg:items-center overflow-scroll'>
                        <select
                            name="sortBy"
                            className='flex outline-none rounded-md py-[2px] px-2 bg-[#EEEEEE] w-full h-fit'
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            >
                            {
                                sortOptions?.map((sort, index) => (
                                    <option className={`text-[17px] py-1 px-3 rounded-full cursor-pointer ${sortBy === sort.value && "text-royal-blue-500 bg-royal-blue-100"}`} 
                                        key={index}>
                                        {sort.name}
                                    </option>
                                ) )
                            }
                        </select>
                    </div>
                   
               </div>

               <SortOption sortBy={sortBy} setSortBy={setSortBy}/>

               <ProductLists page={page} loading={loading} products={products}/>

               {
                 products.length > 0 && (
                    <div className='md:mt-14 mt-8 flex justify-center'>
                        <Stack spacing={2}>
                        <Pagination count={totalPages} page={page} onChange={handleChange} size='large' />
                        </Stack>
                    </div>
                 )
               }
            </div>
        </div>

        

        <Footer/>
    </div>
  )
}

export default Products
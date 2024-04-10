import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { IoIosArrowDown } from "react-icons/io";
import Filters from '../components/core/Products/filters/Filters';
import SortOption from '../components/core/Products/SortOption';
import ProductLists from '../components/core/Products/ProductLists';
import Footer from '../components/common/Footer';
import { searchProducts } from '../services/operations/productAPI';



const Products = () => {
  const [products, setProducts] = useState([])
  const [searchParams] = useSearchParams();
  const searchQuery = decodeURIComponent(searchParams.get("query"));
  const [loading , setLoading] = useState(false);
  const [filtersData, setFiltersData] = useState("");
  const [page ,setPage] = useState(1);
  const productPage = 18;
  const totalProducts = 250;
  const [sortBy , setSortBy] = useState("");
  const [filters , setFilters] = useState({
      brands : [],
      minPrice : filtersData?.minPrice || "1",
      maxPrice : filtersData?.maxPrice || "10000",
      discount : "",
      cusRating: "",
      location : []
  });

  console.log("#  Filters : ", filters);
  console.log("#  sortOption : ", sortBy);
  console.log("#  searchQuery : ", searchQuery);

  const searchProductsHandler = async () => {
      setLoading(true);
      
      console.log("Queries :  ",searchQuery, "  ",sortBy , "  ",filters);
      const response = await searchProducts(searchQuery, filters, sortBy);

      if(response.products)
      {
        setProducts(response.products);

        if(response.filtersData)
        setFiltersData(response.filtersData);
      }
      setLoading(false);
  }

  useEffect(() => {
       searchProductsHandler();
  },[searchQuery, sortBy, filters])

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


  return (
    <div>
        <div className='mx-10 mt-10'>
            <h2 className='text-3xl font-semibold'>{`Showing products for "${searchQuery}"`}</h2>
            <p className='text-[17px] text-gray-800'>{`Showing ${(page - 1)*productPage + 1}-${Math.min(page*productPage, totalProducts)} products`}</p>
        </div>
        <div className='my-10 flex gap-12 px-5 pl-14 w-fit'>
            {/* filters  */}
            <Filters
                filters={filters}
                filtersData = {filtersData}
                setFilters ={setFilters}
            />

            {/* products and sortBy  */}
            <div>
               <h2 className='text-2xl font-semibold mb-1'>Products</h2>

               <SortOption sortBy={sortBy} setSortBy={setSortBy}/>

               <ProductLists loading={loading} products={products}/>
            </div>
        </div>

        <Footer/>
    </div>
  )
}

export default Products
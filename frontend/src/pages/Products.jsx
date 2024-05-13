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


  const searchProductsHandler = async () => {
      setLoading(true);
      
      // console.log("Queries :  ",searchQuery, "  ",sortBy , "  ",filters);
      const response = await searchProducts(searchQuery, filters, sortBy);

      if(response.products)
      {
        setProducts(response.products);

        if(response.filtersData && firstRender)
        setFiltersData(response.filtersData);
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

        console.log(pages);

        if(totalProducts%productPerPage > 0)
            pages += 1;

        console.log(pages);

        setTotalPages(pages)

    }

  return (
    <div>
        <div className='mx-10 mt-10'>
            <h2 className='text-3xl font-semibold'>{`Showing products for "${searchQuery}"`}</h2>
            <p className='text-[17px] text-gray-800'>{`Showing ${(page - 1)*productPerPage + 1}-${Math.min(page*productPerPage, products.length)} products of ${products.length} products`}</p>
        </div>
        <div className='mt-10 flex gap-12 px-5 pl-14 w-fit'>
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

               <ProductLists page={page} loading={loading} products={products}/>

               {
                 products.length > 0 && (
                    <div className='mt-14 flex justify-center'>
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
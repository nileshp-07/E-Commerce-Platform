import React, { useEffect, useState } from 'react'
import {useSelector} from "react-redux"
import { getSellerProducts } from '../../../services/operations/profileAPI';
import { Link, } from 'react-router-dom';
import RatingStars from '../../common/RatingStars';
import {useDispatch} from "react-redux"
import { setIsEdit, setProduct } from '../../../redux/slices/productSlice';
import {useNavigate} from "react-router-dom"
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { deleteProduct } from '../../../services/operations/productAPI';
import { MdMode, MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};



const description = "This will help you identify if any of these values are null or undefined, or if the structure of your data is different from what you expect. Once you identify the issue, you can adjust your code accordingly."
const SellerProducts = () => {
  const [products , setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [loading , setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const {token} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const fetchSellerProducts = async () => {
     setLoading(true);

     const response = await getSellerProducts(token);

     if(response)
     {
       setProducts(response);
     }

     setLoading(false);
  }

  useEffect(() => {
      fetchSellerProducts();
  },[])


  const handleDeleteProduct = async () => {
     await deleteProduct(productId, token);

     setOpen(false);
     setProductId("");
  }


   
  if(loading)
  {
     return (
       <div className='h-[500px] w-full grid place-items-center'>
         <div className='spinner'></div>
       </div>
     )
  }

  return (
    <div className='my-10'>
       <h2 className='md:text-2xl text-xl font-semibold md:mb-8 mb-5'>Products</h2>
        
        <div className='flex flex-col gap-5 items-center justify-center'>
          {
             products.length > 0 ? (
                (
                   products.map((product) => (
                     <div key={product._id}
                          className='relative w-full flex justify-between profile-shadow p-2 rounded-md'>
                        <Link to={`/product/${product._id}`} className='md:max-w-[80%]'>
                            <div className='flex flex-col md:flex-row gap-3 w-full' >
                                <div className='p-8 bg-[#DCDCDC] min-h-[200px] max-h-[200px] md:max-w-[300px] md:min-w-[300px] w-full rounded-md flex items-center justify-center'>
                                  <img
                                      src={product?.thumbnail}
                                      className='h-[140px] md:w-[250] w-full object-contain'
                                      style={{ mixBlendMode: 'multiply' }}
                                  />
                                </div>
                                <div className='flex flex-col gap-[2px]'>
                                  <p className='text-lg font-medium'>{product?.title}</p>
                                  <p className='font-medium text-gray-500 -mt-1'>{product?.categories?.[0].name}</p>
                                  <p className='mt-1'>{description.length > 110 ? `${description.slice(0, 110)}...` : description}</p>
                                  <div className='flex gap-2 my-1'>
                                      <p className='text-[#DB4444] font-me'>Rs.{product?.discountedPrice}</p>
                                      <p className='flex line-through font-medium text-gray-400'>Rs.{product.price}</p>
                                      <p className='font-medium text-[#008000] text-[14px]'>{product?.discount}% off</p>
                                  </div>
                                  <div className='flex gap-2 items-center'>
                                      <RatingStars RatingCount={product?.avgRating}/>
                                      <p className='font-medium text-gray-500'>({product?.ratingAndReviews?.length})</p>
                                  </div>
                                </div>
                            </div>
                        </Link>
                        <div className='hidden md:flex gap-5 h-fit font-medium mx-3 '>
                           <p 
                             className='cursor-pointer'
                             onClick={() => {
                              dispatch(setProduct(product))
                              dispatch(setIsEdit(true))
                              navigate(`/profile/edit-product/${product._id}`)
                           }}>
                             Edit
                           </p>
                           <p 
                             onClick={() =>{ 
                                  setOpen(true)
                                  setProductId(product._id)
                                }
                              }
                             className='cursor-pointer'>
                             delete
                           </p>
                        </div>

                        <div className='md:hidden absolute right-2 top-4 flex gap-2 font-medium mx-3 '>
                           <p 
                             className='cursor-pointer'
                             onClick={() => {
                              dispatch(setProduct(product))
                              dispatch(setIsEdit(true))
                              navigate(`/profile/edit-product/${product._id}`)
                           }}>
                             <MdModeEdit size={22}/>
                           </p>
                           <p 
                             onClick={() =>{ 
                                  setOpen(true)
                                  setProductId(product._id)
                                }
                              }
                             className='cursor-pointer'>
                             <MdDelete size={22}/>
                           </p>
                        </div>


                     </div>
                   ))
                )
             ) : (
                <div className='h-[300px] flex flex-col justify-center items-center gap-5'>
                   <p className='text-lg font-medium'>You have'nt created Any product yet</p>
                    <Link to="/profile/add-product">
                        <button className='md:py-2 py-1 px-5 bg-royal-blue-500 font-medium text-white rounded-md'>
                          Create now
                        </button>
                    </Link>
                </div>
             )
          }
        </div>


        <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
              <h2 className='text-xl font-semibold mb-1'>Are you sure??</h2>
              <p>Do you really want to delete this product?</p>
              <div className='flex justify-around mt-8'>
                 <button
                    onClick={handleDeleteProduct} 
                    className='py-2 px-4 bg-royal-blue-600 text-white rounded-md hover:bg-royal-blue-500 transition-all duration-200'>Delete</button>

                 <button 
                    onClick={() => setOpen(false)}
                    className='py-2 px-4 border border-black rounded-md hover:bg-gray-100 transition-all duration-200'>Cancel</button>
              </div>
            </Box>
        </Modal>
    </div>
  )
}

export default SellerProducts
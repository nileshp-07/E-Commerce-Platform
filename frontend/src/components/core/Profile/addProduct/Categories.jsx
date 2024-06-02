import React, { useState, useEffect } from 'react'
import { RiArrowRightSLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { FaArrowRightLong } from "react-icons/fa6";
import {toast} from "sonner"
import {useSelector,useDispatch} from "react-redux"
import { setProduct } from '../../../../redux/slices/productSlice';
import { getAllCategories } from '../../../../services/operations/productAPI';



 
const Categories = ({setStep}) => {
  const [categories, setCategories] = useState([]);
  const [mainCategory, setMainCategory] = useState(categories[0]);
  const dispatch = useDispatch()
  const [selectedCategories , setSelectedCategories] = useState([]);
  const {product, isEdit} = useSelector((state) => state.product);
  const [loading ,setLoading] = useState(false);

  // console.log("product : ",product);
  console.log("selectedCategories : ",selectedCategories);

  const fetchAllCategories = async () => {
     setLoading(true);

     const response = await getAllCategories();

     if(response)
     {
      setCategories(response);
      setMainCategory(response[0])
     }
  }

  useEffect(() => {
    fetchAllCategories();

    if(isEdit)
    {
       setSelectedCategories(product.categories)
    }
  }, [])


  const changeHandler = (e, category) => {

      // console.log("CAtegory :", category);
      if(selectedCategories.includes(category))
      {
        const newSelectedCategories = [...selectedCategories];
        newSelectedCategories.splice(selectedCategories.indexOf(category), 1);
        setSelectedCategories(newSelectedCategories);
      }
      else{
          if(selectedCategories.length === 3)
          {
            toast.error("Max category limit exceeds");
            e.target.checked = false;
            return;
          }
         setSelectedCategories([...selectedCategories, category])
      }
  }

  const handleNextSubmit = () => {
    if(selectedCategories?.length == 0 )
    {
       toast.error("Please select the categories first!!");
       return;
    }

    const newProduct = {...product};

    let newSelectedCategories = [];
    selectedCategories.forEach(category => {
       newSelectedCategories.push(category._id)
    });


    newProduct.categories = newSelectedCategories;

    dispatch(setProduct(newProduct));

    setStep(3);
  }

  return (
    <div className='-mt-2'>
        
        <h2 className='font-medium'>
          Select the categories your product belong to (max. 3)
        </h2>

        <div className='flex md:gap-16 gap-5 my-5 bg-gray-50 rounded-md md:p-6 p-3 h-[400px] overflow-hidden'>
           <div className='flex flex-col gap-1 overflow-x-auto md:w-[250px] md:min-w-[250px] min-w-[150px] max-w-[150px]'>
              {
                 categories.map((category , index) => (
                   <div 
                      onClick={() => setMainCategory(category)}
                      key={index} 
                      className={`flex justify-between items-center rounded-md md:px-5 px-3 py-2 w-full  cursor-pointer ${mainCategory?.name  === category?.name && "bg-royal-blue-100" }`}>
                          <p className='text-[17px]'>{category?.name}</p>
                          <RiArrowRightSLine/>
                   </div>
                 ))
              }
           </div>
           <div className='grid gap-x-12 gap-y-8 lg:grid-cols-3 md:grid-cols-2 grid-col-1 overflow-x-auto ' >
               {
                  mainCategory?.subCategories?.map((subCategories, index1) => (
                    <div key={index1}>
                       <h2 className='font-medium mb-2'>{subCategories?.name}</h2>
                       <div className='flex flex-col gap-1'>
                        {
                          subCategories?.subSubCategories?.map((subSubCategories, index2) => (
                              <div className='flex gap-2 cursor-pointer' key={index2}>
                                 <input
                                   type='checkbox'
                                   name={subCategories?.name}
                                   id={subSubCategories?.name}
                                   checked = {selectedCategories?.includes(subSubCategories)}
                                   value={subSubCategories?.name}
                                   onChange={(e) => changeHandler(e, subSubCategories)}
                                 />
                                 <label htmlFor={subSubCategories?.name} className='cursor-pointer'>{subSubCategories?.name}</label>
                              </div>
                           ))
                        }
                       </div>
                    </div>
                  ))
               }
           </div>
        </div>
        {
           selectedCategories.length > 0 && (
            <div className='flex gap-5'>
                <p className='font-medium'>
                  Selected categories:
                </p>
                <div className='flex flex-row flex-wrap gap-2'>
                    {
                      selectedCategories?.map((category, index) => (
                        <div key={index} className='flex justify-between gap-3 items-center py-[2px] pl-5 pr-2 rounded-full bg-royal-blue-100 w-fit'>
                          <p className='font-medium text-[14px]'>{category?.name}</p>
                          <div className='cursor-pointer'
                                onClick={() => {
                                  const newSelectedCategories = [...selectedCategories];
                                  newSelectedCategories?.splice(index, 1);
                                  setSelectedCategories(newSelectedCategories);
                                }}>
                            <RxCross2/>
                          </div>
                        </div>
                      ))
                    }
                </div>
            </div>
           )
        }
        <div className='my-9 mx-auto flex justify-end md:px-16'>
            <button 
              onClick={handleNextSubmit}
              className=' flex items-center gap-2 py-1 pt-2 px-5 bg-royal-blue-500 rounded-md text-white'>
                <p className='mb-1'>Next</p>
                <FaArrowRightLong/>
            </button>
        </div>

    </div>
  )
}

export default Categories
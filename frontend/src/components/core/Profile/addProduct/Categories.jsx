import React, { useState } from 'react'
import { RiArrowRightSLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { FaArrowRightLong } from "react-icons/fa6";
import {toast} from "sonner"




const categories = [
  {
    "name": "Electronics",
    "subcategories1": [
      {
        "name": "Computers & Accessories",
        "subcategories2": [
          { "name": "Laptops" },
          { "name": "Desktops" },
          { "name": "Monitors" },
          { "name": "Printers & Scanners" },
          { "name": "Computer Accessories"}
        ]
      },
      {
        "name": "Smartphones & Tablets",
        "subcategories2": [
          { "name": "Smartphones" },
          { "name": "Tablets" },
          { "name": "Accessories" }
        ]
      },
      {
        "name": "Books",
        "subcategories2": [
          { "name": "Fiction" },
          { "name": "Non-Fiction" },
          { "name": "Children's Books" },
          { "name": "Textbooks" },
          { "name": "Audio Books" }
        ]
      },
      {
        "name": "Movies & TV Shows",
        "subcategories2": [
          { "name": "Action & Adventure" },
          { "name": "Comedy" },
          { "name": "Drama" },
          { "name": "Documentaries" },
          { "name": "TV Series" }
        ]
      },
      {
        "name": "Music",
        "subcategories2": [
          { "name": "Rock" },
          { "name": "Pop" },
          { "name": "Hip Hop" },
          { "name": "Jazz" },
          { "name": "Classical" }
        ]
      },
      {
        "name": "Furniture",
        "subcategories2": [
          { "name": "Living Room Furniture" },
          { "name": "Bedroom Furniture" },
          { "name": "Kitchen & Dining Furniture" },
          { "name": "Office Furniture" },
          { "name": "Outdoor Furniture" }
        ]
      },
      {
        "name": "Home Appliances",
        "subcategories2": [
          { "name": "Refrigerators" },
          { "name": "Washing Machines" },
          { "name": "Microwaves" },
          { "name": "Coffee Makers" },
          { "name": "Blenders & Mixers" },
          { "name": "Air Purifiers" }
        ]
      },
      {
        "name": "Cookware",
        "subcategories2": [
          { "name": "Pots & Pans" },
          { "name": "Cooking Utensils" },
          { "name": "Bakeware" },
          { "name": "Pressure Cookers" },
          { "name": "Grilling Accessories" }
        ]
      }
    ]
  },
  {
    "name": "Home & Kitchen",
    "subcategories1": [
      {
        "name": "Furniture",
        "subcategories2": [
          { "name": "Living Room Furniture" },
          { "name": "Bedroom Furniture" },
          { "name": "Kitchen & Dining Furniture" },
          { "name": "Office Furniture" },
          { "name": "Outdoor Furniture" }
        ]
      },
      {
        "name": "Home Appliances",
        "subcategories2": [
          { "name": "Refrigerators" },
          { "name": "Washing Machines" },
          { "name": "Microwaves" },
          { "name": "Coffee Makers" },
          { "name": "Blenders & Mixers" },
          { "name": "Air Purifiers" }
        ]
      },
      {
        "name": "Cookware",
        "subcategories2": [
          { "name": "Pots & Pans" },
          { "name": "Cooking Utensils" },
          { "name": "Bakeware" },
          { "name": "Pressure Cookers" },
          { "name": "Grilling Accessories" }
        ]
      }
      // More subcategories1 can be added here
    ]
  },
  {
    "name": "Fashion",
    "subcategories1": [
      {
        "name": "Men's Clothing",
        "subcategories2": [
          { "name": "Shirts" },
          { "name": "Pants & Jeans" },
          { "name": "Jackets & Coats" },
          { "name": "Shoes" },
          { "name": "Accessories" }
        ]
      },
      {
        "name": "Women's Clothing",
        "subcategories2": [
          { "name": "Dresses" },
          { "name": "Tops & Blouses" },
          { "name": "Skirts" },
          { "name": "Shoes" },
          { "name": "Swimwear" }
        ]
      },
      {
        "name": "Accessories",
        "subcategories2": [
          { "name": "Bags & Purses" },
          { "name": "Watches" },
          { "name": "Jewelry" },
          { "name": "Sunglasses" },
          { "name": "Scarves & Wraps" }
        ]
      }
      // More subcategories1 can be added here
    ]
  },
  {
    "name": "Books & Media",
    "subcategories1": [
      {
        "name": "Books",
        "subcategories2": [
          { "name": "Fiction" },
          { "name": "Non-Fiction" },
          { "name": "Children's Books" },
          { "name": "Textbooks" },
          { "name": "Audio Books" }
        ]
      },
      {
        "name": "Movies & TV Shows",
        "subcategories2": [
          { "name": "Action & Adventure" },
          { "name": "Comedy" },
          { "name": "Drama" },
          { "name": "Documentaries" },
          { "name": "TV Series" }
        ]
      },
      {
        "name": "Music",
        "subcategories2": [
          { "name": "Rock" },
          { "name": "Pop" },
          { "name": "Hip Hop" },
          { "name": "Jazz" },
          { "name": "Classical" }
        ]
      }
      // More subcategories1 can be added here
    ]
  },
  {
    "name": "Toys & Games",
    "subcategories1": [
      {
        "name": "Board Games & Puzzles",
        "subcategories2": [
          { "name": "Strategy Games" },
          { "name": "Educational Games" },
          { "name": "Jigsaw Puzzles" },
          { "name": "Family Games" },
          { "name": "Party Games" }
        ]
      },
      {
        "name": "Outdoor Play",
        "subcategories2": [
          { "name": "Swing Sets" },
          { "name": "Trampolines" },
          { "name": "Playhouses" },
          { "name": "Sandbox Toys" },
          { "name": "Water Toys" }
        ]
      },
      {
        "name": "Action Figures & Dolls",
        "subcategories2": [
          { "name": "Superheroes" },
          { "name": "Barbie Dolls" },
          { "name": "Collectible Figures" },
          { "name": "Dollhouses" },
          { "name": "Dress-Up Dolls" }
        ]
      }
      // More subcategories1 can be added here
    ]
  },
  {
    "name": "Health & Beauty",
    "subcategories1": [
      {
        "name": "Skincare",
        "subcategories2": [
          { "name": "Moisturizers" },
          { "name": "Cleansers" },
          { "name": "Serums" },
          { "name": "Sunscreen" },
          { "name": "Masks" }
        ]
      },
      {
        "name": "Haircare",
        "subcategories2": [
          { "name": "Shampoo" },
          { "name": "Conditioner" },
          { "name": "Styling Products" },
          { "name": "Hair Color" },
          { "name": "Hair Accessories" }
        ]
      },
      {
        "name": "Makeup",
        "subcategories2": [
          { "name": "Lipstick" },
          { "name": "Foundation" },
          { "name": "Mascara" },
          { "name": "Eyeshadow" },
          { "name": "Makeup Brushes" }
        ]
      }
      // More subcategories1 can be added here
    ]
  },
  {
    "name": "Sports & Outdoors",
    "subcategories1": [
      {
        "name": "Outdoor Recreation",
        "subcategories2": [
          { "name": "Camping & Hiking" },
          { "name": "Cycling" },
          { "name": "Fishing" },
          { "name": "Hunting" },
          { "name": "Water Sports" }
        ]
      },
      {
        "name": "Fitness",
        "subcategories2": [
          { "name": "Exercise Machines" },
          { "name": "Yoga & Pilates" },
          { "name": "Fitness Accessories" },
          { "name": "Strength Training" },
          { "name": "Cardio Equipment" }
        ]
      },
      {
        "name": "Team Sports",
        "subcategories2": [
          { "name": "Soccer" },
          { "name": "Basketball" },
          { "name": "Football" },
          { "name": "Baseball" },
          { "name": "Volleyball" }
        ]
      }
      // More subcategories1 can be added here
    ]
  }
]

 
const Categories = () => {
  const [mainCategory, setMainCategory] = useState(categories[0]);
  const [selectedCategories , setSelectedCategories] = useState([]);

  console.log(selectedCategories);
  const changeHandler = (e) => {
      const category = e.target.value;

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

  console.log(mainCategory)
  return (
    <div className='-mt-2'>
        
        <h2 className='font-medium'>
          Select the category your product belong to (max. 3)
        </h2>

        <div className='flex gap-16 my-5 bg-gray-50 rounded-md p-6 h-[400px] overflow-hidden'>
           <div className='flex flex-col gap-1 overflow-x-auto w-[250px]'>
              {
                 categories.map((category , index) => (
                   <div 
                      onClick={() => setMainCategory(category)}
                      key={index} 
                      className={`flex justify-between items-center rounded-md px-5 py-2 w-full  cursor-pointer ${mainCategory.name  === category.name && "bg-royal-blue-100" }`}>
                          <p className='text-[17px]'>{category.name}</p>
                          <RiArrowRightSLine/>
                   </div>
                 ))
              }
           </div>
           <div className='grid gap-x-12 gap-y-8 grid-cols-3 overflow-x-auto ' >
               {
                  mainCategory.subcategories1.map((subcategories1, index1) => (
                    <div key={index1}>
                       <h2 className='font-medium mb-2'>{subcategories1.name}</h2>
                       <div className='flex flex-col gap-1'>
                        {
                           subcategories1.subcategories2.map((subcategories2, index2) => (
                              <div className='flex gap-2 cursor-pointer' key={index2}>
                                 <input
                                   type='checkbox'
                                   name={subcategories1.name}
                                   id={subcategories2.name}
                                   checked = {selectedCategories.includes(subcategories2.name)}
                                   value={subcategories2.name}
                                   onChange={changeHandler}
                                 />
                                 <label htmlFor={subcategories2.name} className='cursor-pointer'>{subcategories2.name}</label>
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
                <div className='flex gap-2'>
                    {
                      selectedCategories.map((category, index) => (
                        <div key={index} className='flex justify-between gap-3 items-center py-[2px] pl-5 pr-2 rounded-full bg-royal-blue-100 w-fit'>
                          <p className='font-medium text-[14px]'>{category}</p>
                          <div className='cursor-pointer'
                                onClick={() => {
                                  const newSelectedCategories = [...selectedCategories];
                                  newSelectedCategories.splice(index, 1);
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
        <div className='my-9 mx-auto flex justify-end px-16'>
            <button className=' flex items-center gap-2 py-1 pt-2 px-5 bg-royal-blue-500 rounded-md text-white'>
                <p className='mb-1'>Next</p>
                <FaArrowRightLong/>
            </button>
        </div>

    </div>
  )
}

export default Categories
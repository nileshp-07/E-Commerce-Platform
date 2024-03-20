import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { FaStar } from "react-icons/fa";





const brandNames = [
    "QuantumPulse",
    "VortexEdge",
    "ZenithSphere",
    "NovaFusion",
    "ApexGlide",
    "InfinityForge",
    "SummitRise",
    "AuroraBlaze",
    "FusionBloom",
    "VertexQuest",
    "EchoZest",
    "SwiftSail",
    "StellarPulse",
    "Everglow",
    "VelocityVista",
    "EonEmerge",
    "GenesisGlide",
    "MomentumMist",
    "VitalityVista",
    "BlazeBurst",
    "HorizonHarbor",
    "RadiantRise",
    "CrestCrest",
    "SolarCrest",
    "EvolveGlow",
    "ThriveThrive",
    "RiseRise",
    "EchoEcho",
    "PulsePulse",
    "QuestQuest",
    "NexusNexus",
    "SurgeSurge",
    "EdgeEdge",
    "HorizonHorizon",
    "VelocityVelocity",
    "EclipseEclipse",
    "FusionFusion",
    "AuroraAurora",
    "NovaNova",
    "VortexVortex",
    "SummitSummit",
    "ZenithZenith",
    "QuantumQuantum",
    "VertexVertex",
    "StellarStellar",
    "EverglowEverglow",
    "VitalityVitality",
    "MomentumMomentum",
    "VelocityVelocity",
    "AuroraAurora"
  ];

const discountFilter = [
    {
        id : "90_per_discount",
        name : "discount",
        label : "90% & above"
    },
    {
        id : "80_per_discount",
        name : "discount",
        label : "80% & above"
    },
    {
        id : "70_per_discount",
        name : "discount",
        label : "70% & above"
    },
    {
        id : "60_per_discount",
        name : "discount",
        label : "60% & above"
    }
]

const ratingFilter = [
    {
        id : "4_star",
        name : "rating",
        label : "90"
    },
    {
        id : "3_star",
        name : "discount",
        label : "80"
    },
    {
        id : "2_star",
        name : "discount",
        label : "70"
    }
]

const indianCities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Jaipur",
    "Ahmedabad",
    "Lucknow"
];


const Filters = ({filters , setFilters}) => {
  const [priceSliderValue , setPriceSliderValue] = useState([0 , 20]);
  const [filterOpen , setFilterOpen] = useState({
    brands: false,
    price : false,
    cusRating : false,
    discount : false,
    location : false
 })

 const toggleFilter = (filter) => {
    setFilterOpen((prevState) => ({
        ...prevState,
        [filter]: !prevState[filter]
    }));
  };

  
  function valuetext(value) {
    return `${value}°C`;
  }

  return (
    <div className='w-[350px]'>
        <div className='flex justify-between items-center'>
            <h2 className='text-2xl font-semibold'>Filters</h2>
            <button className='font-medium text-royal-blue-500'>
                Apply
            </button>
        </div>

        <div className='rounded-md bg-gray-200 py-3 px-5'>
            <form>

                {/* Brands  */}
                <div>
                    <div className='flex justify-between items-center mb-2'>
                        <p className='text-[18px] font-medium'>Brands</p>
                        <IoIosArrowDown 
                                onClick={() => toggleFilter('brands')}
                                className={`${filterOpen.brands && "rotate-180"} cursor-pointer`}/>
                    </div>
                    {
                        filterOpen.brands && (
                            <>
                                {brandNames.slice(0, 5).map((brand, index) => (
                                    <div className='flex gap-2 items-center' key={index}>
                                        <input
                                            type='checkbox'
                                            name='brandName'
                                            value={brand}
                                            className='bg-royal-blue-300'
                                        />
                                        <label htmlFor='brand'>{brand}</label>
                                    </div>
                                ))}
                                <p className='text-[14px] font-medium text-royal-blue-500 mt-2 '>More brands</p>
                            </>
                        )
                    }
                    <p className='h-[1px] w-full bg-gray-400 my-5'></p>
                </div>
                

                {/* Price range  */}
                <div>
                    <div className='flex justify-between items-center mb-2'>
                    <p className='text-[18px] font-medium'>Price Range</p>
                    <IoIosArrowDown 
                            onClick={() => toggleFilter('price')}
                            className={`${filterOpen.price && "rotate-180"} cursor-pointer`}/>
                    </div>
                    {
                        filterOpen.price && (
                            <div className='mx-auto ml-2'>
                                <Box sx={{ width: 300 }}>
                                <Slider
                                    getAriaLabel={() => 'Temperature range'}
                                    value={priceSliderValue}
                                    onChange={(e) => setPriceSliderValue(e.target.value)}
                                    valueLabelDisplay="auto"
                                    getAriaValueText={valuetext}
                                />

                                <div className='flex justify-around -ml-2'>
                                    <div className='flex flex-col '>
                                        <label htmlFor='minPrice'>Min</label>
                                        <input
                                            type='number'
                                            name='minPrice'
                                            value={priceSliderValue[0]}
                                            onChange={(e) => {
                                                const priceRange = [...priceSliderValue]

                                                priceRange[0] = e.target.value

                                                setPriceSliderValue(priceRange)
                                            }}
                                            className='w-[100px] text-center p-1 rounded-md'
                                        />
                                    </div>
                                    <div className='flex flex-col '>
                                        <label htmlFor='maxPrice'>Max</label>
                                        <input
                                            type='number'
                                            name='maxPrice'
                                            value={priceSliderValue[1]}
                                            onChange={(e) => {
                                                const priceRange = [...priceSliderValue]

                                                priceRange[1] = e.target.value

                                                setPriceSliderValue(priceRange)
                                            }}
                                            className='w-[100px] text-center p-1 rounded-md'
                                        />
                                    </div>
                                </div>
                                </Box>
                            </div>
                        )
                    }
                    <p className='h-[1px] w-full bg-gray-400 my-5'></p>
                </div>


                {/* Discount  */}
                <div>
                    <div className='flex justify-between items-center mb-2'>
                        <p className='text-[18px] font-medium'>Discounts</p>
                        <IoIosArrowDown 
                                onClick={() => toggleFilter('discount')}
                                className={`${filterOpen.discount && "rotate-180"} cursor-pointer`}/>
                    </div>
                    {
                            filterOpen.discount && (
                                <>
                                    {
                                        discountFilter.map((discount, index) => (
                                        <div className='flex items-center gap-2'>
                                            <input
                                                type="radio"
                                                name = {discount.name}
                                                id={discount.id}
                                            />
                                            <label htmlFor={discount.id}>{discount.label}</label>
                                        </div>
                                    ))
                                    }
                                </>
                            )
                        }
                    <p className='h-[1px] w-full bg-gray-400 my-5'></p>
                </div>


                {/* Ratings  */}
                <div>
                    <div className='flex justify-between items-center mb-2'>
                        <p className='text-[18px] font-medium'>Ratings</p>
                        <IoIosArrowDown 
                                onClick={() => toggleFilter('cusRating')}
                                className={`${filterOpen.cusRating && "rotate-180"} cursor-pointer`}/>
                    </div>
                    {
                            filterOpen.cusRating && (
                                <>
                                    {
                                        ratingFilter.map((rating, index) => (
                                        <div className='flex items-center gap-2'>
                                            <input
                                                type="radio"
                                                name = {rating.name}
                                                id={rating.id}
                                            />
                                            <label htmlFor={rating.id} className="flex items-center gap-1">
                                                <span className='flex items-center'>
                                                  {rating.label}
                                                  <FaStar fill='#FDDA0D'/> 
                                                </span>
                                                <span>& above</span>
                                            </label>
                                        </div>
                                    ))
                                    }
                                </>
                            )
                        }
                    <p className='h-[1px] w-full bg-gray-400 my-5'></p>
                </div>

                {/* Location  */}
                <div>
                    <div className='flex justify-between items-center mb-2'>
                        <p className='text-[18px] font-medium'>Location</p>
                        <IoIosArrowDown 
                                onClick={() => toggleFilter('location')}
                                className={`${filterOpen.location && "rotate-180"} cursor-pointer`}/>
                    </div>
                    {
                        filterOpen.location && (
                            <>
                                {indianCities.map((city, index) => (
                                    <div className='flex gap-2 items-center' key={index}>
                                        <input
                                            type='checkbox'
                                            name='location'
                                            id={city}
                                            value={city}
                                        />
                                        <label htmlFor={city}>{city}</label>
                                    </div>
                                ))}
                                <p className='text-[14px] font-medium text-royal-blue-500 mt-2 '>Show all</p>
                            </>
                        )
                    }
                </div>

            </form>
        </div>
    </div>
  )
}

export default Filters
import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
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
        value : "90",
        label : "90% & above"
    },
    {
        id : "80_per_discount",
        value : "80",
        label : "80% & above"
    },
    {
        id : "70_per_discount",
        value : "70",
        label : "70% & above"
    },
    {
        id : "60_per_discount",
        value : "60",
        label : "60% & above"
    }
]

const ratingFilter = [
    {
        id : "4_star",
        value : "4",
        label : "4"
    },
    {
        id : "3_star",
        value : "3",
        label : "3"
    },
    {
        id : "2_star",
        value : "2",
        label : "2"
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
//   const [priceSliderValue , setPriceSliderValue] = useState([0 , 20]);
  const [filterOpen , setFilterOpen] = useState({
    brands: true,
    price : true,
    cusRating : true,
    discount : true,
    location : true
 })



 const toggleFilter = (filter) => {
    setFilterOpen((prevState) => ({
        ...prevState,
        [filter]: !prevState[filter]
    }));
  };



  const handlePriceSliderChange = (event, newValue) => {
    // Update the filters state with new min and max prices
    setFilters({
        ...filters,
        minPrice: newValue[0].toString(),
        maxPrice: newValue[1].toString()
    });
};

  
  function valuetext(value) {
    return `${value}°C`;
  }



  const handleChangeInput = (e) => {
        const {name , value , type , checked} = e.target;

        const updatedFilters = {...filters};

        if(type === "checkbox"){
            if(checked)
            {
                updatedFilters[name] = [...updatedFilters[name] , value]
            }
            else{
                updatedFilters[name] = updatedFilters[name].filter( (item) => item !== value)
            }
        }
        else{
            updatedFilters[name] = value;
        }


        setFilters(updatedFilters);
  }



console.log("Filters : ", filters);

  return (
    <div className='w-[350px]'>
        <div className='flex justify-between items-center px-3'>
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
                                {brandNames.slice(0, 10).map((brand, index) => (
                                    <div className='flex gap-2 items-center' key={index}>
                                        <input
                                            type='checkbox'
                                            name='brands'
                                            id = {brand}
                                            value={brand}
                                            checked = {filters.brands.includes(brand)}
                                            onChange={handleChangeInput}
                                        />
                                        <label htmlFor={brand}>{brand}</label>
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
                                    min={1}
                                    max={10000}
                                    value={[filters.minPrice, filters.maxPrice]}
                                    onChange={handlePriceSliderChange}
                                    valueLabelDisplay="auto"
                                    getAriaValueText={valuetext}
                                />

                                <div className='flex justify-around -ml-2'>
                                    <div className='flex flex-col '>
                                        <label htmlFor='minPrice'>Min</label>
                                        <input
                                            type='text'
                                            name='minPrice'
                                            id='minPrice'
                                            value={filters.minPrice}
                                            onChange={handleChangeInput}
                                            className='w-[100px] text-center p-1 rounded-md'
                                        />
                                    </div>
                                    <div className='flex flex-col '>
                                        <label htmlFor='maxPrice'>Max</label>
                                        <input
                                            type='text'
                                            name='maxPrice'
                                            id='maxPrice'
                                            value={filters.maxPrice}
                                            onChange={handleChangeInput}
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
                                        <div className='flex items-center gap-2' key={index}>
                                            <input
                                                type="radio"
                                                name = "discount"
                                                id={discount.id}
                                                value={discount.value}
                                                checked = {filters.discount === discount.value}
                                                onChange={handleChangeInput}
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
                                        <div className='flex items-center gap-2' key={index}>
                                            <input
                                                type="radio"
                                                name = "cusRating"
                                                id={rating.id}
                                                value={rating.value}
                                                checked = {filters.cusRating === rating.value}
                                                onChange={handleChangeInput}
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
                                            checked = {filters.location.includes(city)}
                                            onChange={handleChangeInput}
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

            <div 
              className='flex gap-2 mt-8 font-medium items-center justify-center mr-2 cursor-pointer'
              onClick={() => setFilters({
                brands : [],
                discount : "",
                minPrice : "1",
                maxPrice : "10000",
                cusRating : "",
                location : []
              })}>
                <IoCloseOutline/>
                Clear all Filters
            </div>
        </div>

    </div>
  )
}

export default Filters



// 333333333333333333333333##################33############3sjflilqlfd 
// daflaldf
// ajdflkajdlf
// asdjfljasdf
// adsdfljlasdf
// asjdlfjlsd
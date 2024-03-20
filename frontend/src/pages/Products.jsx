import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { IoIosArrowDown } from "react-icons/io";


import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


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

const Products = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = decodeURIComponent(searchParams.get("query"));
  const [page ,setPage] = useState(1);
  const productPage = 18;
  const totalProducts = 250;
  const [sortBy , setSortBy] = useState("");
  const [filters , setFilters] = useState({
      brands : "",
      minPrice : "",
      maxPrice : "",
      discount : "",
      cusRating: "",
      location : ""
  });
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

  console.log(priceSliderValue)
  return (
    <div>
        <div>
            <h2>{`Showing products for ${searchQuery}`}</h2>
            <p>{`Showing ${(page - 1)*productPage + 1} - ${Math.min(page*productPage, totalProducts)}`}</p>
        </div>
        <div className='mt-20 flex gap-5 w-[300px] px-5'>
            {/* filters  */}
            <div className='w-full'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-2xl font-semibold'>Filters</h2>
                    <button className='font-medium text-royal-blue-500'>
                        Apply
                    </button>
                </div>

                <div className='rounded-md bg-gray-200 py-2 px-4'>
                    <form>
                        <div>
                            <div className='flex justify-between items-center mb-2'>
                               <p className='text-[18px] font-medium'>Brands</p>
                               <IoIosArrowDown 
                                    onClick={() => toggleFilter('brands')}
                                    className={`${filterOpen.brands && "rotate-180"}`}/>
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

                        <div>
                            <div className='flex justify-between items-center mb-2'>
                               <p className='text-[18px] font-medium'>Price Range</p>
                               <IoIosArrowDown 
                                    onClick={() => toggleFilter('price')}
                                    className={`${filterOpen.price && "rotate-180"}`}/>
                            </div>
                            {
                                filterOpen.price && (
                                    <div className='mx-auto ml-2'>
                                        <Box sx={{ width: 200 }}>
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
                                                    className='w-[50px] text-center p-1 rounded-md'
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
                                                    className='w-[50px] text-center p-1 rounded-md'
                                                />
                                            </div>
                                        </div>
                                        </Box>
                                    </div>
                                )
                            }
                        </div>
                    </form>
                    </div>
            </div>

            {/* products and sortBy  */}
            <div>
                
            </div>
        </div>
    </div>
  )
}

export default Products
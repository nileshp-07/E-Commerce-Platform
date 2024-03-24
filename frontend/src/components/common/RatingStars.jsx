import React, { useState, useEffect } from 'react'
import {TiStarFullOutline,TiStarHalfOutline,TiStarOutline} from "react-icons/ti"

const RatingStars = ({RatingCount, starSize}) => {
    const [starCount , setStarCount] = useState({
        full: 0,
        half: 0,
        empty: 0,
    });

    useEffect(() => {
        const wholeStar =  Math.floor(RatingCount) || 0;
        setStarCount({
            full :wholeStar,
            half : Number.isInteger(RatingCount) ? 0 : 1,
            empty: Number.isInteger(RatingCount) ? 5 - wholeStar : 4 - wholeStar,
        })
    },[RatingCount]);

  return (
    <div className='flex  text-yellow-100'>
        {  
            [...new Array(starCount.full)].map( (_, index) => {    //creating an array of startCount.full size and then apply map on it
                return <TiStarFullOutline key={index} fill='#FFAD33' size={starSize || 20}/>
            })
        }
        {
            [...new Array(starCount.half)].map( (_, index) => {
                return <TiStarHalfOutline key={index} fill='#FFAD33'  size={starSize || 20}/>
            })
        }
        {
            [...new Array(starCount.empty)].map( (_, index) => {
                return <TiStarOutline key={index} fill='#FFAD33'  size={starSize || 20}/>
            })
        }
    </div>
  )
}

export default RatingStars
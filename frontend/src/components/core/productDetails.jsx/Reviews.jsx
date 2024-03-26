import React from 'react'
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import RatingStars from "../../common/RatingStars"
import ProgressBar from "@ramonak/react-progress-bar";
import {TiStarFullOutline} from "react-icons/ti"
import SubmitReviews from './SubmitReviews';


const reviews =[
  {
    "rating": 4.5,
    "review": "Great product, I loved it!",
    "username": "john_doe",
    "image": "https://example.com/image1.jpg",
    "last_modified_date": "2023-07-15"
  },
  {
    "rating": 3.2,
    "review": "Not bad, but could be better.",
    "username": "sara_smith",
    "image": "https://example.com/image2.jpg",
    "last_modified_date": "2023-08-22"
  },
  {
    "rating": 5,
    "review": "Excellent service, highly recommended!",
    "username": "james_williams",
    "image": "https://example.com/image3.jpg",
    "last_modified_date": "2023-09-10"
  },
  {
    "rating": 2.8,
    "review": "Disappointing experience, won't buy again.",
    "username": "emma_jones",
    "image": "https://example.com/image4.jpg",
    "last_modified_date": "2023-10-05"
  },
  {
    "rating": 4.7,
    "review": "Very satisfied with the quality.",
    "username": "michael_brown",
    "image": "https://example.com/image5.jpg",
    "last_modified_date": "2023-11-12"
  },
  {
    "rating": 3.9,
    "review": "Decent product, worth the price.",
    "username": "olivia_taylor",
    "image": "https://example.com/image6.jpg",
    "last_modified_date": "2023-12-01"
  },
  {
    "rating": 4.2,
    "review": "Impressed with the fast delivery.",
    "username": "william_davis",
    "image": "https://example.com/image7.jpg",
    "last_modified_date": "2024-01-18"
  },
  {
    "rating": 4.8,
    "review": "Fantastic customer service!",
    "username": "linda_wilson",
    "image": "https://example.com/image8.jpg",
    "last_modified_date": "2024-02-09"
  },
  {
    "rating": 3.5,
    "review": "Average product, nothing special.",
    "username": "daniel_martin",
    "image": "https://example.com/image9.jpg",
    "last_modified_date": "2024-02-28"
  },
  {
    "rating": 4.0,
    "review": "Good experience overall.",
    "username": "sophia_anderson",
    "image": "https://example.com/image10.jpg",
    "last_modified_date": "2024-03-15"
  }
]

const avgRating = 4.6;


const Reviews = () => {
  const ratingCount = [3,4,1,1,1];
  const percentages = ratingCount.map(count => ((count / reviews.length) * 100).toFixed(2));
  return (
    <div className='my-10'>
      
      <div className='border border-gray-600 rounded-md px-10 py-8 flex justify-between'>

         <div className='flex items-center gap-5'>
            <div className='h-[130px] w-[130px] flex items-center justify-center'>
              <CircularProgressbar
                value={(avgRating/5)*100}
                text={`4.6`}
                styles={buildStyles({
                  textColor: "black",
                  pathColor: "#FFA439",
                  trailColor: "#E4E9EE",
                  textSize: '28px',
                })}
            />
            </div>

            <div>
               <RatingStars RatingCount={avgRating} starSize={25}/>
               <p className='text-[18px] font-medium italic mt-2'>{`from ${reviews.length} reviews`}</p>
            </div>
         </div>

         <div className='w-[70%] '>
              {
                 ratingCount.map((count , index) => (
                    <div key={index} className='flex w-full justify-end'>
                        <div className='flex gap-[2px] items-center'>
                           <p className='text-lg font-medium'>{5 - index}</p>
                           <TiStarFullOutline size={25} fill='#FFAD33'/>
                        </div>
                        
                        <ProgressBar
                            completed={percentages[index]}
                            height="15px"
                            width="700px"
                            bgColor="#1D9E34"
                            labelAlignment="outside"
                            baseBgColor="#E4E9EE"
                            labelColor="#000000"
                            margin="15px"
                            maxCompleted={100}
                            customLabel={count}
                        />
                    </div>
                 ))
              }
         </div>
      </div>

      <SubmitReviews/>

    </div>
  )
}

export default Reviews
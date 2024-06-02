import React, { useEffect, useState } from 'react'
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import RatingStars from "../../common/RatingStars"
import ProgressBar from "@ramonak/react-progress-bar";
import {TiStarFullOutline} from "react-icons/ti"
import SubmitReviews from './SubmitReviews';
import formatDate from '../../../util/dateFormatter';
import { getAllReviews } from '../../../services/operations/productAPI';
import { useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const Reviews = ({avgRating}) => {
  const [reviews, setReviews] = useState([]);
  const [ratingCount, setRatingCount] = useState([]);
  const [page ,setPage] = useState(1);
  const [totalPages, setTotalPages] = useState("")
  const {id} = useParams();
  const percentages = ratingCount?.map(count => ((count / reviews.length) * 100).toFixed(0));



  const getRatingStarsCount = (reviews) => {
      let ratingStarCounts = [0,0,0,0,0];

      reviews.forEach(review => {
        const rating = review.rating;
        ratingStarCounts[rating - 1]++; // Adjust index to match rating (1-indexed to 0-indexed)
      });
      setRatingCount(ratingStarCounts);
  }
  const getAllReviewsOfProduct = async () => {
     const response = await getAllReviews(id);

     if(response){
     setReviews(response);
     getRatingStarsCount(response);
     calculateTotalPagesCount(response?.length)
     }

  }
  useEffect(() => {
    getAllReviewsOfProduct();
  }, [])


  const handleChange = (event, value) => {
    setPage(value);
  };

  const calculateTotalPagesCount = (totalProducts) => {
       
    let pages=  Math.floor(totalProducts/10);

    if(totalProducts%10 > 0)
        pages += 1;


    setTotalPages(pages)

}

  
  return (
    <div className='my-10'>
      
      <div className='relative profile-shadow rounded-md md:px-10 md:py-8 px-6 py-4 flex flex-col lg:flex-row gap-5 justify-between'>

         <div className='flex flex-col lg:flex-row items-center gap-5'>
            <div className='h-[130px] w-[130px] flex items-center justify-center'>
              <CircularProgressbar
                value={(avgRating/5)*100}
                text={avgRating.toFixed(1)}
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

         <div className=''>
              {
                 ratingCount?.reverse()?.map((count , index) => (
                    <div key={index} className='flex w-full justify-end'>
                        <div className='flex gap-[2px] items-center'>
                           <p className='text-lg font-medium'>{5 - index}</p>
                           <TiStarFullOutline size={25} fill='#FFAD33'/>
                        </div>
                        <div className='hidden md:block'>
                          <ProgressBar
                              completed={percentages[4-index]}
                              height="15px"
                              width="600px"
                              bgColor="#1D9E34"
                              labelAlignment="outside"
                              baseBgColor="#E4E9EE"
                              labelColor="#000000"
                              margin="15px"
                              maxCompleted={100}
                              customLabel={count === 0 ? "0" : count}
                          />
                        </div>

                        <div className='block md:hidden'>
                          <ProgressBar
                              completed={percentages[4-index]}
                              height="10px"
                              width="250px"
                              bgColor="#1D9E34"
                              labelAlignment="outside"
                              baseBgColor="#E4E9EE"
                              labelColor="#000000"
                              margin="7px"
                              maxCompleted={100}
                              customLabel={count === 0 ? "0" : count}
                          />
                        </div>
                    </div>
                 ))
              }
         </div>
      </div>

      <SubmitReviews setReviews={setReviews}/>


      <div>
        {
           reviews?.reverse().slice( (page-1)*10 , (page-1)*10+10)?.map((review , index) => (
             <div key={index} className={`px-4 md:py-8 py-5 md:w-[80%] ${index != reviews.length-1  && "border-b "}`}>
                <div className='flex justify-between'>
                    <div className='flex gap-5'>
                      <img
                        src={review?.user?.profileImage}
                        alt='userImage'
                        loading='lazy'
                        className='md:h-[80px] md:w-[80px] h-[65px] w-[65px] rounded-full'
                      />

                      <div className='mt-2'>
                         <p className='font-medium ml-1 mb-1'>{review?.user?.name}</p>
                         <RatingStars RatingCount={review?.rating}/>
                      </div>
                    </div>
                     
                    <p className='font-medium text-[14px] mt-[10px]'>{formatDate(review?.createdAt)}</p>
                </div>

                <p className='max-w-[80%] text-gray-950 mt-2'>{review.review}</p>
             </div>
           ))
        }
      </div>
      {
         reviews?.length === 0  && (
           <div className='flex justify-center'>
              <div className='text-lg font-medium text-gray-500'>
                  No reviews to this product
              </div>
           </div>

         )
      }

      {
         reviews?.length > 0 && (
          <div className='mt-14 md:w-[80%] flex justify-center'>
              <Stack spacing={2}>
                <Pagination count={totalPages} page={page} onChange={handleChange} size='large' />
              </Stack>
          </div>
         )
      }

    </div>
  )
}

export default Reviews
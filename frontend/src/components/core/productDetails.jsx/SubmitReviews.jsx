import React, { useState } from 'react'
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { createReview } from '../../../services/operations/productAPI';
import { useSelector } from 'react-redux';
import {toast} from "sonner"
import { useParams } from 'react-router-dom';

const labels = {
  0 : "",
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const SubmitReviews = ({setReviews}) => {
    const [value, setValue] = useState(0);
    const [hover, setHover] = useState(-1);
    const [review , setReview] = useState("");
    const {token} = useSelector((state) => state.user);
    const {id} = useParams();



    const createReviewHandler = async () => {
        if(value===0 || !review)
        {
            toast.error("Please write the review first");
            return;
        }
        const response = await createReview(value, review, id, token);

        if(response)
        setReviews(response);

        setValue(0);
        setReview("");
    }

  return (
    <div className='mt-20 mb-10 border-b  border-gray-500 pb-10'>
        <h2 className='md:text-2xl text-xl font-semibold'>Submit your review</h2>

        <div className='md:mt-10 mt-5 md:mx-5'>
            <div >
                <p className='mb-2 text-[17px] font-medium'>Rate this product</p>
                <Box
                    sx={{
                        width: 200,
                        display: "flex",
                        alignItems: "center",
                    }}
                    >
                    <Rating
                        name="hover-feedback"
                        value={value}
                        size='large'
                        getLabelText={getLabelText}
                        onChange={(event, value) => {
                        setValue(value);
                        }}
                        onChangeActive={(event, newHover) => {
                        setHover(newHover);
                        }}
                        icon={<FaStar style={{margin: "2px"}}/>}
                        emptyIcon = {<FaRegStar style={{margin: "2px"}}/>}
                    />
                    {value !== null && (
                        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                    )}
                </Box>
            </div>


            <div className='flex flex-col mt-5'>
                <label htmlFor='review' className='mb-2 text-[17px] font-medium'>Review this product</label>
                <textarea
                    id='review'
                    name='review'
                    rows={4}
                    cols={10}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder='write your review for the product'
                    className='field-style md:w-[600px] w-[320px] h-[150px]'
                />
            </div>

            <button 
               onClick={createReviewHandler}
               className='md:mt-10 mt-5 bg-royal-blue-600 md:py-2 py-[6px] md:px-7 px-5 rounded-md text-white font-medium hover:bg-royal-blue-500 trasition-all duration-200'> 
                Submit
            </button>
        </div>

    </div>
  )
}

export default SubmitReviews
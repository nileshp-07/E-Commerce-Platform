import React, { useState } from 'react'
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";

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

const SubmitReviews = () => {
    const [value, setValue] = useState(0);
    const [hover, setHover] = useState(-1);
    const [review , setReview] = useState("");

   console.log(value ,"  " , review);
  return (
    <div className='mt-20 mb-10 border-b  border-gray-500 pb-10'>
        <h2 className='text-2xl font-semibold'>Submit your review</h2>

        <div className='mt-10 mx-5'>
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
                    className='field-style w-[600px] h-[150px]'
                />
            </div>

            <button className='mt-10 bg-royal-blue-500 py-2 px-7 rounded-md text-white font-medium'> 
                Submit
            </button>
        </div>

    </div>
  )
}

export default SubmitReviews
const mongoose = require("mongoose");

const ratingAndReviewSchema = new mongoose.Schema({
    rating : {
        type : Number,
        required : true
    },
    review : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
        required : true
    }
},
{
    timestamps: true,
});


const RatingAndReview = mongoose.model("RatingAndReview" , ratingAndReviewSchema);
export default RatingAndReview;
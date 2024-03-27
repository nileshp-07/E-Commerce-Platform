const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true , "Please provide the product title"]
    },
    price : {
        type : Number,
        required : [true,  "please define the price of the product"]
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"
    },
    seller : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    avgRating : {
        type : Number,
        default : 0,
    },
    ratingAndReviews :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "RatingAndReview"
    }],
    thumbnail : {
        type : String
    },
    images : [{
        type : String,
    }],
    stocks : {
        type : Number
    },
    sold : {
        type : Number
    },
    brand : {
        type : String
    },
    discountPercentage : {
        type : Number,
        min:[1, 'wrong min discount'], 
        max:[99, 'wrong max discount']
    },
    discountedPrice : {
        type : Number
    },
    productDetails : {  //used to store the key-value pairs of specifications
        type: Map,
        of: String,
    }
},
{
    timestamps : true
});



const Product = mongoose.model("Product" , productSchema);
module.exports = Product;
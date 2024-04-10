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
    categories : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "SubSubCategory"
    }],
    description : {
        type : String,
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
        type : Number,
        default : 0
    },
    brand : {
        type : String
    },
    discount : {
        type : Number,
        min:[0, 'wrong min discount'], 
        max:[99, 'wrong max discount']
    },
    discountedPrice : {
        type : Number
    },
    specifications : {  //used to store the key-value pairs of specifications
        type: Map,
        of: String,
    }
},
{
    timestamps : true
});



const Product = mongoose.model("Product" , productSchema);
module.exports = Product;
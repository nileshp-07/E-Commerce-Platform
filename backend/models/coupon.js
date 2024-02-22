const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    sellerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : [true , "please provide seller's id"]
    },
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
        required : [true , "please provide the product id"]
    },
    code : {
        type : String,
        required : [true , "Please provide the coupon code"],
    },
    discountPercentage : {
        type : Number,
        required : [true , "please enter the Discount amount"]
    },
    expirationDate : {
        type : Date,
        required: [true , "please provide the expiration date of the coupon"]
    }
},
{
    timestamps : true
})


const Coupon = mongoose.model("Coupon" , couponSchema);
module.exports = Coupon;
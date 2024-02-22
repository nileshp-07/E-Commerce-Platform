const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    buyer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : [true , "Please provide the buyer id"]
    },
    seller : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : [true , "Please provide the seller id"]
    },
    orderItems : [{
        name : String,
        qty : Number,
        price : Number,
        image : String,
        productId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Product"
        }
    }],
    totalPrice : {
        type : Number
    },
    totalItems : {
        type : Number
    },
    paymentMethod : {
        type : String,
        required: [true , "please define the payment method"],
        enum : ['Card' , 'Cash' , 'Online']
    },
    deliveryStatus : {
        status : {
            type : String,
            enum : ["Processing" , "Shipped" , "Delivered"],
            default : "Processing"
        },
        updatedAt : {
            type : Date,
            default : Date.now()
        }
    },
    shippingInfo : {
        address : String,
        city : String,
        postalCode : String,
        state : String
    }
},
{
    timestamps : true
});

const Order = mongoose.model("Order" , orderSchema);
module.exports = Order;
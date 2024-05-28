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
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    qty : {
        type: Number,
        default : 1
    },
    totalPrice : {
        type : Number,
    },
    coinUsed : {
        type : Number,
        default: 0
    },
    buyersContactNumber: {
        type: String,
    },
    paymentMethod : {
        type : String,
        required: [true , "please define the payment method"],
        enum : ['Card' , 'Cash' , 'Online']
    },
    orderStatus : {
        type : String,
        enum : ["Pending", "Success"],
        default : "Success"
    },
    deliveryStatus : {
        status : {
            type : String,
            enum : ["Processing" , "Shipped" , "Delivered","Cancel Request" ,"Cancelled"],
            default : "Processing"
        },
        updatedAt : {
            type : Date,
            default : Date.now()
        }
    },
    createdAt : {
        type :  Date,
        default : Date.now()
    },
    shippingAddress : {   
        street :  String,
        city : String,
        postalCode : Number,
        state : String,
        country  : String
    }
},
{
    timestamps : true
});

const Order = mongoose.model("Order" , orderSchema);
module.exports = Order;
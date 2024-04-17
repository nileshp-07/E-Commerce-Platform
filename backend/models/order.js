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
    // orderItems : [{
    //     name : String,
    //     qty : Number,
    //     price : Number,
    //     image : String,
    //     productId : {
    //         type : mongoose.Schema.Types.ObjectId,
    //         ref : "Product"
    //     }
    // }],
    // totalPrice : {
    //     type : Number
    // },
    // totalItems : {
    //     type : Number
    // },
    coinUsed : {
        type : Number,
        default: 0
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
    createdAt : {
        type :  Date,
        default : Date.now()
    },
    // shippingAddress : {   we have to handle it better
    //     type : String,
    // }
},
{
    timestamps : true
});

const Order = mongoose.model("Order" , orderSchema);
module.exports = Order;
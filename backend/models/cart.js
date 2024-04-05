const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }, 
    products : [{
        productId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Product",
        },
        qty :{
            type : Number,
            default : 1
        }
    }] 
},
{
    timestamps : true
});

const Cart = mongoose.model("Cart" , cartSchema);
module.exports = Cart;
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
    },
    profileDetails : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Profile",
        required : true
    },
    wishlists : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product"
    }],
    products : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product"
    }],
    isSeller : {
        type : Boolean,
        required : true,
        default : false,
    },
    sellerRating : {
        type : Number,
        default : 0,
    },
    coins : {
        type: Number,
        default :  0,
    },
    password : {
        type : String,
        required : true,
    },
    profileImage : {
        type : String,
        required : true
    },
    resetPasswordToken : {
        type : String,
    }
},
{
    timestamps : true
});


const User = mongoose.model("User" , userSchema);
module.exports = User;     
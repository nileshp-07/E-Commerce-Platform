const mongoose = require("mongoose");


const addressSchema = new mongoose.Schema({
    street : {
      type : String,
    },
    city : {
      type : String,
    },
    postalCode :  {
     type : String
    },
    state : {
      type: String
    },
})

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
    addresses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Address"
    }],
    resetPasswordToken : {
        type : String,
        expires : 10*60
    }
},
{
    timestamps : true
});

// Create the TTL index for resetPasswordToken
userSchema.index({ "resetPasswordToken": 1 }, { expireAfterSeconds: 600 });

const Address = mongoose.model("Address" , addressSchema)
const User = mongoose.model("User" , userSchema);
module.exports = {
    User,
    Address
};     

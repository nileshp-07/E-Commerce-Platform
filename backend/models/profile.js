const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    gender : {
        type : String,
    },
    dateOfBirth : {
        type : String
    },
    contactNumber : {
        type : String,
        trim : true,
    },
    bio : {
        type : String,
    }
},
{
    timestamps: true,
});


const Profile = mongoose.model("Profile" , profileSchema);
module.exports = Profile;


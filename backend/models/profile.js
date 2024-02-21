const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    gender : {
        type : String,
    },
    dataOfBirth : {
        type : String
    },
    contactNumber : {
        type : String,
        trim : true,
    },
    addresses : [
        {
            address : {
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
        }
    ]
},
{
    timestamps: true,
});


const Profile = mongoose.model("Profile" , profileSchema);
export default Profile;


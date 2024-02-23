const Profile = require("../models/profile");
const {User, Address} = require("../models/user");
const bcrypt = require("bcrypt")
const mailSender = require("../utils/mailSender")
const {uploadImageToCloudinary} = require("../utils/imageUploader")

exports.changePassword = async (req , res) => {
    try{
        const {id} = req.user;

        const {password , newPassword} = req.body;

        // validation 
        if(!password || !newPassword)
        {
            return res.status(404).json({
                success : false,
                message : "All fields are required",
            })
        }

        // compair the password from the password stored in DB
        const user = await User.findById(id);

        if(await bcrypt.compare(password , user.password)){
            // password is correct now hash the new password and save to DB 
            const hashedNewPassword = await bcrypt.hash(newPassword , 10);

            user.password = hashedNewPassword;

            await user.save();


            // now send the mail to the user 

            const mailResponse = await mailSender(user.email , "Password Updated" , 
                                         "You have successfully changed your account password");


            console.log("email response : ",mailResponse);

            
            return res.status(200).json({
                success : true,
                message  : "User password has been changed successfully"
            })

        }
        else{
            return res.status(402).json({
                success : false,
                message: "Password is incorrect",
            })
        }
    }
    catch(error)
    {
        console.log(error);
        return res.status(401).json({
            success : false,
            message : error.message
        })
    }
}


exports.editProfileDetails = async (req , res) => {
    try{
        const {name="", gender="", dateOfBirth="" , contactNumber="", bio=""} = req.body;
        const {id} = req.user;
        

        // find the user and update if first has to change 
        let user = await User.findById(id);
        if(name){
           user.name = name;
           await user.save();
        }
        

        // fetch the profileid and update the required info 
        const ProfileDetailsId = user.profileDetails;

        const profileDetails = await Profile.findById(ProfileDetailsId);

        if(gender)
        profileDetails.gender = gender;
        if(dateOfBirth)
        profileDetails.dateOfBirth = dateOfBirth;
        if(contactNumber)
        profileDetails.contactNumber = contactNumber;
        if(bio)
        profileDetails.bio = bio;
        

        await profileDetails.save();


        // fetch the user updated info 
        const updatedUser = await User.findById(id).populate("profileDetails").exec();

        return res.status(200).json({
            success : true,
            message : "Profile details updated successfully",
            updatedUser,
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(401).json({
            success : false,
            message : error.message
        })
    }
}


exports.changeProfileImage = async (req , res) => {
    try{
        console.log(req.files);
        const profileImage = req.files.image;
        const {id} =  req.user;

        // validation
        if(!profileImage)
        {
            return res.status(401).json({
                success : false,
                message : "Image does not exist"
            })
        }

        // upload image to cloudinary 
        const uploadResponse = await uploadImageToCloudinary(profileImage , process.env.FOLDER_NAME);

        console.log("profile image upload response : ", uploadResponse);

        // update the user image
        const user = await User.findByIdAndUpdate(id , {
                                                    profileImage : uploadResponse.secure_url,
                                                },
                                                {new: true});

        return res.status(200).json({
            success : true,
            message : "profile image updated successfully"
        })

    }
    catch(error)
    {
        console.log(error);
        return res.status(401).json({
            success : false,
            message : error.message
        })
    }
}


exports.addAddress = async (req , res) => {
    try{
        const {street , city , state , postalCode} = req.body;
        const {id} = req.user;

        // validation 
        if(!street || !city || !state || !postalCode) 
        {
            return res.status(404).json({
                success : false,
                message : "All fields are required"
            })
        }

        // creat a new address 
        const newAddress = await Address.create({street , city , state , postalCode});

        // now add the objectid of the address into userSchema 
        const updatedUser = await User.findByIdAndUpdate(id , {
                                                            $push : {
                                                                addresses : newAddress._id
                                                            }
                                                        },
                                                        {new : true})
                                                        .populate("addresses").exec();

        return res.status(200).json({
            success : true,
            message : "new address added",
            newAddress,
            updatedUser
        })

    }
    catch(error)
    {
        console.log(error);
        return res.status(401).json({
            success : false,
            message : error.message
        })
    }
}


exports.editAddress = async (req , res) => {
    try{
       
        const {addressId ,street, city, state, postalCode} = req.body;

        // validation
        if(!street || !city || !state || !postalCode)
        {
            return res.status(404).json({
                success : false,
                message :"All fields are required"
            })
        }

        // now edit the address
        const updatedAddress = await Address.findByIdAndUpdate(addressId , {
                                                                street, 
                                                                city, 
                                                                state, 
                                                                postalCode
                                                            },
                                                            {new : true})


        
        return res.status(200).json({
            success : true,
            message : "Address edited successfully",
            updatedAddress
        })

    }
    catch(error)
    {
        console.log(error);
        return res.status(401).json({
            success : false,
            message : error.message
        })
    }
}


exports.deleteAddress = async(req , res) => {
    try{
        const {addressId} = req.body;
        const {id} = req.user;

        // delete the address from the database 
        const deleteAddress = await Address.findByIdAndDelete(addressId);

        // also pull the object id from user's schema 
        const updatedUser = await User.findByIdAndUpdate(id , {
                                                            $pull : {
                                                                addresses : addressId
                                                            }
                                                        },
                                                        {new : true})
                                                        .populate("addresses").exec();


        return res.status(200).json({
            success : true,
            message : "Address deleted successfully",
            deleteAddress,
            updatedAddress
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(401).json({
            success : false,
            message : error.message
        })
    }
}
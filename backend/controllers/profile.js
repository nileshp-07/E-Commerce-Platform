const Profile = require("../models/profile");
const {User, Address} = require("../models/user");
const bcrypt = require("bcrypt")
const mailSender = require("../utils/mailSender")
const {uploadImageToCloudinary} = require("../utils/imageUploader");
const Cart = require("../models/cart");
const Order = require("../models/order");
const Product  = require("../models/product")

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
        const {name="", gender="", dateOfBirth="" , contactNumber="", about=""} = req.body;
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
        if(about)
        profileDetails.bio = about;
        

        await profileDetails.save();


        // fetch the user updated info 
        const updatedUser = await User.findById(id)
                                           .populate("profileDetails")
                                           .populate("addresses")
                                           .populate("wishlists").exec();

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
        const updatedUser = await User.findByIdAndUpdate(id , {
                                                    profileImage : uploadResponse.secure_url,
                                                },
                                                {new: true})
                                                .populate("profileDetails")
                                                .populate("addresses")
                                                .populate("wishlists").exec();

        return res.status(200).json({
            success : true,
            message : "profile image updated successfully",
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


exports.getUserFullDetails = async (req , res) =>{
    try{
        const {id} = req.user;

        // fetch the user  
        const user = await User.findById(id)
                                        .populate("profileDetails")
                                        .populate("wishlists")
                                        .populate("products")
                                        .populate("addresses")
                                        .exec();


        if(!user)
        {
            return res.status(404).json({
                success : false,
                message : "User does not found",
                user
            })
        }

        return res.status(200).json({
            success : true,
            message : "user's details fetched successfully",
            user
        })
    }
    catch(error){
        console.log(error);
        return res.status(401).json({
            success : false,
            message : error.message
        })
    }
}



exports.getSellerProducts = async (req ,res) => {
    try{
        const {id} = req.user;

        const user = await User.findById(id)
                                        .populate({
                                            path : "products",
                                            populate : {
                                                path : "categories"
                                            }
                                        })
                                        .exec();


        if(!user){
            return res.status(404).json({
                success : false,
                message : "seller does not found"
            })
        }

        const products = user.products;

        return res.status(200).json({
            success : true,
            message : "seller products successfully fetched",
            products
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


exports.deleteAccount = async (req, res) => {
    try{
        const {id} = req.user;

        const user = await User.findById(id);

        if(!user) {
            return res.status(404).json({
                success : false,
                message : "User not found",
            })
        }

        // 1 -> delete the associated cart of the user first
        const cart = await Cart.findOneAndDelete({
                                                    user : id
                                                })

        // 2 -> after then delete the profile of the user
        const profile = await Profile.findByIdAndDelete({_id : user.profileDetails});

        // 3 -> now delete the address of the user
        for(const addressId of user.addresses)
        {
            await Address.findByIdAndDelete(addressId);
        }


        // now finally delete the user 
        await User.findByIdAndDelete(id);

        return res.status(200).json({
            success : true,
            message : "User has been delete successfully"
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


exports.wantToBecomeSeller = async (req, res) => {
    try{
        const {id} = req.user;
        const {formData} = req.body;

        const mailResponse = await mailSender("patidarnilesh7223@gmail.com" , "New Seller Registration - Pending Approval" , 
          `<html>
          <body>
          Hello Admin,<br><br>
          
          A user has requested to become a seller on the platform. Below are the details provided:<br><br>
          
          userId : ${id}<br>
          Name: ${formData.name}<br>
          Email: ${formData.email}<br>
          Contact Number: ${formData.contactNumber}<br>
          Address:<br>
            Street Address: ${formData.address.street}<br>
            City: ${formData.address.city}<br>
            Postal Code: ${formData.address.postalCode}<br>
            State: ${formData.address.state}<br>
            Country: ${formData.address.country}<br>
          Product Type: ${formData.productCategories}<br><br>
          
          Please review the seller's information and take appropriate action to complete the registration process.<br><br>
          
          Thank you.
          </body>
          </html>`
       );

       if(!mailResponse)
       {
        return res.status(401).json({
            success : false,
            message : "Mail could not be send"
        })
       }

       return res.status(200).json({
        success : true,
        message : "Mail has been sent to the Admin"
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


exports.getBuyersAllOrders = async (req, res) => {
    try{
        const {id} = req.user;

        const orders = await Order.find({buyer: id})
                                                .populate("seller")
                                                .populate({
                                                    path : "product",
                                                    populate : {
                                                        path : "categories"
                                                    }
                                                })
                                                .exec();


        if(!orders)
        {
            return res.status(404).json({
                success : false,
                message : "Orders does not found"
            })
        }

        return res.status(200).json({
            success : true,
            message : "Orders has been returned",
            orders,
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



exports.getSellersAllOrders = async (req, res) => {
    try{
        const {id} = req.user;

        const orders = await Order.find({seller: id})
                                                .populate("buyer")
                                                .populate({
                                                    path : "product",
                                                    populate : {
                                                        path : "categories"
                                                    }
                                                })
                                                .exec();


        if(!orders)
        {
            return res.status(404).json({
                success : false,
                message : "Orders does not found"
            })
        }

        return res.status(200).json({
            success : true,
            message : "Orders has been returned",
            orders,
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


exports.getOrderFullDetails = async (req,res) => {
    try{
        const {orderId} = req.body;

        const order = await Order.findById(orderId)
                                                .populate({
                                                    path : "buyer",
                                                    populate : {
                                                        path : "profileDetails"
                                                    }
                                                })
                                                .populate({
                                                    path : "seller",
                                                    populate : {
                                                        path : "profileDetails"
                                                    }
                                                })
                                                .populate({
                                                    path : "product",
                                                    populate : {
                                                        path : "categories"
                                                    }
                                                })
                                                .exec();


        if(!order)
        {
            return res.status(404).json({
                success : false,
                message : "Order does not found"
            })
        }


        return res.status(200).json({
            success : true,
            message : "Order details has been returned",
            orderDetails : order
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


exports.updateDeliveryStatus = async (req, res) => {
    try{
        const {updatedStatus, orderId} = req.body;


        const order = await Order.findByIdAndUpdate(orderId, {
                                                    $set : {
                                                        "deliveryStatus.status" : updatedStatus,
                                                        "deliveryStatus.updateAt" : Date.now() 
                                                    }
                                                },
                                                {new : true});


        if(!order){
            return res.status(404).json({
                success : false,
                message : "Order does not found"
            })
        }


        return res.status(200).json({
            success : true,
            message : "Delivery Status updated"
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


exports.getSellerDashboardInfo = async (req , res) => {
    try{
        const {id} = req.user;

        const products = await Product.find({
                                            seller: id
                                        });

        const orders = await Order.find({
                                            seller: id
                                        })



        let productsRevenue=[];
        let totalRevenue= 0;
        for(item of products){
            let product = {
                id : item._id,
                label : item.title,
                value : item.discountedPrice*item.sold
            }
            productsRevenue.push(product);
            totalRevenue += item.discountedPrice*item.sold
        }

        productsRevenue = productsRevenue.sort((a, b) => b.value - a.value).slice(0, 10);
        

        let orderDelivered=0 ;
        let orderShipped=0;
        let newOrders=0;
        orders.forEach(item => {
            if (item.deliveryStatus.status === "Delivered") {
                orderDelivered++;
            } else if (item.deliveryStatus.status === "Shipped") {
                orderShipped++;
            } else if (item.deliveryStatus.status === "Processing") {
                newOrders++;
            }
        });


        return res.status(200).json({
            success : true,
            message : "Seller Dashboard detailed fetched",
            data : {
                productsRevenue,
                orderDetails: {
                    orderDelivered,
                    orderShipped,
                    newOrders
                },
                totalRevenue
            }
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
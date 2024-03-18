const {User, Address} = require("../models/user");



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


        const user = await User.findById(id);
        if(user.addresses.length >= 3)
        {
            return res.status(401).json({
                success: false,
                message : "A user can have max 3 Addresses"
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
        const {id} = req.user;

        // validation
        if(!street || !city || !state || !postalCode ||!addressId)
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
                                                            {new : true});

                                                        
        if(!updatedAddress)
        {
            return res.status(402).json({
                success : false,
                message :"Address could not be edited"
            })
        }


        const updatedUser = User.findById(id)
                                            .populate("profileDetails")
                                            .populate("addresses")
                                            .exec();

        
        return res.status(200).json({
            success : true,
            message : "Address edited successfully",
            updatedAddress,
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


exports.getUserAllAddresses = async (req , res ) => {
    try{
        const {id} = req.user;

        const user = await User.findById(id)
                                        .populate("addresses").exec();

        if(!user)
        {
            return res.status(401).json({
                success : true,
                message : "User not found",
            })
        }

        const addresses = user.addresses;

        return  res.status(200).json({
            success: true,
            message : "Addresses fetched successfully",
            addresses
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
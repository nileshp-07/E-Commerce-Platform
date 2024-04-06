const { User } = require("../models/user");




exports.addProductToWishlists = async (req , res) => {
    try{
        const {productId} = req.body;
        const {id} = req.user;

        // validation 
        if(!productId || !id)
        {
            return res.status(404).json({
                success : false,
                message : "All Fields are required"
            })
        }

        const productExists = await User.findById(id);

        if(productExists.wishlists.includes(productId))
        {
            return res.status(401).json({
                success : false,
                message : "product already exist into wishlists"
            })
        }
        

        const user = await User.findByIdAndUpdate(id,{
                                                    $push : {
                                                        wishlists : productId
                                                    }
                                                },
                                                {new : true})
                                                .populate({
                                                    path : "wishlists",
                                                    populate : {
                                                        path : "categories"
                                                     }
                                                })
                                                .exec();                                               


        if(!user)
        {
            return res.status(401).json({
                success : false,
                message : "Product could not be added to wishlists"
            })
        }
                   
        
        return res.status(200).json({
            success : true,
            message : "product added to wishlist",
            wishlists : user.wishlists
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



exports.removeProductFromWishlists = async (req , res) => {
    try{
        const {productId} = req.body;
        const {id} = req.user;

        // validation 
        if(!productId || !id)
        {
            return res.status(404).json({
                success : false,
                message : "All Fields are required"
            })
        }

        const productExists = await User.findById(id);

        if(!productExists.wishlists.includes(productId))
        {
            return res.status(401).json({
                success : false,
                message : "product does not exist into wishlists"
            })
        }

        const user = await User.findByIdAndUpdate(id,{
                                                    $pull : {
                                                        wishlists : productId
                                                    }
                                                },
                                                {new : true})
                                                .populate({
                                                    path : "wishlists",
                                                    populate : {
                                                        path : "categories"
                                                     }
                                                })
                                                .exec(); 


        if(!user)
        {
            return res.status(401).json({
                success : false,
                message : "Product could not be removed from wishlists"
            })
        }
                   
        
        return res.status(200).json({
            success : true,
            message : "product removed from wishlist",
            wishlists : user?.wishlists
        })

    }
    catch(error)
    {
        console.log(error);
        return res.status(401).json({
            success : false,
            message : error.message,
        })
    }
}



exports.getWishlistsProducts = async (req , res) => {
    try{
        const {id} = req.user;

        // fetch all the wishlists product from the user  
        const user = await User.findById(id)
                                        .populate("wishlists").exec();

        const wishlistsProducts = user.wishlists;

        if(!user)
        {
            return res.status(401).json({
                success : false,
                message : "wishlists Product could not be fetched"
            })
        }
                   
        
        return res.status(200).json({
            success : true,
            message : "product added to wishlist",
            wishlistsProducts,
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
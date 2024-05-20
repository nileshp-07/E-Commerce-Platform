const Cart = require("../models/cart");


exports.addProductToCart = async (req , res) => {
    try{
        const {productId , qty} = req.body;
        const {id} = req.user;


        // validation 
        if(!productId || !qty || !id)
        {
            return res.status(404).json({
                success : false,
                message: "all fields are required"
            })
        }

        const itemExist  = await Cart.findOne({user :  id , 'products.productId' : {$in: [productId]}});

        if(itemExist)
        {
            return res.status(401).json({
                success :false,
                message : "Product already exist in cart"
            })
        }

        const updatedCart = await Cart.findOneAndUpdate({user : id},{
                                                        $push : {
                                                            products : {
                                                                productId,
                                                                qty
                                                            }
                                                        }
                                                    },
                                                    {new : true})
                                                    .populate("products.productId")  //populate the productId present in the products of cart
                                                    .populate({
                                                        path : "products.productId",
                                                        populate : {
                                                            path : "seller"
                                                        }
                                                    })
                                                    .exec();

        if(!updatedCart)
        {
            return res.status(401).json({
                success : false,
                message : "product could not be added to cart"
            })
        }

        return res.status(200).json({
            success : true,
            message : "product added to cart",
            updatedCart
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


exports.removeProductFromCart = async (req , res) => {
    try{
        const {productId} = req.body;
        const {id} = req.user;


        // validation 
        if(!productId || !id)
        {
            return res.status(404).json({
                success : false,
                message: "all fields are required"
            })
        }

        const productExist = await Cart.findOne({user: id, 'products.productId' : {$in: [productId]}});

        if(!productExist)
        {
            return res.status(404).json({
                message : "Product does not found in cart",
                success : false,
            })
        }
        
        const updatedCart = await Cart.findOneAndUpdate({user : id},{
                                                        $pull : {
                                                            products : {  productId  }
                                                        }
                                                    },
                                                    {new : true})
                                                    .populate("products.productId").exec();

        if(!updatedCart)
        {
            return res.status(401).json({
                success : false,
                message : "product could not be removed from cart"
            })
        }

        return res.status(200).json({
            success : true,
            message : "product removed from cart",
            updatedCart
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


exports.getCartItems = async (req,res) => {
    try{
        const {id} = req.user;

        // fetch the cart first 
        const cartItems = await Cart.findOne({user : id})
                                                .populate("products.productId")
                                                .populate({
                                                    path : "products",
                                                    populate: {
                                                        path : "productId",
                                                        populate : {
                                                            path : "seller",
                                                        }
                                                    }
                                                }).exec();

        if(!cartItems)
        {
            return res.status(404).json({
                success : false,
                message : "Cart does not found"
            })
        }


        return res.status(200).json({
            success : true,
            message : "Cart products is fetched successfully",
            cartItems
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
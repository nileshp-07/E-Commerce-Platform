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

        const updatedCart = await Cart.findOneAndUpdate({user : id},{
                                                        $push : {
                                                            products : {
                                                                productId,
                                                                qty
                                                            }
                                                        }
                                                    },
                                                    {new : true})
                                                    .populate("products.productId").exec();  //populate the productId present in the products of cart

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
        const cart = await Cart.findOne({user : id})
                                                .populate("products.productId").exec();

        if(!cart)
        {
            return res.status(404).json({
                success : false,
                message : "Cart does not found"
            })
        }

        const cartItems  = cart.products;

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
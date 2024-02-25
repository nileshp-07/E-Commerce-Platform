const Product = require("../models/product");
const {uploadImageToCloudinary} = require("../utils/imageUploader")
const RatingAndReview = require("../models/ratingAndReviews");
const { User } = require("../models/user");
const Cart = require("../models/cart")


exports.addProduct = async (req , res) => {
    try{
        const {title , price, categoryId , tags ,stocks, brand , discountPercentage, productDetails } = req.body;
        const {id} = req.user;
        const thumbnail = req.files.image;


        if(!title || !price || !categoryId || !stocks || !id  || !thumbnail)
        {
            return res.status(404).json({
                success : false,
                message : "All fields are required"
            })
        }


        // productDetails should be jsonObject 
        const productDetailsJson = JSON.parse(productDetails);

        // now upload thumbnail image to cloudinary 
        const thumbnailUploadResponse = await uploadImageToCloudinary(thumbnail , process.env.FOLDER_NAME);

        if(!thumbnailUploadResponse)
        {
            return res.status(403).json({
                success : false,
                message : "thumbnail could not be uploaded to cloudinary"
            })
        }
        
        const product = await Product.create({
                                        title,
                                        price,
                                        category : categoryId,
                                        tags,
                                        stocks,
                                        brand,
                                        seller : id,
                                        discountPercentage,
                                        discountedPrice : price - (price*discountPercentage/100),
                                        productDetails : productDetailsJson,
                                        thumbnail : thumbnailUploadResponse.secure_url
                                    })


       if(!product)
       {
         return res.status(406).json({
            success : false,
            message : "Product could not be created"
         })
       }


       //    now add the newProduct id in the sellers collection 
       const user =  await User.findByIdAndUpdate(id,{
           $push : {
              products : product._id
           }
       })

       return res.status(200).json({
        success : true,
        message :"New product created",
        product
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


exports.editProductDetails = async (req , res) => {
    try{
        const updatedDetails = req.body;
        const {productId} = updatedDetails;

        // fetch the product  
        const product = await Product.findById(productId);


        if(!product )
        {
            return res.status(404).json({
                success : false,
                message : "Product not found"
            })
        }

        // upload image to cloudinary if exist 
        if(req.files)
        {
            const thumbnail = req.files.image;
            const uploadResponse = await uploadImageToCloudinary(thumbnail , process.env.FOLDER_NAME);
            product.thumbnail = uploadResponse.secure_url;
        }

        // now ittrate to all the properties of productDetails and update accordingly 
        for(const key in updatedDetails)
        {
            if(key === "productDetails" || key === "tags")
            {
                product[key] = JSON.parse(updatedDetails[key]);
            }
            else
            product[key] = updatedDetails[key];
        }

        const updatedProductDetails =  await product.save();

        if(!updatedProductDetails)
        {
            return res.status(402).json({
                success : false,
                message : "Product details could not be updated"
            })
        }

        return res.status(200).json({
            success : true,
            message : "Product details updated"
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


exports.deleteProduct = async (req , res) => {
    try{
        const {id} = req.user;
        const {productId} = req.body;

        if(!id  || !productId)
        {
            return res.status(401).json({
                success : false,
                message : "All fields are required"
            })
        }

        // before deleting the product first unlink the product from the schema it is linked to 
        // rating and review 
        const deletedReviews = await RatingAndReview.deleteMany({product : productId});

        // wishlists 
        const deletedWishlists = await User.updateMany({
                                                $pull : {
                                                    wishlists : productId
                                                }
                                           })
        // products from seller
        const updateSeller = await User.findByIdAndUpdate(id,{
                                                            $pull : {
                                                                products : productId
                                                            }
                                                        },
                                                        {new : true})

        // cart 
        const updatedCart = await Cart.updateMany({
            $pull : {
                products : productId
            }
        })

        
        // now delete the product  
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if(!deletedProduct)
        {
            return res.status(401).json({
                success: false,
                message : "Product could not be deleted"
            })
        }


        return res.status(200).json({
            success : true,
            message : "Product deleted successfully"
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


exports.getProductFullDetails = async (req , res) => {
    try{
        const {productId} = req.body;

        // fetch the product  
        const productDetails = await Product.findById(productId)
                                                       .populate("category")
                                                       .populate({
                                                         path : "seller",
                                                         populate : {
                                                            path : "profileDetails",
                                                            path : "products"
                                                         },
                                                        })
                                                        .populate({
                                                            path : "ratingAndReviews",
                                                            populate : {
                                                                path : "user"
                                                            }
                                                        })
                                                        .exec();



        if(!productDetails)
        {
            return res.status(404).json({
                success : false,
                message : "Product not found"
            })
        }


        return res.status(200).json({
            success : true,
            message : "Product full details fetched successfully",
            productDetails
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
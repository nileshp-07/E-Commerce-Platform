const Product = require("../models/product");
const RatingAndReview = require("../models/ratingAndReviews")


exports.writeReview = async  (req , res) => {
    try{
        const {productId, rating , review} = req.body;
        const {id} = req.user;

        // validation 
        if(!productId || !rating || !review)
        {
            return res.status(404).json({
                success : false,
                message : "All fields are required"
            })
        }

        // create a rating 
        const newReview = await RatingAndReview.create({
                                                    user : id,
                                                    rating,
                                                    review,
                                                    product : productId
                                                });


        // find product and put the rating into it 
        const product = await Product.findByIdAndUpdate(productId ,{
                                                                $push : {
                                                                    ratingAndReviews : newReview._id
                                                                }
                                                            },
                                                            {new : true})
                                                            .populate("ratingAndReviews");
       
        // now calculate the avg rating 
        const ratings = product.ratingAndReviews;
        const ratingSum = ratings.reduce((sum, rating) => sum + rating.rating, 0);
        const avgRating = ratings.length > 0 ? ratingSum / ratings.length : 0;

        product.avgRating = avgRating;
        await product.save();
        
        return res.status(200).json({
            success: true,
            message : "Review created succesfully",
            newReview,
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


exports.deleteReview = async (req , res) => {
    try{

        const {productId, reviewId} = req.body;

        const deletedReview = await RatingAndReview.findByIdAndDelete(reviewId);

        // also delete from the product schema  
        const products = await Product.findByIdAndUpdate(productId,
                                                        {
                                                            $pull: {
                                                                ratingAndReviews : reviewId
                                                            }
                                                        },
                                                        {new : true})
                                                        .populate("ratingAndReviews");


       
        return res.status(200).json({
            success : true,
            message : "Review deleted succesfully",
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

exports.showAllReviews = async (req , res) => {
    try{
        const {productId} = req.body;
        
        // find product and show all its review 
        const product = await Product.findById(productId).populate("ratingAndReviews").exec();
                                                
        
        console.log("product" , product);

        const reviews = product.ratingAndReviews;

        return res.status(200).json({
            success : true,
            message : "all reviews fetched successfully",
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
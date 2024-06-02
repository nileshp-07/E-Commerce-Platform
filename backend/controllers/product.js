const Product = require("../models/product");
const {uploadImageToCloudinary} = require("../utils/imageUploader")
const RatingAndReview = require("../models/ratingAndReviews");
const { User } = require("../models/user");
const Cart = require("../models/cart")
const {Category, SubCategory,SubSubCategory} = require("../models/category");
const { default: mongoose } = require("mongoose");


exports.addProduct = async (req , res) => {
    try{
        const {title , price, categories ,stocks, brand , discount,discountedPrice,specifications, description} = req.body;
        const {thumbnail , images} = req.files;
        const {id} = req.user;

        if(!title || !price || !categories || !stocks || !id  || !thumbnail ||!discountedPrice)
        {
            return res.status(404).json({
                success : false,
                message : "All fields are required"
            })
        }
        

        // productDetails should be jsonObject 
        const specificationJSON = JSON.parse(specifications);

        // now upload thumbnail image to cloudinary 
        const thumbnailUploadResponse = await uploadImageToCloudinary(thumbnail , process.env.FOLDER_NAME);

        const imagesUrls = [];

        for(const image of images)
        {
            const imageUploadResponse = await uploadImageToCloudinary(image , process.env.FOLDER_NAME);
            imagesUrls.push(imageUploadResponse.secure_url);
        }


        if(!thumbnailUploadResponse)
        {
            return res.status(403).json({
                success : false,
                message : "thumbnail could not be uploaded to cloudinary"
            })
        }
        
        const objIdCategories = categories.split(",").map(category => {
            if (!mongoose.Types.ObjectId.isValid(category)) {
                throw new Error('Invalid category ID format. Each category ID must be a 24 character hex string.');
            }
            return new mongoose.Types.ObjectId(category);
        });

        const product = await Product.create({
                                        title,
                                        price,
                                        categories : objIdCategories,
                                        stocks,
                                        brand,
                                        seller : id,
                                        discount,
                                        description,
                                        discountedPrice,
                                        specifications : specificationJSON,
                                        thumbnail : thumbnailUploadResponse.secure_url,
                                        images : imagesUrls
                                    })


       if(!product)
       {
         return res.status(406).json({
            success : false,
            message : "Product could not be created"
         })
       }


        //   now add the newProduct id in the sellers collection 
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


        // // upload image to cloudinary if exist 
        // if(req.files)
        // {
        //     const thumbnail = req.files.image;
        //     const uploadResponse = await uploadImageToCloudinary(thumbnail , process.env.FOLDER_NAME);
        //     product.thumbnail = uploadResponse.secure_url;
        // }

        // now ittrate to all the properties of productDetails and update accordingly 
        for(const key in updatedDetails)
        {
            if(key === "specifications")
            {
                product[key] = JSON.parse(updatedDetails[key]);
            }
            else if(key === "categories")
            {
                const newCategories = updatedDetails[key].split(",").map(category => {
                    return new mongoose.Types.ObjectId(category);
                });

                product[key] = newCategories;
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


exports.uploadProduct = async (req , res) => {
    try{
        const {title , price, categories,sellerId,thumbnail,images,stocks, brand , discountPercentage,discountedPrice, specifications } = req.body;
        // const {id} = req.user;
        // const thumbnail = req.files.image;
        

        if(!title || !price || !categories || !sellerId || !images  || !thumbnail || !discountedPrice || !specifications )
        {
            return res.status(404).json({
                success : false,
                message : "All fields are required"
            })
        }


        const mainCategory = categories['category'];
        const subCategory = categories['subCategory'];
        const subSubCategory = categories['subSubCategory'];

        let categoryID;
        let mainCategoryRes;
        let subCategoryRes;
        let subSubCategoryRes;


        mainCategoryRes = await Category.findOne({name: mainCategory});
        if(mainCategoryRes)
        {
            subCategoryRes = await SubCategory.findOne({name : subCategory});

            if(subCategoryRes)
            {
                subSubCategoryRes = await SubSubCategory.findOne({name : subSubCategory});

                if(subSubCategoryRes)
                {
                    categoryID = subSubCategoryRes._id;
                }
                else{
                    subSubCategoryRes = await SubSubCategory.create({
                                                                name : subSubCategory,
                                                                parentSubCategory : subCategoryRes._id
                                                            });

                    subCategoryRes.subSubCategories.push(subSubCategoryRes._id);
                    await subCategoryRes.save();
                    categoryID = subSubCategoryRes._id;
                }
            }
            else{
                subCategoryRes = await SubCategory.create({
                                                            name : subCategory,
                                                            parentCategory : mainCategoryRes._id
                                                        });

                mainCategoryRes.subCategories.push(subCategoryRes._id);
                await mainCategoryRes.save();

                subSubCategoryRes = await SubSubCategory.create({
                                                            name : subSubCategory,
                                                            parentSubCategory : subCategoryRes._id
                                                        })

                categoryID = subSubCategoryRes._id;
                subCategoryRes.subSubCategories.push(subSubCategoryRes._id)
                await subCategoryRes.save();
            }

        }
        else{
            mainCategoryRes = await Category.create({name : mainCategory});

            subCategoryRes = await SubCategory.create({
                name : subCategory,
                parentCategory : mainCategoryRes._id
            });

            mainCategoryRes.subCategories.push(subCategoryRes._id);
            await mainCategoryRes.save();


            subSubCategoryRes = await SubSubCategory.create({
                name : subSubCategory,
                parentSubCategory : subCategoryRes._id
            })

            categoryID = subSubCategoryRes._id;
            subCategoryRes.subSubCategories.push(subSubCategoryRes._id)
            await subCategoryRes.save();
        }

        // productDetails should be jsonObject 
        // const productDetailsJson = JSON.parse(specifications);

        const id = new mongoose.Types.ObjectId(sellerId);
       
        
        const product = await Product.create({
                                        title,
                                        price,
                                        categories : [categoryID],
                                        stocks,
                                        brand,
                                        seller : id,
                                        discount: discountPercentage,
                                        discountedPrice,
                                        specifications,
                                        thumbnail,
                                        images
                                    })


       if(!product)
       {
         return res.status(406).json({
            success : false,
            message : "Product could not be created"
         })
       }

       subSubCategoryRes.products.push(product._id);
       await subSubCategoryRes.save();


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


exports.fetchAllProducts = async (req , res) => {
    try{
        const products = await Product.find({})
                                        .populate("categories")
                                        .populate("seller")
                                        .populate("ratingAndReviews")
                                        .exec();


        if(!products)
        {
            return res.status(404).json({
                success : false,
                message: "Could fetched products"
            })
        }


        return res.status(200).json({
            success : true,
            message : "products fetched successfully",
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


exports.getProductFullDetails = async (req, res) => {
     try{
        const { productId } = req.query;

        
        // const id = new mongoose.Types.ObjectId(productId);

        const productDetails = await Product.findById(productId)
                                                        .populate("categories")
                                                        .populate({
                                                            path : "ratingAndReviews",
                                                            populate: {
                                                                path : "user"
                                                            }
                                                        })
                                                        .populate({
                                                            path : "seller",
                                                            populate: {
                                                                path : "profileDetails",
                                                            }
                                                        })
                                                        .exec();


        if(!productDetails)
        {
            return res.status(404).json({
                success : false,
                message : "Product detail could not be fetched"
            })
        }


        return res.status(200).json({
            success :true,
            message : "Product detail fetched successfully",
            productDetails
        })

     }
     catch(error)
     {

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
        const deletedWishlists = await User.updateMany(
                                                { wishlists: productId }, // Only update documents where productId exists in the wishlists array
                                                { $pull: { wishlists: productId } }, // Pull the productId from the wishlists array
                                                { new: true }
                                            )
                                           .populate({
                                            path : "wishlists",
                                            populate : {
                                                path : "categories"
                                             }
                                           }).exec();


        
        // products from seller
        const updateSeller = await User.findByIdAndUpdate(id,{
                                                            $pull : {
                                                                products : productId
                                                            }
                                                        },
                                                        {new : true})

        // cart 
        const cart = await Cart.updateMany(
                                            { "products.productId": productId }, // Update documents where productId exists in the products array
                                            { $pull: { products: { productId: productId } } }, // Pull the productId from the products array
                                            { new: true }
                                        ).populate("products.productId").exec();

        
        // now delete the product  
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if(!deletedProduct)
        {
            return res.status(401).json({
                success: false,
                message : "Product could not be deleted"
            })
        }


        const updatedCart = await Cart.findOne({user : id})
                                                .populate("products.productId").exec();

        const user = await User.findById(id)
                                        .populate({
                                            path : "wishlists",
                                            populate : {
                                                path : "categories"
                                            }
                                        }).exec();

        return res.status(200).json({
            success : true,
            message : "Product deleted successfully",
            updatedCart,
            updatedWishlists:user.wishlists
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


exports.getHomePageProducts = async (req , res) => {
    try{
        const bestDealsProducts = await Product.find()
                                                .populate("categories")
                                                .sort({ discount: -1 })
                                                .limit(10)
                                                .exec();


        const bestSellingProducts = await Product.find()
                                                .populate("categories")
                                                .sort({ sold: -1 })
                                                .limit(10)
                                                .exec();

                                                
        if(!bestSellingProducts || !bestDealsProducts)
        {
            return res.status(404).json({
                success : false,
                message  : "Home pages products could not be fetched"
            })
        }

        return res.status(200).json({
            success : true,
            message : "all homePage product fetched successfully",
            data : {
                bestDealsProducts,
               bestSellingProducts
            }
        })
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({
            success  : false,
            message : "Error while fetching homepage products"
        })
    }
}


exports.searchProducts = async (req , res) => {
    try{
        const {searchQuery, filters, sortOption} = req.body;

        let query = {};

        // applying filters 
        if(filters.brands && filters.brands.length > 0)
        {
            query.brand = {$in: filters.brands}
        }

        if(filters.cusRating)
        {
            query.avgRating = {$gte: filters.cusRating}
        }

        if(filters.discount)
        {
            query.discount = { $gte: filters.discount}
        }

        if(filters.minPrice)
        {
            query.price = {$gte: filters.minPrice}
        }

        if(filters.maxPrice)
        {
            query.discountedPrice = {$lte : filters.maxPrice}
        }

        // searcQuery 
        if(searchQuery)
        {
            const searchTerms = searchQuery.split(" ").map(term => `(?=.*${term})`).join("");
            query.title = { $regex: `^${searchTerms}`, $options: 'i' };
            // query.brand = { $regex: `^${searchTerms}`, $options: 'i' };
            // query.brand = { $regex: `^${searchTerms}`, $options: 'i' };
        }


        // sortOptions 
        let sort = {};
        switch (sortOption) {
            case "highest_rated":
                sort = { avgRating: -1 };
                break;
            case "lowest_price":
                sort = { discountedPrice: 1 };
                break;
            case "highest_price":
                sort = { discountedPrice: -1 };
                break;
            case "newest_first":
                sort = { createdAt: -1 };
                break;
            case "most_discounted":
                sort = { discount: -1 };
                break;
            // case "popularity":
            //     sort = { sold: -1 }; // Assuming 'sold' is the field indicating popularity
            //     break;
            default:
                break;
        }


        // now search the product 
        const products = await Product.find(query).sort(sort);

        if(!products)
        {
            return res.status(404).json({
                success : false,
                message : "products does not found"
            })
        }

        let filtersData = {};

        // if(!filters && !sortOption)
        // {
            let brands = [];
            let minPrice = products?.[0]?.discountedPrice;
            let maxPrice = products?.[0]?.price;
            // let locations = [];
            products.forEach((product) => {
                if(!brands.includes(product.brand))
                {
                    brands.push(product.brand);
                }
                // if(!locations.includes(product.seller.profileDetails.addresses[0]))
                // {
                //     locations.push(product.seller.profileDetails.addresses[0]);
                // }
                minPrice = Math.min(minPrice , product.discountedPrice)
                maxPrice = Math.max(maxPrice , product.price)
            })

            filtersData["minPrice"]= minPrice;
            filtersData["maxPrice"]  = maxPrice;
            filtersData["brands"] = brands;
            // filtersData["locations"] = locations;
        // }

        return res.status(200).json({
            success : true,
            message : "products has been returned based on the search options",
            products,
            filtersData
        })
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({
            success  : false,
            message : "Error while searching the products"
        })
    }
}


exports.getRelatedProducts = async (req, res) =>{
    try{
        // const {categoryId, brand} = req.body;

        // const query = {};
        // if (brand && categoryId) {
        //     query.$or = [{ brand }, { categories: { $in: [categoryId] } }];
        // } else if (brand) {
        //     query.brand = brand;
        // } else if (categoryId) {
        //     query.categories = { $in: [categoryId] };
        // }

        // const relatedProducts = await Product.find(query);

        const {categoryId} = req.body;

        const relatedProducts =await Product.find({ categories: categoryId });

        return res.status(200).json({
            success : true,
            message : "Related Product returned",
            relatedProducts
        })
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({
            success  : false,
            message : "Error while searching the products"
        })
    }
}
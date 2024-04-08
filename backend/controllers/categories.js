const {Category} = require("../models/category");

exports.createCategory = async (req , res) => {
   try{
        const {name , parentCategory} = req.body;

        // ensure that the category name should not be exist 
        const category = await Category.findOne({name: name});

        if(category)
        {
            return res.status(403).json({
                success : false,
                message : "Category with this name already exist"
            })
        }


        // if category does not exist then create 
        const newCategory = await Category.create({
                                                  name,
                                                  parentCategory,
                                                  subCategories : []
                                            })


        
        if(!newCategory)
        {
            return res.status(400).json({
                success : false,
                message : "new Category could not be created"
            })
        }

        // if parentCategory is given then push the new category as the subCategory of parentCategory
        if(parentCategory)
        {
            await Category.findByIdAndUpdate(parentCategory, {
                                                $push : {
                                                    subCategories : newCategory._id
                                                }
                                            })
        } 



        return res.status(200).json({
            success : true,
            message : "new category created successfully",
            newCategory,
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

exports.getAllCategories = async (req , res) => {
    try{
        const categories = await Category.find({})
                                                .populate({
                                                    path : "subCategories",
                                                    populate : {
                                                        path : "subSubCategories"
                                                    }
                                                })
                                                .exec();

        if(!categories)
        {
            return res.status(404).json({
                success : false,
                message : "Categories could not found"
            })   
        }

        return res.status(200).json({
            success : true,
            message : "all categories fetched",
            categories
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



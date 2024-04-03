const mongoose = require("mongoose");

const SubSubCategorySchema = new mongoose.Schema({
    name : String,
    parentSubCategory : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "SubCategory"
    },
    products : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product"
    }]
})


const SubCategorySchema = new mongoose.Schema({
    name : String,
    subSubCategories : [SubSubCategorySchema],
    parentCategory : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"
    }
})

const CategorySchema = new mongoose.Schema({
    name : String,
    subCategories : [SubCategorySchema]
})


const Category = mongoose.model('Category' , CategorySchema);
const SubCategory = mongoose.model('SubCategory' , SubCategorySchema);
const SubSubCategory = mongoose.model('SubSubCategory' , SubSubCategorySchema);

module.exports = {
    Category,
    SubCategory,
    SubSubCategory
}
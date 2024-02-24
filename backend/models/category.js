const mongoose = require("mongoose");


const categorySceham = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    parentCategory : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"
    },
    subCategories : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category"
    }]
})

const Category = mongoose.model("Category" , categorySceham);
module.exports = Category;
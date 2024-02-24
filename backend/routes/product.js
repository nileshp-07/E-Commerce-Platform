const express = require("express");
const router = express.Router();
const {auth} = require("../middlewares/auth");

const {
    createCategory
} = require("../controllers/categories");


const {
    addProduct,
    editProductDetails,
    deleteProduct
} = require("../controllers/product")


// #################################### Categories Routes ###################################
router.post("/create-category" ,auth, createCategory);



// #################################### product Routes ###################################
router.post("/add-product" , auth , addProduct);
router.put("/edit-product-details", auth , editProductDetails);
router.delete("/delete-product", auth , deleteProduct);



module.exports = router;

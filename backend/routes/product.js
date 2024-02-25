const express = require("express");
const router = express.Router();
const {auth, isSeller , isBuyer} = require("../middlewares/auth");

const {
    createCategory
} = require("../controllers/categories");


const {
    addProduct,
    editProductDetails,
    deleteProduct,
    getProductFullDetails
} = require("../controllers/product")


// #################################### Categories Routes ###################################
router.post("/create-category" ,auth, isSeller, createCategory);



// #################################### product Routes ###################################
router.post("/add-product" , auth, isSeller , addProduct);
router.put("/edit-product-details", auth, isSeller , editProductDetails);
router.delete("/delete-product", auth, isSeller , deleteProduct);
router.get("/product-details" , getProductFullDetails);



module.exports = router;

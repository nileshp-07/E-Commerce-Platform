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

const {
    writeReview,
    deleteReview,
    showAllReviews
} = require("../controllers/review")

// #################################### Categories Routes ###################################
router.post("/create-category" ,auth, isSeller, createCategory);



// #################################### product Routes ###################################
router.post("/add-product" , auth, isSeller , addProduct);
router.put("/edit-product-details", auth, isSeller , editProductDetails);
router.delete("/delete-product", auth, isSeller , deleteProduct);
router.get("/product-details" , getProductFullDetails);


// #################################### Reviews Routes ###################################
router.post("/create-review" , auth , isBuyer , writeReview);
router.delete("/delete-review" , auth , isBuyer , deleteReview);
router.get("/all-reviews" , auth , showAllReviews);


module.exports = router;

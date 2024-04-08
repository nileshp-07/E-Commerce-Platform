const express = require("express");
const router = express.Router();
const {auth, isSeller , isBuyer} = require("../middlewares/auth");

const {
    createCategory,
    getAllCategories
} = require("../controllers/categories");


const {
    addProduct,
    editProductDetails,
    deleteProduct,
    uploadProduct,
    fetchAllProducts,
    getProductFullDetails,
    getHomePageProducts,
    searchProducts,
} = require("../controllers/product")

const {
    writeReview,
    deleteReview,
    showAllReviews
} = require("../controllers/review")

// #################################### Categories Routes ###################################
router.post("/create-category" ,auth, isSeller, createCategory);
router.get("/get-all-categories", getAllCategories);



// #################################### product Routes ###################################
// router.post("/add-product" , auth, isSeller , addProduct);
router.put("/edit-product-details", auth, isSeller , editProductDetails);
router.delete("/delete-product", auth, isSeller , deleteProduct);
router.get("/get-all-products", fetchAllProducts);
router.get("/get-product-details", getProductFullDetails);
router.post("/add-product", uploadProduct);
router.get("/home-page-products", getHomePageProducts);
router.post("/search-products", searchProducts);



// #################################### Reviews Routes ###################################
router.post("/create-review" , auth , isBuyer , writeReview);
router.delete("/delete-review" , auth , isBuyer , deleteReview);
router.get("/all-reviews" , auth , showAllReviews);


module.exports = router;

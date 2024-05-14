const express = require("express");
const router = express.Router();
const {auth, isBuyer, isSeller} = require("../middlewares/auth")

const {
    changePassword,
    editProfileDetails,
    changeProfileImage,
    getUserFullDetails,
    getSellerProducts,
    deleteAccount,
    wantToBecomeSeller,
    getOrderFullDetails,
    getBuyersAllOrders,
    getSellersAllOrders,
    updateDeliveryStatus,
    getSellerDashboardInfo
} = require("../controllers/profile");

const {
    addAddress,
    editAddress,
    deleteAddress,
    getUserAllAddresses
} = require("../controllers/address")

const {
    addProductToWishlists,
    removeProductFromWishlists,
    getWishlistsProducts
} = require("../controllers/wishlists");

const {
    addProductToCart,
    removeProductFromCart,
    getCartItems
} = require("../controllers/cart");


// #################################### Profile Routes ###################################

router.post("/change-password" ,auth, changePassword);
router.put("/edit-profile-details",auth, editProfileDetails);
router.put("/change-profile-image",auth, changeProfileImage);
router.get("/get-user-details", auth , getUserFullDetails);
router.get("/get-seller-products", auth, isSeller, getSellerProducts);
router.delete("/delete-account", auth, isBuyer , deleteAccount)
router.post("/become-seller", auth, isBuyer , wantToBecomeSeller)
router.post("/buyers-orders", auth,isBuyer, getBuyersAllOrders)
router.post("/sellers-orders", auth,isSeller , getSellersAllOrders)
router.post("/get-orders-full-details", auth, getOrderFullDetails)
router.post("/update-delivery-status", auth, isSeller , updateDeliveryStatus);
router.get("/seller-dashboard-info", auth, isSeller, getSellerDashboardInfo)



// #################################### Address Routes ###################################

router.post("/add-address",auth, addAddress);
router.put("/edit-address",auth, editAddress);
router.delete("/delete-address",auth, deleteAddress);
router.get("/show-all-address", auth , getUserAllAddresses);


// #################################### wishlists Routes ###################################

router.post("/add-to-wishlists", auth, addProductToWishlists);
router.post("/remove-from-wishlists", auth , removeProductFromWishlists);
router.post("/wishlists-products" , auth , getWishlistsProducts);


// #################################### cart Routes ###################################

router.post("/add-to-cart", auth, addProductToCart);
router.post("/remove-from-cart", auth , removeProductFromCart);
router.post("/cart-products" , auth , getCartItems);


module.exports  = router;
const express = require("express");
const router = express.Router();
const {auth, isBuyer} = require("../middlewares/auth")

const {
    changePassword,
    editProfileDetails,
    changeProfileImage,
    getUserFullDetails
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



// #################################### Address Routes ###################################

router.post("/add-address",auth, addAddress);
router.put("/edit-address",auth, editAddress);
router.delete("/delete-address",auth, deleteAddress);
router.get("/show-all-address", auth , getUserAllAddresses);


// #################################### wishlists Routes ###################################

router.post("/add-to-wishlists", auth, isBuyer, addProductToWishlists);
router.post("/remove-from-wishlists", auth , isBuyer, removeProductFromWishlists);
router.post("/wishlists-products" , auth , isBuyer , getWishlistsProducts);


// #################################### cart Routes ###################################

router.post("/add-to-cart", auth, isBuyer, addProductToCart);
router.post("/remove-from-cart", auth , isBuyer, removeProductFromCart);
router.post("/cart-products" , auth , isBuyer , getCartItems);


module.exports  = router;
const express = require("express");
const router = express.Router();
const {auth} = require("../middlewares/auth")

const {
    changePassword,
    editProfileDetails,
    changeProfileImage,
    addAddress,
    editAddress,
    deleteAddress
} = require("../controllers/profile");


router.post("/change-password" ,auth, changePassword);
router.put("/edit-profile-details",auth, editProfileDetails);
router.put("/change-profile-image",auth, changeProfileImage);
router.post("/add-address",auth, addAddress);
router.put("/edit-address",auth, editAddress);
router.delete("/delete-address",auth, deleteAddress);


module.exports  = router;
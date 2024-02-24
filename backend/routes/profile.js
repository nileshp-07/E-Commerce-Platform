const express = require("express");
const router = express.Router();
const {auth} = require("../middlewares/auth")

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

module.exports  = router;
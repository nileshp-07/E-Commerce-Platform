const express = require("express");
const router = express.Router();


const {
   sendOtp,
   login,
   signUp
} = require("../controllers/auth");



// #################################### Authentication Routes ###################################

router.post("/send-otp" , sendOtp);
router.post("/signup" , signUp);
router.post("/login" , login);





// Export the router for use in the main application
module.exports = router
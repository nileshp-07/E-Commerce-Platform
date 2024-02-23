const express = require("express");
const router = express.Router();


const {
   sendOtp,
   login,
   signUp,
   generateResetPasswordToken,
   resetPassword
} = require("../controllers/auth");



// #################################### Authentication Routes ###################################

router.post("/send-otp" , sendOtp);
router.post("/signup" , signUp);
router.post("/login" , login);

// reset password 
router.post("/reset-password-token", generateResetPasswordToken);
router.post("/reset-password", resetPassword);




// Export the router for use in the main application
module.exports = router
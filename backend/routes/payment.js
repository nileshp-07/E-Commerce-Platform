const express = require("express");
const router = express.Router();
const {auth, isSeller , isBuyer} = require("../middlewares/auth");

const {
    buyProducts
} = require("../controllers/payment")



router.post("/buy-products",  auth, buyProducts);


module.exports = router;
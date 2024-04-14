const express = require("express");
const router = express.Router();
const {auth, isSeller , isBuyer} = require("../middlewares/auth");

const {
    buyProducts,
    createOrder
} = require("../controllers/payment")



router.post("/buy-products",  auth, buyProducts);
router.post("/create-order",  auth, createOrder);


module.exports = router;
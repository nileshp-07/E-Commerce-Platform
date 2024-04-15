const express = require("express");
const app = express();
const {connectDB} = require("./config/database")
const {connectCloudinary} = require("./config/cloudinary");
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser");
const cors = require("cors")

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const productRoutes = require("./routes/product");
const paymentRoutes = require("./routes/payment");

require("dotenv").config();
const PORT = process.env.PORT || 4000;


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


app.post("/v1/webhook_endpoints", async(req , res) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    console.log(`Unhandled event type ${event.type}`);

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).json({
        success : true,
    })
})


// connect to database 
connectDB();
// connect to clodinary 
connectCloudinary();


// defining middlewares 
app.use(express.json());
app.use(cookieParser());
app.use(
    fileUpload({
        useTempFiles : true,
        tempFileDir : '/tmp/'
    })
)
app.use(
    cors({
        origin : "*",
        credentials : true
    })
)

// defining the routess 
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/product",productRoutes );
app.use("/api/v1/payment", paymentRoutes)



// default routes 
app.get("/" , (req , res) => {
    return res.json({
        success : true,
        message : "Server Started Successfully"
    })
})


// start the server the port 
app.listen(PORT , () => {
    console.log(`Server is started at port ${PORT}`);
})





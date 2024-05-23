const express = require("express");
const app = express();
const {connectDB} = require("./config/database")
const {connectCloudinary} = require("./config/cloudinary");
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser");
const cors = require("cors")
const session = require("express-session")

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const productRoutes = require("./routes/product");
const paymentRoutes = require("./routes/payment");


require("dotenv").config();
const PORT = process.env.PORT || 4000;


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


// app.post("/webhook",express.raw({type: 'application/json'}) ,async(req , res) => {

//     console.log("Testing");
//     const sig = request.headers['stripe-signature'];

//     let event;

//     try {
//         event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
//     } catch (err) {
//         console.log(err.message);
//         return res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     // Handle the event
//     console.log(`Unhandled event type ${event.type}`);
//     console.log(`Unhandled event data ${event.data.object}`);
//     console.log(`Unhandled event object id ${event.data.object.id}`);

//     // Return a 200 response to acknowledge receipt of the event
//     res.status(200).json({
//         success : true,
//     })
// })



// This is your Stripe CLI webhook secret for testing your endpoint locally.
app.use(session({
  secret: 'einal39hadmai29hfnma', // Replace with a long, random string
  resave: false,
  saveUninitialized: true,
}));


app.post('/webhook', express.raw({ type: 'application/json' }),(request, response) => {
  const sig = request.headers['stripe-signature'];
  consolo.log("testing....");


  let event;

  try {
    const rawBody = request.body.toString('utf8');
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  console.log("Event", event);
  console.log("Event-type", event.type);
  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      const orderDetails = request.session.orderDetails;
      if (!orderDetails) {
        console.log('Order details not found in session');
      }

      // Process order (e.g., create order in your system, send confirmation emails)
      console.log('Order details:', orderDetails);

      // Clear session data after processing
      delete req.session.orderDetails;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});


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





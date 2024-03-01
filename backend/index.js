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

require("dotenv").config();
const PORT = process.env.PORT || 4000;


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
        origin : "http://localhost:3000",
        credentials : true
    })
)

// defining the routess 
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/product",productRoutes );
// app.use("/api/v1/payment")



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





const express = require("express");
const app = express();
const {connectDB} = require("./config/database")
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const fileUpload = require("express-fileupload")

require("dotenv").config();
const PORT = process.env.PORT || 4000;


// connect to database 
connectDB();

// defining middlewares 
app.use(express.json());

app.use(
    fileUpload({
        useTempFiles : true,
        tempFileDir : '/tmp/'
    })
)


// defining the routess 
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile",profileRoutes);
// app.use("/api/v1/product")
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





const express = require("express");
const app = express();
const {connectDB} = require("./config/database")

require("dotenv").config();
const PORT = process.env.PORT || 4000;


// connect to database 
connectDB();

// defining middlewares 
app.use(express.json());


// defining the routess 
// app.use("/api/v1/auth")
// app.use("/api/v1/product")
// app.use("/api/v1/profile")
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





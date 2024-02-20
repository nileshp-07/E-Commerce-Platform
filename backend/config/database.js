const mongoose = require("mongoose");

require('dotenv').config();

exports.connectDB = () => {
    mongoose.connect(process.env.DB_URL)
    .then(() => console.log("Database Connected Successfully"))
    .catch((error) => {
        console.log("Database connection failed")
        console.error(error);
        process.exit(1);   //it will forcefully stop the node.js process whenver the db faild to connect
    })
}



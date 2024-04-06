const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

exports.auth = async (req , res, next) => {
    try{
        // fetch the token first -> (make sure to install cookie-parser if fetching the token from cookies)
        const token = req.cookies.token ||
                      req.body.token  ||
                      req.header("Authorization").replace("Bearer ", "");
                                

        // const header = req.header["authorization"];

        // if(!header)
        // {
        //     return res.status(404).json({
        //         success : false,
        //         message : "user is unauthorized"
        //     })
        // }

        if(!token)
        {
            return res.status(401).json({
                success : false,
                message : "token is missing"
            })
        }


        try{
            const decodedPayload = jwt.verify(token , process.env.JWT_SECRET);
            console.log("user payload : ", decodedPayload);
            req.user = decodedPayload;
        }
        catch(error)
        {
            console.log(error);
            return res.status(401).json({
                success : false,
                message : "Token Expired, Please login again!!"
            })
        }

        next();
    }
    catch(error)
    {
        console.log(error);
        return res.status(401).json({
            success : false,
            message : error.message
        })
    }
}


exports.isBuyer = async (req , res, next) => {
    try{
        const {email} = req.user;

        const user = await User.findOne({email});

        if(user.isSeller)
        {
            return res.status(401).json({
                success : false,
                message : "this protected route is for buyers only"
            })
        }

        next();
    }
    catch(error)
    {
        console.log(error);
        return res.status(401).json({
            success : false,
            message : error.message
        })
    }
}


exports.isSeller = async (req , res, next) => {
    try{
        const {email} = req.user;

        const user = await User.findOne({email});

        if(!user.isSeller)
        {
            return res.status(401).json({
                success : false,
                message : "this protected route is for sellers only"
            })
        }

        next();
    }
    catch(error)
    {
        console.log(error);
        return res.status(401).json({
            success : false,
            message : error.message
        })
    }
}
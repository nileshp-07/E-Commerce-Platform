const jwt = require("jsonwebtoken");
const { default: User } = require("../models/user");

exports.auth = async (req , res, next) => {
    try{
        // console.log(req.header)
        // fetch the token first 
        // const token = req.body?.token || 
        //               req.cookies.token || 
        //               req.header("Authorization").replace("Bearer ", "");


        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZDhjZjc0ZWQ4NzdiMDAyMDAxODFlZiIsImVtYWlsIjoicG44MTIwMTg5NTlAZ21haWwuY29tIiwiaWF0IjoxNzA4NzA4Mzc0LCJleHAiOjE3MDg3NTE1NzR9.yzmMjbxr-cU1HvqGK3Duet5UH05zpgf4OfKe240J6Ow";

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
                message : "invalid token"
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


exports.isBuyer = async (req , res) => {
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


exports.isSeller = async (req , res) => {
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
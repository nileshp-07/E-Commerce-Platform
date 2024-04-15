const OTP = require("../models/otp");
const {User} = require("../models/user");
const Profile = require("../models/profile");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const mailSender = require("../utils/mailSender");
const Cart = require("../models/cart");


exports.sendOtp = async (req, res) => {
    try {
        const {email} = req.body;

        // check if user is already exist 
        const user = await User.findOne({email});

        if(user)
        {
            return res.status(401).json({
                success : false,
                message :"user already registered"
            })
        }


        // generate the otp 
        const otp = otpGenerator.generate(6 , {upperCaseAlphabets: false, 
                                               lowerCaseAlphabets : false, 
                                               specialChars : false})

        
        
        // store the otp
        const otpResponse = await OTP.create({otp , email});
        
        console.log("otp response : ", otpResponse);


        return res.status(200).json({
            success : true,
            message : "OTP sent successfully"
        })
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


exports.signUp = async (req , res) => {
    try{
        const {name , email , password , confirmPassword , otp} = req.body;

        // validation 
        if(!name || !email || !password || !confirmPassword || !otp)
        {
            return res.status(402).json({
                success : false,
                message : "All fields are required"
            })
        }


        // check if user is already registered 
        const userExists = await User.findOne({email});

        if(userExists){
            return res.status(401).json({
                success : false,
                message : "User already registered"
            })
        }


        // ensures that password and confirmPassword should be match 
        if(password !== confirmPassword){
            return res.status(401).json({
                success : false,
                message : "Password and confirmPassword are not same"
            })
        }

        // the user might be created more than one otp so we have to find the most recentotp by createdAt and return the only one recent otp 
        const recentOtp = await OTP.find({email}).sort({createdAt : -1}).limit(1);

        // if otp not found or expired 

        console.log("recentOtp : " ,recentOtp)
        if(recentOtp.length === 0 ) 
        {
            return res.status(404).json({
                success : false,
                message : "OTP Expired"
            })
        }



        // check if otp matched with recent otp 
        if(otp !== recentOtp[0].otp)
        {
            return res.status(401).json({
                success : false,
                message : "OTP does not matched"
            })
        }


        // now hash the password 
        const hashedPassword =await bcrypt.hash(password , 10);



        // now create a profile document for user 
        const profileDetail = await Profile.create({
                                        gender : null,
                                        dateOfBirth : null,
                                        contactNumber :null,
                                        bio : null,
                                        addresses : null
                                    });


        // now create the entry for user 
        const user = await User.create({
            name ,
            email ,
            password: hashedPassword,
            profileDetails : profileDetail._id,
            profileImage : `https://api.dicebear.com/5.x/initials/svg?seed=${name}`   //an api to fetch the image by user's first and last name
        })


        // now create a cart for user 
        const cart = await Cart.create({
                                    user: user._id,
                                    products : [],
                                });

        console.log("CART : ", cart);


        return res.status(200).json({
            success : true,
            message : "user registered successfully"
        })
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


exports.login = async (req, res) => {
    try{
        const {email , password} = req.body;

        // validation 
        if(!email || !password)
        {
            return res.status(401).json({
                success : false,
                message : "All fields are required"
            })
        }

        // check if user is registered or not 
        const user = await User.findOne({email: email})
                                                    .populate("profileDetails")
                                                    .populate("addresses")
                                                    .populate("wishlists")
                                                    .exec();

        if(!user)
        {
            return res.status(404).json({
                success : false,
                message : "User is not registered"
            })
        }


        // compair the password with hashedPassword 
        if(await bcrypt.compare(password , user.password))
        {
            // means user is authenticated , now create a jwt token
            const payload = {
                id : user._id,
                email : user.email,
                role : user.role
            }

            // create token 
            const token = jwt.sign(payload , 
                                   process.env.JWT_SECRET, 
                                   {expiresIn : "7d"});


            // now find the cart 
            const cartItems = await Cart.findOne({user: user._id})
                                                    .populate("products.productId")
                                                    .exec();

            
            user.token = token,
            user.password = undefined;

            // now create the options for cookie 
            const options = {
                expires : new Date(Date.now() + 5*24*60*60*1000),
                httpOnly : true
            }

            res.cookie("token" ,token ,options).status(200).json({
                success : true,
                message : "User logged in successfully",
                token, 
                user,
                cartItems,
                wishlists : user.wishlists
            })
        }
        else{
            return res.status(402).json({
                success : false,
                message : "Password is incorrect, please try again"
            })
        }
    }
    catch(error){
        console.log(error);
        return res.status(401).json({
            success : false,
            message : error.message
        })
    }
}


exports.generateResetPasswordToken = async (req , res) => {
    try{
        const {email} = req.body;

        // check if user is registered or not
        const user = await User.findOne({email});

        if(!user)
        {
            return res.status(404).json({
                success : false,
                message : "User not found , please registered first"
            })
        }

        // generate a reset password token 
        const token = crypto.randomUUID();


        // store the token into DB
        user.resetPasswordToken = token;
        await user.save()


        // now generate a frontend url and send it to the mail 
        const url = `https://ecommerce-platform-nileshp07.vercel.app/reset-password/${token}`;


        const mailResponse = await mailSender(user.email , "Reset Password Link", `click on the link belowed to reset your password\n Reset password link - ${url}`);


        console.log("reset passoword token mail response : ", mailResponse);


        return res.status(200).json({
            success : true,
            message : "Reset password token has been sent successfully"
        })
    }
    catch(error)
    {
        return res.status(402).json({
            success : false,
            message : "Password is incorrect, please try again"
        })
    }
}


exports.resetPassword = async (req , res) => {
    try{
        const {password , confirmPassword , token} = req.body;

        // validation 
        if(!password || !confirmPassword || !token)
        {
            return res.status(402).json({
                success : false,
                message : "All fields are required"
            })
        }


        // check if token is valid or not 
        const user = await User.findOne({resetPasswordToken: token});

        if(!user)
        {
            return res.status(401).json({
                success : false,
                message  : "Invalid token"
            })
        }


        // password validation 
        if(password !== confirmPassword)
        {
            return res.status(403).json({
                success : false,
                message: "password and confirm Password are mismatched"
            })
        }


        // all these are good, now hashed the password  
        const hashedPassword = await bcrypt.hash(password , 10);

        // and now update the user 
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            success : true,
            message: "password has been updated successfully"
        })
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
const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender")

const optSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    otp : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now(),
        expires : 5*60
    }
});


const sendOtpVerificationMail = async (email , otp) => {
  try{

    const mailResponse = await mailSender(email ,"Email Verification", `enter this otp to verify your email ${otp}`);

    // console.log("Verification mail sent successfully : ", mailResponse);

  }
  catch(error)
  {
    console.log("Something went wrong while sending verification otp mail");
    console.error(error.message);
    throw error;
  }
}


// defining a pre middleware to send the verification email before creating user's entry to the database 
optSchema.pre("save" , async function (next){
    // Only send an email when a new document is created
    if(this.isNew){
        await sendOtpVerificationMail(this.email , this.otp)
    }

    next();   //to automatically process the next defined middleware
})



const OTP = mongoose.model("OTP" , optSchema);
module.exports = OTP;



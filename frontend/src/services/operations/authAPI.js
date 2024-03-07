import {toast} from "sonner"
import {apiConnector} from "../apiConnector"
import { authEndPoints } from "../apis";


const {
    SEND_OTP_API,
    SIGNUP_API,
    LOGIN_API,
    GENERATE_RESET_PASSWORD_TOKEN_API,
    RESET_PASSWORD_API
} = authEndPoints;

export const sendOtp = async (email , navigate) => {
    const toastId = toast.loading("loading..");
    try{
        console.log(email);
        const response = await apiConnector("POST", SEND_OTP_API , {email});

        console.log("SEND OTP API RESPONSE : ", response);

        if(!response.data.success)
        {
            throw new Error(response.data.message);
        }

        toast.success('otp sent successfully')

        navigate("/verify-otp");
        
    }
    catch(error)
    {
        console.log("SEND OTP API ERROR", error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
}


export const signup = async ({name , email , password, confirmPassword},otp, navigate) => {
    console.log("DATA : ",name, email, password , confirmPassword , otp);
    const toastId = toast.loading("loading...");

    try{
        const response = await apiConnector("POST", SIGNUP_API , {name , email, password , confirmPassword, otp});

        console.log('SIGNUP API RESPONSE : ',response);

        if(!response.data.success)
        {
            throw new Error(response.data.message);
        }

        toast.success("Registered Successfully");

        navigate("/login")
    }
    catch(error)
    {
        console.log("SIGNUP API ERROR : ", error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
}
import {toast} from "sonner"
import {apiConnector} from "../apiConnector"
import { authEndPoints } from "../apis";
import { setToken, setUser } from "../../redux/slices/userSlice";


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


export const login = async (email , password , navigate, dispatch) => {
    const toastId = toast.loading("loading...");
    try{
        const response = await apiConnector("POST", LOGIN_API, {email , password});

        console.log("LOGIN API RESPONSE : ", response);

        if(!response.data.success)
        {
            throw new Error(response.data.message);
        }

    
        // set user and token to store and localStorage 
        dispatch(setToken(response.data.token));
        dispatch(setUser(response.data.user));
        localStorage.setItem("token" , JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.user));

        if(response?.data?.cartItems)
        localStorage.setItem("cartItems", JSON.stringify(response.data?.cartItems?.products));

        if(response?.data?.wishlists)
        localStorage.setItem("wishlists", JSON.stringify(response.data.wishlists));

        toast.success("Login successfully");

        navigate("/");
    }
    catch(error)
    {
        console.log("LOGIN API ERROR : ",error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
}


export const sendResetPasswordToken = async (email , setMailSent)  => {
    const toastId = toast.loading("loading...");
    try{
        const response = await apiConnector("POST", GENERATE_RESET_PASSWORD_TOKEN_API , {email});

        console.log("GENERATE RESET PASSWORD TOKEN API RESPONSE: ", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        setMailSent(true);

        toast.success("Mail has been sent");

    }
    catch(error)
    {
        console.log("GENERATE RESET PASSWORD TOKEN API ERROR : ",error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
}


export const resetPassword = async (password , confirmPassword,token, navigate) => {
    const toastId = toast.loading("loading...");
    try{
        console.log("token: ", token);
        const response = await apiConnector("POST", RESET_PASSWORD_API , {password , confirmPassword, token});

        console.log('RESET PASSWORD API RESPONSE  : ', response);

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        toast.success("password updated");

        navigate("/login")
    }
    catch(error)
    {
        console.log("RESET PASSWORD API ERROR : ",error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
}
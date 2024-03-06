const BASE_URL = process.env.REACT_APP_BASE_URL


// auth EndPoints
export const authEndPoints = {
    SEND_OTP_API : BASE_URL + "/send-otp" ,
    SIGNUP_API : BASE_URL + "/signup",
    LOGIN_API : BASE_URL + "/login",
    GENERATE_RESET_PASSWORD_TOKEN_API: BASE_URL + "reset-password-token" ,
    RESET_PASSWORD_API: BASE_URL + "/reset-password",
}



const BASE_URL = process.env.REACT_APP_BASE_URL


// auth EndPoints
export const authEndPoints = {
    SEND_OTP_API : BASE_URL + "/auth/send-otp" ,
    SIGNUP_API : BASE_URL + "/auth/signup",
    LOGIN_API : BASE_URL + "/auth/login",
    GENERATE_RESET_PASSWORD_TOKEN_API: BASE_URL + "/auth/reset-password-token" ,
    RESET_PASSWORD_API: BASE_URL + "/auth/reset-password",
}



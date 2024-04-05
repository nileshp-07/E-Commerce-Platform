const BASE_URL = process.env.REACT_APP_BASE_URL


// auth EndPoints
export const authEndPoints = {
    SEND_OTP_API : BASE_URL + "/auth/send-otp" ,
    SIGNUP_API : BASE_URL + "/auth/signup",
    LOGIN_API : BASE_URL + "/auth/login",
    GENERATE_RESET_PASSWORD_TOKEN_API: BASE_URL + "/auth/reset-password-token" ,
    RESET_PASSWORD_API: BASE_URL + "/auth/reset-password",
}


export const profileEndPoints = {
    CHANGE_PASSWORD_API : BASE_URL + "/profile/change-password",
    CHANGE_PROFILE_IMAGE : BASE_URL + "/profile/change-profile-image",
    UPDATE_PROFILE_DETAILS_API : BASE_URL + "/profile/edit-profile-details",
    ADD_NEW_ADDRESS_API : BASE_URL +  "/profile/add-address",
    EDIT_ADDRESS_API : BASE_URL + "/profile/edit-address",
    DELETE_ADDRESS_API : BASE_URL +  "/profile/delete-address",
    GET_ALL_ADDRESSES_API : BASE_URL + "/profile/show-all-address",
    ADD_TO_CART_API : BASE_URL + "/profile/add-to-cart",
    REMOVE_FROM_CART_API : BASE_URL + "/profile/remove-from-cart",
    ADD_TO_WISHLISTS_API : BASE_URL + "/profile/add-to-wishlists",
    REMOVE_FROM_WISHLISTS_API : BASE_URL +  "/profile/remove-from-wishlists"
}

export const productEndPoints = {
    ADD_PRODUCT_API : BASE_URL + "/product/add-product",
    GET_ALL_PRODUCTS_API : BASE_URL + "/product/get-all-products",
    GET_PRODUCT_FULL_DETAILS_API : BASE_URL + "/product/get-product-details",
}
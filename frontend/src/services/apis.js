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
    REMOVE_FROM_WISHLISTS_API : BASE_URL +  "/profile/remove-from-wishlists",
    GET_SELLER_PRODUCTS_API : BASE_URL + "/profile/get-seller-products",
    DELETE_ACCOUNT_API : BASE_URL  +  "/profile/delete-account",
    WANT_TO_BECOME_SELLER_API : BASE_URL + "/profile/become-seller",
    GET_BUYERS_ALL_ORDERS_API : BASE_URL + "/profile/buyers-orders",
    GET_SELLERS_ALL_ORDERS_API : BASE_URL + "/profile/sellers-orders",
    GET_ORDERS_FULL_DETAILS : BASE_URL + "/profile/get-orders-full-details",
    UPDATE_DELIVERY_STATUS_API : BASE_URL + "/profile/update-delivery-status",
    GET_SELLER_DASHBOARD_DETAILS : BASE_URL + "/profile/seller-dashboard-info"
}

export const productEndPoints = {
    ADD_PRODUCT_API : BASE_URL + "/product/add-product",
    GET_ALL_PRODUCTS_API : BASE_URL + "/product/get-all-products",
    GET_PRODUCT_FULL_DETAILS_API : BASE_URL + "/product/get-product-details",
    GET_HOMEPAGE_PRODUCTS_API : BASE_URL + "/product/home-page-products",
    SEARCH_PRODUCTS_API : BASE_URL + "/product/search-products",
    GET_ALL_CATEGORIES : BASE_URL +  "/product/get-all-categories",
    GET_PRODUCT_LIST : BASE_URL +  "/product/productlist",
    EDIT_PRODUCT_DETAILS_API : BASE_URL + "/product/edit-product-details",
    DELETE_PRODUCT_API : BASE_URL + "/product/delete-product",
    GET_RELATED_PRODUCTS : BASE_URL + "/product/related-products"
}


export const paymentEndPoints = {
    BUY_PRODUCT_API : BASE_URL + "/payment/buy-products",
    CREATE_ORDER_API : BASE_URL + "/payment/create-order"
}


export const ratingAndReviewsEndPoints= {
     CREATE_REVIEW_API : BASE_URL + "/product/create-review",
     DELETE_REVIEW_API : BASE_URL + "/product/delete-review",
     GET_ALL_REVIEWS_API : BASE_URL + "/product/all-reviews"
}
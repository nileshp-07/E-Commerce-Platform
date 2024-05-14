import { setUser } from "../../redux/slices/userSlice";
import { apiConnector } from "../apiConnector";
import { profileEndPoints } from "../apis";
import {toast} from "sonner"

const {
        CHANGE_PASSWORD_API,
        UPDATE_PROFILE_DETAILS_API ,
        ADD_NEW_ADDRESS_API,
        EDIT_ADDRESS_API,
        DELETE_ADDRESS_API,
        GET_ALL_ADDRESSES_API,
        CHANGE_PROFILE_IMAGE,
        ADD_TO_CART_API,
        REMOVE_FROM_CART_API,
        ADD_TO_WISHLISTS_API,
        REMOVE_FROM_WISHLISTS_API,
        GET_SELLER_PRODUCTS_API,
        DELETE_ACCOUNT_API,
        WANT_TO_BECOME_SELLER_API,
        GET_BUYERS_ALL_ORDERS_API, 
        GET_SELLERS_ALL_ORDERS_API,
        GET_ORDERS_FULL_DETAILS ,
        UPDATE_DELIVERY_STATUS_API,
        GET_SELLER_DASHBOARD_DETAILS
    } = profileEndPoints;



export const updateProfileImage = async (formData, token, dispatch) => {
    const toastId = toast.loading("loading...");
    try{
        const response = await apiConnector("PUT", CHANGE_PROFILE_IMAGE, formData ,{
            "Content-Type" :  "multipart/form-data",
            Authorization : `Bearer ${token}`
        })

        console.log("CHANGE PROFILE IMAGE API RESPONSE : ", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        // store the updated user into state and localStorage 
        dispatch(setUser(response.data.updatedUser))
        localStorage.setItem("user", JSON.stringify(response.data.updatedUser));

        toast.success("Profile Image Updated")

    }
    catch(error){
        console.log("CHANGE PROFILE IMAGE API ERROR", error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
}



export const updateProfileDetails = async (data, token, dispatch) => {
    const toastId = toast.loading("loading...");
    try{
        const response = await apiConnector("PUT", UPDATE_PROFILE_DETAILS_API, data ,{
            Authorization : `Bearer ${token}`
        })

        console.log("UPDATE PROFILE DETAILS API RESPONSE : ", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }


        // store the updated user into state and localStorage 
        dispatch(setUser(response.data.updatedUser));
        localStorage.setItem("user", JSON.stringify(response.data.updatedUser));

        toast.success("Profile Details Updated")

    }
    catch(error){
        console.log("UPDATE PROFILE DETAILS API ERROR", error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
}


export const editAddress = async (address , addressId , token) => {
    const toastId = toast.loading("loading...");
    let result;
    try{
        const response = await apiConnector("PUT", EDIT_ADDRESS_API, {...address , ["addressId"] : addressId}  ,{
            Authorization : `Bearer ${token}`
        })

        console.log("EDIT ADDRESS API RESPONSE : ", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response.data.updatedUser.addresses;

        toast.success("Address Updated");
    }
    catch(error){
        console.log("EDIT ADDRESS API ERROR", error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const deleteAddress = async (addressId, token) => {
    const toastId = toast.loading("loading...");
    let result;
    try{
        const response = await apiConnector("DELETE", DELETE_ADDRESS_API, {addressId} ,{
            Authorization : `Bearer ${token}`
        })

        console.log("DELETE ADDRESS API RESPONSE : ", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response.data.updatedUser.addresses;

        toast.success("Address Deleted")

    }
    catch(error){
        console.log("DELETE ADDRESS API ERROR", error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return  result;
}


export const addNewAddress = async (data, token) => {
    const toastId = toast.loading("loading...");
    let result;
    try{
        const response = await apiConnector("POST", ADD_NEW_ADDRESS_API, data ,{
            Authorization : `Bearer ${token}`
        })

        console.log("ADD NEW ADDRESS API RESPONSE : ", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response.data.updatedUser.addresses;

        toast.success("New Address Added")

    }
    catch(error){
        console.log("ADD NEW ADDRESS API ERROR", error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return  result;
}


export const changePassword = async (data, token) => {
    const toastId = toast.loading("loading...");
    try{
        const response = await apiConnector("POST", CHANGE_PASSWORD_API, data ,{
            Authorization : `Bearer ${token}`
        })

        console.log("CHANGE PASSWORD API RESPONSE : ", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success("Password Updated Successfully")

    }
    catch(error){
        console.log("CHANGE PASSWORD API ERROR", error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
}


export const getAllAddresses = async (token) => {
    const toastId = toast.loading("loading...");
    let addresses = [];
    try{
        const response = await apiConnector("GET", GET_ALL_ADDRESSES_API, null ,{
            Authorization : `Bearer ${token}`
        })

        console.log("GET ALL ADDRESS API RESPONSE : ", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        addresses = response.data.addresses;

    }
    catch(error){
        console.log("GET ALL ADDRESS API ERROR", error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return addresses;
}


export const addToCart = async (productId, qty, token) => {
    const toastId = toast.loading("loading...");
    try{
        const response = await apiConnector("POST" , ADD_TO_CART_API, {productId , qty}, {
            Authorization : `Bearer ${token}`
        } );

        console.log("ADD TO CART API RESPONSE : ", response);

        if(!response.data.success)
        {
            throw new Error(response.data.message);
        }

        localStorage.setItem("cartItems", JSON.stringify(response.data.updatedCart.products));


        toast.success("Product added to cart");
    }
    catch(error)
    {
        console.log("ADD PRODUCT TO CART API ERROR", error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }

    toast.dismiss(toastId);
}


export const removeFromCart = async (productId , token) => {
    const toastId = toast.loading("loading...");
    try{
        const response = await apiConnector("POST", REMOVE_FROM_CART_API , {productId} ,{
            Authorization : `Bearer ${token}`
        });

        console.log("REMOVE FROM CART API RESPONSE : ", response);

        if(!response.data.success)
        {
            throw new Error(response.data.message);
        }

        localStorage.setItem("cartItems", JSON.stringify(response.data.updatedCart.products));
        toast.success("Product removed from cart");

    }
    catch(error)
    {
        console.log("ADD PRODUCT TO CART API ERROR", error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }

    toast.dismiss(toastId);
}


export const addToWishlists = async (productId , token) => {
    const toastId = toast.loading("loading...");


    try{
        const response = await apiConnector("POST", ADD_TO_WISHLISTS_API , {productId},{
            Authorization : `Bearer ${token}`
        });

        console.log("ADD PRODUCT TO WISHLISTS API  RESPONSE : ", response);

        if(!response.data.success)
        {
            throw new Error(response.data.message);
        }

        localStorage.setItem("wishlists", JSON.stringify(response.data.wishlists));
        toast.success("Product added to wishlists");

    }
    catch(error)
    {
        console.log("ADD PRODUCT TO WISHLISTS API ERROR", error);
        console.error(error); // Log the entire error object
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
}


export const removeFromWishlists = async (productId,  token) => {
    const toastId = toast.loading("loading...");

    try{
        const response = await apiConnector("POST" , REMOVE_FROM_WISHLISTS_API, {productId},{
            Authorization : `Bearer ${token}`
        })

        console.log('REMOVE PRODUCT FROM WISHLISTS API RESPONSE : ', response);

        if(!response.data.success)
        {
            throw new Error(response.data.message);
        }

        localStorage.setItem("wishlists", JSON.stringify(response.data.wishlists));
        toast.success("product removed from wishlists");
    }
    catch(error)
    {
        console.log("REMOVE PRODUCT FROM WISHLISTS API ERROR", error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
}




export const getSellerProducts = async (token) => {
    const toastId = toast.loading("loading...");
    let result;

    try{
        const response = await apiConnector("GET" , GET_SELLER_PRODUCTS_API, null , {
            Authorization : `Bearer ${token}`
        });

        console.log("GET SELLER PRODUCTS API RESPONSE : ",response);

        if(!response.data.success)
        {
            throw new Error(response.data.message);
        }

        result = response.data.products;

        toast.success("Seller products fetched successfully");
    }
    catch(error)
    {
        console.log("GET SELLER PRODUCTS API ERROR : ",error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return  result;
}


export const deleteUserAccount = async (token) => {
    const toastId = toast.loading("loading...");

    try{
        const response = await apiConnector("DELETE", DELETE_ACCOUNT_API, null , {
            Authorization : `Bearer ${token}`
        })

        console.log("DELETE ACCOUNT API RESPONSE : " , response);

        if(!response.data.success)
        {
            throw new Error(response.data.message);
        }

        toast.success("Account has been deleted successfully")
    }
    catch(error)
    {
        console.log("DELETE USER ACCOUNT API ERROR : ",error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
}


export const becomeSeller = async (formData, token) => {
    const toastId = toast.loading("loading...");

    try{
        const response  = await apiConnector("POST",WANT_TO_BECOME_SELLER_API, {formData} ,{
            Authorization : `Bearer ${token}`
        });

        console.log("WANT TO BECOME SELLER API RESPONSE : ",response);

        if(!response.data.success)
        {
            throw new Error(response.data.message);
        }
        
        toast.success("Your request to become seller has been sent to the admin");

    }
    catch(error)
    {
        console.log("BECOME SELLER API ERROR : ",error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
}


export const getBuyersOrders = async  (token) => {
    const toastId = toast.loading("loading...");
    let result;

    try{
       const response = await apiConnector("POST",GET_BUYERS_ALL_ORDERS_API , null, {
           Authorization : `Bearer ${token}`
       } )


       console.log("GET BUYERS ALL ORDERS API RESPONSE : ",response);

       if(!response.data.success)
       {
           throw new Error(response.data.message);
       }

       result = response.data.orders;
    }
    catch(error)
    {
        console.log("GET BUYER ALL ORDERS API ERROR : ",error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
}


export const getSellersOrders = async  (token) => {
    const toastId = toast.loading("loading...");
    let result;

    try{
       const response = await apiConnector("POST",GET_SELLERS_ALL_ORDERS_API , null, {
           Authorization : `Bearer ${token}`
       } )


       console.log("GET SELLER ALL ORDERS API RESPONSE : ",response);

       if(!response.data.success)
       {
           throw new Error(response.data.message);
       }

       result = response.data.orders;
    }
    catch(error)
    {
        console.log("GET SELLERS ALL ORDERS API ERROR : ",error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
}


export const getOrderFullDetails = async (orderId, token) => {
    const toastId = toast.loading("loading...");

    let result;
    try{
        const response = await apiConnector("POST", GET_ORDERS_FULL_DETAILS, {orderId}, {
            Authorization : `Bearer ${token}`
        });

        console.log("GET ORDERS FULL DETAILS API RESPONSE : ",response);

        if(!response.data.success)
        {
            throw new Error(response.data.message);
        }

        result = response.data.orderDetails;

        toast.success("Order details fetched!!");
    }
    catch(error)
    {
        console.log("GET ORDER FULL DETAILS API ERROR : ",error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
} 


export const changeOrdersDeliveryStatus = async (orderId, updatedStatus , token) => {
    const toastId = toast.loading("loading...");

    try{
        const response = await apiConnector("POST", UPDATE_DELIVERY_STATUS_API, {orderId, updatedStatus}, {
            Authorization : `Bearer ${token}`
        })

        console.log("UPDATE DELIVERY STATUS API RESPONSE : ",response);

        if(!response.data.success)
        {
            throw new Error(response.data.message);
        }

        toast.success("Delivery Status Updated")
    }   
    catch(error)
    {
        console.log("UPDATE DELIVERY STATUS API  ERROR : ",error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
}


export const getSellerDashboardData = async (token) => {
    const toastId = toast.loading("loading...");
    let result;

    try{
       const response = await apiConnector("GET" , GET_SELLER_DASHBOARD_DETAILS, null, {
          Authorization : `Bearer ${token}`
       });

        console.log("GET SELLER DASHBOARD DETAILS API RESPONSE : ",response);

        if(!response.data.success)
        {
            throw new Error(response.data.message);
        }

        result = response.data.data;
    }
    catch(error)
    {
        console.log("GET SELLER DASHBOARD DETAILS API ERROR : ",error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
}
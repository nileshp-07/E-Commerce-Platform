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
        REMOVE_FROM_WISHLISTS_API
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

        dispatch(setUser(response.data.user))

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

        dispatch(setUser(response.data.updatedUser));

        toast.success("Profile Details Updated")

    }
    catch(error){
        console.log("UPDATE PROFILE DETAILS API ERROR", error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
}


export const editAddress = async (address , addressId , token, dispatch) => {
    const toastId = toast.loading("loading...");
    try{
        const response = await apiConnector("PUT", EDIT_ADDRESS_API, {...address , ["addressId"] : addressId}  ,{
            Authorization : `Bearer ${token}`
        })

        console.log("EDIT ADDRESS API RESPONSE : ", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success("Address Updated")
        dispatch(setUser(response.data.updatedUser))


    }
    catch(error){
        console.log("EDIT ADDRESS API ERROR", error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
}

export const deleteAddress = async (addressId, token, dispatch) => {
    const toastId = toast.loading("loading...");
    try{
        const response = await apiConnector("DELETE", DELETE_ADDRESS_API, {addressId} ,{
            Authorization : `Bearer ${token}`
        })

        console.log("DELETE ADDRESS API RESPONSE : ", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        dispatch(setUser(response.data.updatedUser));

        toast.success("Address Deleted")

    }
    catch(error){
        console.log("DELETE ADDRESS API ERROR", error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
}


export const addNewAddress = async (data, token, dispatch) => {
    const toastId = toast.loading("loading...");
    try{
        const response = await apiConnector("POST", ADD_NEW_ADDRESS_API, data ,{
            Authorization : `Bearer ${token}`
        })

        console.log("ADD NEW ADDRESS API RESPONSE : ", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }


        // dispatch(setUser(response.data.updatedUser))

        toast.success("New Address Added")

    }
    catch(error){
        console.log("ADD NEW ADDRESS API ERROR", error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
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

        localStorage.setItem("cartItems", JSON.stringify(response.data.updatedCart));


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

        localStorage.setItem("cartItems", JSON.stringify(response.data.updatedCart));
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

        console.log("wishlists : ",response.data.user.wishlists)
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





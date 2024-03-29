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
        CHANGE_PROFILE_IMAGE
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





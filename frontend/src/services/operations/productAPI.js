import {apiConnector} from "../apiConnector"
import {toast} from "sonner"
import { productEndPoints } from "../apis";


const {
    ADD_PRODUCT_API,
    GET_ALL_PRODUCTS_API,
    GET_PRODUCT_FULL_DETAILS_API,
    GET_HOMEPAGE_PRODUCTS_API,
    SEARCH_PRODUCTS_API,
    GET_PRODUCT_LIST,
    GET_ALL_CATEGORIES
} = productEndPoints;


export const addProduct = async (formData, token) => {
    const toastId = toast.loading("loading...");
    try{
        const response = await apiConnector("POST" ,ADD_PRODUCT_API ,formData,{
            "Content-Type": "multipart/form-data",
            Authorization : `Bearer ${token}`
        });

        console.log("ADD PRODUCT API RESPONSE : ", response);

        if(!response.data.success)
        {
            throw new Error(response.data.message);
        }

        toast.success("Product Created");

    }
    catch(error)
    {
        console.log("CREATE PRODUCT API ERROR : ",error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
}



export const fetchAllProducts = async () => {
    const toastId = toast.loading("loading...");
    let result;
    try{
        const response = await apiConnector("GET", GET_ALL_PRODUCTS_API);

        console.log('GET ALL PRODUCT API RESPONSE : ',response);

        if(!response.data.success)
        {
            throw new Error(response.data.message);
        }

        toast.success("All products fetched successfully");

        result = response.data.products;

    }
    catch(error)
    {
        console.log("CREATE PRODUCT API ERROR : ",error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }

    toast.dismiss(toastId);
    return result;
}


export const getProductDetails = async (productId) => {
    const toastId = toast.loading("loading...");
    let result;
    try{
        const response = await apiConnector("GET", `${GET_PRODUCT_FULL_DETAILS_API}?productId=${productId}`);

        console.log("GET PRODUCT FULL DETAILS API RESPONSE :",response);


        if(!response.data.success)
        {
            throw new Error(response.data.message);
        }

        toast.success("Product details fetched");

        result = response.data.productDetails;

    }
    catch(error)
    {
        console.log("CREATE PRODUCT API ERROR : ",error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }

    toast.dismiss(toastId);
    return result;
}

export const getHomePageProducts = async () => {
    const toastId = toast.loading("loading...");
    let result;

    try{
        const response = await apiConnector("GET",GET_HOMEPAGE_PRODUCTS_API);

        console.log("GET HOME PAGE PRODUCTS API RESPONSE : ",response);

        if(!response.data.success)
        {
            throw new Error(response.data.message);
        }

        result = response.data.data;
    }
    catch(error)
    {
        console.log("GET HOME PAGE PRODUCTS API ERROR : ",error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
}


export const searchProducts = async (searchQuery, filters, sortOption) => {
    const toastId = toast.loading("loading...");
    let result;
    try{
        // const strFilters = JSON.stringify(filters);
        
        const response = await apiConnector("POST",SEARCH_PRODUCTS_API, {searchQuery, filters, sortOption});

        console.log("SEARCH PRODUCT API RESPONSE : ",response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        
        result = response.data;
    }
    catch(error)
    {
        console.log("SEARCH PRODUCTS API ERROR : ",error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
}


export const getAllCategories = async () => {
    let result;

    try{
        const response = await apiConnector("GET", GET_ALL_CATEGORIES);

        console.log("GET ALL CATEGORIES API RESPONSE : ", response);

        if(!response.data.success)
        {
            throw new Error(response.data.message);
        }

        result = response.data.categories;
    }
    catch(error)
    {
        console.log("GET ALL CATEGORIES API ERROR : ",error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    return result;
}


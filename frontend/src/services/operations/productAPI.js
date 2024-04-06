import {apiConnector} from "../apiConnector"
import {toast} from "sonner"
import { productEndPoints } from "../apis";


const {
    ADD_PRODUCT_API,
    GET_ALL_PRODUCTS_API,
    GET_PRODUCT_FULL_DETAILS_API,
    GET_HOMEPAGE_PRODUCTS_API
} = productEndPoints;


export const addProduct = async (title , price ,categories,sellerId,thumbnail,images ,stocks, brand, discountPercentage, discountedPrice, specifications) => {
    const toastId = toast.loading("loading...");
    try{
        const response = await apiConnector("POST" ,ADD_PRODUCT_API ,{title , price, categories,sellerId,thumbnail,images,stocks, brand , discountPercentage,discountedPrice, specifications});

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
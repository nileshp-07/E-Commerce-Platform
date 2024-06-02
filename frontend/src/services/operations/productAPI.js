import {apiConnector} from "../apiConnector"
import {toast} from "sonner"
import { productEndPoints } from "../apis";
import { ratingAndReviewsEndPoints } from "../apis";


const {
    ADD_PRODUCT_API,
    GET_ALL_PRODUCTS_API,
    GET_PRODUCT_FULL_DETAILS_API,
    GET_HOMEPAGE_PRODUCTS_API,
    SEARCH_PRODUCTS_API,
    GET_PRODUCT_LIST,
    GET_ALL_CATEGORIES,
    EDIT_PRODUCT_DETAILS_API,
    DELETE_PRODUCT_API,
    GET_RELATED_PRODUCTS,
    
} = productEndPoints;

const {
    CREATE_REVIEW_API,
    DELETE_REVIEW_API,
    GET_ALL_REVIEWS_API
} = ratingAndReviewsEndPoints;


export const addProduct = async (formData, token) => {
    const toastId = toast.loading("loading...");
    try{
        const response = await apiConnector("POST" ,ADD_PRODUCT_API ,formData, {
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


export const editProductDetails = async (formData , token) => {
    const toastId = toast.loading("loading...");
    try{
        const response = await apiConnector("PUT", EDIT_PRODUCT_DETAILS_API, formData, {
            "Content-Type": "multipart/form-data",
            Authorization : `Bearer ${token}`
        });

        console.log("EDIT PRODUCT DETAILS API RESPONSE : ",response);

        if(!response.data.success)
        {
            throw new Error(response.data.message);
        }

        toast.success("Product updated successfully");
    }
    catch(error)
    {
        console.log("EDIT PRODUCT DETAILS API ERROR : ",error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
}


export const deleteProduct = async (productId, token) => {
    const toastId = toast.loading("loading...");
    console.log("product id : ",productId);
    console.log(productId)
    try{
        const response = await apiConnector("DELETE", DELETE_PRODUCT_API, {productId}, {
            Authorization : `Bearer ${token}`
        });

        console.log("DELETE PRODUCT API RESPONSE : ", response);

        if(!response.data.success)
        {
            throw new Error(response.data.message);
        }

        console.log(response.data.updatedCart);
        console.log(response.data.updatedWishlists);

        if(response.data.updatedWishlists)
        localStorage.setItem("wishlists", JSON.stringify(response.data.updatedWishlists));
        if(response.data.updatedCart)
        localStorage.setItem("cartItems", JSON.stringify(response.data.updatedCart.products));

        toast.success("Product Deleted Successfullly");
    }
    catch(error)
    {
        console.log("EDIT PRODUCT DETAILS API ERROR : ",error);
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


export const getRelatedProducts  = async (categoryId) => {
    const toastId = toast.loading("loading...");
    let result;
    try{
        const response = await apiConnector("POST", GET_RELATED_PRODUCTS ,{categoryId});

        console.log("GET RELATED PRODUCT API RESPONSE : ",response);

        if(!response.data.success)
        {
            throw new Error(response.data.message);
        }

        result = response.data.relatedProducts;

    }
    catch(error)
    {
        console.log("GET RELATED PRODUCTS API ERROR : ",error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
}



export const createReview = async (rating, review , productId, token) => {
    const toastId = toast.loading("loading...");
    let result;
    try{
        console.log("testing..");
        const response = await apiConnector("POST", CREATE_REVIEW_API, {rating, review, productId},{
            Authorization : `Bearer ${token}`
        });

        console.log("CREATE REVIEW API RESPONSE : ",response);

        if(!response.data.success)
        {
            throw new Error(response.data.message);
        }

        result = response.data.allReviews;

        toast.success("product has been successfully reviewed");

    }
    catch(error)
    {
        console.log("CREATE REVIEW API ERROR : ",error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
}


export const getAllReviews = async (productId) => {
    let result;
    console.log("productId", productId);
    try{
        const response = await apiConnector("POST", GET_ALL_REVIEWS_API, {productId});

        console.log("GET ALL REVIEWS API RESPONSE : ",response);

        if(!response.data.success)
        {
            throw new Error(response.data.message);
        }

        result = response.data.reviews;
    }
    catch(error){
        console.log("GET ALL REVIEWS API ERROR : ",error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    return result;
}
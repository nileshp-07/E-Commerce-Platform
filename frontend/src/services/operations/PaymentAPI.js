import {toast} from "sonner"
import {apiConnector} from "../apiConnector"
import {loadStripe} from '@stripe/stripe-js';
import {paymentEndPoints}  from "../apis";


const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;
const {
    BUY_PRODUCT_API
} = paymentEndPoints;


export const buyProducts = async (products, token) => {
    const toastId = toast.loading("loading....");

    try{
        const stripe = await loadStripe("pk_test_51P3eJbSDP8bYTlUtAo5Sv2m6AJo3xUfAIz60KO26ZJBBgIyaXCe23VqXAA3QSRWkfOIIPk8MdHwgzs0ZpJNgXbnP00JtJedXR7");
        
        const response = await apiConnector("POST", BUY_PRODUCT_API , {products},{
            "Content-Type" :  "application/json",
             Authorization : `Bearer ${token}`
        });

        console.log("BUY PRODUCTS API RESPONSE : ",response);

        if(!response.data.success)
        {
            throw new Error(response.data.message);
        }

        const result = stripe.redirectToCheckout({
            sessionId : response.data.sessionId
        })

        if(result.error)
        {
            toast.error(result.error);
        }        
    }
    catch(error)
    {
        console.log("BUY PRODUCTS API ERROR", error);
        console.error(error.message);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
}
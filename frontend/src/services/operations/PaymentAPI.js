import {toast} from "sonner"
import {apiConnector} from "../apiConnector"
import {loadStripe} from '@stripe/stripe-js';
import {paymentEndPoints}  from "../apis";


const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;
const {
    BUY_PRODUCT_API,
    CREATE_ORDER_API
} = paymentEndPoints;


export const buyProducts = async (products,isCOD, address,contactNumber, token) => {
    const toastId = toast.loading("loading....");

    try{

        if(!isCOD){
            const stripe = await loadStripe("pk_test_51P3eJbSDP8bYTlUtAo5Sv2m6AJo3xUfAIz60KO26ZJBBgIyaXCe23VqXAA3QSRWkfOIIPk8MdHwgzs0ZpJNgXbnP00JtJedXR7");
            
            const response = await apiConnector("POST", BUY_PRODUCT_API , {products, address,contactNumber},{
                "Content-Type" :  "application/json",
                Authorization : `Bearer ${token}`
            });

            console.log("BUY PRODUCTS API RESPONSE : ",response);

            if(!response.data.success)
            {
                throw new Error(response.data.message);
            }

            const result = await stripe.redirectToCheckout({
                sessionId : response.data.sessionId
            })

            if(result.error)
            {
                toast.error(result.error);
            } 
            else {
                toast.success("Payment Done");
            }
        }
        else
        {
            const createOrderResponse =  await createOrderOfProducts(products, isCOD, address,contactNumber, token);
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


export const createOrderOfProducts = async (products, isCOD, address,contactNumber, token) => {
     const toastId = toast.loading("Creating Order...");

     try{
        const response = await apiConnector("POST", CREATE_ORDER_API,{products, isCOD, address, contactNumber},{
            "Content-Type" :  "application/json",
             Authorization : `Bearer ${token}`
        });

        console.log('CREATE ORDER API RESPONSE : ',response);

        if(!response.data.success)
        {
            throw new Error(response.data.message);
        }

        toast.success("Order Created");

     }
     catch(error)
     {
        console.log("CREATE ORDER API ERROR", error);
        console.error(error.message);
        toast.error(error.response.data.message);
     }
     toast.dismiss(toastId);
}
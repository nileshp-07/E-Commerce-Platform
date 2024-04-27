import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import productReducer from "../slices/productSlice";
import orderReducer from "../slices/orderSlice";

const rootReducer = combineReducers({
    user : userReducer,
    product : productReducer,
    order : orderReducer
})

export default rootReducer;
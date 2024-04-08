import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import productReducer from "../slices/productSlice";

const rootReducer = combineReducers({
    user : userReducer,
    product : productReducer
})

export default rootReducer;
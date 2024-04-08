import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    product : {}
}

const productSlice = createSlice({
    name : "product",
    initialState,

    reducers  : {
        setProduct : (state, actions) => {
            state.product = actions.payload;
        },

        resetProduct : (state , actions) => {
            state.product = {};
        }
    }
})

export const {setProduct, resetProduct} = productSlice.actions;
export default productSlice.reducer;
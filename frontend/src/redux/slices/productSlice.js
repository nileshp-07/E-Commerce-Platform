import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    product : {},
    isEdit : false
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
        },

        setIsEdit : (state, actions) => {
            state.isEdit = actions.payload;
        }
    }
})

export const {setProduct, resetProduct, setIsEdit} = productSlice.actions;
export default productSlice.reducer;
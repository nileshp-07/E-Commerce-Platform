import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    order : []
}

const orderSlice = createSlice({
    name : "order",
    initialState,

    reducers : {
        setOrder : (state, actions) => {
            state.order = actions.payload
        },

        resetOrder : (state , actions) => {
            state.order = []
        }
    }

})


export const {setOrder , resetOrder} = orderSlice.actions;
export default orderSlice.reducer;
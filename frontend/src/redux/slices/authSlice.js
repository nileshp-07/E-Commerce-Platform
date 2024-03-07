import {createSlice} from "@reduxjs/toolkit"

const initialState ={
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    credentials : null,
    loading : false
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        setToken : (state , value) => {
            state.token = value.payload
        },

        setCredentails : (state, value) => {
            state.credentials = value.payload
        },

        setLoading : (state , value) => {
            state.loading = value.payload
        }
    }
})

export const {setToken , setCredentails , setLoading} = authSlice.actions;
export default authSlice.reducer;
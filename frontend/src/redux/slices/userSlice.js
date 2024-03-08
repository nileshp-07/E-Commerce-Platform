import {createSlice} from "@reduxjs/toolkit"

const initialState ={
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    credentials : null,
    loading : false
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        setToken : (state , value) => {
            state.token = value.payload
        },

        setUser : (state , value) => {
            state.user = value.payload;
        },

        setCredentails : (state, value) => {
            state.credentials = value.payload
        },

        setLoading : (state , value) => {
            state.loading = value.payload
        }
    }
})

export const {setToken , setCredentails , setLoading, setUser} = userSlice.actions;
export default userSlice.reducer;
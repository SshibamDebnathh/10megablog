import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData : null,
    details : {}

}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login :(state,action)=>{           
            state.status = true;
            state.userData = action.payload.userData;
            // console.log(state.userData)
        },

        logout : (state)=>{
            state.status = false
            state.userData = null
        },
        setDetails :(state,action)=>{
            state.details.userId = action.payload.userId
            state.details.secret = action.payload.secret
            state.details.email = action.payload.email
        }
    }

})

export const {login,logout,setDetails} = authSlice.actions;
export default authSlice.reducer
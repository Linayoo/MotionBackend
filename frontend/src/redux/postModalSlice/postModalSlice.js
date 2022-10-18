import {createSlice} from "@reduxjs/toolkit";

export const postModalSlice =createSlice({
    name:"newPostModal",
    initialState:{
        visible:false
    },
    reducers:{
        changeModalVisibility:(state)=>{
            state.visible=!state.visible
        }
    }

})






export const {changeModalVisibility} = postModalSlice.actions;
export default postModalSlice.reducer;
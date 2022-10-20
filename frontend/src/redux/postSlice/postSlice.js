import {createSlice} from "@reduxjs/toolkit";

export const PostSlice = createSlice({
    name: "post",
    initialState: {
        postArray: []
    },
    reducers: {
        setPostArray: (state, action) => {
            state.postArray = action.payload
        },
    }
})

export const {setPostArray} = PostSlice.actions;
export default PostSlice.reducer;
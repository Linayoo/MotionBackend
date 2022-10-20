import {configureStore} from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice/userSlice";
import postModalSliceReducer from "./postModalSlice/postModalSlice";
import idSliceReducer from "./idSlice/idSlice";
import postSliceReducer from "./postSlice/postSlice";

const Store = configureStore({
    reducer: {
        user:userSliceReducer,
        newPostModal:postModalSliceReducer,
        routeID:idSliceReducer,
        post:postSliceReducer
    }
})

export default Store
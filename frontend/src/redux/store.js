import {configureStore} from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice/userSlice";
import postModalSliceReducer from "./postModalSlice/postModalSlice";
import idSliceReducer from "./idSlice/idSlice";

const Store = configureStore({
    reducer: {
        user:userSliceReducer,
        newPostModal:postModalSliceReducer,
        routeID:idSliceReducer
    }
})

export default Store
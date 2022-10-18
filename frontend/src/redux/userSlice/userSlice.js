import {createSlice} from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: "user",
    initialState: {
        email:"",
        token:"",
        avatarURL:"",
        friendRequestSentTemp:[],
        lastEditedPostText:""
    },
    reducers: {
        setUser:(state,action)=>{
            state.email=action.payload.email;
            state.token=action.payload.token
        },
        setAvatar:(state,action)=>{
            state.avatarURL=action.payload
        },
        newFriendRequest:(state,action)=>{
            state.friendRequestSentTemp.push(action.payload)
        },
        changeLastEditedPostText:(state,action)=>{
            state.lastEditedPostText=action.payload
        }
    }
})

export const fetchLocalUser = () => (dispatch) => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        const user = JSON.parse(userStr);
        dispatch(setUser(user)); // dispatching an action to save it to Redux Store
    }
}

export const {setUser,setAvatar,newFriendRequest,changeLastEditedPostText} = userSlice.actions;
export default userSlice.reducer;
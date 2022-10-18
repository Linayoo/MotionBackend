import { createSlice} from "@reduxjs/toolkit";

export const idSlice = createSlice({
    name: 'routeID',
    initialState : {
        uniqueID:'',
    },
    reducers: {
        setUniqueID: (state, action) => {
            state.uniqueID = action.payload;
        }
    }
})

export const {setUniqueID} = idSlice.actions;
export default idSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";



const userLogedinSlice = createSlice({
    name: 'userLogin',
    initialState: {
        isUser: ""
    },
    reducers: {
        setLogedinUser: (state, action) => {
            state.isUser = action.payload
        }
    }
});


export const { setLogedinUser } = userLogedinSlice.actions;
export default userLogedinSlice.reducer
import { combineReducers } from '@reduxjs/toolkit'
import userLogedinSlice from './slices/userLogedinSlice';

const rootReducer = combineReducers({
    userLogedin: userLogedinSlice
});


export default rootReducer;
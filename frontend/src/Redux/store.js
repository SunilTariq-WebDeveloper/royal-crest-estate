
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import propertySlices from './Slices/propertySlice'
import authReducer from './Slices/authSlice.js'
const persistedAuth = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : undefined;
const reducer = combineReducers({
    propertySlices: propertySlices,
    auth: authReducer,
})
const store = configureStore({
    reducer,
    preloadedState: {
        auth: persistedAuth,
    },
})

export default store
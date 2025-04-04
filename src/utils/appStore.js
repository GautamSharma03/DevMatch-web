import { configureStore } from "@reduxjs/toolkit";


import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import Feed from "../components/Feed";
import connectionReducer from "./connectionSlice"

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connections: connectionReducer
    }
})

export default appStore
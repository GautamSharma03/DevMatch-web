import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import Feed from "../components/Feed";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,

    }
})

export default appStore
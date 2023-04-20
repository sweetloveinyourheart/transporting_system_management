import { configureStore } from "@reduxjs/toolkit"
import leaveReducer from "./leave/leaveSlice";

const store = configureStore({
    reducer: {
        leave: leaveReducer
    }
});

export default store;
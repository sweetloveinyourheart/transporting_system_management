import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constant/network";
import { message } from "antd";

const fetchAllLeave = createAsyncThunk(
    "leave/fetchAllLeave",
    async () => {
        const res = await axios.get(BASE_URL + "/api/v1/leaves");
        return res.data.content;
    }
);
export { fetchAllLeave }

const leaveSlice = createSlice({
    name: "leaveSlice",
    initialState: {
        leaves: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllLeave.fulfilled, (state, action) => {
            state.leaves = action.payload;
        }),
        builder.addCase(fetchAllLeave.rejected, (state, action) => {
            message.error("System is error");
        })
    }
});

export default leaveSlice.reducer;
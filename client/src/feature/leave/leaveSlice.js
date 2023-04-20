import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constant/network";
import { message } from "antd";

const fetchAllLeave = createAsyncThunk(
    "leave/fetchAllLeave",
    async (payload) => {
        const { currentPage, onComplete } = payload;
        const res = await axios.get(BASE_URL + `/api/v1/leaves?pageNumber=${currentPage}`);
        onComplete();

        return res.data;
    }
);
const addLeave = createAsyncThunk(
    "leave/addLeave",
    async (leave) => {
        const res = await axios.post(BASE_URL + "/api/v1/leaves", leave);
        return res.data;
    }
);

export { fetchAllLeave, addLeave }

const leaveSlice = createSlice({
    name: "leaveSlice",
    initialState: {
        leaves: [],
        totalLeave: 0,
        currentPage: 0
    },
    reducers: {
        updateCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllLeave.fulfilled, (state, action) => {
            state.totalLeave = action.payload.totalElements;
            state.leaves = action.payload.content;
        });
        builder.addCase(fetchAllLeave.rejected, (state, action) => {
            message.error("System is error");
            console.log(action.error);
        });
        builder.addCase(addLeave.fulfilled, (state, action) => {
            state.leaves.shift(action.payload);
            message.success("Request leave success !!!");
        });
        builder.addCase(addLeave.rejected, (state, action) => {
            message.error("System is error");
        });
    }
});

export default leaveSlice.reducer;
export const { updateCurrentPage } = leaveSlice.actions;
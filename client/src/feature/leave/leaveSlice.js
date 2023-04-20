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
        leaves: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllLeave.fulfilled, (state, action) => {
            state.leaves = action.payload.sort((l1, l2) => {
                const t1 = new Date(l1.createdAt).getTime();
                const t2 = new Date(l2.createdAt).getTime();

                return t2 - t1;
            });
        });
        builder.addCase(fetchAllLeave.rejected, (state, action) => {
            message.error("System is error");
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
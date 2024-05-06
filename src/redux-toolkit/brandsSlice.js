import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const brandsSlice = createSlice({
    name: 'brands',
    initialState: {
        data: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBrandsThunkAction.pending, (state, action) => {

            })
            .addCase(fetchBrandsThunkAction.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(fetchBrandsThunkAction.rejected, (state, action) => {
                
            })
    }
})

export const fetchBrandsThunkAction = createAsyncThunk('fetchBrandsThunkAction', async () => {
    let brandsRes = await fetch('http://localhost:9002/api/brands');
    let data = await brandsRes.json();
    return data
})

export default brandsSlice;
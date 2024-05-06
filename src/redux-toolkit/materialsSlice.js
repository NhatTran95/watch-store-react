import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const materialsSlice = createSlice({
    name: 'materials',
    initialState: {
        data: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMaterialsThunkAction.pending, (state, action) => {

            })
            .addCase(fetchMaterialsThunkAction.fulfilled, (state, action) => {
                state.data = action.payload;
                
            })
            .addCase(fetchMaterialsThunkAction.rejected, (state, action) => {
                
            })
    }
})

export const fetchMaterialsThunkAction = createAsyncThunk('fetchMaterialsThunkAction', async () => {
    let categoriesRes = await fetch('http://localhost:9002/api/categories');
    let data = await categoriesRes.json();
    return data
})

export default materialsSlice;
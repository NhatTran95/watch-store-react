import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        status: 'idle',
        data: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataThunkAction.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchDataThunkAction.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'idle'
            })
            .addCase(fetchDataThunkAction.rejected, (state, action) => {
                state.status = 'error'
            })
    }
})

export const fetchDataThunkAction = createAsyncThunk('fetchDataThunkAction', async () => {
    let productListRes = await fetch('http://localhost:9002/api/products');
    let data = await productListRes.json();
    return data;
})

export default productsSlice;
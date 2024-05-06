import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../redux-toolkit/productsSlice";
import brandsSlice from "../redux-toolkit/brandsSlice";
import materialsSlice from "../redux-toolkit/materialsSlice";
import filtersSlice from "../redux-toolkit/filtersSlice";
import cartSlice from "../redux-toolkit/cartSlice";

const store = configureStore({
    reducer: {
        products: productsSlice.reducer,
        brands: brandsSlice.reducer,
        materials: materialsSlice.reducer,
        filters: filtersSlice.reducer,
        cart: cartSlice.reducer
    }
})

export default store;
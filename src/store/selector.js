import { createSelector } from "@reduxjs/toolkit"
import { priceAfterDiscount } from "../help/help";
export const productsSelector = (state) => state.products;
export const brandsSelector = (state) => state.brands;
export const materialsSelector = (state) => state.materials;
export const filtersSelector = (state) => state.filters;
export const cartSelector = (state) => state.cart;

export const filteredProductsSelector = createSelector(
    productsSelector,
    filtersSelector,
    (products, filters) => {
        const { searchText, brand, material, price, gender } = filters;
        let filteredProducts = [...products.data]

        // if (searchText) {
        //     filteredProducts = filteredProducts.filter(p => p.title.toLowerCase().includes(searchText.toLowerCase())
        //         || p.brand.name.toLowerCase().includes(searchText.toLowerCase())
        //         || p.description.toLowerCase().includes(searchText.toLowerCase()))
        // }

        if (brand !== 'All') {
            filteredProducts = filteredProducts.filter(p => p.brand.name === brand)
        }

        if (material !== 'All') {
            filteredProducts = filteredProducts.filter(p => p.category.name === material)
        }

        if (price !== 'All') {
            const [min, max] = price.split(',');
            if (min !== max) {
                console.log(min);
                console.log(max);
                filteredProducts = filteredProducts.filter(p => priceAfterDiscount(p.price, p.discountPercentage) >= Number(min) * 1000000
                    && priceAfterDiscount(p.price, p.discountPercentage) < Number(max) * 1000000)
            } else {
                filteredProducts = filteredProducts.filter(p => priceAfterDiscount(p.price, p.discountPercentage) >= Number(min) * 1000000)
            }
        }

        if (gender.length) {
            filteredProducts = filteredProducts.filter(p => gender.includes(p.gender))
        }

        return filteredProducts;
    }
)
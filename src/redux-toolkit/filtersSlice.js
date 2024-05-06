import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        // searchText: '',
        brand: 'All',
        material: 'All',
        gender: [],
        price: 'All'
    },
    reducers: {
        // setSearchText: (state, action) => {
        //     state.searchText = action.payload
        // },
        setSearchBrand: (state, action) => {
            state.brand = action.payload
        },
        setSearchMaterial: (state, action) => {
            state.material = action.payload
        },
        setSearchPrice: (state, action) => {
            state.price = action.payload
        },
        setSearchGender: (state, action) => {
            const gender = action.payload;
            let genderList = state.gender;
            console.log(genderList);
            if (genderList.includes(gender)) {
                genderList = genderList.filter(g => g !== gender)
            } else {
                genderList.push(gender)
            }
            state.gender = genderList;
        }
    }
})

export default filtersSlice;
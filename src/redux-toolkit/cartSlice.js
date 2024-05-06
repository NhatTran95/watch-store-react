import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { v4 } from "uuid";

const getCartItemsFromStorage = () => {
  const cartItems = localStorage.getItem('cartItems');
  if (cartItems) {
    return JSON.parse(cartItems);
  }
  return null;
};

const initialStateFromLocalStorage = getCartItemsFromStorage();

const initialState = initialStateFromLocalStorage ? initialStateFromLocalStorage : {
  cartId: v4(),
  cartInfo: {
    total: 0,
    orderDate: new Date().valueOf()
  },
  cartDetails: [],
  customerInfo: {
    fullName: '',
    address: '',
    email: '',
    mobile: ''
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      let cartItem = state.cartDetails.find(item => item.id === action.payload.id);
      if (cartItem?.id) {
        cartItem.quantity = Number(cartItem.quantity) + 1;
        cartItem.amount = Number(cartItem.quantity) * Number(cartItem.newPrice);

        toast.warning('Sản phẩm đã có trong giỏ hàng', {
          position: "top-right",
          autoClose: 1000
        })
      }
      else {
        state.cartDetails.push({
          ...action.payload,
          quantity: 1,
          amount: action.payload.newPrice
        })

        toast.success("Đã thêm sản phẩm vào giỏ hàng!", {
          position: "top-right",
          autoClose: 1000
        });
      }
      let newTotal = 0;
      for (let item of state.cartDetails) {
        newTotal += Number(item.amount)
      }
      state.cartInfo.total = newTotal;
      localStorage.setItem('cartItems', JSON.stringify(state))
    },
    incrementQuantity: (state, action) => {
      let cartItem = state.cartDetails.find((item) => item.id === action.payload)
      cartItem.quantity = Number(cartItem.quantity) + 1
      cartItem.amount = Number(cartItem.quantity) * Number(cartItem.newPrice)

      let newTotal = 0
      for (let item of state.cartDetails) {
        newTotal += Number(item.amount)
      }
      state.cartInfo.total = newTotal
      localStorage.setItem('cartItems', JSON.stringify(state))
    },
    descrementQuantity: (state, action) => {
      let cartItem = state.cartDetails.find((item) => item.id === action.payload)
      cartItem.quantity = Number(cartItem.quantity) - 1
      cartItem.amount = Number(cartItem.quantity) * Number(cartItem.newPrice)

      let newTotal = 0
      for (let item of state.cartDetails) {
        newTotal += Number(item.amount)
      }
      state.cartInfo.total = newTotal
      localStorage.setItem('cartItems', JSON.stringify(state))
    },
    removeCartItem: (state, action) => {
      state.cartDetails = state.cartDetails.filter((item) => item.id !== action.payload)
      let newTotal = 0
      for (let item of state.cartDetails) {
        newTotal += Number(item.amount)
      }
      state.cartInfo.total = newTotal
      localStorage.setItem('cartItems', JSON.stringify(state))
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(chekoutThunkAction.fulfilled, (state, action) => {
        state.cartId = v4(),
          state.cartInfo = {
            total: 0,
            orderDate: new Date().valueOf()
          },
          state.cartDetails = [],
          state.customerInfo = {
            fullName: '',
            address: '',
            email: '',
            mobile: ''
          }
        localStorage.removeItem('cartItems')
      })
  }
})

export const chekoutThunkAction = createAsyncThunk('checkout', async (data) => {
  let billRes = await fetch("http://localhost:9002/api/bills", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  let billResult = await billRes.json();
  return billResult;
})

export default cartSlice;
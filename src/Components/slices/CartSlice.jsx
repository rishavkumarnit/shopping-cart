import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action) => {
      // state.cart = [...state.cart, action.payload];
      // Find index of product (if it exists)
      const newItem = action.payload;
      const index = state.cart.findIndex((item) => item.id === newItem.id);

      if (index !== -1) {
        // ✅ Replace the existing product
        state.cart[index] = newItem;
      } else {
        // ✅ Add new product
        state.cart.push(newItem);
      }
      state.totalItems = state.cart.length;
      state.totalPrice = state.cart.reduce(
        (sum, item) => sum + (item.price * item.count || 0),
        0
      );
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      state.totalItems = state.cart.length;
      state.totalPrice = state.cart.reduce(
        (sum, item) => sum + (item.price * item.count || 0),
        0
      );
    },
    setTotalItems: (state) => {
      // state.totalItems = state.cart.length;
      // state.totalPrice = state.cart.reduce(
      //   (sum, item) => sum + (item.price * item.count || 0),
      //   0
      // );
    },
  },
});

export const { setItems, removeItem, setTotalItems } = cartSlice.actions;

export default cartSlice.reducer;

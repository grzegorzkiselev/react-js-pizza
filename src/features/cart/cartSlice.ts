import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      if (item.quantity - 1 > 0) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
      } else {
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  }
});

export const getCart = (state) => state.cart.cart;
export const getCartItemsQuantity = (state) => state.cart.cart.reduce((sum, item) => (sum += item.quantity), 0);
export const getTotalCartPrice = (state) => state.cart.cart.reduce((sum, item) => (sum += item.totalPrice), 0);
// export const getItemQuantityById = (id) => (state) => ((state.cart.cart.find((item) => (item.pizzaId === id))).quantity);
export const getItemQuantityById = (id) => (state) => state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
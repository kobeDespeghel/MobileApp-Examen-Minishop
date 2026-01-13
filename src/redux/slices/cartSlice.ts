import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Product, { CartProduct } from "../../models/Product";

interface CartState {
  status: "idle" | "loading" | "succeeded" | "failed";
  products: CartProduct[];
}

const initState: CartState = {
  status: "idle",
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      //check if product already in cart
      const product = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (!product) {
        state.products.push(action.payload);
      } else {
        product.quantity = action.payload.quantity;
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const product = state.products.find(
        (product) => product.id === action.payload
      );
      if (product) {
        product.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const product = state.products.find(
        (product) => product.id === action.payload
      );
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
    setQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) => {
      const product = state.products.find(
        (product) => product.id === action.payload.productId
      );
      if (product && action.payload.quantity > 0) {
        product.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.products = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  setQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

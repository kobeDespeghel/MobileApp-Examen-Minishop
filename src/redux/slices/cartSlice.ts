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
      state.products.push(action.payload);
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
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;

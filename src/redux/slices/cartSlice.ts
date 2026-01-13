import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartProduct } from "../../models/Product";
interface CartState {
  status: "idle" | "loading" | "succeeded" | "failed";
  products: CartProduct[];
}

export const fetchCartFromStorage = createAsyncThunk(
  "cart/fetchCartFromStorage",
  async (_, { rejectWithValue }) => {
    console.log("Fetching cart from storage...");
    try {
      const cartData = await AsyncStorage.getItem("@cart");
      if (!cartData) {
        return []; // Return empty array if no cart in storage
      }
      const parsedCart = JSON.parse(cartData) as CartProduct[];
      return parsedCart;
    } catch (error) {
      console.error("Error fetching cart from storage:", error);
      return rejectWithValue("Failed to load cart from storage: " + error);
    }
  }
);

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
        product.quantity++;
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartFromStorage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartFromStorage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchCartFromStorage.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const saveToAsyncStorage = async (value: CartProduct[]) => {
  try {
    const result = await AsyncStorage.setItem("@cart", JSON.stringify(value));
  } catch (error) {
    console.error("Error saving cart to AsyncStorage", error);
  }
};

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  setQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

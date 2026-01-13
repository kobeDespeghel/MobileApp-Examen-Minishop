import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import cartReducer, {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  setQuantity,
  clearCart,
  saveToAsyncStorage,
} from "./slices/cartSlice";

const cartListenerMiddleware = createListenerMiddleware();

// Listen to cart changes and persist to storage
cartListenerMiddleware.startListening({
  matcher: isAnyOf(
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    setQuantity,
    clearCart
  ),
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState() as any;
    await saveToAsyncStorage(state.cart.products);
  },
});

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(cartListenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

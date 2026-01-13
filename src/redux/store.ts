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
import themeReducer, {
  toggleTheme,
  setThemeMode,
  saveThemeToStorage,
} from "./slices/themeSlice";

const cartListenerMiddleware = createListenerMiddleware();
const themeListenerMiddleware = createListenerMiddleware();

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

// Listen to theme changes and persist to storage
themeListenerMiddleware.startListening({
  matcher: isAnyOf(toggleTheme, setThemeMode),
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState() as any;
    await saveThemeToStorage(state.theme.mode);
  },
});

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      cartListenerMiddleware.middleware,
      themeListenerMiddleware.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CartProduct } from "../../models/Product";

export const selectCartState = (state: RootState) => state.cart;

export const selectCartProducts = createSelector(
  [selectCartState],
  (cart) => cart.products as CartProduct[]
);

export const selectTotalItems = createSelector(
  [selectCartProducts],
  (products) => products.reduce((total, product) => total + product.quantity, 0)
);

export const selectTotalPrice = createSelector(
  [selectCartProducts],
  (products) =>
    products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
);

export const selectIsProductInCart = createSelector(
  [selectCartProducts, (_, productId: number) => productId],
  (products, productId) => products.some((product) => product.id === productId)
);

export const selectProductQuantity = createSelector(
  [selectCartProducts, (_, productId: number) => productId],
  (products, productId) => {
    var quantity = products.find((p) => p.id === productId)?.quantity || 1;
    return quantity;
  }
);

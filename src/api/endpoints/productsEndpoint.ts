import { get } from "../client";
import Product from "../../models/Product";
import { ApiError } from "../../models/Error";
import { isProduct } from "../../Validators/productValidators";

export async function fetchProducts() {
  const result = await get("products");

  if (!result.products || !Array.isArray(result.products)) {
    var error: ApiError = new Error(
      "Invalid ProductResponse: missing or invalid 'products' key"
    );
    error.data = result;
    throw error;
  }

  return result.products as Product[];
}

export async function fetchProductById(Id: number) {
  const result = await get(`products/${Id}`);

  console.log(result);

  if (!result || !isProduct(result)) {
    const error: ApiError = new Error(
      "Invalid ProductResponse: missing or invalid 'product' key"
    );
    error.data = result;
    throw error;
  }

  return result as Product;
}

import { get } from "../client";
import Product from "../../models/Product";
import { ApiError } from "../../models/Error";
import ApiResponse from "../../models/ApiResponse";

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

export async function fetchProductById(
  Id: number
): Promise<Product | ApiError> {
  const result = await get(`products/${Id}`);

  if (result.type === "ApiError") return result;

  return result as Product;
}

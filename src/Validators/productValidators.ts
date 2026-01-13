import Product from "../models/Product";

export function isProduct(obj: any): obj is Product {
  return (
    obj != null &&
    typeof obj.id === "number" &&
    Number.isFinite(obj.id) &&
    typeof obj.title === "string" &&
    typeof obj.description === "string" &&
    typeof obj.category === "string" &&
    typeof obj.price === "number" &&
    Number.isFinite(obj.price)
  );
}

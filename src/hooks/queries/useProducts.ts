import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../constants/queryKeys";
import {
  fetchProductById,
  fetchProducts,
} from "../../api/endpoints/productsEndpoint";

export function useProducts(searchQuery?: string) {
  return useQuery({
    queryKey: queryKeys.products.list(searchQuery),
    queryFn: () => fetchProducts(searchQuery),
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
}

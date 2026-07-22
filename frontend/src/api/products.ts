import { apiFetch } from "./client";
import type {
  CreateProductPayload,
  PaginatedProducts,
  Product,
} from "../types/product";

export type GetProductsParams = {
  page?: number;
  limit?: number;
  category?: string;
};

export function getProducts(params: GetProductsParams = {}) {
  const search = new URLSearchParams();
  if (params.page) search.set("page", String(params.page));
  if (params.limit) search.set("limit", String(params.limit));
  if (params.category) search.set("category", params.category);

  const query = search.toString();
  return apiFetch<PaginatedProducts>(`/products${query ? `?${query}` : ""}`);
}

export function getProduct(id: number | string) {
  return apiFetch<Product>(`/products/${id}`);
}

export function createProduct(payload: CreateProductPayload) {
  return apiFetch<Product>("/products", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

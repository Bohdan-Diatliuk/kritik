import { apiFetch } from "./client";
import type { CreateReviewPayload, Review } from "../types/review";

export function getReviews(productId: number | string) {
  return apiFetch<Review[]>(`/products/${productId}/reviews`);
}

export function createReview(
  productId: number | string,
  payload: CreateReviewPayload,
) {
  return apiFetch<Review>(`/products/${productId}/reviews`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

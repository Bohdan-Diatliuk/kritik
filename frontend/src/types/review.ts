export type Review = {
  id: number;
  rating: number;
  comment: string;
  authorName: string | null;
  createdAt: string;
  productId: number;
};

export type CreateReviewPayload = {
  rating: number;
  comment: string;
  authorName?: string;
};

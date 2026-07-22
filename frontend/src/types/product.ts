import type { Category } from './category';

export type Product = {
  id: number;
  name: string;
  brand: string | null;
  type: string;
  weight: number | null;
  flavour: string | null;
  volume: number | null;
  proteins: number | null;
  fats: number | null;
  omega3: number | null;
  calories: number | null;
  vuhl: number | null;
  fiber: number | null;
  sugar: number | null;
  tags: string[];
  items: number;
  cost: string;
  discount: number | null;
  description: string[];
  information: string[];
  color: string[];
  images: string[];
  category: Category;
  averageRating: number | null;
  reviewsCount: number;
};

export type PaginatedProducts = {
  data: Product[];
  total: number;
  page: number;
  limit: number;
};

export type CreateProductPayload = {
  name: string;
  type: string;
  categoryId: number;
  brand?: string;
  cost: number;
  items: number;
  tags: string[];
  description: string[];
  information: string[];
  color: string[];
  images?: string[];
};

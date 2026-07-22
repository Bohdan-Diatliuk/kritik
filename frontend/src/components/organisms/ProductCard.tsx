import { Link } from 'react-router-dom';
import { ImageOff } from 'lucide-react';
import type { Product } from '../../types/product';
import { StarRating } from '../atoms/StarRating';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const hasDiscount =
    !!product.discount && product.discount < Number(product.cost);

  return (
    <Link
      to={`/products/${product.id}`}
      className="flex flex-col gap-2 rounded-xl border border-line bg-main-cart p-3 text-anti-text shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      {product.images[0] ? (
        <img
          src={product.images[0]}
          alt={product.name}
          className="aspect-square w-full rounded-lg object-cover"
          loading="lazy"
        />
      ) : (
        <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-canvas text-third-text">
          <ImageOff className="h-8 w-8" />
        </div>
      )}
      <span className="text-xs text-third-text">{product.category.name}</span>
      <h3 className="line-clamp-2 text-sm font-medium">{product.name}</h3>

      <div className="flex items-center gap-2">
        <StarRating value={product.averageRating ?? 0} />
        <span className="text-xs text-third-text">
          {product.reviewsCount > 0
            ? `(${product.reviewsCount})`
            : 'Немає відгуків'}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {hasDiscount ? (
          <>
            <span className="font-semibold text-price-cart">
              {product.discount} ₴
            </span>
            <span className="text-sm text-third-text line-through">
              {product.cost} ₴
            </span>
          </>
        ) : (
          <span className="font-semibold text-price-cart">
            {product.cost} ₴
          </span>
        )}
      </div>
    </Link>
  );
};

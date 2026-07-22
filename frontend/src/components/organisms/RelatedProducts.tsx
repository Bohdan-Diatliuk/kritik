import { useEffect, useState } from 'react';
import { getProducts } from '../../api/products';
import type { Product } from '../../types/product';
import { ProductCard } from './ProductCard';

type Props = {
  categoryName: string;
  excludeProductId: number;
};

export const RelatedProducts = ({ categoryName, excludeProductId }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts({ category: categoryName, limit: 5 })
      .then(({ data }) =>
        setProducts(data.filter((p) => p.id !== excludeProductId).slice(0, 4)),
      )
      .catch(() => setProducts([]));
  }, [categoryName, excludeProductId]);

  if (products.length === 0) return null;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-display text-2xl font-semibold text-main-text">
        Схожі продукти
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

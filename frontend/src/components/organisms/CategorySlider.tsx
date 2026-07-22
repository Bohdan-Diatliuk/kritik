import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../api/categories';
import type { Category } from '../../types/category';
import { Carousel } from '../molecules/Carousel';

export const CategorySlider = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  if (categories.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <h2 className="font-display text-3xl font-semibold text-main-text">
        Популярні категорії
      </h2>
      <p className="mt-1 text-sm text-third-text">
        Оберіть категорію і подивіться, що про неї кажуть покупці.
      </p>

      <Carousel className="mt-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/catalog?category=${encodeURIComponent(category.name)}`}
            className="group relative flex h-40 w-56 shrink-0 snap-start items-end overflow-hidden rounded-2xl border border-line"
          >
            <img
              src={category.image}
              alt={category.name}
              className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
            <span className="relative z-10 p-4 font-display text-lg font-semibold text-white">
              {category.name}
            </span>
          </Link>
        ))}
      </Carousel>
    </section>
  );
};

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";
import cn from "classnames";
import { getProducts } from "../../api/products";
import { getCategories } from "../../api/categories";
import type { Product } from "../../types/product";
import type { Category } from "../../types/category";
import { ProductCard } from "../organisms/ProductCard";

const PAGE_SIZE = 20;

export const CatalogPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get("category");
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  const selectCategory = (name: string | null) => {
    const next: Record<string, string> = {};
    if (name) next.category = name;
    setSearchParams(next);
  };

  const goToPage = (nextPage: number) => {
    const next: Record<string, string> = { page: String(nextPage) };
    if (activeCategory) next.category = activeCategory;
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10">
      <h1 className="font-display text-3xl font-semibold text-main-text">
        Каталог продуктів
      </h1>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => selectCategory(null)}
          className={cn(
            "rounded-full border px-3 py-1 text-sm transition",
            activeCategory === null
              ? "border-price-cart bg-price-cart text-white"
              : "border-line bg-main-cart text-third-text hover:text-main-text",
          )}
        >
          Усі
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => selectCategory(category.name)}
            className={cn(
              "rounded-full border px-3 py-1 text-sm transition",
              activeCategory === category.name
                ? "border-price-cart bg-price-cart text-white"
                : "border-line bg-main-cart text-third-text hover:text-main-text",
            )}
          >
            {category.name}
          </button>
        ))}
      </div>

      <CatalogResults
        key={`${page}-${activeCategory}`}
        page={page}
        category={activeCategory}
        onPageChange={goToPage}
      />
    </div>
  );
};

type ResultsProps = {
  page: number;
  category: string | null;
  onPageChange: (page: number) => void;
};

const CatalogResults = ({ page, category, onPageChange }: ResultsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProducts({ page, limit: PAGE_SIZE, category: category ?? undefined })
      .then(({ data, total }) => {
        setProducts(data);
        setTotal(total);
      })
      .catch((err) =>
        setError(
          err instanceof Error
            ? err.message
            : "Не вдалося завантажити каталог.",
        ),
      )
      .finally(() => setLoading(false));
  }, [page, category]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  if (loading) {
    return (
      <p className="py-10 text-center text-main-text">
        Завантаження каталогу...
      </p>
    );
  }

  if (error) {
    return <p className="py-10 text-center text-price-cart">{error}</p>;
  }

  return (
    <>
      <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <ReactPaginate
          forcePage={page - 1}
          pageCount={totalPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={({ selected }) => onPageChange(selected + 1)}
          previousLabel={
            <span className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" /> Попередня
            </span>
          }
          nextLabel={
            <span className="flex items-center gap-1">
              Наступна <ChevronRight className="h-4 w-4" />
            </span>
          }
          breakLabel="…"
          containerClassName="mt-6 flex flex-wrap items-center justify-center gap-2"
          pageLinkClassName="flex h-9 min-w-9 items-center justify-center rounded-full border border-line bg-main-cart px-3 text-sm text-main-text transition hover:border-price-cart"
          activeLinkClassName="!border-price-cart !bg-price-cart !text-white"
          previousLinkClassName="flex h-9 items-center justify-center rounded-full border border-line bg-main-cart px-4 text-sm text-main-text transition hover:border-price-cart"
          nextLinkClassName="flex h-9 items-center justify-center rounded-full border border-line bg-main-cart px-4 text-sm text-main-text transition hover:border-price-cart"
          breakLinkClassName="flex h-9 items-center justify-center px-2 text-sm text-third-text"
          disabledLinkClassName="pointer-events-none opacity-40"
        />
      )}
    </>
  );
};

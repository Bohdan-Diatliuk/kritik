import { Fragment, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../../api/products";
import { getReviews } from "../../api/reviews";
import type { Product } from "../../types/product";
import type { Review } from "../../types/review";
import { StarRating } from "../atoms/StarRating";
import { ImageGallery } from "../molecules/ImageGallery";
import { Tabs } from "../molecules/Tabs";
import { ReviewForm } from "../organisms/ReviewForm";
import { ReviewList } from "../organisms/ReviewList";
import { RelatedProducts } from "../organisms/RelatedProducts";

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  return <ProductPageContent key={id} id={id} />;
};

type Spec = { label: string; value: string | number };

const ProductPageContent = ({ id }: { id?: string }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("description");
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!id) return;

    Promise.all([getProduct(id), getReviews(id)])
      .then(([productData, reviewsData]) => {
        setProduct(productData);
        setReviews(reviewsData);
      })
      .catch((err) =>
        setError(
          err instanceof Error
            ? err.message
            : "Не вдалося завантажити продукт.",
        ),
      )
      .finally(() => setLoading(false));
  }, [id]);

  const handleReviewSubmitted = (review: Review) => {
    setReviews((prev) => [review, ...prev]);
    setProduct((prev) =>
      prev
        ? {
            ...prev,
            reviewsCount: prev.reviewsCount + 1,
            averageRating:
              ((prev.averageRating ?? 0) * prev.reviewsCount + review.rating) /
              (prev.reviewsCount + 1),
          }
        : prev,
    );
  };

  const scrollToReviews = () => {
    setActiveTab("reviews");
    tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (loading) {
    return <p className="p-6 text-main-text">Завантаження...</p>;
  }

  if (error || !product) {
    return (
      <p className="p-6 text-price-cart">{error ?? "Продукт не знайдено."}</p>
    );
  }

  const hasDiscount =
    !!product.discount && product.discount < Number(product.cost);

  const specs: Spec[] = [
    product.brand && { label: "Бренд", value: product.brand },
    { label: "Категорія", value: product.category.name },
    product.flavour && { label: "Смак", value: product.flavour },
    product.weight && { label: "Вага", value: `${product.weight} г` },
    product.volume && { label: "Об’єм", value: `${product.volume} мл` },
    product.information.length > 0 && {
      label: "Особливості",
      value: product.information.join(", "),
    },
    { label: "В наявності", value: `${product.items} шт` },
  ].filter(Boolean) as Spec[];

  const nutrition: Spec[] = [
    product.calories != null && {
      label: "Калорії",
      value: `${product.calories} ккал`,
    },
    product.proteins != null && {
      label: "Білки",
      value: `${product.proteins} г`,
    },
    product.fats != null && { label: "Жири", value: `${product.fats} г` },
    product.sugar != null && { label: "Цукор", value: `${product.sugar} г` },
    product.fiber != null && {
      label: "Клітковина",
      value: `${product.fiber} г`,
    },
    product.omega3 != null && {
      label: "Омега-3",
      value: `${product.omega3} г`,
    },
  ].filter(Boolean) as Spec[];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10">
      <Link
        to="/catalog"
        className="text-sm text-third-text hover:text-main-text"
      >
        ← Назад до каталогу
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        <ImageGallery images={product.images} alt={product.name} />

        <div className="flex flex-col gap-4">
          <span className="text-sm text-third-text">
            {product.category.name}
          </span>
          <h1 className="font-display text-2xl font-semibold text-main-text sm:text-3xl">
            {product.name}
          </h1>

          <button
            type="button"
            onClick={scrollToReviews}
            className="flex w-fit items-center gap-2"
          >
            <StarRating value={product.averageRating ?? 0} size={18} />
            <span className="text-sm text-third-text underline-offset-2 hover:underline">
              {product.reviewsCount > 0
                ? `(${product.reviewsCount} відгуків)`
                : "Немає відгуків"}
            </span>
          </button>

          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 border-y border-line py-4 text-sm">
            {specs.map((spec) => (
              <Fragment key={spec.label}>
                <dt className="font-medium text-main-text">{spec.label}</dt>
                <dd className="text-second-text">{spec.value}</dd>
              </Fragment>
            ))}
          </dl>

          <div className="flex items-center gap-3">
            {hasDiscount ? (
              <>
                <span className="text-2xl font-semibold text-price-cart">
                  {product.discount} ₴
                </span>
                <span className="text-base text-third-text line-through">
                  {product.cost} ₴
                </span>
              </>
            ) : (
              <span className="text-2xl font-semibold text-price-cart">
                {product.cost} ₴
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={scrollToReviews}
            className="mt-2 w-fit rounded-full bg-price-cart px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
          >
            Написати відгук
          </button>
        </div>
      </div>

      <div ref={tabsRef} />
      <Tabs
        activeId={activeTab}
        onChange={setActiveTab}
        tabs={[
          {
            id: "description",
            label: "Опис",
            content: (
              <div className="flex flex-col gap-3">
                {product.description.length > 0 ? (
                  product.description.map((paragraph, i) => (
                    <p key={i} className="text-sm text-second-text">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="text-sm text-third-text">Опис відсутній.</p>
                )}
              </div>
            ),
          },
          {
            id: "information",
            label: "Інформація",
            content:
              nutrition.length > 0 ? (
                <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
                  {nutrition.map((item) => (
                    <div key={item.label}>
                      <dt className="text-third-text">{item.label}</dt>
                      <dd className="font-medium text-main-text">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="text-sm text-third-text">
                  Харчова інформація для цього продукту відсутня.
                </p>
              ),
          },
          {
            id: "reviews",
            label: `Відгуки (${product.reviewsCount})`,
            content: (
              <div className="flex flex-col gap-4">
                <ReviewForm
                  productId={product.id}
                  onSubmitted={handleReviewSubmitted}
                />
                <ReviewList reviews={reviews} />
              </div>
            ),
          },
        ]}
      />

      <RelatedProducts
        categoryName={product.category.name}
        excludeProductId={product.id}
      />
    </div>
  );
};

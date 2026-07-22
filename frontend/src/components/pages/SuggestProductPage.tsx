import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePlus, Loader2 } from "lucide-react";
import { createProduct } from "../../api/products";
import { getCategories } from "../../api/categories";
import { uploadImage } from "../../api/uploads";
import type { Category } from "../../types/category";

export const SuggestProductPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brand, setBrand] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);
        if (data[0]) setCategoryId(String(data[0].id));
      })
      .catch(() => setCategories([]));
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setImagePreview(URL.createObjectURL(file));
    setImageUrl(null);
    setUploading(true);

    uploadImage(file)
      .then(setImageUrl)
      .catch((err) => {
        setError(
          err instanceof Error ? err.message : "Не вдалося завантажити фото.",
        );
        setImagePreview(null);
      })
      .finally(() => setUploading(false));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (name.trim().length < 2) {
      setError("Введіть назву товару (мінімум 2 символи).");
      return;
    }
    if (!categoryId) {
      setError("Оберіть категорію.");
      return;
    }

    setSubmitting(true);
    try {
      const product = await createProduct({
        name: name.trim(),
        type: name.trim(),
        categoryId: Number(categoryId),
        brand: brand.trim() || undefined,
        cost: Number(cost) || 0,
        items: 0,
        tags: [],
        description: description.trim() ? [description.trim()] : [],
        information: [],
        color: [],
        images: imageUrl ? [imageUrl] : [],
      });
      navigate(`/products/${product.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не вдалося додати товар.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-6 py-10">
      <div>
        <h1 className="font-display text-3xl font-semibold text-main-text">
          Ви також можете додати товар, якого немає в списку, але який ви б
          хотіли оцінити!
        </h1>
        <p className="mt-2 text-sm text-third-text">
          Заповніть основні дані — і одразу зможете залишити перший відгук.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-xl border border-line bg-main-cart p-6 shadow-sm"
      >
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-main-text">Назва товару *</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Напр. Овочеві чіпси з паприкою"
            className="rounded-md border border-line bg-canvas px-3 py-2 text-sm text-anti-text placeholder:text-third-text outline-none focus:ring-1 focus:ring-star-cart"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-main-text">Категорія *</span>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="rounded-md border border-line bg-canvas px-3 py-2 text-sm text-anti-text outline-none focus:ring-1 focus:ring-star-cart"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-main-text">Бренд</span>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Необов'язково"
            className="rounded-md border border-line bg-canvas px-3 py-2 text-sm text-anti-text placeholder:text-third-text outline-none focus:ring-1 focus:ring-star-cart"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-main-text">Орієнтовна ціна, ₴</span>
          <input
            type="number"
            min={0}
            step="0.01"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="Необов'язково"
            className="rounded-md border border-line bg-canvas px-3 py-2 text-sm text-anti-text placeholder:text-third-text outline-none focus:ring-1 focus:ring-star-cart"
          />
        </label>

        <div className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-main-text">Фото товару</span>
          <div className="flex items-center gap-4">
            {imagePreview && (
              <img
                src={imagePreview}
                alt=""
                className="h-16 w-16 rounded-lg border border-line object-cover"
              />
            )}
            <label className="flex cursor-pointer items-center gap-2 rounded-md border border-line bg-canvas px-3 py-2 text-sm text-second-text hover:border-price-cart">
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ImagePlus className="h-4 w-4" />
              )}
              {uploading ? "Завантаження..." : "Обрати фото"}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-main-text">Короткий опис</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Необов'язково"
            className="rounded-md border border-line bg-canvas px-3 py-2 text-sm text-anti-text placeholder:text-third-text outline-none focus:ring-1 focus:ring-star-cart"
          />
        </label>

        {error && <p className="text-sm text-price-cart">{error}</p>}

        <button
          type="submit"
          disabled={submitting || uploading || categories.length === 0}
          className="self-start rounded-full bg-price-cart px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90 disabled:opacity-60"
        >
          {submitting ? "Додаємо..." : "Додати товар"}
        </button>
      </form>
    </div>
  );
};

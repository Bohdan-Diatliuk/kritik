import { useState, type FormEvent } from 'react';
import { createReview } from '../../api/reviews';
import type { Review } from '../../types/review';
import { StarRatingInput } from '../molecules/StarRatingInput';

type Props = {
  productId: number;
  onSubmitted: (review: Review) => void;
};

export const ReviewForm = ({ productId, onSubmitted }: Props) => {
  const [rating, setRating] = useState(0);
  const [authorName, setAuthorName] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (rating < 1) {
      setError('Оберіть оцінку від 1 до 5 зірок.');
      return;
    }
    if (comment.trim().length < 2) {
      setError('Напишіть, будь ласка, короткий коментар.');
      return;
    }

    setSubmitting(true);
    try {
      const review = await createReview(productId, {
        rating,
        comment: comment.trim(),
        authorName: authorName.trim() || undefined,
      });
      onSubmitted(review);
      setRating(0);
      setAuthorName('');
      setComment('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не вдалося залишити відгук.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-lg border border-line bg-main-cart p-4 shadow-sm"
    >
      <h3 className="font-medium text-anti-text">Залишити відгук</h3>

      <StarRatingInput value={rating} onChange={setRating} />

      <input
        type="text"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        placeholder="Ваше ім'я (необов'язково)"
        className="rounded-md border border-line bg-canvas px-3 py-2 text-sm text-anti-text placeholder:text-third-text outline-none focus:ring-1 focus:ring-star-cart"
      />

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Що ви думаєте про цей продукт?"
        rows={3}
        className="rounded-md border border-line bg-canvas px-3 py-2 text-sm text-anti-text placeholder:text-third-text outline-none focus:ring-1 focus:ring-star-cart"
      />

      {error && <p className="text-sm text-price-cart">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="self-start rounded-md bg-price-cart px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
      >
        {submitting ? 'Надсилаємо...' : 'Надіслати відгук'}
      </button>
    </form>
  );
};

import type { Review } from '../../types/review';
import { StarRating } from '../atoms/StarRating';

type Props = {
  reviews: Review[];
};

export const ReviewList = ({ reviews }: Props) => {
  if (reviews.length === 0) {
    return (
      <p className="text-sm text-third-text">
        Ще немає відгуків. Будьте першим, хто оцінить цей продукт.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {reviews.map((review) => (
        <li
          key={review.id}
          className="rounded-lg border border-line bg-main-cart p-4 text-anti-text"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium">{review.authorName || 'Анонім'}</span>
            <span className="text-xs text-third-text">
              {new Date(review.createdAt).toLocaleDateString('uk-UA')}
            </span>
          </div>
          <StarRating value={review.rating} className="mt-1" />
          <p className="mt-2 text-sm text-second-text">{review.comment}</p>
        </li>
      ))}
    </ul>
  );
};

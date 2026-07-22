import { Star } from "lucide-react";
import cn from "classnames";

type Props = {
  value: number;
  size?: number;
  className?: string;
};

export const StarRating = ({ value, size = 16, className }: Props) => {
  const rounded = Math.round(value);

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          width={size}
          height={size}
          className={
            star <= rounded
              ? "text-star-cart fill-star-cart"
              : "text-third-text"
          }
        />
      ))}
    </div>
  );
};

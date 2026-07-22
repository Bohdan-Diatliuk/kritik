import { useState } from "react";
import { Star } from "lucide-react";
import cn from "classnames";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export const StarRatingInput = ({ value, onChange }: Props) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered ?? value;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(null)}
          className="p-0.5"
          aria-label={`Оцінка ${star} з 5`}
        >
          <Star
            width={24}
            height={24}
            className={cn(
              star <= active
                ? "text-star-cart fill-star-cart"
                : "text-third-text",
            )}
          />
        </button>
      ))}
    </div>
  );
};

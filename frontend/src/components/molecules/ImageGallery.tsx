import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import cn from 'classnames';

type Props = {
  images: string[];
  alt: string;
};

export const ImageGallery = ({ images, alt }: Props) => {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {images[active] ? (
        <img
          src={images[active]}
          alt={alt}
          className="aspect-square w-full rounded-xl border border-line object-cover"
        />
      ) : (
        <div className="flex aspect-square w-full items-center justify-center rounded-xl border border-line bg-canvas text-third-text">
          <ImageOff className="h-10 w-10" />
        </div>
      )}

      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((image, i) => (
            <button
              key={image}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                'h-16 w-16 shrink-0 overflow-hidden rounded-lg border transition',
                i === active ? 'border-price-cart' : 'border-line opacity-70 hover:opacity-100',
              )}
            >
              <img src={image} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

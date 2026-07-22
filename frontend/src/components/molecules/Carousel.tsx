import { useRef, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import cn from 'classnames';

type Props = {
  children: ReactNode;
  className?: string;
};

export const Carousel = ({ children, className }: Props) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({ left: direction * 340, behavior: 'smooth' });
  };

  return (
    <div className={cn('relative', className)}>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      <button
        type="button"
        onClick={() => scroll(-1)}
        aria-label="Прокрутити назад"
        className="absolute -left-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-line bg-main-cart p-2 shadow-md transition hover:bg-canvas sm:flex"
      >
        <ChevronLeft className="h-5 w-5 text-main-text" />
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        aria-label="Прокрутити вперед"
        className="absolute -right-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-line bg-main-cart p-2 shadow-md transition hover:bg-canvas sm:flex"
      >
        <ChevronRight className="h-5 w-5 text-main-text" />
      </button>
    </div>
  );
};

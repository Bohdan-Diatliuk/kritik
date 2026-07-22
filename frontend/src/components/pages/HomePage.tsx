import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { CategorySlider } from '../organisms/CategorySlider';
import { WhyChooseUs } from '../organisms/WhyChooseUs';

const tornEdgeStyle = {
  backgroundImage:
    'linear-gradient(135deg, var(--canvas) 50%, transparent 50%), linear-gradient(45deg, var(--canvas) 50%, transparent 50%)',
  backgroundSize: '22px 22px',
  backgroundPosition: '0 0, 11px 0',
  backgroundColor: 'var(--main-cart)',
};

export const HomePage = () => {
  return (
    <div>
      <section className="bg-main-cart">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-16 md:grid-cols-2 md:items-center md:pt-24">
          <div>
            <span className="text-sm font-medium uppercase tracking-widest text-fresh">
              Kritik · спільнота покупців
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-main-text sm:text-5xl">
              Перевір продукт голосами тих, хто вже його купив
            </h1>
            <p className="mt-4 max-w-md text-base text-second-text">
              Кожен товар у каталозі має реальні оцінки й відгуки покупців —
              без реклами, без накруток. Обери, познайомся з чужим досвідом і
              вирішуй сам.
            </p>
            <Link
              to="/catalog"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-price-cart px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
            >
              Переглянути каталог
            </Link>
          </div>

          <div className="relative hidden h-64 md:block">
            <div className="absolute right-6 top-6 w-72 -rotate-3 rounded-2xl border border-line bg-canvas p-5 shadow-md">
              <div className="flex gap-0.5 text-star-cart">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-star-cart" />
                ))}
              </div>
              <p className="mt-3 text-sm text-second-text">
                «Непогано, але дороге.»
              </p>
              <p className="mt-2 text-xs text-third-text">— Анонім</p>
            </div>

            <div className="absolute left-2 top-16 w-72 rotate-2 rounded-2xl border border-line bg-main-cart p-5 shadow-xl">
              <div className="flex gap-0.5 text-star-cart">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-star-cart" />
                ))}
              </div>
              <p className="mt-3 text-sm font-medium text-main-text">
                «Дуже смачна курка, беремо вже втретє!»
              </p>
              <p className="mt-2 text-xs text-third-text">
                — Оля, Broiler Chicken Fillet
              </p>
            </div>
          </div>
        </div>

        <div className="h-5 w-full" style={tornEdgeStyle} />
      </section>

      <CategorySlider />
      <WhyChooseUs />
    </div>
  );
};

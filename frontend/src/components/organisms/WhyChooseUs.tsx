import { ClipboardCheck, MessagesSquare, RefreshCw, ShieldCheck } from 'lucide-react';
import { Carousel } from '../molecules/Carousel';

const reasons = [
  {
    icon: MessagesSquare,
    title: 'Лише реальні відгуки',
    description:
      'Оцінки й коментарі залишають люди, які справді куштували продукт — без замовних текстів.',
  },
  {
    icon: ShieldCheck,
    title: 'Прозорі оцінки',
    description:
      'Середній рейтинг і кількість відгуків видно одразу в каталозі — жодних прихованих цифр.',
  },
  {
    icon: ClipboardCheck,
    title: 'Великий вибір',
    description: 'Сотні перевірених продуктів у м’ясі, рибі, випічці, напоях та інших категоріях.',
  },
  {
    icon: RefreshCw,
    title: 'Оновлюється щодня',
    description: 'Нові відгуки з’являються постійно, тож картина завжди актуальна.',
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <h2 className="font-display text-3xl font-semibold text-main-text">
        Чому люди обирають нас
      </h2>
      <p className="mt-1 text-sm text-third-text">
        Kritik існує заради однієї речі — чесності до покупки.
      </p>

      <Carousel className="mt-6">
        {reasons.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex h-48 w-72 shrink-0 snap-start flex-col gap-3 rounded-2xl border border-line bg-main-cart p-5 shadow-sm"
          >
            <span className="inline-flex w-fit rounded-full bg-fresh/10 p-2.5 text-fresh">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="font-medium text-main-text">{title}</h3>
            <p className="text-sm text-third-text">{description}</p>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

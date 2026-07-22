import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="border-t border-line bg-main-cart">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 sm:flex-row sm:justify-between">
        <div className="max-w-sm">
          <span className="font-display text-xl font-semibold text-main-text">Kritik</span>
          <p className="mt-2 text-sm text-third-text">
            Майданчик чесних відгуків на реальні продукти. Ми не продаємо — ми
            показуємо, що про товар кажуть ті, хто вже його спробував.
          </p>
        </div>

        <div className="flex gap-12">
          <div className="flex flex-col gap-2 text-sm">
            <span className="font-medium text-main-text">Навігація</span>
            <Link to="/" className="text-third-text hover:text-main-text">
              Головна
            </Link>
            <Link to="/catalog" className="text-third-text hover:text-main-text">
              Каталог
            </Link>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <span className="font-medium text-main-text">Контакти</span>
            <a href="mailto:hello@kritik.ua" className="text-third-text hover:text-main-text">
              hello@kritik.ua
            </a>
            <span className="text-third-text">Київ, Україна</span>
          </div>
        </div>
      </div>

      <div className="border-t border-line px-6 py-4 text-center text-xs text-third-text">
        © {new Date().getFullYear()} Kritik. Усі права захищено.
      </div>
    </footer>
  );
};

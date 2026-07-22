import { NavLink } from "react-router-dom";
import cn from "classnames";

const links = [
  { to: "/", label: "Головна", end: true },
  { to: "/catalog", label: "Каталог", end: false },
  { to: "/add-product", label: "Додати товар", end: false },
];

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-main-cart/90 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6 py-4">
        <NavLink
          to="/"
          className="justify-self-start font-display text-2xl font-semibold text-main-text"
        >
          Kritik
        </NavLink>

        <nav className="flex items-center gap-8 justify-self-center">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium transition",
                  isActive
                    ? "text-price-cart"
                    : "text-second-text hover:text-main-text",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div />
      </div>
    </header>
  );
};

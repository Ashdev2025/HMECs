import { Link } from "react-router";

type NavbarProps = {
  active: string;
  setActive: (value: string) => void;
};

export default function Navbar({ active, setActive }: NavbarProps) {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" },
    { id: "maintenance", label: "Maintenance" },
    { id: "reports", label: "Reports" },
    { id: "contact", label: "Contact Us" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="text-3xl font-black tracking-tight">
          <span className="text-blue-600">HME</span>
          <span className="text-slate-900">intelligence</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setActive(item.id)}
              className={`border-b-2 pb-1 transition ${
                active === item.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-600 hover:text-blue-600"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/signin"
            className="hidden text-sm font-semibold text-slate-700 hover:text-blue-600 sm:block"
          >
            Login
          </Link>

          <Link
            to="/pricing"
            className="rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("selectedPlan");

    setIsOpen(false);

    navigate("/signin");
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          setIsOpen((prev) => !prev);
        }}
        className="flex items-center text-gray-700 dark:text-gray-400"
      >
        <span className="h-10 w-10 overflow-hidden rounded-full lg:h-11 lg:w-11">
          <img
            src="/images/user/owner.jpg"
            alt="User"
            className="h-full w-full object-cover"
          />
        </span>

        <span className="ml-3 mr-1 hidden font-medium text-theme-sm lg:block">
          Musharof
        </span>

        <svg
          className={`hidden transition-transform duration-200 lg:block ${
            isOpen ? "rotate-180" : ""
          } stroke-gray-500 dark:stroke-gray-400`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 z-99999 mt-3 w-[260px] rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
        >
          <div>
            <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
              Musharof Chowdhury
            </span>

            <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
              randomuser@pimjo.com
            </span>
          </div>

          <ul className="mt-4 flex flex-col gap-1 border-b border-gray-200 pb-3 dark:border-gray-800">
            <li>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-3 py-2 font-medium text-gray-700 text-theme-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5"
              >
                Edit Profile
              </Link>
            </li>
          </ul>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 block w-full rounded-lg px-3 py-2 text-left font-medium text-red-600 text-theme-sm hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
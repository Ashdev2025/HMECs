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
    localStorage.removeItem("authToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("selectedPlan");

    setIsOpen(false);

    navigate("/signin", { replace: true });

    window.location.reload();
  };

  const savedUser = localStorage.getItem("user");
  const userData = savedUser ? JSON.parse(savedUser) : null;

  const userName =
    userData?.name ||
    localStorage.getItem("name") ||
    localStorage.getItem("userName") ||
    "User";

  const userEmail =
    userData?.email ||
    localStorage.getItem("email") ||
    "user@example.com";

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
        <span className="h-10 w-10 overflow-hidden rounded-full border border-gray-200 dark:border-gray-700 lg:h-11 lg:w-11">
          <img
            src="/images/user/owner.jpg"
            alt="User"
            className="h-full w-full object-cover"
          />
        </span>

        <span className="ml-3 mr-1 hidden max-w-[120px] truncate font-medium text-theme-sm text-gray-700 dark:text-gray-300 lg:block">
          {userName}
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
          className="absolute right-0 z-99999 mt-3 w-[270px] overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 shadow-2xl dark:border-gray-800 dark:bg-gray-900"
        >
          <div className="rounded-xl bg-gray-50 p-3 dark:bg-white/[0.03]">
            <span className="block truncate font-semibold text-gray-800 text-theme-sm dark:text-white">
              {userName}
            </span>

            <span className="mt-1 block truncate text-theme-xs text-gray-500 dark:text-gray-400">
              {userEmail}
            </span>
          </div>

          <ul className="mt-3 flex flex-col gap-1 border-b border-gray-200 pb-3 dark:border-gray-800">
            <li>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center rounded-xl px-3 py-2 font-medium text-gray-700 text-theme-sm transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
              >
                Edit Profile
              </Link>
            </li>
          </ul>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 flex w-full items-center justify-center rounded-xl bg-red-50 px-3 py-2.5 text-center font-semibold text-red-600 text-theme-sm transition hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
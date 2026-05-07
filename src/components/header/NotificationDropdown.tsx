import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Link } from "react-router";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  function toggleDropdown() {
    setIsOpen((prev) => !prev);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
    setNotifying(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white lg:h-11 lg:w-11"
        onClick={handleClick}
      >
        <span
          className={`absolute right-0 top-0.5 z-10 h-2 w-2 rounded-full bg-orange-400 ${
            !notifying ? "hidden" : "flex"
          }`}
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
        </span>

        <svg
          className="fill-current"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.75 2.29248C10.75 1.87827 10.4143 1.54248 10 1.54248C9.58583 1.54248 9.25004 1.87827 9.25004 2.29248V2.83613C6.08266 3.20733 3.62504 5.9004 3.62504 9.16748V14.4591H3.33337C2.91916 14.4591 2.58337 14.7949 2.58337 15.2091C2.58337 15.6234 2.91916 15.9591 3.33337 15.9591H4.37504H15.625H16.6667C17.0809 15.9591 17.4167 15.6234 17.4167 15.2091C17.4167 14.7949 17.0809 14.4591 16.6667 14.4591H16.375V9.16748C16.375 5.9004 13.9174 3.20733 10.75 2.83613V2.29248ZM14.875 14.4591V9.16748C14.875 6.47509 12.6924 4.29248 10 4.29248C7.30765 4.29248 5.12504 6.47509 5.12504 9.16748V14.4591H14.875ZM8.00004 17.7085C8.00004 18.1228 8.33583 18.4585 8.75004 18.4585H11.25C11.6643 18.4585 12 18.1228 12 17.7085C12 17.2943 11.6643 16.9585 11.25 16.9585H8.75004C8.33583 16.9585 8.00004 17.2943 8.00004 17.7085Z"
            fill="currentColor"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="fixed left-1/2 top-16 z-99999 flex h-[480px] w-[calc(100vw-24px)] max-w-[361px] -translate-x-1/2 flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark lg:absolute lg:left-auto lg:right-0 lg:top-full lg:mt-[17px] lg:w-[361px] lg:translate-x-0"
      >
        <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-700">
          <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Notification
          </h5>

          <button
            type="button"
            onClick={closeDropdown}
            className="text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto custom-scrollbar">
          {[
            ["Terry Franci", "Project - Nganter App", "5 min ago", "/images/user/user-02.jpg"],
            ["Alena Franci", "Project - Nganter App", "8 min ago", "/images/user/user-03.jpg"],
            ["Jocelyn Kenter", "Project - Nganter App", "15 min ago", "/images/user/user-04.jpg"],
            ["Brandon Philips", "Project - Nganter App", "1 hr ago", "/images/user/user-05.jpg"],
            ["Terry Franci", "Project - Nganter App", "5 min ago", "/images/user/user-02.jpg"],
            ["Alena Franci", "Project - Nganter App", "8 min ago", "/images/user/user-03.jpg"],
            ["Jocelyn Kenter", "Project - Nganter App", "15 min ago", "/images/user/user-04.jpg"],
            ["Brandon Philips", "Project - Nganter App", "1 hr ago", "/images/user/user-05.jpg"],
          ].map(([name, project, time, img], index) => (
            <li key={`${name}-${index}`}>
              <DropdownItem
                onItemClick={closeDropdown}
                className="flex gap-3 rounded-lg border-b border-gray-100 px-3 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5 sm:px-4.5"
              >
                <span className="relative block h-10 w-10 shrink-0 rounded-full">
                  <img
                    width={40}
                    height={40}
                    src={img}
                    alt="User"
                    className="h-10 w-10 overflow-hidden rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 z-10 h-2.5 w-2.5 rounded-full border-[1.5px] border-white bg-success-500 dark:border-gray-900" />
                </span>

                <span className="min-w-0 block">
                  <span className="mb-1.5 block text-theme-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-gray-800 dark:text-white/90">
                      {name}
                    </span>{" "}
                    requests permission to change{" "}
                    <span className="font-medium text-gray-800 dark:text-white/90">
                      {project}
                    </span>
                  </span>

                  <span className="flex items-center gap-2 text-theme-xs text-gray-500 dark:text-gray-400">
                    <span>Project</span>
                    <span className="h-1 w-1 rounded-full bg-gray-400" />
                    <span>{time}</span>
                  </span>
                </span>
              </DropdownItem>
            </li>
          ))}
        </ul>

        <Link
          to="/"
          onClick={closeDropdown}
          className="mt-3 block rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          View All Notifications
        </Link>
      </Dropdown>
    </div>
  );
}
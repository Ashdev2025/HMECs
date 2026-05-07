import { useState } from "react";
import { Link, useLocation } from "react-router";
import { useSidebar } from "../context/SidebarContext";
import { sidebarConfig } from "../config/sidebar.config";
import type { UserRole, NavLinkItem } from "../config/sidebar.config";

type AppSidebarProps = {
  role?: UserRole;
};

export default function AppSidebar({ role = "super_admin" }: AppSidebarProps) {
  const location = useLocation();

  const sidebarData = sidebarConfig[role];
  const dashboardItem = sidebarData.dashboardItem;
  const navGroups = sidebarData.navGroups;
  const profile = sidebarData.profile;

  const [openGroup, setOpenGroup] = useState<string | null>(
    navGroups[0]?.title || null
  );
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(
    role === "super_admin" ? "User Management" : null
  );

  const {
    isMobileOpen,
    isExpanded,
    isHovered,
    toggleMobileSidebar,
    setIsHovered,
  } = useSidebar();

  const isDesktopOpen = isExpanded || isHovered;
  const showText = isMobileOpen || isDesktopOpen;

  const closeSidebar = () => {
    if (isMobileOpen) toggleMobileSidebar();
  };

  const toggleGroup = (title: string) => {
    setOpenGroup((prev) => (prev === title ? null : title));
  };

  const toggleSubMenu = (name: string) => {
    setOpenSubMenu((prev) => (prev === name ? null : name));
  };

  const renderLink = (item: NavLinkItem, isChild = false) => {
    const isActive = location.pathname === item.path;

    if (item.children) {
      const isOpen = openSubMenu === item.name;

      return (
        <div key={item.name}>
          <button
            type="button"
            onClick={() => toggleSubMenu(item.name)}
            className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-blue-50 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                {item.icon}
              </span>

              {showText && <span className="truncate">{item.name}</span>}
            </span>

            {showText && (
              <span
                className={`shrink-0 transition-transform ${
                  isOpen ? "rotate-90" : ""
                }`}
              >
                ›
              </span>
            )}
          </button>

          {isOpen && showText && (
            <div className="mt-2 space-y-2 pl-5">
              {item.children.map((child) => renderLink(child, true))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.name}
        to={item.path || "#"}
        onClick={closeSidebar}
        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
          isChild ? "text-[13px]" : ""
        } ${
          isActive
            ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25"
            : "text-gray-600 hover:bg-blue-50 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
        }`}
      >
        <span className="flex h-5 w-5 shrink-0 items-center justify-center">
          {item.icon}
        </span>

        {showText && <span className="truncate">{item.name}</span>}
      </Link>
    );
  };

  return (
    <>
      {isMobileOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed left-0 top-0 z-[60] flex h-screen flex-col border-r border-gray-200 bg-white text-gray-900 shadow-xl transition-all duration-300 dark:border-white/10 dark:bg-gradient-to-b dark:from-[#071225] dark:via-[#0B1730] dark:to-[#070F1F] dark:text-white
          ${isMobileOpen ? "translate-x-0 w-[290px]" : "-translate-x-full w-[290px]"}
          ${isDesktopOpen ? "lg:w-[290px]" : "lg:w-[90px]"}
          lg:translate-x-0`}
      >
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-gray-200 px-5 dark:border-white/10">
          {showText ? (
            <h1 className="truncate text-xl font-bold tracking-wide">
              HME{" "}
              <span className="text-blue-600 dark:text-blue-500">
                INTELLIGENCE
              </span>
            </h1>
          ) : (
            <h1 className="text-xl font-bold text-blue-600 dark:text-blue-500">
              HME
            </h1>
          )}

          <button
            type="button"
            onClick={closeSidebar}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-white lg:hidden"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="space-y-2">{renderLink(dashboardItem)}</div>

          <div className="mt-7 space-y-3">
            {navGroups.map((group) => {
              const isOpen = openGroup === group.title;

              return (
                <div key={group.title}>
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.title)}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    {showText ? (
                      <span className="truncate">{group.title}</span>
                    ) : (
                      <span className="mx-auto text-xs">
                        {group.title.charAt(0)}
                      </span>
                    )}

                    {showText && (
                      <span
                        className={`shrink-0 transition-transform ${
                          isOpen ? "rotate-90" : ""
                        }`}
                      >
                        ›
                      </span>
                    )}
                  </button>

                  {isOpen && (
                    <div className="mt-2 space-y-2">
                      {group.items.map((item) => renderLink(item))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {showText && (
          <div className="shrink-0 p-4">
            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-3 shadow-sm dark:border-white/10 dark:bg-white/10">
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {profile.shortName}
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-slate-900" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                  {profile.title}
                </p>
                <p className="truncate text-xs text-gray-500 dark:text-slate-400">
                  {profile.subtitle}
                </p>
              </div>

              <span className="shrink-0 text-gray-400 dark:text-slate-400">
                ›
              </span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
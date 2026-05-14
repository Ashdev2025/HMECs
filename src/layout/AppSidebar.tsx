import { useState } from "react";
import { Link, useLocation } from "react-router";
import { useSidebar } from "../context/SidebarContext";
import { sidebarConfig } from "../config/sidebar.config";
import type { UserRole, NavLinkItem } from "../config/sidebar.config";
import { X, ChevronRight } from "lucide-react";

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

  // Filter groups: Main vs Bottom (Settings)
  const mainGroups = navGroups.filter(g => g.title !== "Settings");
  const settingsGroup = navGroups.find(g => g.title === "Settings");

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

    if (item.children && !item.isComingSoon) {
      const isOpen = openSubMenu === item.name;

      return (
        <div key={item.name}>
          <button
            type="button"
            onClick={() => toggleSubMenu(item.name)}
            className="flex w-full items-center justify-between rounded-2xl px-6 py-4.5 text-[15px] font-black text-slate-900 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-white"
          >
            <span className="flex min-w-0 items-center gap-5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center text-slate-900 group-hover:text-orange-500 transition-colors">
                {item.icon}
              </span>

              {showText && <span className="truncate tracking-tight">{item.name}</span>}
            </span>

            {showText && (
              <span
                className={`shrink-0 transition-transform text-slate-400 ${
                  isOpen ? "rotate-90" : ""
                }`}
              >
                <ChevronRight size={18} />
              </span>
            )}
          </button>

          {isOpen && showText && (
            <div className="mt-2 space-y-2 pl-8">
              {item.children.map((child) => renderLink(child, true))}
            </div>
          )}
        </div>
      );
    }
// ... rest of renderLink logic ...

    return (
      <Link
        key={item.name}
        to={item.path || "#"}
        onClick={closeSidebar}
        className={`group relative flex items-center gap-5 rounded-[1.5rem] px-6 py-4.5 text-[15px] font-black transition-all duration-200 ${
          isChild ? "text-[14px]" : ""
        } ${
          isActive
            ? "bg-slate-900 text-white shadow-2xl shadow-slate-900/20 dark:bg-white dark:text-slate-900"
            : "text-slate-900 hover:bg-slate-50 hover:text-orange-600 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-white"
        }`}
      >
        <span className={`flex h-6 w-6 shrink-0 items-center justify-center transition-colors ${isActive ? "text-orange-400" : "text-slate-900 group-hover:text-orange-500"}`}>
          {item.icon}
        </span>

        {showText && (
          <div className="flex flex-1 items-center justify-between min-w-0">
            <span className="truncate tracking-tight">{item.name}</span>
            {item.isComingSoon && (
              <span className="px-3 py-1 rounded-lg bg-orange-50 text-[9px] font-black text-orange-500 uppercase tracking-[0.1em] border border-orange-100 shadow-sm">
                Soon
              </span>
            )}
          </div>
        )}
      </Link>
    );
  };

  return (
    <>
      {isMobileOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-[55] bg-slate-900/20 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed left-0 top-0 z-[60] flex h-screen flex-col border-r border-slate-100 bg-white text-slate-900 shadow-2xl transition-all duration-300 dark:border-white/5 dark:bg-[#0F172A] dark:text-white
          ${isMobileOpen ? "translate-x-0 w-[300px]" : "-translate-x-full w-[300px]"}
          ${isDesktopOpen ? "lg:w-[300px]" : "lg:w-[100px]"}
          lg:translate-x-0`}
      >
        {/* Premium Logo Section */}
        <div className="flex h-28 shrink-0 items-center justify-between px-8">
          <div className="flex items-center gap-4 overflow-hidden">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 dark:bg-white shadow-lg shadow-slate-900/20">
               <span className="text-lg font-black text-white dark:text-slate-900">H</span>
            </div>
            {showText && (
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tighter text-slate-900 dark:text-white leading-tight">
                  HME <span className="text-orange-500">INTEL</span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  Fleet Intelligence
                </span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={closeSidebar}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400 dark:bg-white/5 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden space-y-10">
          <div>
            <p className={`mb-5 px-5 text-[11px] font-black uppercase tracking-[0.25em] text-slate-900 dark:text-slate-400 ${!showText && "text-center"}`}>
              {showText ? "Main Overview" : "•••"}
            </p>
            <div className="space-y-2">{renderLink(dashboardItem)}</div>
          </div>

          {mainGroups.map((group) => {
            const isOpen = openGroup === group.title;
            const hasTitle = group.title.trim() !== "";

            return (
              <div key={group.title || Math.random()} className="space-y-4">
                {hasTitle ? (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleGroup(group.title)}
                      className={`flex w-full items-center justify-between px-5 text-[11px] font-black uppercase tracking-[0.25em] text-slate-900 dark:text-slate-400 transition-colors hover:text-orange-500 ${!showText && "justify-center"}`}
                    >
                      {showText ? group.title : "•••"}
                      {showText && (
                        <span className={`transition-transform duration-200 text-slate-400 ${isOpen ? "rotate-90" : ""}`}>
                          <ChevronRight size={18} />
                        </span>
                      )}
                    </button>

                    {isOpen && (
                      <div className="space-y-2 animate-in slide-in-from-top-2 duration-200">
                        {group.items.map((item) => renderLink(item))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="space-y-2">
                    {group.items.map((item) => renderLink(item))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom Section: Settings & Profile */}
        <div className="shrink-0 p-5 space-y-4 border-t border-slate-50 dark:border-white/5">
          {settingsGroup && (
            <div className="space-y-1.5">
               {settingsGroup.items.map(item => renderLink(item))}
            </div>
          )}

          {showText && (
            <div className="flex items-center gap-4 rounded-3xl bg-slate-50 p-4 dark:bg-white/5 border border-slate-100 dark:border-white/5 shadow-sm">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-xs font-black text-white shadow-lg shadow-orange-500/20">
                {profile.shortName}
                <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500 dark:border-slate-900 shadow-sm" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  {profile.title}
                </p>
                <p className="truncate text-[10px] font-bold text-slate-400">
                  {profile.subtitle}
                </p>
              </div>

              <button className="h-8 w-8 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
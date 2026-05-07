import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import type { UserRole } from "../config/sidebar.config";

type AppLayoutProps = {
  role?: UserRole;
};

const LayoutContent: React.FC<AppLayoutProps> = ({ role = "super_admin" }) => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <AppSidebar role={role} />
      <Backdrop />

      <div
        className={`transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />

        <main className="w-full p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const AppLayout: React.FC<AppLayoutProps> = ({ role = "super_admin" }) => {
  return (
    <SidebarProvider>
      <LayoutContent role={role} />
    </SidebarProvider>
  );
};

export default AppLayout;
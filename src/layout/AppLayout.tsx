import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet, Link } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import type { UserRole } from "../config/sidebar.config";
import { CompanyAdminNav } from "../components/company-admin/CompanyAdminNav";
import { useEffect, useState } from "react";
import { userService } from "../services/userService";
import { AlertCircle, Rocket } from "lucide-react";

type AppLayoutProps = {
  role?: UserRole;
};

const LayoutContent: React.FC<AppLayoutProps> = ({ role = "super_admin" }) => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const [hasActiveSub, setHasActiveSub] = useState(true);

  useEffect(() => {
    if (role === "company_admin") {
      const checkSub = async () => {
        try {
          const sub = await userService.getActiveSubscription();
          setHasActiveSub(!!(sub?.data || sub));
        } catch (e) {
          setHasActiveSub(false);
        }
      };
      checkSub();
    }
  }, [role]);

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

        {!hasActiveSub && role === "company_admin" && (
          <div className="mx-6 mt-6 overflow-hidden rounded-2xl bg-orange-500 p-1 text-white shadow-lg shadow-orange-500/20 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-orange-600 rounded-xl px-6 py-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <AlertCircle className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest">Read-Only Mode Active</h4>
                  <p className="text-xs font-medium text-orange-100 mt-0.5">Your subscription has expired. You can view data but cannot make changes.</p>
                </div>
              </div>
              <Link 
                to="/plans" 
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-orange-600 text-[10px] font-black uppercase tracking-widest hover:bg-orange-50 transition shadow-lg"
              >
                Upgrade Now <Rocket size={14} />
              </Link>
            </div>
          </div>
        )}

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
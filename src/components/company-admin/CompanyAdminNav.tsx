import React from "react";
import { Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  ClipboardList, 
  TaskIcon, 
  GridIcon, 
  PlusIcon 
} from "../icons";
import { 
  LayoutDashboard as Dashboard,
  ClipboardList as Register,
  Activity as Log,
  Map as HeatMap,
  PlusCircle,
  AlertCircle
} from "lucide-react";

export const CompanyAdminNav: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { name: "Dashboard", path: "/company-admin/dashboard", icon: <Dashboard size={18} /> },
    { name: "Component Register", path: "/company-admin/register", icon: <Register size={18} /> },
    { name: "Maintenance Log", path: "/company-admin/maintenance", icon: <Log size={18} /> },
    { name: "Fleet Heat Map", path: "/company-admin/heatmap", icon: <HeatMap size={18} /> },
    { name: "Alerts & Logs", path: "/company-admin/alerts", icon: <AlertCircle size={18} /> },
  ];

  return (
    <div className="mb-8 flex flex-wrap items-center gap-1 rounded-[2.5rem] bg-white p-2 shadow-sm border border-slate-100 dark:bg-slate-800 dark:border-slate-700 w-full">
      <div className="flex flex-wrap items-center gap-1">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-8 py-4 rounded-[2rem] text-[11px] font-black uppercase tracking-widest transition-all ${
                isActive 
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-900/50'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
        
        <Link
          to="/company-admin/add-component"
          className={`flex items-center gap-3 px-8 py-4 rounded-[2rem] text-[11px] font-black uppercase tracking-widest transition-all ${
            currentPath === "/company-admin/add-component"
              ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
              : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-900/50'
          }`}
        >
          <PlusCircle size={18} />
          Add Component
        </Link>
      </div>
    </div>
  );
};

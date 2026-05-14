import React from "react";
import {
  GridIcon,
  UserCircleIcon,
  PieChartIcon,
  BoxCubeIcon,
  TableIcon,
  TaskIcon,
  PlusIcon,
} from "../icons";

export type UserRole = "super_admin" | "company_admin";

export type NavLinkItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  children?: NavLinkItem[];
  isComingSoon?: boolean;
};

export type NavGroup = {
  title: string;
  items: NavLinkItem[];
};

export const sidebarConfig: Record<
  UserRole,
  {
    dashboardItem: NavLinkItem;
    navGroups: NavGroup[];
    profile: {
      shortName: string;
      title: string;
      subtitle: string;
    };
  }
> = {
  super_admin: {
    dashboardItem: {
      icon: <GridIcon />,
      name: "Dashboard",
      path: "/super-admin/dashboard",
    },
    navGroups: [
      {
        title: "Admin Management",
        items: [
          {
            name: "User Management",
            icon: <UserCircleIcon />,
            children: [
              {
                name: "Users",
                path: "/admin-management/users",
                icon: <UserCircleIcon />,
              },
              {
                name: "Roles",
                path: "/admin-management/roles",
                icon: <UserCircleIcon />,
              },
              {
                name: "Plans",
                path: "/admin-management/plans",
                icon: <BoxCubeIcon />,
              },
            ],
          },
          {
            name: "Company Admins",
            path: "/company-admins",
            icon: <UserCircleIcon />,
          },
          { name: "Operators", path: "/operators", icon: <UserCircleIcon /> },
          { name: "Mechanics", path: "/mechanics", icon: <BoxCubeIcon /> },
          { name: "Machines", path: "/machines", icon: <BoxCubeIcon /> },
        ],
      },
      {
        title: "Monitoring",
        items: [
          {
            name: "Machine Health",
            path: "/machine-health",
            icon: <PieChartIcon />,
          },
          { name: "Alerts & Logs", path: "/alerts", icon: <BoxCubeIcon /> },
          { name: "Reports", path: "/reports", icon: <BoxCubeIcon /> },
        ],
      },
      {
        title: "Settings",
        items: [
          {
            name: "Plans & Billing",
            path: "/plans-billing",
            icon: <BoxCubeIcon />,
          },
          {
            name: "System Settings",
            path: "/settings",
            icon: <BoxCubeIcon />,
          },
        ],
      },
    ],
    profile: {
      shortName: "SA",
      title: "Super Admin",
      subtitle: "Super Administrator",
    },
  },

  company_admin: {
    dashboardItem: {
      icon: <GridIcon />,
      name: "Dashboard",
      path: "/company-admin/dashboard",
    },
    navGroups: [
      {
        title: "Staff Management",
        items: [
          {
            name: "Manage Staff",
            path: "/company-admin/staff",
            icon: <UserCircleIcon />,
          },
          {
            name: "Roles & Permissions",
            path: "/company-admin/coming-soon/roles",
            icon: <BoxCubeIcon />,
            isComingSoon: true,
          },
          {
            name: "Teams & Groups",
            path: "/company-admin/coming-soon/teams",
            icon: <BoxCubeIcon />,
            isComingSoon: true,
          },
        ],
      },
      {
        title: "Monitoring",
        items: [
          {
            name: "Component Register",
            path: "/company-admin/register",
            icon: <TableIcon />,
          },
          {
            name: "Maintenance Log",
            path: "/company-admin/maintenance",
            icon: <TaskIcon />,
          },
          {
            name: "Fleet Heat Map",
            path: "/company-admin/heatmap",
            icon: <GridIcon />,
          },
          {
            name: "Alerts & Logs",
            path: "/company-admin/alerts",
            icon: <BoxCubeIcon />,
          },
          {
            name: "Reports",
            path: "/company-admin/coming-soon/reports",
            icon: <BoxCubeIcon />,
            isComingSoon: true,
          },
        ],
      },
      {
        title: "Plans",
        items: [
          {
            name: "Subscriptions",
            path: "/company-admin/subscriptions",
            icon: <BoxCubeIcon />,
          },
        ],
      },
      {
        title: "Settings",
        items: [
          {
            name: "Company Settings",
            path: "/company-admin/coming-soon/settings",
            icon: <BoxCubeIcon />,
            isComingSoon: true,
          },
        ],
      },
    ],
    profile: {
      shortName: "CA",
      title: "Company Admin",
      subtitle: "Company Administrator",
    },
  },
};
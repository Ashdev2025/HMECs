import { Navigate, Outlet } from "react-router";

type RoleProtectedRouteProps = {
  allowedRoles: string[];
};

function normalizeRole(role?: string | null) {
  return role?.toLowerCase().trim().replace(/\s+/g, "_").replace(/-/g, "_");
}

export default function RoleProtectedRoute({
  allowedRoles,
}: RoleProtectedRouteProps) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  const normalizedUserRole = normalizeRole(role);

  const normalizedAllowedRoles = allowedRoles.map((role) =>
    normalizeRole(role),
  );

  const hasAccess =
    normalizedUserRole && normalizedAllowedRoles.includes(normalizedUserRole);

  if (!hasAccess) {
    return <Navigate to="/access-denied" replace />;
  }

  return <Outlet />;
}

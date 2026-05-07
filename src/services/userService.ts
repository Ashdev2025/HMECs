import { apiRequest } from "./api";

export type ApiRole = {
  id: number;
  name: string;
};

export type ApiUser = {
  id: string | number;
  first_name?: string;
  last_name?: string;
  fname?: string;
  lname?: string;
  name?: string;
  email?: string;
  mobile?: string;
  mobile_number?: string;
  phone?: string;
  role?: string | { id?: number; name?: string };
  role_name?: string;
  role_id?: number;
  createdAt?: string;
  created_at?: string;
  company_id?: string | number | null;
  company_code?: string | null;
  company?: {
    name?: string;
  };
};

export type AddUserPayload = {
  name: string;
  email: string;
  phone: string;
  role: string;
  company: string;
};

export type UpdateUserPayload = {
  first_name?: string;
  last_name?: string;
  email?: string;
  mobile_number?: string;
  role_name?: string;
  role_id?: number;
  company_id?: string | number;
  status?: string;
  is_active?: boolean;
};

const roleNameMap: Record<string, string> = {
  "Super Admin": "super_admin",
  "Company Admin": "admin",
  Admin: "admin",
  Engineer: "engineer",
  Planner: "planner",
  Viewer: "viewer",
  super_admin: "super_admin",
  admin: "admin",
  engineer: "engineer",
  planner: "planner",
  viewer: "viewer",
};

const roleIdMap: Record<string, number> = {
  super_admin: 1,
  admin: 2,
  engineer: 3,
  planner: 4,
  viewer: 5,
};

const isValidUUID = (value: string) => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
};

const getCompanyIdFromToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return "";

    const payload = JSON.parse(atob(token.split(".")[1]));

    return payload.company_id || payload.companyId || payload.company?.id || "";
  } catch {
    return "";
  }
};

const splitName = (name: string) => {
  const nameParts = name.trim().split(" ");
  const firstName = nameParts[0] || name;
  const lastName = nameParts.slice(1).join(" ") || "";

  return { firstName, lastName };
};

const getValidCompanyId = (company: string) => {
  const tokenCompanyId = getCompanyIdFromToken();
  const formCompanyId = company.trim();

  const companyId = isValidUUID(formCompanyId) ? formCompanyId : tokenCompanyId;

  if (!companyId) {
    throw new Error("Valid company_id not found. Please login again.");
  }

  return companyId;
};

const normalizeUsersResponse = (
  response: { data?: ApiUser[]; users?: ApiUser[] } | ApiUser[],
): ApiUser[] => {
  if (Array.isArray(response)) return response;
  return response.data || response.users || [];
};

export const userService = {
  getRoles: async (): Promise<ApiRole[]> => {
    return apiRequest<ApiRole[]>("/auth/roles", {
      method: "GET",
    });
  },

  getUsers: async (): Promise<ApiUser[]> => {
    const response = await apiRequest<
      { data?: ApiUser[]; users?: ApiUser[] } | ApiUser[]
    >("/auth/users", {
      method: "GET",
    });

    return normalizeUsersResponse(response);
  },

  getUserById: (id: string | number): Promise<ApiUser> => {
    return apiRequest<ApiUser>(`/auth/users/${id}`, {
      method: "GET",
    });
  },

  addUser: (payload: AddUserPayload) => {
    const { firstName, lastName } = splitName(payload.name);
    const companyId = getValidCompanyId(payload.company);

    const roleName = roleNameMap[payload.role] || payload.role || "viewer";
    const roleId = roleIdMap[roleName];

    return apiRequest("/auth/users", {
      method: "POST",
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: payload.email,
        password: "password123",
        mobile_number: payload.phone,
        role_name: roleName,
        role_id: roleId,
        company_id: companyId,
      }),
    });
  },

  updateUser: (id: string | number, payload: UpdateUserPayload) => {
    const roleName = payload.role_name
      ? roleNameMap[payload.role_name] || payload.role_name
      : undefined;

    const roleId = roleName ? roleIdMap[roleName] : payload.role_id;

    return apiRequest(`/auth/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...(payload.first_name ? { first_name: payload.first_name } : {}),
        ...(payload.last_name ? { last_name: payload.last_name } : {}),
        ...(payload.email ? { email: payload.email } : {}),
        ...(payload.mobile_number
          ? { mobile_number: payload.mobile_number }
          : {}),
        ...(roleName ? { role_name: roleName } : {}),
        ...(roleId ? { role_id: roleId } : {}),
        ...(payload.company_id ? { company_id: payload.company_id } : {}),
      }),
    });
  },

  deleteUser: (id: string | number) => {
    return apiRequest(`/auth/users/${id}`, {
      method: "DELETE",
    });
  },
};

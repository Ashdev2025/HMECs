import { useEffect, useMemo, useState } from "react";
import {
  Eye,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  UserCheck,
  X,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import {
  ApiRole,
  createRole as createRoleApi,
  deleteRole as deleteRoleApi,
  getRoles,
  updateRole as updateRoleApi,
} from "../../../services/roleService";

import { userService } from "../../../services/userService";

type RoleStatus = "active" | "inactive";

type Role = {
  id: number | string;
  name: string;
  rawName: string;
  status: RoleStatus;
  createdAt?: string;
  updatedAt?: string;
};

type ApiUser = {
  id: number | string;
  first_name?: string;
  last_name?: string;
  fname?: string;
  lname?: string;
  name?: string;
  email?: string;
  mobile?: string;
  mobile_number?: string;
  phone?: string;
  role_name?: string;
  role?: string | { name?: string };
  company_name?: string;
  company?: string | { name?: string };
};

type UserRow = {
  id: number | string;
  name: string;
  email: string;
  phone: string;
  role: string;
  company: string;
};

type FormState = {
  name: string;
};

const emptyForm: FormState = {
  name: "",
};

const formatRoleName = (name: string) =>
  name
    .replace(/_/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const normalizeRoleName = (name: string) =>
  name.toLowerCase().replace(/\s+/g, "_").trim();

const formatDate = (date?: string) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "—";

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const normalizeRolesResponse = (response: any): ApiRole[] => {
  if (Array.isArray(response)) return response;

  if (Array.isArray(response?.roles)) {
    return response.roles;
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.data?.roles)) {
    return response.data.roles;
  }

  return [];
};

const normalizeUsersResponse = (response: any): ApiUser[] => {
  if (Array.isArray(response)) return response;

  if (Array.isArray(response?.users)) {
    return response.users;
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.data?.users)) {
    return response.data.users;
  }

  return [];
};

const getUserName = (user: ApiUser) => {
  const firstName = user.first_name || user.fname || "";
  const lastName = user.last_name || user.lname || "";

  return user.name || `${firstName} ${lastName}`.trim() || "Unknown User";
};

const getUserRole = (user: ApiUser) => {
  const roleValue =
    user.role_name ||
    (typeof user.role === "object" ? user.role?.name : user.role) ||
    "viewer";

  return formatRoleName(roleValue);
};

const getCompanyName = (user: ApiUser) => {
  if (typeof user.company === "object") {
    return user.company?.name || "—";
  }

  return user.company_name || user.company || "—";
};

const mapApiUserToRow = (user: ApiUser): UserRow => ({
  id: user.id,
  name: getUserName(user),
  email: user.email || "—",
  phone: user.mobile_number || user.mobile || user.phone || "—",
  role: getUserRole(user),
  company: getCompanyName(user),
});

export default function Roles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);

  const [viewRole, setViewRole] = useState<Role | null>(null);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [deleteRole, setDeleteRole] = useState<Role | null>(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [roleUsers, setRoleUsers] = useState<UserRow[]>([]);

  const [form, setForm] = useState<FormState>(emptyForm);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);

      const response = await getRoles();

      const data = normalizeRolesResponse(response);

      const mappedRoles: Role[] = data.map((role) => {
        const rawName = String(role.name || "");

        return {
          id: role.id,
          rawName,
          name: formatRoleName(rawName),
          status: role.status === "inactive" ? "inactive" : "active",
          createdAt: formatDate((role as any).created_at),
          updatedAt: formatDate((role as any).updated_at),
        };
      });

      setRoles(mappedRoles);
    } catch (error: any) {
      toast.error(error?.message || "Failed to fetch roles");
    } finally {
      setLoading(false);
    }
  };

  const filteredRoles = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return roles;

    return roles.filter(
      (role) =>
        role.name.toLowerCase().includes(value) ||
        role.rawName.toLowerCase().includes(value) ||
        role.status.toLowerCase().includes(value),
    );
  }, [roles, search]);

  const activeRoles = roles.filter((role) => role.status === "active").length;

  const openAddModal = () => {
    setForm(emptyForm);
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    if (actionLoading) return;

    setIsAddModalOpen(false);
    setForm(emptyForm);
  };

  const openEditModal = (role: Role) => {
    setEditingRole(role);

    setForm({
      name: role.name,
    });
  };

  const closeEditModal = () => {
    if (actionLoading) return;

    setEditingRole(null);
    setForm(emptyForm);
  };

  const handleCreateRole = async () => {
    if (!form.name.trim()) {
      toast.error("Please enter role name");
      return;
    }

    try {
      setActionLoading(true);

      await createRoleApi({
        name: normalizeRoleName(form.name),
      });

      toast.success("Role created successfully");

      closeAddModal();

      await fetchRoles();
    } catch (error: any) {
      toast.error(error?.message || "Failed to create role");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateRole = async () => {
    if (!editingRole) return;

    if (!form.name.trim()) {
      toast.error("Please enter role name");
      return;
    }

    try {
      setActionLoading(true);

      await updateRoleApi(editingRole.id, {
        name: normalizeRoleName(form.name),
      });

      toast.success("Role updated successfully");

      closeEditModal();

      await fetchRoles();
    } catch (error: any) {
      toast.error(error?.message || "Failed to update role");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteRole = async () => {
    if (!deleteRole) return;

    try {
      setActionLoading(true);

      await deleteRoleApi(deleteRole.id);

      toast.success("Role deleted successfully");

      setDeleteRole(null);

      await fetchRoles();
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete role");
    } finally {
      setActionLoading(false);
    }
  };

  const openRoleUsersModal = async (role: Role) => {
    try {
      setSelectedRole(role);
      setUsersLoading(true);

      const response = await userService.getUsers();

      const usersData = normalizeUsersResponse(response);

      setRoleUsers(usersData.map(mapApiUserToRow));
    } catch (error: any) {
      toast.error(error?.message || "Failed to fetch users");
    } finally {
      setUsersLoading(false);
    }
  };

  const handleAssignRole = async (userId: number | string) => {
    if (!selectedRole) return;

    try {
      setActionLoading(true);

      await userService.updateUser(userId, {
        role_name: selectedRole.rawName,
      } as any);

      toast.success(`${selectedRole.name} role assigned successfully`);

      setSelectedRole(null);
      setRoleUsers([]);
    } catch (error: any) {
      toast.error(error?.message || "Failed to assign role");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Role Management
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage system roles and access
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-[#0f172a]">
            <Search size={16} className="text-gray-400" />

            <input
              placeholder="Search roles..."
              className="bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            onClick={fetchRoles}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-60 dark:border-gray-700 dark:bg-[#0f172a] dark:text-white dark:hover:bg-white/10"
            type="button"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            type="button"
          >
            <Plus size={16} />
            Add Role
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard title="Total Roles" value={String(roles.length)} />

        <StatCard title="Active Roles" value={String(activeRoles)} />

        <StatCard
          title="Inactive Roles"
          value={String(roles.length - activeRoles)}
        />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-[#0f172a]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Roles List
          </h2>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Showing {filteredRoles.length} roles
          </p>
        </div>

        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="border-b border-gray-200 text-gray-500 dark:border-gray-700 dark:text-gray-400">
              <tr>
                <th className="py-3">Role Name</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center text-gray-500 dark:text-gray-400"
                  >
                    Loading roles...
                  </td>
                </tr>
              ) : filteredRoles.length > 0 ? (
                filteredRoles.map((role) => (
                  <tr
                    key={role.id}
                    onClick={() => openRoleUsersModal(role)}
                    className="cursor-pointer border-b border-gray-100 transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/5"
                  >
                    <td className="py-3 font-medium text-gray-900 dark:text-white">
                      {role.name}
                    </td>

                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          role.status === "active"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {role.status}
                      </span>
                    </td>

                    <td className="text-gray-500 dark:text-gray-400">
                      {role.createdAt}
                    </td>

                    <td className="text-gray-500 dark:text-gray-400">
                      {role.updatedAt}
                    </td>

                    <td onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-center gap-2 py-3">
                        <button
                          onClick={() => setViewRole(role)}
                          className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-white/10 dark:hover:text-white"
                          type="button"
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          onClick={() => openEditModal(role)}
                          className="rounded-lg p-2 text-blue-500 transition hover:bg-blue-500/10"
                          type="button"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => setDeleteRole(role)}
                          className="rounded-lg p-2 text-red-500 transition hover:bg-red-500/10"
                          type="button"
                        >
                          <Trash2 size={16} />
                        </button>

                        <button
                          onClick={() => openRoleUsersModal(role)}
                          className="rounded-lg p-2 text-green-500 transition hover:bg-green-500/10"
                          type="button"
                        >
                          <UserCheck size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center text-gray-500 dark:text-gray-400"
                  >
                    No roles found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isAddModalOpen && (
        <RoleFormModal
          title="Add Role"
          form={form}
          setForm={setForm}
          onClose={closeAddModal}
          onSubmit={handleCreateRole}
          submitText={actionLoading ? "Creating..." : "Create Role"}
          disabled={actionLoading}
        />
      )}

      {editingRole && (
        <RoleFormModal
          title="Edit Role"
          form={form}
          setForm={setForm}
          onClose={closeEditModal}
          onSubmit={handleUpdateRole}
          submitText={actionLoading ? "Updating..." : "Update Role"}
          disabled={actionLoading}
        />
      )}

      {viewRole && (
        <ViewRoleModal role={viewRole} onClose={() => setViewRole(null)} />
      )}

      {selectedRole && (
        <RoleUsersModal
          role={selectedRole}
          users={roleUsers}
          loading={usersLoading}
          assigning={actionLoading}
          onClose={() => {
            setSelectedRole(null);
            setRoleUsers([]);
          }}
          onAssign={handleAssignRole}
        />
      )}

      {deleteRole && (
        <DeleteConfirmModal
          role={deleteRole}
          onClose={() => setDeleteRole(null)}
          onDelete={handleDeleteRole}
          disabled={actionLoading}
        />
      )}
    </div>
  );
}

function RoleFormModal({
  title,
  form,
  setForm,
  onClose,
  onSubmit,
  submitText,
  disabled,
}: any) {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-[#0f172a]">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>

          <button
            onClick={onClose}
            disabled={disabled}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10"
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        <InputField
          label="Role Name"
          value={form.name}
          placeholder="admin / engineer / planner / viewer"
          onChange={(value: string) => setForm({ name: value })}
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={disabled}
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-white/10"
            type="button"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            disabled={disabled}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
            type="button"
          >
            {submitText}
          </button>
        </div>
      </div>
    </div>
  );
}

function ViewRoleModal({ role, onClose }: any) {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-[#0f172a]">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Role Details
          </h3>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10"
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <DetailRow label="Role ID" value={role.id} />
          <DetailRow label="Role Name" value={role.name} />
          <DetailRow label="Status" value={role.status} />
          <DetailRow label="Created At" value={role.createdAt} />
          <DetailRow label="Updated At" value={role.updatedAt} />
        </div>
      </div>
    </div>
  );
}

function RoleUsersModal({
  role,
  users,
  loading,
  assigning,
  onClose,
  onAssign,
}: any) {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-[#0f172a]">
        <div className="border-b border-gray-200 p-5 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Assign {role.name}
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Click any user to assign role
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10"
              type="button"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="border-b border-gray-200 text-gray-500 dark:border-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Current Role</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-10 text-center text-gray-500 dark:text-gray-400"
                    >
                      Loading users...
                    </td>
                  </tr>
                ) : users.length > 0 ? (
                  users.map((user: any) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-100 dark:border-gray-800"
                    >
                      <td className="px-4 py-3 text-gray-900 dark:text-white">
                        {user.name}
                      </td>

                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                        {user.email}
                      </td>

                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                        {user.phone}
                      </td>

                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                        {user.company}
                      </td>

                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                        {user.role}
                      </td>

                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => onAssign(user.id)}
                          disabled={assigning}
                          className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                          type="button"
                        >
                          {assigning ? "Assigning..." : "Assign"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-10 text-center text-gray-500 dark:text-gray-400"
                    >
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirmModal({ role, onClose, onDelete, disabled }: any) {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-[#0f172a]">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Delete Role
        </h3>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {role.name}
          </span>
          ?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={disabled}
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-white/10"
            type="button"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            disabled={disabled}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
            type="button"
          >
            {disabled ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }: any) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-[#0f172a]">
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>

      <h3 className="mt-1 text-xl font-bold text-gray-900 dark:text-white">
        {value}
      </h3>
    </div>
  );
}

function DetailRow({ label, value }: any) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-white/5">
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>

      <p className="mt-1 font-semibold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

function InputField({ label, value, placeholder, onChange }: any) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-200 bg-transparent px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:text-white"
      />
    </div>
  );
}

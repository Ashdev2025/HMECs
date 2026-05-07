import { useEffect, useMemo, useState } from "react";
import { Eye, Pencil, Search, Trash2, X } from "lucide-react";
import { getRoles } from "../../../services/roleService";

type RoleStatus = "active" | "inactive";

type Role = {
  id: number;
  name: string;
  rawName: string;
  description: string;
  users: number;
  permissions: number;
  status: RoleStatus;
};

type PurchasedUser = {
  id: number;
  name: string;
  email: string;
  phone: string;
  plan: string;
  assignedRole: string;
};

type FormState = {
  name: string;
  description: string;
  users: string;
  permissions: string;
  status: RoleStatus;
};

const purchasedUsersData: PurchasedUser[] = [
  {
    id: 1,
    name: "Thabo Mbeki",
    email: "thabo.mbeki@example.com",
    phone: "+27 82 123 4567",
    plan: "Premium Plan",
    assignedRole: "Operator",
  },
  {
    id: 2,
    name: "Sipho Dlamini",
    email: "sipho.dlamini@example.com",
    phone: "+27 83 234 5678",
    plan: "Enterprise Plan",
    assignedRole: "Company Admin",
  },
  {
    id: 3,
    name: "Lerato Khumalo",
    email: "lerato.khumalo@example.com",
    phone: "+27 84 345 6789",
    plan: "Basic Plan",
    assignedRole: "Mechanic",
  },
  {
    id: 4,
    name: "Zanele Nkosi",
    email: "zanele.nkosi@example.com",
    phone: "+27 85 456 7890",
    plan: "Premium Plan",
    assignedRole: "Operator",
  },
  {
    id: 5,
    name: "Kagiso Molefe",
    email: "kagiso.molefe@example.com",
    phone: "+27 86 567 8901",
    plan: "Enterprise Plan",
    assignedRole: "Super Admin",
  },
];

const emptyForm: FormState = {
  name: "",
  description: "",
  users: "",
  permissions: "",
  status: "active",
};

const formatRoleName = (name: string) =>
  name
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const getRoleDescription = (name: string) => {
  const descriptions: Record<string, string> = {
    super_admin: "Full access to all features and system settings",
    admin: "Manage company assets, users and data",
    engineer: "View machines and technical data",
    planner: "Manage maintenance planning",
    viewer: "View only access",
  };

  return descriptions[name] || "Role access control";
};

const getRolePermissions = (name: string) => {
  const permissions: Record<string, number> = {
    super_admin: 20,
    admin: 18,
    engineer: 14,
    planner: 13,
    viewer: 8,
  };

  return permissions[name] || 0;
};

export default function Roles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [purchasedUsers, setPurchasedUsers] =
    useState<PurchasedUser[]>(purchasedUsersData);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [assignRole, setAssignRole] = useState<Role | null>(null);
  const [deleteRole, setDeleteRole] = useState<Role | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);

      const data = await getRoles();

      const mappedRoles: Role[] = data.map((role) => {
        const formattedName = formatRoleName(role.name);

        return {
          id: role.id,
          rawName: role.name,
          name: formattedName,
          description: getRoleDescription(role.name),
          users: 0,
          permissions: getRolePermissions(role.name),
          status: "active",
        };
      });

      setRoles(mappedRoles);
    } catch (error) {
      console.error("Error fetching roles:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRoles = useMemo(() => {
    const value = search.trim().toLowerCase();

    return roles.filter(
      (role) =>
        role.name.toLowerCase().includes(value) ||
        role.rawName.toLowerCase().includes(value) ||
        role.description.toLowerCase().includes(value) ||
        role.status.toLowerCase().includes(value)
    );
  }, [roles, search]);

  const totalUsers = purchasedUsers.length;
  const totalPermissions = roles.reduce(
    (sum, role) => sum + role.permissions,
    0
  );
  const activeRoles = roles.filter((role) => role.status === "active").length;

  const getAssignedUserCount = (roleName: string) => {
    return purchasedUsers.filter((user) => user.assignedRole === roleName)
      .length;
  };

  const openEditModal = (role: Role) => {
    setEditingRole(role);
    setForm({
      name: role.name,
      description: role.description,
      users: String(getAssignedUserCount(role.name)),
      permissions: String(role.permissions),
      status: role.status,
    });
  };

  const closeFormModal = () => {
    setEditingRole(null);
    setForm(emptyForm);
  };

  const handleSubmit = () => {
    if (!editingRole) return;

    if (!form.name.trim() || !form.description.trim()) {
      alert("Please fill role name and description.");
      return;
    }

    const permissionsValue = Number(form.permissions || 0);

    if (permissionsValue < 0) {
      alert("Permissions cannot be negative.");
      return;
    }

    setRoles((prev) =>
      prev.map((role) =>
        role.id === editingRole.id
          ? {
              ...role,
              name: form.name.trim(),
              description: form.description.trim(),
              permissions: permissionsValue,
              status: form.status,
            }
          : role
      )
    );

    closeFormModal();
  };

  const handleAssignUser = (userId: number, roleName: string) => {
    setPurchasedUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, assignedRole: roleName } : user
      )
    );

    setAssignRole(null);
  };

  const handleDelete = () => {
    if (!deleteRole) return;

    setRoles((prev) => prev.filter((role) => role.id !== deleteRole.id));
    setDeleteRole(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Role Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage role assignment for plan purchased users
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
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4">
        <StatCard title="Total Roles" value={String(roles.length)} />
        <StatCard title="Active Roles" value={String(activeRoles)} />
        <StatCard title="Plan Users" value={String(totalUsers)} />
        <StatCard title="Permissions" value={String(totalPermissions)} />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-[#0f172a]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Roles List
          </h2>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Showing {filteredRoles.length} of {roles.length} roles
          </p>
        </div>

        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="border-b border-gray-200 text-gray-500 dark:border-gray-700 dark:text-gray-400">
              <tr>
                <th className="py-3">Role Name</th>
                <th>Description</th>
                <th>Users</th>
                <th>Permissions</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 text-center text-gray-500 dark:text-gray-400"
                  >
                    Loading roles...
                  </td>
                </tr>
              ) : filteredRoles.length > 0 ? (
                filteredRoles.map((role) => (
                  <tr
                    key={role.id}
                    onClick={() => setAssignRole(role)}
                    className="cursor-pointer border-b border-gray-100 transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/5"
                  >
                    <td className="py-3 font-medium text-gray-900 dark:text-white">
                      {role.name}
                    </td>

                    <td className="max-w-[360px] text-gray-500 dark:text-gray-400">
                      {role.description}
                    </td>

                    <td className="text-gray-900 dark:text-white">
                      {getAssignedUserCount(role.name)}
                    </td>

                    <td className="text-gray-900 dark:text-white">
                      {role.permissions}
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

                    <td onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-center gap-3 py-3">
                        <button
                          onClick={() => setAssignRole(role)}
                          className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-white/10 dark:hover:text-white"
                          title="View Users"
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          onClick={() => openEditModal(role)}
                          className="rounded-lg p-2 text-blue-500 transition hover:bg-blue-500/10"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => setDeleteRole(role)}
                          className="rounded-lg p-2 text-red-500 transition hover:bg-red-500/10"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 text-center text-gray-500 dark:text-gray-400"
                  >
                    No roles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editingRole && (
        <RoleFormModal
          title="Edit Role"
          form={form}
          setForm={setForm}
          onClose={closeFormModal}
          onSubmit={handleSubmit}
          submitText="Update Role"
        />
      )}

      {assignRole && (
        <AssignUserRoleModal
          role={assignRole}
          users={purchasedUsers}
          onClose={() => setAssignRole(null)}
          onAssign={handleAssignUser}
        />
      )}

      {deleteRole && (
        <DeleteConfirmModal
          role={deleteRole}
          onClose={() => setDeleteRole(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

function AssignUserRoleModal({
  role,
  users,
  onClose,
  onAssign,
}: {
  role: Role;
  users: PurchasedUser[];
  onClose: () => void;
  onAssign: (userId: number, roleName: string) => void;
}) {
  const [userSearch, setUserSearch] = useState("");

  const filteredUsers = users.filter((user) => {
    const value = userSearch.trim().toLowerCase();

    return (
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value) ||
      user.phone.toLowerCase().includes(value) ||
      user.plan.toLowerCase().includes(value) ||
      user.assignedRole.toLowerCase().includes(value)
    );
  });

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-[#0f172a]">
        <div className="border-b border-gray-200 p-5 dark:border-gray-800">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Assign User as {role.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Select any plan purchased user to assign this role
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 dark:border-gray-700">
            <Search size={16} className="text-gray-400" />
            <input
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              placeholder="Search user by name, email, phone, plan or role..."
              className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 scrollbar-hide">
          <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500 dark:bg-white/5 dark:text-gray-400">
                <tr>
                  <th className="px-4 py-3">User Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Plan</th>
                  <th className="px-4 py-3">Current Role</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => {
                    const isSelected = user.assignedRole === role.name;

                    return (
                      <tr
                        key={user.id}
                        onClick={() => onAssign(user.id, role.name)}
                        className={`cursor-pointer border-t border-gray-100 transition dark:border-gray-800 ${
                          isSelected
                            ? "bg-blue-50 dark:bg-blue-500/10"
                            : "hover:bg-gray-50 dark:hover:bg-white/5"
                        }`}
                      >
                        <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </td>

                        <td className="whitespace-nowrap px-4 py-3 text-gray-500 dark:text-gray-400">
                          {user.email}
                        </td>

                        <td className="whitespace-nowrap px-4 py-3 text-gray-500 dark:text-gray-400">
                          {user.phone}
                        </td>

                        <td className="whitespace-nowrap px-4 py-3 text-gray-500 dark:text-gray-400">
                          {user.plan}
                        </td>

                        <td className="whitespace-nowrap px-4 py-3">
                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-white/10 dark:text-gray-300">
                            {user.assignedRole}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-4 py-3 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onAssign(user.id, role.name);
                            }}
                            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                              isSelected
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white dark:bg-white/10 dark:text-gray-300"
                            }`}
                          >
                            {isSelected ? "Assigned" : "Assign"}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-gray-500 dark:text-gray-400"
                    >
                      No purchased users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="border-t border-gray-200 p-4 text-right dark:border-gray-800">
          <button
            onClick={onClose}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-[#0f172a] sm:rounded-2xl sm:p-4">
      <p className="truncate text-[11px] text-gray-500 dark:text-gray-400 sm:text-sm">
        {title}
      </p>
      <h3 className="mt-1 text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
        {value}
      </h3>
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
}: {
  title: string;
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  onClose: () => void;
  onSubmit: () => void;
  submitText: string;
}) {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-[#0f172a]">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <InputField
            label="Role Name"
            value={form.name}
            placeholder="Enter role name"
            onChange={(value) => setForm((prev) => ({ ...prev, name: value }))}
          />

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Enter role description"
              className="w-full rounded-xl border border-gray-200 bg-transparent px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:text-white"
            />
          </div>

          <InputField
            label="Permissions"
            type="number"
            value={form.permissions}
            placeholder="0"
            onChange={(value) =>
              setForm((prev) => ({ ...prev, permissions: value }))
            }
          />

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  status: e.target.value as RoleStatus,
                }))
              }
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-[#0f172a] dark:text-white"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-white/10"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            {submitText}
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirmModal({
  role,
  onClose,
  onDelete,
}: {
  role: Role;
  onClose: () => void;
  onDelete: () => void;
}) {
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
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-white/10"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  placeholder,
  type = "text",
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  type?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-200 bg-transparent px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:text-white"
      />
    </div>
  );
}
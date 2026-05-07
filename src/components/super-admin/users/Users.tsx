import { useEffect, useMemo, useState } from "react";
import Pagination from "../../common/Pagination";
import UserModal from "./UserModal";
import UsersFilters from "./UsersFilters";
import UsersStats from "./UsersStats";
import UsersTable from "./UsersTable";
import type { ModalMode, User, UserFormData, UserStatus } from "./userTypes";
import { userService } from "../../../services/userService";

type ApiUser = {
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
  role_name?: string;
  role?: string | { name?: string };
  company_name?: string;
  company?: string | { name?: string };
  company_code?: string | null;
  status?: string;
  is_active?: boolean;
  last_login?: string;
  lastLogin?: string;
  created_at?: string;
  createdAt?: string;
};

const emptyForm: UserFormData = {
  name: "",
  email: "",
  phone: "",
  role: "Operator",
  company: "",
  status: "active",
};

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

const formatRole = (role?: string) => {
  if (!role) return "Operator";

  return role
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const getCompanyName = (user: ApiUser) => {
  if (typeof user.company === "object") {
    return user.company?.name || "—";
  }

  return user.company_name || user.company || user.company_code || "—";
};

const getUserStatus = (user: ApiUser): UserStatus => {
  if (typeof user.is_active === "boolean") {
    return user.is_active ? "active" : "inactive";
  }

  return ((user.status || "active").toLowerCase() as UserStatus) || "active";
};

const mapApiUserToUser = (user: ApiUser): User => {
  const firstName = user.first_name || user.fname || "";
  const lastName = user.last_name || user.lname || "";

  const fullName =
    user.name || `${firstName} ${lastName}`.trim() || "Unknown User";

  const roleValue =
    user.role_name ||
    (typeof user.role === "object" ? user.role?.name : user.role) ||
    "Operator";

  return {
    id: user.id,
    name: fullName,
    email: user.email || "—",
    phone: user.mobile_number || user.mobile || user.phone || "—",
    role: formatRole(roleValue),
    company: getCompanyName(user),
    status: getUserStatus(user),
    lastLogin: user.last_login || user.lastLogin || "—",
    createdAt: formatDate(user.created_at || user.createdAt),
  };
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("add");
  const [editingUserId, setEditingUserId] = useState<string | number | null>(
    null
  );
  const [formData, setFormData] = useState<UserFormData>(emptyForm);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [viewUser, setViewUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await userService.getUsers();

     const usersData = response;

      const mappedUsers = usersData.map(mapApiUserToUser);

      setUsers(mappedUsers);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        user.name.toLowerCase().includes(searchText) ||
        user.email.toLowerCase().includes(searchText) ||
        user.phone.toLowerCase().includes(searchText) ||
        user.company.toLowerCase().includes(searchText);

      const matchesRole = roleFilter === "All Roles" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "All Status" ||
        user.status === (statusFilter.toLowerCase() as UserStatus);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / usersPerPage);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * usersPerPage + 1;
  const endItem = Math.min(currentPage * usersPerPage, totalItems);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, roleFilter, statusFilter]);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const openAddModal = () => {
    setModalMode("add");
    setEditingUserId(null);
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

  const openViewModal = async (user: User) => {
    try {
      setViewLoading(true);

      const response = await userService.getUserById(user.id);
      const mappedUser = mapApiUserToUser(response as ApiUser);

      setViewUser(mappedUser);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to fetch user details");
    } finally {
      setViewLoading(false);
    }
  };

  const openEditModal = (user: User) => {
    setModalMode("edit");
    setEditingUserId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role === "Super Admin" ? "Company Admin" : user.role,
      company: user.company,
      status: user.status,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isSubmitting) return;

    setIsModalOpen(false);
    setModalMode("add");
    setEditingUserId(null);
    setFormData(emptyForm);
  };

  const handleSubmitUser = async () => {
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.company.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setIsSubmitting(true);

      if (modalMode === "edit" && editingUserId !== null) {
        const nameParts = formData.name.trim().split(" ");

        await userService.updateUser(editingUserId, {
          first_name: nameParts[0] || formData.name,
          last_name: nameParts.slice(1).join(" ") || "",
          email: formData.email,
          mobile_number: formData.phone,
          role_name: formData.role,
          status: formData.status,
        });

        await fetchUsers();

        closeModal();
        alert("User updated successfully");
        return;
      }

      await userService.addUser(formData);

      await fetchUsers();

      setCurrentPage(1);
      closeModal();
      alert("User created successfully");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save user");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDeleteModal = (id: string | number) => {
    const selectedUser = users.find((user) => user.id === id);

    if (selectedUser) {
      setDeleteUser(selectedUser);
    }
  };

  const handleConfirmDeleteUser = async () => {
    if (!deleteUser) return;

    try {
      setIsSubmitting(true);

      await userService.deleteUser(deleteUser.id);

      await fetchUsers();

      setDeleteUser(null);

      alert("User deleted successfully");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete user");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeDeleteModal = () => {
    if (isSubmitting) return;
    setDeleteUser(null);
  };

  const clearFilters = () => {
    setSearch("");
    setRoleFilter("All Roles");
    setStatusFilter("All Status");
    setCurrentPage(1);
  };

  return (
    <div className="flex h-[calc(100dvh-80px)] min-h-0 flex-col overflow-hidden bg-gray-50 p-2 dark:bg-[#0B1120] sm:p-4">
      <div className="shrink-0 space-y-2 sm:space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
              Users
            </h1>
            <p className="text-[11px] text-gray-500 dark:text-slate-400 sm:text-xs">
              Manage all users and their access
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              onClick={fetchUsers}
              disabled={loading}
              className="h-8 w-full rounded-lg border border-gray-200 bg-white px-4 text-xs font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-[#1F2A44] dark:bg-[#111827] dark:text-slate-300 dark:hover:bg-white/10 sm:h-9 sm:w-auto"
            >
              {loading ? "Loading..." : "Refresh"}
            </button>

            <button
              onClick={openAddModal}
              className="h-8 w-full rounded-lg bg-blue-600 px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:h-9 sm:w-auto"
            >
              + Add User
            </button>
          </div>
        </div>

        <UsersStats users={users} />
      </div>

      <div className="mt-2 flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-[#1F2A44] dark:bg-[#111827] sm:mt-4">
        <UsersFilters
          search={search}
          roleFilter={roleFilter}
          statusFilter={statusFilter}
          onSearchChange={setSearch}
          onRoleFilterChange={setRoleFilter}
          onStatusFilterChange={setStatusFilter}
          onClearFilters={clearFilters}
        />

        <div className="min-h-0 flex-1 overflow-y-auto px-0 py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden xl:p-0">
          {loading ? (
            <div className="flex h-40 items-center justify-center text-sm text-gray-500 dark:text-slate-400">
              Loading users...
            </div>
          ) : error ? (
            <div className="flex h-40 items-center justify-center text-sm text-red-500">
              {error}
            </div>
          ) : (
            <>
              <UsersTable
                users={paginatedUsers}
                onView={openViewModal}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
              />

              {filteredUsers.length === 0 && (
                <div className="flex h-40 items-center justify-center text-sm text-gray-500 dark:text-slate-400">
                  No users found
                </div>
              )}
            </>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          startItem={startItem}
          endItem={endItem}
          totalItems={totalItems}
          onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          onNext={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        />
      </div>

      <UserModal
        isOpen={isModalOpen}
        mode={modalMode}
        formData={formData}
        onClose={closeModal}
        onSubmit={handleSubmitUser}
        onFormChange={setFormData}
        isSubmitting={isSubmitting}
      />

      {viewLoading && <ViewLoadingModal />}

      {viewUser && !viewLoading && (
        <ViewUserModal user={viewUser} onClose={() => setViewUser(null)} />
      )}

      {deleteUser && (
        <DeleteUserModal
          user={deleteUser}
          onClose={closeDeleteModal}
          onDelete={handleConfirmDeleteUser}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}

function ViewLoadingModal() {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="rounded-2xl border border-gray-200 bg-white px-6 py-5 text-sm font-semibold text-gray-700 shadow-2xl dark:border-[#1F2A44] dark:bg-[#0F172A] dark:text-white">
        Loading user details...
      </div>
    </div>
  );
}

function ViewUserModal({
  user,
  onClose,
}: {
  user: User;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="h-auto w-full max-w-lg overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl [scrollbar-width:none] [-ms-overflow-style:none] dark:border-[#1F2A44] dark:bg-[#0F172A] sm:p-5 [&::-webkit-scrollbar]:hidden">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              User Details
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
              Complete user profile information
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="mb-5 rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-[#1F2A44] dark:bg-[#111C33]">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold uppercase text-blue-700 dark:bg-blue-500/20 dark:text-blue-400">
              {user.name.charAt(0)}
            </div>

            <div className="min-w-0">
              <h4 className="truncate text-lg font-bold text-gray-900 dark:text-white">
                {user.name}
              </h4>
              <p className="truncate text-sm text-gray-600 dark:text-slate-300">
                {user.email}
              </p>
              <p className="text-sm text-gray-600 dark:text-slate-300">
                {user.phone}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 gap-2">
            <DetailRow label="Name" value={user.name} />
            <DetailRow label="Email" value={user.email} />
            <DetailRow label="Phone" value={user.phone} />
          </div>

          <div className="border-t border-gray-200 dark:border-[#1F2A44]" />

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <DetailRow label="Role" value={user.role} />
            <DetailRow label="Company" value={user.company} />
            <DetailRow label="Status" value={user.status} />
            <DetailRow label="Last Login" value={user.lastLogin} />
            <DetailRow label="Created At" value={user.createdAt} />
            <DetailRow label="User ID" value={user.id} />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteUserModal({
  user,
  onClose,
  onDelete,
  isSubmitting,
}: {
  user: User;
  onClose: () => void;
  onDelete: () => void;
  isSubmitting: boolean;
}) {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-[#0f172a]">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Delete User
        </h3>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {user.name}
          </span>
          ? This user will be deleted from backend.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:text-white dark:hover:bg-white/10"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            disabled={isSubmitting}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 dark:border-[#1F2A44] dark:bg-[#111C33]">
      <p className="text-xs font-medium text-gray-500 dark:text-slate-400">
        {label}
      </p>
      <p className="mt-1 break-words font-semibold capitalize text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}
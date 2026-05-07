import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
    CheckCircle2,
    Eye,
    Pencil,
    Plus,
    Search,
    Trash2,
    X,
    XCircle,
} from "lucide-react";

import Pagination from "../../components/common/Pagination";
import { userService, type ApiRole, type ApiUser } from "../../services/userService";

type Staff = {
    id: string | number;
    name: string;
    email: string;
    phone: string;
    role: string;
    roleId?: number;
    joinedAt: string;
};

type StaffFormData = {
    name: string;
    email: string;
    role: string;
};

type ToastType = "success" | "error";

type Toast = {
    id: number;
    type: ToastType;
    message: string;
};

const emptyForm: StaffFormData = {
    name: "",
    email: "",
    role: "",
};

const formatDateTime = (date?: string) => {
    if (!date) return "Recently Added";

    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return "Recently Added";

    return parsedDate.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};

const formatRole = (role?: string) => {
    if (!role) return "Viewer";

    return role
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

const getRoleName = (user: ApiUser) => {
    if (typeof user.role === "object" && user.role !== null) {
        return user.role?.name || user.role_name || "viewer";
    }

    return user.role_name || user.role || "viewer";
};

const mapApiUserToStaff = (user: ApiUser): Staff => {
    const firstName = user.first_name || user.fname || "";
    const lastName = user.last_name || user.lname || "";

    return {
        id: user.id,
        name: user.name || `${firstName} ${lastName}`.trim() || "Unknown Staff",
        email: user.email || "—",
        phone: user.mobile_number || user.mobile || user.phone || "—",
        role: getRoleName(user),
        roleId: user.role_id,
        joinedAt: formatDateTime(user.created_at || user.createdAt),
    };
};

export default function StaffManagement() {
    const [staffList, setStaffList] = useState<Staff[]>([]);
    const [roles, setRoles] = useState<ApiRole[]>([]);
    const [toasts, setToasts] = useState<Toast[]>([]);

    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");

    const [viewStaff, setViewStaff] = useState<Staff | null>(null);
    const [editStaff, setEditStaff] = useState<Staff | null>(null);
    const [deleteStaff, setDeleteStaff] = useState<Staff | null>(null);
    const [isAddOpen, setIsAddOpen] = useState(false);

    const [formData, setFormData] = useState<StaffFormData>(emptyForm);
    const [currentPage, setCurrentPage] = useState(1);

    const [loading, setLoading] = useState(false);
    const [rolesLoading, setRolesLoading] = useState(false);
    const [viewLoading, setViewLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const perPage = 5;

    function showToast(type: ToastType, message: string) {
        const id = Date.now();

        setToasts((prev) => [...prev, { id, type, message }]);

        window.setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 3000);
    }

    function removeToast(id: number) {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }

    const filteredRoles = useMemo(() => {
        return roles.filter((role) => role.name !== "super_admin");
    }, [roles]);

    const fetchRoles = async () => {
        try {
            setRolesLoading(true);

            const response = await userService.getRoles();
            const companyStaffRoles = response.filter(
                (role) => role.name !== "super_admin"
            );

            setRoles(companyStaffRoles);

            if (!formData.role && companyStaffRoles.length > 0) {
                setFormData((prev) => ({
                    ...prev,
                    role: companyStaffRoles[0].name,
                }));
            }
        } catch (err) {
            showToast(
                "error",
                err instanceof Error ? err.message : "Failed to fetch roles"
            );
        } finally {
            setRolesLoading(false);
        }
    };

    const fetchStaffUsers = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await userService.getUsers();
            const mappedStaff = response.map(mapApiUserToStaff);

            setStaffList(mappedStaff);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to fetch staff";
            setError(message);
            showToast("error", message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();
        fetchStaffUsers();
    }, []);

    const filteredStaff = useMemo(() => {
        return staffList.filter((staff) => {
            const searchText = search.toLowerCase();

            const matchSearch =
                staff.name.toLowerCase().includes(searchText) ||
                staff.email.toLowerCase().includes(searchText) ||
                staff.phone.toLowerCase().includes(searchText);

            const matchRole = roleFilter === "All" || staff.role === roleFilter;

            return matchSearch && matchRole;
        });
    }, [staffList, search, roleFilter]);

    const totalItems = filteredStaff.length;
    const totalPages = Math.ceil(totalItems / perPage);

    const paginatedStaff = filteredStaff.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * perPage + 1;
    const endItem = Math.min(currentPage * perPage, totalItems);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, roleFilter]);

    useEffect(() => {
        if (totalPages > 0 && currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    function openAddModal() {
        setFormData({
            ...emptyForm,
            role: filteredRoles[0]?.name || "viewer",
        });
        setIsAddOpen(true);
    }

    async function openViewModal(staff: Staff) {
        try {
            setViewLoading(true);
            setViewStaff(null);

            const response = await userService.getUserById(staff.id);
            const mappedStaff = mapApiUserToStaff(response);

            setViewStaff(mappedStaff);
        } catch (err) {
            showToast(
                "error",
                err instanceof Error ? err.message : "Failed to fetch staff detail"
            );
        } finally {
            setViewLoading(false);
        }
    }

    function openEditModal(staff: Staff) {
        setEditStaff(staff);
        setFormData({
            name: staff.name,
            email: staff.email === "—" ? "" : staff.email,
            role: staff.role,
        });
    }

    function closeFormModal() {
        if (isSubmitting) return;

        setIsAddOpen(false);
        setEditStaff(null);
        setFormData(emptyForm);
    }

    async function handleSubmitStaff() {
        if (!formData.name.trim() || !formData.email.trim()) {
            showToast("error", "Please fill name and email");
            return;
        }

        if (!formData.role) {
            showToast("error", "Please select role");
            return;
        }

        try {
            setIsSubmitting(true);

            const selectedRole = filteredRoles.find(
                (role) => role.name === formData.role
            );

            if (editStaff) {
                const nameParts = formData.name.trim().split(" ");

                await userService.updateUser(editStaff.id, {
                    first_name: nameParts[0] || formData.name,
                    last_name: nameParts.slice(1).join(" ") || "",
                    email: formData.email,
                    role_name: formData.role,
                    role_id: selectedRole?.id,
                });

                await fetchStaffUsers();

                setEditStaff(null);
                setFormData(emptyForm);
                showToast("success", "Staff updated successfully");
                return;
            }
            await userService.addUser({
                name: formData.name,
                email: formData.email,
                phone: "",
                role: formData.role,
                company: "",
            });

            await fetchStaffUsers();

            setCurrentPage(1);
            setIsAddOpen(false);
            setFormData(emptyForm);
            showToast("success", "Staff created successfully");
        } catch (err) {
            showToast(
                "error",
                err instanceof Error ? err.message : "Failed to save staff"
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleDeleteStaff() {
        if (!deleteStaff) return;

        try {
            setIsSubmitting(true);

            await userService.deleteUser(deleteStaff.id);
            await fetchStaffUsers();

            setDeleteStaff(null);
            setCurrentPage(1);
            showToast("success", "Staff deleted successfully");
        } catch (err) {
            showToast(
                "error",
                err instanceof Error ? err.message : "Failed to delete staff"
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 text-slate-900 dark:bg-[#050b18] dark:text-white md:p-6">
            <ToastContainer toasts={toasts} onClose={removeToast} />

            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-black md:text-3xl">
                        Staff Management
                    </h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        View, add, edit and manage company staff.
                    </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                        onClick={fetchStaffUsers}
                        disabled={loading}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        {loading ? "Loading..." : "Refresh"}
                    </button>

                    <button
                        onClick={openAddModal}
                        className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
                    >
                        <Plus size={18} />
                        Add Staff
                    </button>
                </div>
            </div>

            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search staff..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950"
                        />
                    </div>

                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950"
                    >
                        <option value="All">All Roles</option>
                        {filteredRoles.map((role) => (
                            <option key={role.id} value={role.name}>
                                {formatRole(role.name)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="hidden overflow-x-auto md:block">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-100 text-xs uppercase text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                            <tr>
                                <th className="px-5 py-4">Staff</th>
                                <th className="px-5 py-4">Role</th>
                                <th className="px-5 py-4">Created At</th>
                                <th className="px-5 py-4 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {!loading &&
                                !error &&
                                paginatedStaff.map((staff) => (
                                    <tr
                                        key={staff.id}
                                        className="border-t border-slate-100 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
                                    >
                                        <td className="px-5 py-4">
                                            <p className="font-bold">{staff.name}</p>
                                            <p className="text-xs text-slate-500">{staff.email}</p>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                                                {formatRole(staff.role)}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                                            {staff.joinedAt}
                                        </td>

                                        <td className="px-5 py-4">
                                            <div className="flex justify-end gap-2">
                                                <IconButton onClick={() => openViewModal(staff)}>
                                                    <Eye size={16} />
                                                </IconButton>

                                                <IconButton onClick={() => openEditModal(staff)}>
                                                    <Pencil size={16} />
                                                </IconButton>

                                                <IconButton onClick={() => setDeleteStaff(staff)} danger>
                                                    <Trash2 size={16} />
                                                </IconButton>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                <div className="grid gap-4 p-4 md:hidden">
                    {!loading &&
                        !error &&
                        paginatedStaff.map((staff) => (
                            <div
                                key={staff.id}
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
                            >
                                <div className="mb-3">
                                    <h3 className="font-bold">{staff.name}</h3>
                                    <p className="text-xs text-slate-500">{staff.email}</p>
                                </div>

                                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                                    <p>Role: {formatRole(staff.role)}</p>
                                    <p>Created At: {staff.joinedAt}</p>
                                </div>

                                <div className="mt-4 flex gap-2">
                                    <IconButton onClick={() => openViewModal(staff)}>
                                        <Eye size={16} />
                                    </IconButton>

                                    <IconButton onClick={() => openEditModal(staff)}>
                                        <Pencil size={16} />
                                    </IconButton>

                                    <IconButton onClick={() => setDeleteStaff(staff)} danger>
                                        <Trash2 size={16} />
                                    </IconButton>
                                </div>
                            </div>
                        ))}
                </div>

                {loading && (
                    <div className="p-8 text-center text-sm text-slate-500">
                        Loading staff...
                    </div>
                )}

                {error && (
                    <div className="p-8 text-center text-sm text-red-500">{error}</div>
                )}

                {!loading && !error && filteredStaff.length === 0 && (
                    <div className="p-8 text-center text-sm text-slate-500">
                        No staff found.
                    </div>
                )}

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    startItem={startItem}
                    endItem={endItem}
                    totalItems={totalItems}
                    onPrev={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                />
            </div>

            {(isAddOpen || editStaff) && (
                <Modal
                    title={isAddOpen ? "Add Staff" : "Edit Staff"}
                    onClose={closeFormModal}
                >


                    {editStaff && (
                        <div>
    
                        </div>
                    )}
                    <StaffForm
                        formData={formData}
                        setFormData={setFormData}
                        roles={filteredRoles}
                        rolesLoading={rolesLoading}
                    />

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            onClick={closeFormModal}
                            disabled={isSubmitting}
                            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold disabled:opacity-60 dark:border-slate-700"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleSubmitStaff}
                            disabled={isSubmitting}
                            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-60"
                        >
                            {isSubmitting
                                ? "Saving..."
                                : isAddOpen
                                    ? "Add Staff"
                                    : "Update Staff"}
                        </button>
                    </div>
                </Modal>
            )}

            {viewLoading && (
                <Modal title="View Staff" onClose={() => setViewLoading(false)}>
                    <p className="text-sm text-slate-500">Loading staff details...</p>
                </Modal>
            )}

            {viewStaff && !viewLoading && (
                <Modal title="View Staff" onClose={() => setViewStaff(null)}>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Info label="Staff ID" value={viewStaff.id} />
                        <Info label="Name" value={viewStaff.name} />
                        <Info label="Email" value={viewStaff.email} />
                        <Info label="Role" value={formatRole(viewStaff.role)} />
                        <Info label="Created At" value={viewStaff.joinedAt} />
                    </div>
                </Modal>
            )}

            {deleteStaff && (
                <Modal title="Delete Staff" onClose={() => setDeleteStaff(null)}>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                        Are you sure you want to delete{" "}
                        <span className="font-bold">{deleteStaff.name}</span>? This staff
                        will be deleted from backend.
                    </p>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            onClick={() => setDeleteStaff(null)}
                            disabled={isSubmitting}
                            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold disabled:opacity-60 dark:border-slate-700"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleDeleteStaff}
                            disabled={isSubmitting}
                            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-60"
                        >
                            {isSubmitting ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

function ToastContainer({
    toasts,
    onClose,
}: {
    toasts: Toast[];
    onClose: (id: number) => void;
}) {
    return createPortal(
        <div className="fixed right-5 top-5 z-[999999] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3">
            {toasts.map((toast) => {
                const isSuccess = toast.type === "success";

                return (
                    <div
                        key={toast.id}
                        className={`flex items-start gap-3 rounded-2xl border p-4 shadow-2xl backdrop-blur-xl ${isSuccess
                            ? "border-emerald-200 bg-white text-emerald-700 dark:border-emerald-500/30 dark:bg-slate-900 dark:text-emerald-300"
                            : "border-red-200 bg-white text-red-700 dark:border-red-500/30 dark:bg-slate-900 dark:text-red-300"
                            }`}
                    >
                        <div
                            className={`mt-0.5 rounded-full p-1 ${isSuccess
                                ? "bg-emerald-100 dark:bg-emerald-500/10"
                                : "bg-red-100 dark:bg-red-500/10"
                                }`}
                        >
                            {isSuccess ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                        </div>

                        <div className="flex-1">
                            <p className="text-sm font-black">
                                {isSuccess ? "Success" : "Error"}
                            </p>
                            <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">
                                {toast.message}
                            </p>
                        </div>

                        <button
                            onClick={() => onClose(toast.id)}
                            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                        >
                            <X size={16} />
                        </button>
                    </div>
                );
            })}
        </div>,
        document.body
    );
}

function IconButton({
    children,
    onClick,
    danger,
}: {
    children: React.ReactNode;
    onClick: () => void;
    danger?: boolean;
}) {
    return (
        <button
            onClick={onClick}
            className={`rounded-lg border p-2 transition ${danger
                ? "border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-500/10"
                : "border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
        >
            {children}
        </button>
    );
}

function Modal({
    title,
    children,
    onClose,
}: {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
}) {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-xl font-black">{title}</h2>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                        <X size={18} />
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
}

function Info({
    label,
    value,
}: {
    label: string;
    value: string | number;
}) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
            <p className="text-xs font-bold uppercase text-slate-400">{label}</p>
            <p className="mt-1 break-words font-semibold text-slate-900 dark:text-white">
                {value}
            </p>
        </div>
    );
}

function StaffForm({
    formData,
    setFormData,
    roles,
    rolesLoading,
}: {
    formData: StaffFormData;
    setFormData: React.Dispatch<React.SetStateAction<StaffFormData>>;
    roles: ApiRole[];
    rolesLoading: boolean;
}) {
    return (
        <div className="grid gap-4 sm:grid-cols-2">
            <Input
                label="Name"
                value={formData.name}
                onChange={(value) =>
                    setFormData((prev) => ({ ...prev, name: value }))
                }
            />

            <Input
                label="Email"
                value={formData.email}
                onChange={(value) =>
                    setFormData((prev) => ({ ...prev, email: value }))
                }
            />

            <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-bold">Role</label>

                <select
                    value={formData.role}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            role: e.target.value,
                        }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950"
                >
                    {rolesLoading ? (
                        <option>Loading roles...</option>
                    ) : (
                        roles.map((role) => (
                            <option key={role.id} value={role.name}>
                                {formatRole(role.name)}
                            </option>
                        ))
                    )}
                </select>
            </div>
        </div>
    );
}

function Input({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-bold">{label}</label>

            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950"
            />
        </div>
    );
}
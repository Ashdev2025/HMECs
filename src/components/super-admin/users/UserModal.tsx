import { toast } from "react-hot-toast";
import type { ModalMode, UserFormData, UserStatus } from "./userTypes";

type UserModalProps = {
  isOpen: boolean;
  mode: ModalMode;
  formData: UserFormData;
  onClose: () => void;
  onSubmit: () => void | Promise<void>;
  onFormChange: (data: UserFormData) => void;
  isSubmitting: boolean;
};

export default function UserModal({
  isOpen,
  mode,
  formData,
  onClose,
  onSubmit,
  onFormChange,
  isSubmitting,
}: UserModalProps) {
  if (!isOpen) return null;

  const handleSubmit = async () => {
    const name = formData.name?.trim();
    const email = formData.email?.trim();

    if (!name) {
      toast.error("Full name is required.");
      return;
    }

    if (!email) {
      toast.error("Email is required.");
      return;
    }

    try {
      await onSubmit();
      toast.success(
        mode === "add"
          ? "User created successfully."
          : "User updated successfully."
      );
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto bg-black/70 px-3 py-4 backdrop-blur-md">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-4 shadow-xl dark:border-[#1F2A44] dark:bg-[#111827] sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {mode === "add" ? "Add New User" : "Edit User"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="text-xl text-gray-500 transition hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-400"
          >
            ×
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <input
            placeholder="Full Name"
            value={formData.name}
            disabled={isSubmitting}
            onChange={(e) =>
              onFormChange({ ...formData, name: e.target.value })
            }
            className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-[#1F2A44] dark:bg-[#0F172A] dark:text-white sm:col-span-2"
          />

          <input
            placeholder="Email"
            type="email"
            value={formData.email}
            disabled={isSubmitting}
            onChange={(e) =>
              onFormChange({ ...formData, email: e.target.value })
            }
            className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-[#1F2A44] dark:bg-[#0F172A] dark:text-white sm:col-span-2"
          />

          <input
            placeholder="Phone"
            value={formData.phone}
            disabled={isSubmitting}
            onChange={(e) =>
              onFormChange({ ...formData, phone: e.target.value })
            }
            className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-[#1F2A44] dark:bg-[#0F172A] dark:text-white"
          />

          <input
            placeholder="Company"
            value={formData.company}
            disabled={isSubmitting}
            onChange={(e) =>
              onFormChange({ ...formData, company: e.target.value })
            }
            className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-[#1F2A44] dark:bg-[#0F172A] dark:text-white"
          />

          <select
            value={formData.role}
            disabled={isSubmitting}
            onChange={(e) =>
              onFormChange({ ...formData, role: e.target.value })
            }
            className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-[#1F2A44] dark:bg-[#0F172A] dark:text-white"
          >
            <option value="Admin">Admin</option>
            <option value="Engineer">Engineer</option>
            <option value="Planner">Planner</option>
            <option value="Viewer">Viewer</option>
          </select>

          <select
            value={formData.status}
            disabled={isSubmitting}
            onChange={(e) =>
              onFormChange({
                ...formData,
                status: e.target.value as UserStatus,
              })
            }
            className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-[#1F2A44] dark:bg-[#0F172A] dark:text-white"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#1F2A44] dark:text-slate-300"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {isSubmitting
              ? mode === "add"
                ? "Creating..."
                : "Updating..."
              : mode === "add"
                ? "Add User"
                : "Update User"}
          </button>
        </div>
      </div>
    </div>
  );
}
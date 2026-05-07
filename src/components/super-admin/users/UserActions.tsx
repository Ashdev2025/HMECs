import { Eye, Pencil, Trash2 } from "lucide-react";
import type { User } from "./userTypes";

type UserActionsProps = {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  onView: (user: User) => void;
  variant?: "table" | "card";
};

export default function UserActions({
  user,
  onEdit,
  onDelete,
  onView,
  variant = "table",
}: UserActionsProps) {
  if (variant === "card") {
    return (
      <div className="mt-1 grid grid-cols-3 gap-1">
        <button
          onClick={() => onView(user)}
          className="h-5 rounded border border-gray-200 text-[9px] text-gray-600 dark:border-[#1F2A44] dark:text-slate-300"
        >
          View
        </button>

        <button
          onClick={() => onEdit(user)}
          className="h-5 rounded border border-green-200 text-[9px] text-green-600 dark:border-green-500/30 dark:text-green-400"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(user.id)}
          className="h-5 rounded border border-red-200 text-[9px] text-red-600 dark:border-red-500/30 dark:text-red-400"
        >
          Delete
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-3 py-3">
      <button
        onClick={() => onView(user)}
        className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-white/10 dark:hover:text-white"
        title="View"
      >
        <Eye size={16} />
      </button>

      <button
        onClick={() => onEdit(user)}
        className="rounded-lg p-2 text-blue-500 transition hover:bg-blue-500/10"
        title="Edit"
      >
        <Pencil size={16} />
      </button>

      <button
        onClick={() => onDelete(user.id)}
        className="rounded-lg p-2 text-red-500 transition hover:bg-red-500/10"
        title="Delete"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
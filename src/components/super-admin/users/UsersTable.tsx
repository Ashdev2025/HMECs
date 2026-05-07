import UserActions from "./UserActions";
import type { User, UserStatus } from "./userTypes";

type UsersTableProps = {
  users: User[];
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
};

const getStatusClass = (status: UserStatus) => {
  if (status === "active") {
    return "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400";
  }

  if (status === "inactive") {
    return "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400";
  }

  return "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400";
};

const getRoleClass = (role: string) => {
  if (role === "Super Admin") {
    return "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400";
  }

  if (role === "Company Admin") {
    return "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400";
  }

  if (role === "Mechanic") {
    return "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400";
  }

  return "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400";
};

export default function UsersTable({
  users,
  onView,
  onEdit,
  onDelete,
}: UsersTableProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-2 overflow-x-auto xl:block">
      <table className="min-w-[900px] w-full text-left text-xs">
        <thead className="sticky top-0 z-10 bg-gray-50 text-gray-500 dark:bg-[#0F172A] dark:text-slate-400">
          <tr>
            <th className="px-4 py-3">User</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Company</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Last Login</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 dark:divide-[#1F2A44]">
          {users.map((user) => (
            <tr
              key={user.id}
              className="transition hover:bg-gray-50 dark:hover:bg-blue-500/10"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700 dark:bg-[#1F2A44] dark:text-white">
                    {user.name.charAt(0)}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-gray-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="truncate text-[11px] text-gray-500 dark:text-slate-400">
                      {user.createdAt}
                    </p>
                  </div>
                </div>
              </td>

              <td className="truncate px-4 py-3 text-gray-600 dark:text-slate-300">
                {user.email}
              </td>

              <td className="truncate px-4 py-3 text-gray-600 dark:text-slate-300">
                {user.phone}
              </td>

              <td className="px-4 py-3">
                <span
                  className={`inline-flex rounded-md px-2 py-1 text-[11px] font-semibold ${getRoleClass(
                    user.role
                  )}`}
                >
                  {user.role}
                </span>
              </td>

              <td className="truncate px-4 py-3 text-gray-600 dark:text-slate-300">
                {user.company}
              </td>

              <td className="px-4 py-3">
                <span
                  className={`inline-flex rounded-md px-2 py-1 text-[11px] font-semibold capitalize ${getStatusClass(
                    user.status
                  )}`}
                >
                  ● {user.status}
                </span>
              </td>

              <td className="truncate px-4 py-3 text-gray-600 dark:text-slate-300">
                {user.lastLogin}
              </td>

              <td className="px-4 py-3">
                <UserActions
                  user={user}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
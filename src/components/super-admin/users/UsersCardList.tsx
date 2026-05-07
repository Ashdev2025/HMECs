import UserActions from "./UserActions";
import type { User, UserStatus } from "./userTypes";

type UsersTableProps = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
};

const getStatusClass = (status: UserStatus) => {
  if (status === "active") {
    return "bg-green-500/10 text-green-600";
  }

  if (status === "inactive") {
    return "bg-red-500/10 text-red-500";
  }

  return "bg-orange-500/10 text-orange-500";
};

export default function UsersTable({
  users,
  onEdit,
  onDelete,
}: UsersTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[900px] w-full text-sm text-left">
        
      
        <thead className="border-b bg-gray-50 text-gray-500 dark:bg-[#0F172A] dark:text-slate-400">
          <tr>
            <th className="px-4 py-3">User</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Company</th>
            <th>Status</th>
            <th>Last Login</th>
            <th className="text-right pr-4">Actions</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="divide-y">
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-gray-50 dark:hover:bg-white/5"
            >
              {/* USER */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-200 text-sm font-bold">
                    {user.name.charAt(0)}
                  </div>

                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-xs text-gray-400">
                      {user.createdAt}
                    </p>
                  </div>
                </div>
              </td>

              <td className="truncate">{user.email}</td>
              <td>{user.phone}</td>

              <td>
                <span className="px-2 py-1 text-xs bg-blue-100 rounded">
                  {user.role}
                </span>
              </td>

              <td>{user.company}</td>

              <td>
                <span
                  className={`px-2 py-1 text-xs rounded ${getStatusClass(
                    user.status
                  )}`}
                >
                  ● {user.status}
                </span>
              </td>

              <td>{user.lastLogin}</td>

              <td className="pr-4">
                <UserActions
                  user={user}
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
import type { User } from "./userTypes";

type UsersStatsProps = {
  users: User[];
};

export default function UsersStats({ users }: UsersStatsProps) {
  const stats = [
    ["Total", users.length, "text-gray-900 dark:text-white"],
    [
      "Active",
      users.filter((user) => user.status === "active").length,
      "text-green-600 dark:text-green-400",
    ],
    [
      "Inactive",
      users.filter((user) => user.status === "inactive").length,
      "text-red-500 dark:text-red-400",
    ],
    [
      "Pending",
      users.filter((user) => user.status === "pending").length,
      "text-orange-500 dark:text-orange-400",
    ],
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {stats.map(([label, value, color]) => (
        <div
          key={label}
          className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm dark:border-[#1F2A44] dark:bg-[#111827] sm:rounded-xl sm:p-4"
        >
          <p className="truncate text-[9px] text-gray-500 dark:text-slate-400 sm:text-xs">
            {label}
          </p>
          <h2 className={`text-base font-bold sm:text-2xl ${color}`}>
            {value}
          </h2>
        </div>
      ))}
    </div>
  );
}
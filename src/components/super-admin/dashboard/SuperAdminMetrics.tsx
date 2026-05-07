import {
  AlertTriangle,
  Crown,
  HardHat,
  Truck,
  Users,
  Wrench,
} from "lucide-react";

const stats = [
  {
    title: "Total Admins",
    value: "24",
    change: "12%",
    positive: true,
    icon: Users,
    color: "bg-blue-500/15 text-blue-500",
  },
  {
    title: "Active Plans",
    value: "18",
    change: "8%",
    positive: true,
    icon: Crown,
    color: "bg-purple-500/15 text-purple-500",
  },
  {
    title: "Total Operators",
    value: "156",
    change: "18%",
    positive: true,
    icon: HardHat,
    color: "bg-green-500/15 text-green-500",
  },
  {
    title: "Total Mechanics",
    value: "72",
    change: "10%",
    positive: true,
    icon: Wrench,
    color: "bg-orange-500/15 text-orange-500",
  },
  {
    title: "Total Machines",
    value: "420",
    change: "22%",
    positive: true,
    icon: Truck,
    color: "bg-sky-500/15 text-sky-500",
  },
  {
    title: "Critical Alerts",
    value: "09",
    change: "4%",
    positive: false,
    icon: AlertTriangle,
    color: "bg-red-500/15 text-red-500",
  },
];

export default function SuperAdminMetrics() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-white/[0.03] sm:p-5"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${item.color}`}
            >
              <Icon size={22} />
            </div>

            <div className="mt-4 sm:mt-5">
              <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                {item.title}
              </p>

              <h3 className="mt-2 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                {item.value}
              </h3>

              <p
                className={`mt-2 text-xs font-medium sm:mt-3 sm:text-sm ${
                  item.positive ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.positive ? "↑" : "↓"} {item.change}
                <span className="ml-1 font-normal text-gray-500 dark:text-gray-400">
                  from last month
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
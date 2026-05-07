import { AlertTriangle, HardHat, Truck, Wrench } from "lucide-react";

const metrics = [
  { title: "Total Machines", value: "27", icon: Truck },
  { title: "Operators", value: "18", icon: HardHat },
  { title: "Mechanics", value: "9", icon: Wrench },
  { title: "Active Alerts", value: "6", icon: AlertTriangle },
];

export default function CompanyAdminMetrics() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-[#0f172a]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-slate-400">
                  {item.title}
                </p>
                <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {item.value}
                </h3>
              </div>

              <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600 dark:text-blue-400">
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
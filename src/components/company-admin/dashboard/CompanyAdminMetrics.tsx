import React from "react";
import { AlertTriangle, HardHat, Truck, Wrench } from "lucide-react";

interface CompanyAdminMetricsProps {
  stats: {
    machines: number;
    operators: number;
    mechanics: number;
    alerts: number;
  };
}

export default function CompanyAdminMetrics({ stats }: CompanyAdminMetricsProps) {
  const metrics = [
    { title: "Total Machines", value: stats.machines.toString(), icon: Truck },
    { title: "Operators", value: stats.operators.toString(), icon: HardHat },
    { title: "Mechanics", value: stats.mechanics.toString(), icon: Wrench },
    { title: "Active Alerts", value: stats.alerts.toString(), icon: AlertTriangle },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {item.title}
                </p>
                <h3 className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                  {item.value}
                </h3>
              </div>

              <div className="rounded-2xl bg-blue-500/10 p-3 text-blue-600 dark:text-blue-400">
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
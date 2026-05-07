import { AlertTriangle, Crown, UserPlus, Wrench } from "lucide-react";

const activities = [
  {
    title: "Rajesh Sharma added 4 new operators",
    time: "2 hours ago",
    icon: UserPlus,
    color: "bg-green-500/15 text-green-500",
  },
  {
    title: "Neha Verma upgraded to Professional plan",
    time: "5 hours ago",
    icon: Crown,
    color: "bg-purple-500/15 text-purple-500",
  },
  {
    title: "Amit Singh added 2 new machines",
    time: "1 day ago",
    icon: Wrench,
    color: "bg-orange-500/15 text-orange-500",
  },
  {
    title: "3 critical alerts reported by operators",
    time: "2 days ago",
    icon: AlertTriangle,
    color: "bg-red-500/15 text-red-500",
  },
];

export default function RecentActivity() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h2>

        <button className="text-sm font-medium text-blue-500 hover:text-blue-600">
          View All
        </button>
      </div>

      <div className="mt-5 space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div key={activity.title} className="flex gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${activity.color}`}
              >
                <Icon size={18} />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.title}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default function AlertSummaryChart() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-[#0f172a]">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        Alert Summary
      </h2>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-red-500/10 p-3 text-red-600 dark:text-red-400">
          Engine Alerts: 2
        </div>
        <div className="rounded-xl bg-orange-500/10 p-3 text-orange-600 dark:text-orange-400">
          Tyre Alerts: 1
        </div>
        <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600 dark:text-blue-400">
          Hydraulic Alerts: 2
        </div>
        <div className="rounded-xl bg-purple-500/10 p-3 text-purple-600 dark:text-purple-400">
          Transmission Alerts: 1
        </div>
      </div>
    </div>
  );
}
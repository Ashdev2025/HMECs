export default function MachineStatusOverview() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-[#0f172a]">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        Machine Status Overview
      </h2>

      <div className="mt-4 space-y-3 text-sm">
        <p className="text-green-600 dark:text-green-400">Operational: 18</p>
        <p className="text-orange-600 dark:text-orange-400">Maintenance Due: 5</p>
        <p className="text-red-600 dark:text-red-400">Critical Alert: 4</p>
      </div>
    </div>
  );
}
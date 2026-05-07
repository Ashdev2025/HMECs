export default function MaintenanceDueCard() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-[#0f172a]">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        Maintenance Due
      </h2>

      <p className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
        5
      </p>
      <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
        Machines require scheduled maintenance this week.
      </p>
    </div>
  );
}
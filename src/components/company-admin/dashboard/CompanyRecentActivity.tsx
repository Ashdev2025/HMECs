const activities = [
  "Operator assigned to Excavator CAT 320D",
  "Mechanic updated inspection report",
  "Tyre pressure alert detected",
  "Maintenance request created",
];

export default function CompanyRecentActivity() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-[#0f172a]">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        Recent Activity
      </h2>

      <div className="mt-4 space-y-3">
        {activities.map((item) => (
          <div
            key={item}
            className="rounded-xl bg-gray-50 p-3 text-sm text-gray-600 dark:bg-white/[0.03] dark:text-slate-300"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
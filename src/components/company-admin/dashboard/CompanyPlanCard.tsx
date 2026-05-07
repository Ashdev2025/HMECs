export default function CompanyPlanCard() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-[#0f172a]">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        Current Plan: Pro Plan
      </h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
        42 machines allowed • 27 machines currently active • Subscription Active
      </p>
    </div>
  );
}
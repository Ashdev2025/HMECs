const points = [
  "Prevent unexpected equipment breakdowns",
  "Track maintenance tasks internally",
  "Monitor alerts and machine health",
  "Support multi-company and multi-user structure",
];

const modules = ["Fleet", "Tyres", "Engine", "Hydraulic", "Alerts", "Reports"];

export default function Maintenance() {
  return (
    <section id="maintenance" className="reveal scroll-mt-24 bg-slate-50 px-5 py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-4xl font-black text-blue-600">
            Built For Heavy Mining Operations
          </h2>
          <p className="mt-5 leading-8 text-slate-600">
            Manage tyre, engine, hydraulic, fleet, and maintenance workflows with
            role-based access for Admin, Engineer, Planner, and Viewer users.
          </p>
          <div className="mt-8 space-y-4">
            {points.map((item) => (
              <div key={item} className="flex items-center gap-3 text-slate-700">
                <span className="rounded-full bg-blue-100 px-2 py-1 text-blue-600">
                  ✓
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="reveal-right rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-slate-900">System Modules</h3>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {modules.map((module) => (
              <div
                key={module}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center font-semibold text-slate-700"
              >
                {module}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
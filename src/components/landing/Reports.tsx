const reports = [
  ["96%", "Fleet Uptime"],
  ["32", "Due Maintenance Tasks"],
  ["14", "Critical Alerts"],
];

export default function Reports() {
  return (
    <section id="reports" className="reveal scroll-mt-24 bg-white px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-4xl font-black text-blue-600">
          Smart Reports For Better Decisions
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-slate-600">
          Get clear visibility into machine performance, maintenance cost,
          alerts, and task completion status.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reports.map(([value, label]) => (
            <div
              key={label}
              className="reveal-scale rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm"
            >
              <h3 className="text-5xl font-black text-blue-600">{value}</h3>
              <p className="mt-3 text-slate-600">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
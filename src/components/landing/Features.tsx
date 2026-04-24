const features = [
  ["Machine Monitoring", "Track equipment health, alerts, and uptime in one place."],
  ["Maintenance Planning", "Assign tasks, plan inspections, and manage technician work."],
  ["Offline First", "Continue work without network and sync data when online."],
];

export default function Features() {
  return (
    <section id="features" className="reveal scroll-mt-24 bg-white px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-4xl font-black text-blue-600">
          Why Choose HMEintelligence
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-slate-600">
          A smart maintenance platform built for mining companies to reduce downtime,
          improve equipment health, and manage field operations efficiently.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map(([title, text]) => (
            <div
              key={title}
              className="reveal-scale rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm transition hover:shadow-lg"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl text-blue-600">
                ✓
              </div>
              <h3 className="text-xl font-bold text-slate-900">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
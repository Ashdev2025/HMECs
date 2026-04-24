import { Link, useNavigate } from "react-router";
import { createPayment } from "../../services/payment.service";

const plans = [
  {
    name: "Basic",
    price: "₹4,999",
    subtitle: "For small mining teams",
    limit: "Up to 10 machines",
    icon: "⛏️",
    features: [
      "Company admin account",
      "Up to 10 machine records",
      "Basic maintenance task tracking",
      "Alert overview dashboard",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "₹14,999",
    subtitle: "For growing mining operations",
    limit: "Up to 50 machines",
    icon: "🚜",
    features: [
      "Everything in Basic",
      "Engineer and planner roles",
      "Advanced maintenance planning",
      "Tyre, engine and hydraulic modules",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    subtitle: "For large mining companies",
    limit: "Unlimited machines",
    icon: "🏭",
    features: [
      "Everything in Pro",
      "Multi-site company structure",
      "OEM / supplier limited access",
      "Group-level reporting",
      "Dedicated support",
    ],
    popular: false,
  },
];

export default function PricingPage() {
  const navigate = useNavigate();

  const handlePlanSelect = async (planName: string) => {
    const response = await createPayment(planName);

    if (response.success) {
      navigate(`/signup?plan=${planName}`);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link to="/" className="text-3xl font-black tracking-tight">
            <span className="text-blue-600">HME</span>
            <span className="text-slate-900">intelligence</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <Link
              to="/"
              className="border-b-2 border-transparent pb-1 text-slate-600 transition hover:border-blue-600 hover:text-blue-600"
            >
              Home
            </Link>

            <a
              href="#plans"
              className="border-b-2 border-blue-600 pb-1 text-blue-600 transition"
            >
              Plans
            </a>

            <a
              href="#comparison"
              className="border-b-2 border-transparent pb-1 text-slate-600 transition hover:border-blue-600 hover:text-blue-600"
            >
              Compare
            </a>

            <Link
              to="/signin"
              className="border-b-2 border-transparent pb-1 text-slate-600 transition hover:border-blue-600 hover:text-blue-600"
            >
              Login
            </Link>
          </nav>

          <Link
            to="/signin"
            className="rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Pricing Section */}
      <main
        id="plans"
        className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50 px-5 py-16 lg:px-8"
      >
        <div className="absolute left-1/2 top-52 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-100 blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-600">
              Choose Plan
            </p>

            <h1 className="text-4xl font-black text-slate-950 sm:text-5xl">
              Choose Your Perfect Plan
            </h1>

            <p className="mt-5 text-base leading-8 text-slate-500">
              Select the HME intelligence plan that matches your company needs.
              Start with a simple setup and scale as your fleet grows.
            </p>
          </div>

          <div className="grid items-stretch gap-7 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex h-full flex-col rounded-3xl border bg-white p-7 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl ${
                  plan.popular
                    ? "border-blue-500 shadow-blue-100"
                    : "border-slate-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-lg">
                    Most Popular
                  </div>
                )}

                <div className="text-center">
                  <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-4xl">
                    {plan.icon}
                  </div>

                  <h2 className="text-2xl font-black text-slate-950">
                    {plan.name}
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    {plan.subtitle}
                  </p>

                  <div className="mt-6 text-4xl font-black text-blue-600">
                    {plan.price}
                  </div>

                  <p className="mt-3 text-sm text-slate-500">{plan.limit}</p>
                </div>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-slate-700"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePlanSelect(plan.name)}
                  className="mt-auto w-full rounded-full bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  Select {plan.name} Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Plan Details Section */}
      <section id="comparison" className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Plan Details
            </p>

            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
              Compare What You Get
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-slate-500">
              Understand which plan is suitable for your mining operation before
              creating your company account.
            </p>
          </div>

          <div className="mt-12 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-xl">
            <table className="w-full min-w-[760px]">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-6 py-5 text-left text-sm font-bold">
                    Features
                  </th>
                  <th className="px-6 py-5 text-center text-sm font-bold">
                    Basic
                  </th>
                  <th className="px-6 py-5 text-center text-sm font-bold">
                    Pro
                  </th>
                  <th className="px-6 py-5 text-center text-sm font-bold">
                    Enterprise
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
                {[
                  ["Machine Limit", "10 Machines", "50 Machines", "Unlimited"],
                  ["User Roles", "Admin", "Admin, Engineer", "All Roles"],
                  ["Maintenance Tasks", "Basic", "Advanced", "Advanced + Custom"],
                  ["Modules", "Fleet + Alerts", "Fleet, Tyre, Engine, Hydraulic", "Full + Custom Modules"],
                  ["Reporting", "Basic Reports", "Advanced Reports", "Group-Level Reporting"],
                  ["OEM / Supplier Access", "No", "Limited", "Yes"],
                  ["Support", "Email Support", "Priority Support", "Dedicated Support"],
                ].map(([feature, basic, pro, enterprise]) => (
                  <tr key={feature} className="hover:bg-blue-50/50">
                    <td className="px-6 py-5 font-semibold text-slate-900">
                      {feature}
                    </td>
                    <td className="px-6 py-5 text-center">{basic}</td>
                    <td className="px-6 py-5 text-center font-semibold text-blue-600">
                      {pro}
                    </td>
                    <td className="px-6 py-5 text-center">{enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 px-5 py-16 text-center lg:px-8">
        <h2 className="text-3xl font-black text-slate-950">
          Ready to start with HME intelligence?
        </h2>

        <p className="mt-4 text-slate-500">
          Choose a plan and continue to create your company account.
        </p>

        <Link
          to="#plans"
          className="mt-8 inline-flex rounded-full bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
        >
          View Plans
        </Link>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-slate-800 px-5 py-12 text-slate-300 lg:px-8 border-t border-slate-700"
      >
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-2xl font-black">
              <span className="text-blue-400">HME</span>
              <span className="text-white">intelligence</span>
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              AI powered maintenance and fleet monitoring platform for mining companies.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white">Product</h4>
            <p className="mt-4 text-sm text-slate-400 hover:text-blue-400 cursor-pointer">
              Features
            </p>
            <p className="mt-2 text-sm text-slate-400 hover:text-blue-400 cursor-pointer">
              Pricing
            </p>
            <p className="mt-2 text-sm text-slate-400 hover:text-blue-400 cursor-pointer">
              Reports
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white">Modules</h4>
            <p className="mt-4 text-sm text-slate-400">Fleet</p>
            <p className="mt-2 text-sm text-slate-400">Maintenance</p>
            <p className="mt-2 text-sm text-slate-400">Alerts</p>
          </div>

          <div>
            <h4 className="font-bold text-white">Contact</h4>
            <p className="mt-4 text-sm text-slate-400">support@miningai.com</p>
            <p className="mt-2 text-sm text-slate-400">India</p>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-slate-700 pt-6 text-center text-sm text-slate-500">
          © 2026 HMEintelligence. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
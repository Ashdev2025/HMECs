import { Link } from "react-router";

export default function CTA() {
  return (
    <section className="reveal-scale bg-slate-50 px-5 py-20 text-center lg:px-8">
      <h2 className="text-4xl font-black text-blue-600">
        Ready To Manage Your Mining Fleet?
      </h2>

      <p className="mt-4 text-slate-600">
        Choose a plan and create your company account.
      </p>

      <Link
        to="/pricing"
        className="mt-8 inline-flex rounded-full bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700"
      >
        Get Started
      </Link>
    </section>
  );
}
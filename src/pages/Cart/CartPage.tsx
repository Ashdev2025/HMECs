import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import type { PricingPlan } from "../../data/pricingPlans";
import Navbar from "../../components/landing/Navbar";
import Footer from "../../components/landing/Footer";

import toast from "react-hot-toast";
import { initiatePayFastCheckout } from "../../services/payfastService";

export default function CartPage() {
  const navigate = useNavigate();

  const [active, setActive] = useState("");
  const [plan, setPlan] = useState<PricingPlan | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedPlan = localStorage.getItem("selectedPlan");
    const token = localStorage.getItem("token");

    setIsLoggedIn(Boolean(token));

    if (savedPlan) {
      try {
        setPlan(JSON.parse(savedPlan));
      } catch {
        localStorage.removeItem("selectedPlan");
      }
    }
  }, []);
  const handleMainAction = async () => {
    const selectedPlan = plan as PricingPlan & {
      id?: string | number;
    };

    if (!isLoggedIn) {
      navigate("/signup?redirect=/cart");
      return;
    }

    try {
      if (!selectedPlan?.id) {
        toast.error("Plan ID not found");
        return;
      }

      toast.loading("Opening payment page...");

      const response = await initiatePayFastCheckout(selectedPlan.id);

      toast.dismiss();

      console.log("PayFast Response:", response);

      const paymentUrl =
        response?.checkout_url ||
        response?.payment_url ||
        response?.redirect_url ||
        response?.url;

      if (!paymentUrl) {
        toast.error("Payment URL not received");
        return;
      }

      window.location.href = paymentUrl;
    } catch (error) {
      toast.dismiss();

      console.error("Payment Error:", error);

      toast.error("Failed to initialize payment");
    }
  };

  if (!plan) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
        <Navbar active={active} setActive={setActive} />

        <main className="flex min-h-[520px] items-center justify-center px-4 pb-10 pt-16 lg:pt-20">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-lg dark:border-white/10 dark:bg-slate-900">
            <h1 className="text-2xl font-black">No Plan Selected</h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Please select a plan first.
            </p>

            <button
              onClick={() => navigate("/pricing")}
              className="mt-5 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700"
            >
              Select Plan
            </button>
          </div>
        </main>

        <div className="[&_.reveal]:!translate-y-0 [&_.reveal]:!opacity-100">
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <Navbar active={active} setActive={setActive} />

      <main className="flex min-h-[620px] items-center justify-center px-4 pb-10 pt-16 lg:pt-14">
        <div className="w-full max-w-5xl">
          <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-slate-900 lg:grid-cols-2">
            <div className="p-5 md:p-7">
              <h1 className="text-xl font-black text-blue-600 md:text-2xl">
                Checkout Summary
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Review your selected HME subscription plan before continuing.
              </p>

              <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-2xl dark:bg-blue-600/20">
                    {plan.icon}
                  </div>

                  <div>
                    <h2 className="text-xl font-black uppercase tracking-wide">
                      {plan.name} PLAN
                    </h2>
                    <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                      {plan.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              <ul className="mt-5 space-y-3">
                <li className="flex gap-3 text-sm text-slate-700 dark:text-slate-200">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">
                    ✓
                  </span>
                  Selected subscription: {plan.name}
                </li>

                <li className="flex gap-3 text-sm text-slate-700 dark:text-slate-200">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">
                    ✓
                  </span>
                  {plan.limit}
                </li>

                {plan.features.slice(0, 3).map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 text-sm text-slate-700 dark:text-slate-200"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <p className="mt-5 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {!isLoggedIn
                  ? "Create your account first. After signup, you will come back here to continue payment."
                  : "Your account is ready. Continue with payment to activate this plan."}
              </p>
            </div>

            <div className="border-t border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-950/40 md:p-7 lg:border-l lg:border-t-0">
              <div className="text-center">
                <h2 className="text-xl font-black text-blue-600 md:text-2xl">
                  Total Cost
                </h2>

                <p className="mt-3 text-4xl font-black text-blue-700 dark:text-blue-400">
                  {plan.price}
                </p>

                <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {plan.period}
                </p>
              </div>

              <div className="mt-7 space-y-4 text-sm">
                <div className="flex justify-between gap-4 border-b border-slate-200 pb-3 dark:border-white/10">
                  <span className="text-slate-500 dark:text-slate-400">
                    Plan
                  </span>
                  <span className="font-bold uppercase tracking-wide">
                    {plan.name}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-lg font-black text-blue-600">
                    Total
                  </span>
                  <span className="text-lg font-black text-blue-700 dark:text-blue-400">
                    {plan.price}
                  </span>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleMainAction}
                  className="w-full max-w-xs rounded-xl bg-blue-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700"
                >
                  {isLoggedIn
                    ? "Payment"
                    : "Create Account / Login to Continue"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="[&_.reveal]:!translate-y-0 [&_.reveal]:!opacity-100">
        <Footer />
      </div>
    </div>
  );
}

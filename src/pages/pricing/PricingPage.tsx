import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { pricingComparison } from "../../data/pricingComparison";
import Header from "../../components/landing/Navbar";
import Footer from "../../components/landing/Footer";
import {
  getSubscriptionPlans,
  type SubscriptionPlanApi,
} from "../../services/subscriptionService";
import { userService } from "../../services/userService";

type PricingPlan = {
  id: string | number;
  name: string;
  subtitle: string;
  price: string;
  period: string;
  limit: string;
  features: string[];
  popular: boolean;
  icon: string;
  rawPlan: SubscriptionPlanApi;
};

const featuresToArray = (
  features: Record<string, boolean> | string[] | null,
): string[] => {
  if (Array.isArray(features)) return features.filter(Boolean);

  if (features && typeof features === "object") {
    return Object.keys(features).filter((key) => features[key]);
  }

  return [];
};

const formatPrice = (price: string | number) => {
  const value = String(price ?? "0");
  return value.startsWith("$") ? value : `$${value}`;
};

const mapApiPlanToPricingPlan = (
  plan: SubscriptionPlanApi,
  index: number,
): PricingPlan => {
  const features = featuresToArray(plan.features);

  return {
    id: plan.id,
    name: plan.name || "Untitled Plan",
    subtitle: `${plan.machine_limit ?? 0} machine limit plan for mining operations.`,
    price: formatPrice(plan.price),
    period: "",
    limit: `${plan.machine_limit ?? 0} Machines Included`,
    features,
    popular:
      String(plan.name).toLowerCase().includes("pro") ||
      String(plan.name).toLowerCase().includes("plus") ||
      index === 1,
    icon: index === 0 ? "⚙️" : index === 1 ? "🚜" : "🏗️",
    rawPlan: plan,
  };
};

function PricingHero() {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      <p className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-blue-600">
        Subscription Plans
      </p>

      <h1 className="text-4xl font-black leading-tight text-slate-950 sm:text-6xl dark:text-white">
        Choose the Right Plan for Your{" "}
        <span className="text-blue-600">Mining Operations</span>
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
        Flexible USD pricing for heavy machine maintenance, fleet tracking,
        alerts, reports and operational intelligence.
      </p>
    </div>
  );
}

function PricingCard({ 
  plan, 
  activePlan, 
  hasUsedDemo 
}: { 
  plan: PricingPlan; 
  activePlan?: string | null;
  hasUsedDemo?: boolean;
}) {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const isDemo = plan.name.toLowerCase().includes("free") || plan.name.toLowerCase().includes("demo");
  const isDemoDisabled = isDemo && hasUsedDemo;

  const proceedToCart = () => {
    localStorage.setItem(
      "selectedPlan",
      JSON.stringify({
        id: plan.id,
        name: plan.name,
        subtitle: plan.subtitle,
        price: plan.price,
        period: plan.period,
        limit: plan.limit,
        machine_limit: plan.rawPlan.machine_limit,
        features: plan.features,
        icon: plan.icon,
      }),
    );
    navigate("/cart");
  };

  const handleSelectPlan = () => {
    if (isDemoDisabled) {
      toast.dismiss();
      toast.error("you used demo plan please upgarte now");
      return;
    }

    if (activePlan && activePlan !== plan.name) {
      setShowConfirm(true);
    } else {
      proceedToCart();
    }
  };

  return (
    <>
      <div
        className={`relative flex h-full min-h-[580px] flex-col rounded-[1.75rem] border p-6 transition duration-300 hover:-translate-y-3${
          plan.popular
            ? "border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-600/20"
            : "border-slate-200 bg-white text-slate-900 shadow-lg shadow-slate-200/70 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:shadow-none"
        }`}
      >
        {plan.popular && (
          <div className="absolute right-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-wide text-blue-600">
            Most Popular
          </div>
        )}

        <div
          className={`mb-7 flex h-16 w-16 items-center justify-center rounded-3xl text-3xl ${
            plan.popular ? "bg-white/20" : "bg-blue-50 dark:bg-blue-600/20"
          }`}
        >
          {plan.icon}
        </div>

        <h2 className="text-xl font-black uppercase tracking-wide">
          {plan.name} PLAN
        </h2>

        <p
          className={`mt-3 text-sm leading-6 ${
            plan.popular ? "text-blue-50" : "text-slate-500 dark:text-slate-300"
          }`}
        >
          {plan.subtitle}
        </p>

        <div className="mt-7 flex items-end gap-1">
          <span
            className={`text-5xl font-black ${
              plan.popular ? "text-white" : "text-blue-600"
            }`}
          >
            {plan.price}
          </span>
        </div>

        <p
          className={`mt-4 rounded-2xl px-4 py-3 text-sm font-bold ${
            plan.popular
              ? "bg-white/15 text-white"
              : "bg-blue-50 text-blue-700 dark:bg-blue-600/15 dark:text-blue-300"
          }`}
        >
          {plan.limit}
        </p>

        <ul className="mt-8 max-h-[190px] flex-1 space-y-4 overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm leading-6">
              <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black ${plan.popular ? "bg-white text-blue-600" : "bg-blue-100 text-blue-600 dark:bg-blue-600/20 dark:text-blue-300"}`}>
                ✓
              </span>
              <span className={plan.popular ? "text-white" : "text-slate-700 dark:text-slate-200"}>
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <button
          onClick={handleSelectPlan}
          className={`mt-10 w-full rounded-2xl px-6 py-4 text-sm font-black transition hover:-translate-y-0.5 ${
            isDemoDisabled 
              ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600"
              : plan.popular
                ? "bg-white text-blue-600 shadow-lg hover:bg-blue-50"
                : "bg-blue-600 text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700"
          }`}
        >
          {isDemoDisabled ? "Upgrade Now" : activePlan === plan.name ? "Current Plan" : "Proceed to Cart →"}
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md scale-in-center rounded-[2.5rem] bg-white p-10 shadow-2xl dark:bg-slate-900">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-50 text-orange-500 dark:bg-orange-500/10">
              <span className="text-3xl">⚠️</span>
            </div>
            
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Active Plan Detected
            </h3>
            <p className="mt-4 text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              You currently have an active <span className="font-black text-blue-600 uppercase">{activePlan}</span> plan. 
              Buying the <span className="font-black text-orange-500 uppercase">{plan.name}</span> plan will update your subscription. 
              Are you sure you want to proceed?
            </p>

            <div className="mt-10 flex flex-col gap-3">
              <button
                onClick={proceedToCart}
                className="w-full rounded-2xl bg-slate-900 py-4 text-sm font-black text-white hover:bg-slate-800 transition shadow-xl"
              >
                Yes, Update My Plan
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="w-full rounded-2xl border border-slate-200 py-4 text-sm font-black text-slate-500 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PricingPlans() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePlan, setActivePlan] = useState<string | null>(null);
  const [hasUsedDemo, setHasUsedDemo] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch plans
        const response: any = await getSubscriptionPlans();
        const apiPlans = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
            ? response.data
            : Array.isArray(response?.plans)
              ? response.plans
              : Array.isArray(response?.data?.plans)
                ? response.data.plans
                : Array.isArray(response?.result)
                  ? response.result
                  : Array.isArray(response?.subscriptions)
                    ? response.subscriptions
                    : [];

        setPlans(apiPlans.map(mapApiPlanToPricingPlan));

        // Fetch active sub and history for state detection
        const token = localStorage.getItem("token") || localStorage.getItem("authToken");
        if (token) {
          try {
            const [activeSub, history] = await Promise.all([
              userService.getActiveSubscription(),
              userService.getSubscriptionHistory()
            ]);

            setActivePlan(activeSub?.plan_name || null);
            setHasUsedDemo(Array.isArray(history) && history.some((sub: any) => 
              sub.plan_name?.toLowerCase().includes("demo") || 
              sub.plan_name?.toLowerCase().includes("free")
            ));
          } catch (e) {
            console.error("Failed to fetch sub status", e);
          }
        }
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to load pricing plans",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main
      id="plans"
      className="relative z-10 overflow-visible bg-gradient-to-br from-white via-blue-50 to-white px-5 py-20 lg:px-8 dark:from-[#050b18] dark:via-[#071b38] dark:to-[#050b18]"
    >
      <div className="absolute left-1/2 top-24 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-blue-600/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <PricingHero />

        {loading ? (
          <p className="py-10 text-center text-sm font-semibold text-slate-500 dark:text-slate-300">
            Loading pricing plans...
          </p>
        ) : plans.length === 0 ? (
          <p className="py-10 text-center text-sm font-semibold text-slate-500 dark:text-slate-300">
            No pricing plans found.
          </p>
        ) : (
          <div className="relative">
            <div className="overflow-x-auto overflow-y-visible py-4 pb-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex snap-x snap-mandatory gap-6 px-1 sm:gap-7">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className="min-w-[86%] snap-start sm:min-w-[46%] lg:min-w-[calc((100%-3.5rem)/3)]"
                  >
                    <PricingCard 
                      plan={plan} 
                      activePlan={activePlan} 
                      hasUsedDemo={hasUsedDemo} 
                    />
                  </div>
                ))}
              </div>
            </div>

            {plans.length > 3 && (
              <p className="mt-1 text-center text-xs font-semibold text-slate-500 dark:text-slate-400">
                Scroll left or right to view more plans →
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

function PricingComparison() {
  return (
    <section
      id="comparison"
      className="bg-white px-5 py-20 lg:px-8 dark:bg-[#050b18]"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-blue-600">
            Compare Plans
          </p>

          <h2 className="mt-4 text-3xl font-black text-slate-950 sm:text-5xl dark:text-white">
            What You Get in Each Plan
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-slate-600 dark:text-slate-300">
            Compare machine limits, user roles, modules, reporting and support
            before creating your company account.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-white/5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px]">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-6 py-5 text-left text-sm font-black">
                    Features
                  </th>
                  <th className="px-6 py-5 text-center text-sm font-black">
                    Basic
                  </th>
                  <th className="px-6 py-5 text-center text-sm font-black">
                    Pro
                  </th>
                  <th className="px-6 py-5 text-center text-sm font-black">
                    Plus
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 text-sm text-slate-700 dark:divide-white/10 dark:text-slate-200">
                {pricingComparison.map(([feature, basic, pro, plus]) => (
                  <tr
                    key={feature}
                    className="transition hover:bg-blue-50 dark:hover:bg-white/5"
                  >
                    <td className="px-6 py-5 font-bold text-slate-950 dark:text-white">
                      {feature}
                    </td>

                    <td className="px-6 py-5 text-center">{basic}</td>

                    <td className="px-6 py-5 text-center font-bold text-blue-600 dark:text-blue-300">
                      {pro}
                    </td>

                    <td className="px-6 py-5 text-center">{plus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingCTA() {
  return (
    <section className="relative z-10 bg-blue-600 px-5 py-20 text-center text-white lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_45%)]" />

      <div className="relative mx-auto max-w-4xl">
        <h2 className="text-3xl font-black sm:text-5xl">
          Ready to Transform Your Mining Operations?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-blue-50">
          Start with a plan that fits your fleet and scale your maintenance
          intelligence as your company grows.
        </p>

        <a
          href="#plans"
          className="mt-8 inline-flex rounded-2xl bg-white px-8 py-4 text-sm font-black text-blue-600 shadow-xl transition hover:-translate-y-0.5 hover:bg-blue-50"
        >
          View Plans →
        </a>
      </div>
    </section>
  );
}

export default function PricingPage() {
  const [active, setActive] = useState("plans");

  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-[#050b18] dark:text-white">
      <Header active={active} setActive={setActive} />

      <main>
        <PricingPlans />
        <PricingComparison />
        <PricingCTA />
      </main>

      <div className="[&_.reveal]:!translate-y-0 [&_.reveal]:!opacity-100">
        <Footer />
      </div>
    </div>
  );
}

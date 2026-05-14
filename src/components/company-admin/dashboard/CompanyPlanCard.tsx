import React from "react";
import { Link } from "react-router";
import { ShieldCheck, Clock, ArrowUpCircle } from "lucide-react";

interface CompanyPlanCardProps {
  subscription: any;
  machineCount: number;
}

export default function CompanyPlanCard({ subscription, machineCount }: CompanyPlanCardProps) {
  if (!subscription) {
    return (
      <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-6 dark:border-blue-900/30 dark:bg-blue-500/5">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/50">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">No Active Plan</h2>
              <p className="text-sm text-slate-500">Activate a plan to start monitoring your components.</p>
            </div>
          </div>
          <Link
            to="/plans"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all"
          >
            Choose Plan
          </Link>
        </div>
      </div>
    );
  }

  const calculateDaysLeft = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const daysLeft = calculateDaysLeft(subscription.subscription_end_date || subscription.subscriptionEndDate || subscription.end_date);
  const isDemo = (subscription.plan_name || subscription.name)?.toLowerCase() === "demo";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Background Accent */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/5 blur-3xl" />
      
      <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="flex flex-1 items-start gap-5">
          <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
            isDemo ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"
          } dark:bg-blue-900/30`}>
            <ShieldCheck size={32} />
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                {subscription.plan_name || subscription.name || 'Active'} Plan
              </h2>
              <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${
                subscription.status === 'active' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}>
                {subscription.status}
              </span>
            </div>
            
            <p className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <strong className="text-slate-900 dark:text-white">{machineCount}</strong> / {subscription.machine_limit || '∞'} Machines
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                <strong>{daysLeft}</strong> days remaining
              </span>
            </p>
          </div>
        </div>

        <div className="flex w-full items-center gap-3 md:w-auto">
          <Link
            to="/plans"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 md:flex-none"
          >
            <ArrowUpCircle size={18} />
            Upgrade Plan
          </Link>
        </div>
      </div>
      
      {/* Progress Bar for Machines */}
      {subscription.machine_limit && (
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
            <span>Machine Usage</span>
            <span>{Math.round((machineCount / subscription.machine_limit) * 100)}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${
                (machineCount / subscription.machine_limit) > 0.8 ? "bg-red-500" : "bg-blue-500"
              }`}
              style={{ width: `${Math.min(100, (machineCount / subscription.machine_limit) * 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
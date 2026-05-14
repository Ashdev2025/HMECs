import React from "react";
import { Calendar, CheckCircle2, Clock, CreditCard, History } from "lucide-react";

interface HistoryItem {
  id: string | number;
  plan_name: string;
  status: string;
  price: string | number;
  subscription_start_date: string;
  subscription_end_date: string;
  payment_status: string;
}

interface SubscriptionHistoryTableProps {
  history: HistoryItem[];
}

export default function SubscriptionHistoryTable({ history }: SubscriptionHistoryTableProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateDuration = (start: string, end: string) => {
    if (!start || !end) return "N/A";
    const s = new Date(start);
    const e = new Date(end);
    const diff = e.getTime() - s.getTime();
    const days = Math.round(diff / (1000 * 60 * 60 * 24));
    return `${days} Days`;
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
      <div className="flex items-center gap-3 border-b border-slate-100 p-6 dark:border-slate-800">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
          <History size={20} />
        </div>
        <div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white">Subscription History</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Detailed overview of your plan timeline and status.</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50/50 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 dark:bg-slate-800/50">
              <th className="px-6 py-4">Plan & Status</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4 text-center">Duration</th>
              <th className="px-6 py-4">Start Date</th>
              <th className="px-6 py-4 text-right">End Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {history && history.length > 0 ? (
              history.map((item) => (
                <tr key={item.id} className="group transition hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        <CreditCard size={18} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">
                          {item.plan_name || (item as any).name || "Unknown Plan"}
                        </span>
                        <span className={`inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                          item.status === 'active' 
                            ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400" 
                            : item.status === 'expired'
                            ? "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-500"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400"
                        }`}>
                          {item.status === 'active' && <CheckCircle2 size={10} />}
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-5">
                    <span className="text-base font-bold text-slate-700 dark:text-slate-300">
                      ${item.price ?? (item as any).amount ?? "0.00"}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-center">
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
                      <Clock size={12} />
                      {calculateDuration(
                        item.subscription_start_date || (item as any).start_date, 
                        item.subscription_end_date || (item as any).end_date
                      )}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Start Date</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300 italic">
                        {formatDate(item.subscription_start_date || (item as any).subscriptionStartDate || (item as any).start_date || (item as any).created_at)}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-right">
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Expiry Date</span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {formatDate(item.subscription_end_date || (item as any).subscriptionEndDate || (item as any).end_date)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center gap-2">
                    <Clock className="opacity-20" size={40} />
                    <p>No subscription records found.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

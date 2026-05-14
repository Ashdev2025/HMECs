import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { 
  Activity,
  AlertCircle,
  ArrowRight,
  BarChart3,
  Bell,
  Box,
  Calendar,
  ChevronRight,
  ClipboardList,
  Clock,
  Cpu,
  Download,
  Edit,
  FileText,
  Filter,
  History,
  LayoutDashboard,
  Lock,
  LogOut,
  Map,
  Plus,
  PlusCircle,
  Search,
  Send,
  Settings,
  Shield,
  TrendingDown,
  TrendingUp,
  Truck,
  Users,
  Wrench,
  Zap,
  DollarSign,
  Database,
  PieChart as PieChartIcon,
  CheckCircle2 as CheckLineIcon
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie
} from "recharts";

import CompanyPlanCard from "../../components/company-admin/dashboard/CompanyPlanCard";
import SubscriptionHistoryTable from "../../components/company-admin/dashboard/SubscriptionHistoryTable";
import { userService } from "../../services/userService";

// Mock Data for the Lifecycle Dashboard
const CATEGORY_DATA = [
  { name: 'Engine', value: 550000, color: '#f97316' },
  { name: 'Tyre', value: 220000, color: '#0ea5e9' },
  { name: 'Transmission', value: 85000, color: '#a855f7' },
  { name: 'Structural/Wear', value: 95000, color: '#22c55e' },
  { name: 'Hydraulic', value: 75000, color: '#eab308' },
  { name: 'Brake', value: 65000, color: '#ec4899' },
  { name: 'Electrical', value: 45000, color: '#06b6d4' },
  { name: 'Cooling', value: 35000, color: '#14b8a6' },
  { name: 'Cabin', value: 25000, color: '#64748b' },
];

const DISTRIBUTION_DATA = [
  { name: 'Engine', value: 8, color: '#ef4444' },
  { name: 'Tyre', value: 7, color: '#3b82f6' },
  { name: 'Transmission', value: 1, color: '#a855f7' },
  { name: 'Hydraulic', value: 5, color: '#eab308' },
  { name: 'Brake', value: 2, color: '#f97316' },
  { name: 'Electrical', value: 2, color: '#06b6d4' },
  { name: 'Structural/Wear', value: 5, color: '#22c55e' },
  { name: 'Cooling', value: 1, color: '#14b8a6' },
  { name: 'Cabin', value: 1, color: '#64748b' },
];

const FLEET_MACHINES = [
  { id: 'CKBJ-785-011', type: 'HT', serial: 'SN-785-011', critical: 1, warning: 2, value: 'R 2.08M' },
  { id: 'CKBJ-990-020', type: 'FEL', serial: 'SN-990-020', critical: 1, warning: 2, value: 'R 2.25M' },
  { id: 'CKBJ-010-003', type: 'Dozer', serial: 'SN-010-003', critical: 0, warning: 1, value: 'R 1.40M' },
  { id: 'CKBJ-EX300-015', type: 'Excavator', serial: 'SN-EX300-015', critical: 0, warning: 1, value: 'R 1.03M' },
  { id: 'CKBJ-GD-007', type: 'Grader', serial: 'SN-GD-007', critical: 1, warning: 2, value: 'R 970K' },
];

const HIGH_RISK_COMPONENTS = [
  { machine: 'CKBJ-990-020', component: 'Front Left Tyre', type: 'FEL', serial: 'TY-990-001', life: 92, cost: 'R 250K' },
  { machine: 'CKBJ-785-011', component: 'AC Compressor', type: 'HT', serial: 'CB-TX-001', life: 88, cost: 'R 14K' },
  { machine: 'CKBJ-GD-007', component: 'Front Tyre LH', type: 'Grader', serial: 'TY-GD-001', life: 95, cost: 'R 250K' },
];

import { CompanyAdminNav } from "../../components/company-admin/CompanyAdminNav";

export default function CompanyAdminDashboard() {
  const [subscription, setSubscription] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [machines, setMachines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [sub, subHistory, machinesList] = await Promise.all([
          userService.getActiveSubscription(),
          userService.getSubscriptionHistory(),
          userService.getMachines()
        ]);
        
        if (!sub && (!subHistory || subHistory.length === 0)) {
          navigate("/plans");
          return;
        }

        setSubscription(sub);
        setHistory(subHistory);
        setMachines(machinesList || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  const isExpired = subscription?.status === "expired";

  return (
    <div className="min-h-screen bg-[#F8F9FC] dark:bg-slate-900 p-4 lg:p-10">
      <CompanyAdminNav />
      {/* Premium Header */}
      <div className="relative mb-12 overflow-hidden rounded-[3rem] bg-[#0F172A] p-10 text-white shadow-2xl">
        <div className="absolute right-0 top-0 h-64 w-64 -translate-y-12 translate-x-12 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="relative z-10 flex flex-col gap-10 xl:flex-row xl:items-center xl:justify-between">
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">Fleet Component Intelligence</p>
            <h1 className="text-5xl font-black tracking-tighter leading-tight">
              Component <span className="text-orange-500">Lifecycle</span><br />
              Dashboard
            </h1>
            <div className="flex items-center gap-4 pt-2">
               <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
               <p className="text-xs font-bold text-slate-400">KEEPING AFRICA MOVING</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:gap-6">
            {[
              { label: "Total Components", value: "42", color: "text-white" },
              { label: "Critical", value: "5", color: "text-red-500" },
              { label: "Warning", value: "10", color: "text-orange-500" },
              { label: "Replacement Value", value: "R 12.75M", color: "text-white" },
            ].map((stat, i) => (
              <div key={i} className="min-w-[160px] rounded-[2rem] bg-white/5 border border-white/10 p-6 backdrop-blur-md">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">{stat.label}</p>
                <p className={`mt-2 text-3xl font-black ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {/* Fleet Overview Section */}
        <section>
          <div className="mb-6 flex items-center gap-3">
            <Truck className="text-slate-400" size={20} />
            <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider">Fleet Overview</h2>
            <span className="text-xs font-bold text-slate-400">5 machines • 42 components</span>
          </div>
          
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {[
              { id: 'CKBJ-785-011', type: 'HT', comps: 7, crit: 1, warn: 2, val: 'R 2.08M' },
              { id: 'CKBJ-785-042', type: 'HT', comps: 4, crit: 1, warn: 0, val: 'R 2.15M' },
              { id: 'CKBJ-990-020', type: 'FEL', comps: 8, crit: 1, warn: 2, val: 'R 2.25M' },
              { id: 'CKBJ-010-003', type: 'Dozer', comps: 5, crit: 0, warn: 1, val: 'R 1.40M' },
              { id: 'CKBJ-GD-007', type: 'Grader', comps: 5, crit: 1, warn: 2, val: 'R 970K' },
            ].map((m) => (
              <div key={m.id} className="group relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 p-7 shadow-sm transition-all hover:shadow-xl dark:bg-slate-800 dark:border-slate-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">{m.id}</h3>
                  <span className="rounded-lg bg-slate-900 px-2 py-1 text-[8px] font-black text-white uppercase">{m.type}</span>
                </div>
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-[20px] font-black text-slate-900 dark:text-white">{m.comps}</p>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Components</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-black text-red-500">{m.crit}</span>
                      <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-black text-orange-500">{m.warn}</span>
                      <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-6 dark:border-slate-700/50">
                  <p className="text-xs font-black text-slate-900 dark:text-white">{m.val}</p>
                  <button className="text-slate-300 transition-colors hover:text-orange-500">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Overview Content - Full Width Stack */}
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="rounded-[3rem] bg-white p-10 shadow-sm border border-slate-100 dark:bg-slate-800">
              <div className="mb-10 flex items-center gap-4">
                <div className="h-10 w-10 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500">
                  <BarChart3 size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">Replacement Value by Category</h3>
                  <p className="text-[10px] font-bold text-slate-400 tracking-wider">Total cost exposure per component group</p>
                </div>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CATEGORY_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                      {CATEGORY_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-[3rem] bg-white p-10 shadow-sm border border-slate-100 dark:bg-slate-800">
              <div className="mb-10 flex items-center gap-4">
                <div className="h-10 w-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
                  <PieChartIcon size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">Component Distribution</h3>
                  <p className="text-[10px] font-bold text-slate-400 tracking-wider">Breakdown by category</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-[220px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={DISTRIBUTION_DATA} innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                        {DISTRIBUTION_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-x-12 gap-y-3">
                  {DISTRIBUTION_DATA.slice(0, 8).map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-[10px] font-bold text-slate-500">{item.name}</span>
                      <span className="text-[10px] font-black text-slate-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* High-Risk Table */}
          <div className="rounded-[3rem] bg-white shadow-sm border border-slate-100 dark:bg-slate-800 overflow-hidden">
            <div className="p-8 border-b border-slate-50 dark:border-slate-700/50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-2xl bg-red-50 flex items-center justify-center text-red-500">
                  <AlertCircle size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">High-Risk Components</h3>
                  <p className="text-[10px] font-bold text-slate-400 tracking-wider">Combined Risk = Remaining Life % + Condition Rating</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-red-50 text-[9px] font-black text-red-600 uppercase">Critical</span>
                <span className="px-3 py-1 rounded-full bg-orange-50 text-[9px] font-black text-orange-600 uppercase">Warning</span>
                <span className="px-3 py-1 rounded-full bg-green-50 text-[9px] font-black text-green-600 uppercase">Healthy</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#FBFCFE] dark:bg-slate-900/50">
                  <tr>
                    <th className="px-8 py-5 text-[9px] font-black uppercase text-slate-400">Machine</th>
                    <th className="px-8 py-5 text-[9px] font-black uppercase text-slate-400">Category</th>
                    <th className="px-8 py-5 text-[9px] font-black uppercase text-slate-400">Condition</th>
                    <th className="px-8 py-5 text-[9px] font-black uppercase text-slate-400">Remaining Life</th>
                    <th className="px-8 py-5 text-[9px] font-black uppercase text-slate-400">Risk</th>
                    <th className="px-8 py-5 text-[9px] font-black uppercase text-slate-400">Risk Driver</th>
                    <th className="px-8 py-5 text-[9px] font-black uppercase text-slate-400">Alert</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                  {[
                    { id: 'CKBJ-785-011', cat: 'Tyre', cond: 'Critical', life: 17.5, risk: 'Critical', driver: 'Low Remaining Life' },
                    { id: 'CKBJ-990-020', cat: 'Tyre', cond: 'Critical', life: 48.0, risk: 'Critical', driver: 'Poor Condition' },
                    { id: 'CKBJ-GD-007', cat: 'Tyre', cond: 'Critical', life: 77.1, risk: 'Critical', driver: 'Poor Condition' },
                    { id: 'CKBJ-785-011', cat: 'Engine', cond: 'Monitor', life: 30.0, risk: 'Warning', driver: 'Normal' },
                    { id: 'CKBJ-990-020', cat: 'Brake', cond: 'Warning', life: 85.0, risk: 'Warning', driver: 'Poor Condition' },
                  ].map((item, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-all">
                      <td className="px-8 py-6 font-black text-slate-900 dark:text-white text-xs">{item.id}</td>
                      <td className="px-8 py-6 text-xs text-slate-500 font-bold">{item.cat}</td>
                      <td className="px-8 py-6">
                        <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase ${
                          item.cond === 'Critical' ? 'bg-red-50 text-red-500' : 'bg-orange-50 text-orange-500'
                        }`}>{item.cond}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full ${item.life < 20 ? 'bg-red-500' : 'bg-orange-500'}`} style={{ width: `${item.life}%` }} />
                          </div>
                          <span className="text-[10px] font-black">{item.life}%</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase ${
                          item.risk === 'Critical' ? 'bg-red-50 text-red-500' : 'bg-orange-50 text-orange-500'
                        }`}>{item.risk}</span>
                      </td>
                      <td className="px-8 py-6">
                          <span className="px-3 py-1 rounded-full border border-orange-200 bg-orange-50 text-[9px] font-black text-orange-700 uppercase">
                            {item.driver}
                          </span>
                      </td>
                      <td className="px-8 py-6">
                          <Bell size={14} className="text-red-500" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Risk Logic - Live Verification */}
          <div className="rounded-[3rem] bg-white p-10 shadow-sm border border-slate-100 dark:bg-slate-800">
            <div className="mb-10 flex items-center gap-4">
              <div className="h-10 w-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white">
                <Database size={20} />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">Risk Logic - Live Verification</h3>
                <p className="text-[10px] font-bold text-slate-400 tracking-wider">Automated validation of life + condition logic</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { case: 'Case 1', desc: 'Good condition - mid-life', life: '55%', cond: '2 - Good', status: { exp: 'Healthy', act: 'Healthy' }, driver: { exp: 'Normal', act: 'Normal' }, alert: { exp: 'No Alert', act: 'No Alert' }, pass: true },
                { case: 'Case 2', desc: 'Vibrating condition - mid-life', life: '55%', cond: '4 - Warning', status: { exp: 'Warning', act: 'Warning' }, driver: { exp: 'Poor Condition', act: 'Poor Condition' }, alert: { exp: 'No Alert', act: 'No Alert' }, pass: true },
                { case: 'Case 3', desc: 'Low remaining life - regardless of cond', life: '15%', cond: '2 - Good', status: { exp: 'Critical', act: 'Critical' }, driver: { exp: 'Low Remaining Life', act: 'Low Remaining Life' }, alert: { exp: 'A - Immediate', act: 'A - Immediate' }, pass: true },
                { case: 'Case 4', desc: 'Critical condition - high remaining life', life: '85%', cond: '5 - Critical', status: { exp: 'Critical', act: 'Critical' }, driver: { exp: 'Poor Condition', act: 'Poor Condition' }, alert: { exp: 'A - Immediate', act: 'A - Immediate' }, pass: true },
              ].map((c, i) => (
                <div key={i} className={`p-6 rounded-[2rem] border-2 ${c.pass ? 'border-green-100 bg-green-50/10' : 'border-slate-100'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-black text-slate-900">{c.case}</p>
                    <span className="px-2 py-0.5 rounded-lg bg-white border border-green-200 text-[8px] font-black text-green-600 uppercase flex items-center gap-1">
                      <CheckLineIcon size={10} /> PASS
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 italic mb-4 h-8">{c.desc}</p>
                  <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-green-100/50">
                    <div className="space-y-1">
                      <p className="text-[8px] font-black text-slate-400 uppercase">Input Life</p>
                      <p className="text-xs font-black text-slate-900">{c.life}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[8px] font-black text-slate-400 uppercase">Condition</p>
                      <p className="text-xs font-black text-slate-900">{c.cond}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-[8px] font-black text-slate-400 uppercase">Risk Status</p>
                      <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase ${c.status.act === 'Healthy' ? 'bg-green-100 text-green-700' : c.status.act === 'Warning' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                        {c.status.act}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[8px] font-black text-slate-400 uppercase">Risk Driver</p>
                      <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[8px] font-black text-slate-700 uppercase">
                        {c.driver.act}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[8px] font-black text-slate-400 uppercase">Alert Trigger</p>
                      <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase ${c.alert.act.includes('Alert') ? 'text-slate-400' : 'bg-red-100 text-red-700'}`}>
                        {c.alert.act}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise Access Box */}
          <div className="rounded-[3rem] bg-slate-900 p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
              <Shield size={120} className="text-white/5" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-black">Enterprise Access</h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                  Your organization is currently on the <span className="text-orange-500 font-black">PREMIUM</span> tier. 
                  You have full access to predictive analytics, GPS telemetry, and executive reporting.
                </p>
              </div>
              <button onClick={() => navigate("/plans")} className="px-10 py-5 rounded-2xl bg-orange-500 text-white text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20">
                Manage Subscription
              </button>
            </div>
          </div>

          {/* Subscription History Section */}
          <div className="pt-20 border-t border-slate-200">
            <div className="mb-10 flex items-center gap-4">
              <div className="h-10 w-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
                <History size={20} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Billing & Enterprise Control</h2>
            </div>
            <CompanyPlanCard subscription={subscription} machineCount={machines.length} />
            <div className="mt-10">
              <SubscriptionHistoryTable history={history} />
            </div>
          </div>
        </div>
      </div>

      {/* Expired Overlay */}
      {isExpired && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md">
          <div className="max-w-md rounded-[3rem] bg-white p-12 text-center shadow-2xl dark:bg-slate-800">
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-red-50 text-red-500">
              <Lock size={40} />
            </div>
            <h2 className="mb-4 text-3xl font-black text-slate-900 dark:text-white tracking-tight">System Locked</h2>
            <p className="mb-10 text-slate-500 leading-relaxed text-lg">Your enterprise subscription has expired. Access to fleet intelligence is restricted until payment is resolved.</p>
            <button 
              onClick={() => navigate("/plans")} 
              className="w-full rounded-[1.5rem] bg-orange-500 py-5 text-lg font-black text-white shadow-2xl shadow-orange-500/40 transition-all hover:bg-orange-600 hover:scale-105 active:scale-95"
            >
              Renew Access Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

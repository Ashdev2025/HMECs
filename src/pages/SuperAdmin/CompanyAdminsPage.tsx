import React, { useState } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Shield, 
  Calendar,
  Building2,
  Mail,
  UserPlus,
  ArrowUpRight,
  ChevronDown,
  X
} from "lucide-react";

const MOCK_COMPANIES = [
  {
    id: 1,
    name: "Mining Solutions Corp",
    code: "MSC-2024",
    admin: { name: "John Doe", email: "john@miningsolutions.com" },
    staff_count: 24,
    active_plan: "Premium",
    status: "Active",
    joined_date: "Jan 12, 2024",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=MSC"
  },
  {
    id: 2,
    name: "Global Excavation Ltd",
    code: "GEL-990",
    admin: { name: "Sarah Smith", email: "sarah@globalex.com" },
    staff_count: 12,
    active_plan: "Silver",
    status: "Active",
    joined_date: "Feb 05, 2024",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=GEL"
  },
  {
    id: 3,
    name: "Precision Haulage",
    code: "PH-785",
    admin: { name: "Mike Johnson", email: "mike@precision.com" },
    staff_count: 8,
    active_plan: "Demo",
    status: "Expiring Soon",
    joined_date: "May 01, 2024",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=PH"
  },
  {
    id: 4,
    name: "Apex Earthmovers",
    code: "AE-010",
    admin: { name: "Robert Chen", email: "robert@apex.com" },
    staff_count: 45,
    active_plan: "Premium",
    status: "Active",
    joined_date: "Nov 20, 2023",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=AE"
  },
  {
    id: 5,
    name: "TechMining SA",
    code: "TM-EX300",
    admin: { name: "Elena Rodriguez", email: "elena@techmining.co.za" },
    staff_count: 15,
    active_plan: "Silver",
    status: "Active",
    joined_date: "Mar 15, 2024",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=TM"
  }
];

export default function CompanyAdminsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("All Plans");
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [selectedCompanyStaff, setSelectedCompanyStaff] = useState<any[]>([]);
  const [currentCompanyName, setCurrentCompanyName] = useState("");

  const MOCK_STAFF = [
    { name: "Alice Thompson", role: "Operator", email: "alice@mining.com", joined: "Jan 20" },
    { name: "Bob Wilson", role: "Mechanic", email: "bob@mining.com", joined: "Feb 15" },
    { name: "Charlie Davis", role: "Manager", email: "charlie@mining.com", joined: "Mar 02" },
  ];

  const handleViewStaff = (company: any) => {
    setCurrentCompanyName(company.name);
    // In real app, we would fetch staff by company.id
    setSelectedCompanyStaff(MOCK_STAFF);
    setIsStaffModalOpen(true);
  };

  const filteredCompanies = MOCK_COMPANIES.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          company.admin.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = selectedPlan === "All Plans" || company.active_plan === selectedPlan;
    return matchesSearch && matchesPlan;
  });

  return (
    <div className="min-h-screen bg-[#F8F9FC] p-4 lg:p-10 dark:bg-slate-900">
      {/* Header Section */}
      <div className="mb-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
              Company <span className="text-blue-600">Administrators</span>
            </h1>
            <p className="text-sm font-medium text-slate-500">Manage enterprise clients and monitor their ecosystem activity.</p>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                    <img 
                      key={i}
                      className="h-9 w-9 rounded-full border-2 border-white bg-slate-100 dark:border-slate-800" 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} 
                      alt="User" 
                    />
                ))}
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-[10px] font-bold text-white dark:border-slate-800">
                    +12
                </div>
             </div>
             <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">
                <UserPlus size={16} />
                Add New Admin
             </button>
          </div>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Companies", value: "24", icon: Building2, color: "bg-blue-50 text-blue-600" },
          { label: "Active Admins", value: "22", icon: Users, color: "bg-green-50 text-green-600" },
          { label: "Staff Members", value: "148", icon: UserPlus, color: "bg-purple-50 text-purple-600" },
          { label: "Monthly Revenue", value: "R 42.5K", icon: ArrowUpRight, color: "bg-orange-50 text-orange-600" },
        ].map((stat, i) => (
          <div key={i} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800/50">
            <div className="flex items-center justify-between">
               <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.color}`}>
                  <stat.icon size={22} />
               </div>
               <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
            </div>
            <p className="mt-4 text-2xl font-black text-slate-900 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters & Table */}
      <div className="rounded-[2.5rem] border border-slate-100 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-800/50 overflow-hidden">
        <div className="border-b border-slate-50 p-8 dark:border-slate-700/50">
           <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1 max-w-md">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                 <input 
                   type="text" 
                   placeholder="Search company or admin name..."
                   className="w-full rounded-2xl border-none bg-slate-50 py-3.5 pl-12 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600/20 dark:bg-slate-900 dark:text-white"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                 />
              </div>
              
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-2 dark:bg-slate-900">
                    <Building2 size={16} className="text-slate-400" />
                    <select 
                      className="border-none bg-transparent py-1 text-xs font-bold text-slate-600 focus:ring-0 dark:text-slate-300"
                    >
                       <option>Select Company</option>
                       {MOCK_COMPANIES.map(c => <option key={c.id}>{c.name}</option>)}
                    </select>
                 </div>

                 <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-2 dark:bg-slate-900">
                    <Filter size={16} className="text-slate-400" />
                    <select 
                      className="border-none bg-transparent py-1 text-xs font-bold text-slate-600 focus:ring-0 dark:text-slate-300"
                      value={selectedPlan}
                      onChange={(e) => setSelectedPlan(e.target.value)}
                    >
                       <option>All Plans</option>
                       <option>Premium</option>
                       <option>Silver</option>
                       <option>Demo</option>
                    </select>
                 </div>
                 <button className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-[10px] font-black text-white uppercase tracking-widest hover:bg-slate-800 transition-all">
                    Export Data
                 </button>
              </div>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Company & Code</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Admin Info</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Staff Count</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Active Plan</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
              {filteredCompanies.map((company) => (
                <tr key={company.id} className="group hover:bg-slate-50/50 transition-colors dark:hover:bg-slate-900/30">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-11 w-11 rounded-2xl border border-slate-100 bg-white p-0.5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <img src={company.avatar} alt={company.name} className="h-full w-full rounded-[14px] object-cover" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-sm font-black text-slate-900 dark:text-white">{company.name}</p>
                        <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                          <Shield size={10} className="text-blue-500" /> {company.code}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{company.admin.name}</p>
                      <span className="flex items-center gap-1 text-[10px] font-medium text-slate-400">
                        <Mail size={10} /> {company.admin.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col items-center">
                       <span className="text-sm font-black text-slate-900 dark:text-white">{company.staff_count}</span>
                       <span className="text-[8px] font-black uppercase tracking-tighter text-slate-400">Members</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <div className={`h-2 w-2 rounded-full ${
                         company.active_plan === 'Premium' ? 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]' : 
                         company.active_plan === 'Silver' ? 'bg-blue-500' : 'bg-orange-500'
                       }`} />
                       <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase">{company.active_plan}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-wider ${
                      company.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {company.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                         onClick={() => handleViewStaff(company)}
                         className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all dark:bg-slate-900"
                       >
                          <Eye size={18} />
                       </button>
                       <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-900 transition-all dark:bg-slate-900">
                          <MoreVertical size={18} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="bg-slate-50/50 p-6 dark:bg-slate-900/50 border-t border-slate-50 dark:border-slate-700/50">
           <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Showing {filteredCompanies.length} of 24 companies</p>
              <div className="flex items-center gap-2">
                 <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">Previous</button>
                 <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">Next</button>
              </div>
           </div>
        </div>
      </div>

      {/* Staff Details Modal */}
      {isStaffModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
          <div className="w-full max-w-2xl animate-in zoom-in-95 duration-200 rounded-[3rem] bg-white p-10 shadow-2xl dark:bg-slate-800">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Users size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Staff Members</h2>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{currentCompanyName}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsStaffModalOpen(false)}
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-100 dark:bg-slate-900"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {selectedCompanyStaff.map((staff, i) => (
                <div key={i} className="flex items-center justify-between p-5 rounded-2xl border border-slate-50 bg-slate-50/30 dark:border-slate-700/50 dark:bg-slate-900/50">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-xs font-bold text-slate-400 shadow-sm border border-slate-100">
                       {staff.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 dark:text-white">{staff.name}</p>
                      <p className="text-[10px] font-medium text-slate-500">{staff.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-[9px] font-black text-blue-600 uppercase">
                      {staff.role}
                    </span>
                    <p className="text-[8px] font-bold text-slate-400 mt-1 uppercase">Joined {staff.joined}</p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setIsStaffModalOpen(false)}
              className="w-full mt-10 rounded-2xl bg-slate-900 py-4 text-xs font-black text-white uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import React from "react";
import { 
  ClipboardList, 
  Star, 
  ArrowUpRight,
  Search,
  Plus,
  ChevronDown
} from "lucide-react";

const MAINTENANCE_EVENTS = [
  { date: '2025-03-10', machine: 'CK&IJ-990-020', component: 'Turbocharger', technician: 'T. Dlamini', work: 'Replaced turbo seals, re-torqued manifold', cost: 'R 8 500', downtime: '6 hrs', status: 'Closed' },
  { date: '2025-03-18', machine: 'CK&IJ-785-011', component: 'Left Rear Tyre', technician: 'S. Mokoena', work: 'Tyre swap — beyond wear limit', cost: 'R 320 000', downtime: '4 hrs', status: 'Closed' },
  { date: '2025-03-22', machine: 'CK&IJ-D10-003', component: 'Ripper Tips', technician: 'P. Khumalo', work: 'Full ripper tip replacement set', cost: 'R 28 000', downtime: '2 hrs', status: 'Closed' },
  { date: '2025-03-28', machine: 'CK&IJ-GD-007', component: 'Front Tyre LH', technician: 'T. Dlamini', work: 'Pre-replacement inspection — flagged critical', cost: 'R 1 200', downtime: '1 hr', status: 'Open' },
  { date: '2025-04-01', machine: 'CK&IJ-990-020', component: 'Front Left Tyre', technician: 'S. Mokoena', work: 'Emergency replacement — tread separation', cost: 'R 250 000', downtime: '3 hrs', status: 'Closed' },
  { date: '2025-04-02', machine: 'CK&IJ-EX300-015', component: 'Bucket Teeth Set', technician: 'N. Zulu', work: 'Worn teeth replaced — 90% consumed', cost: 'R 18 500', downtime: '3 hrs', status: 'Closed' },
  { date: '2025-04-03', machine: 'CK&IJ-EX300-015', component: 'ECM / Controller', technician: 'P. Khumalo', work: 'Firmware update and diagnostic scan performed', cost: 'R 3 200', downtime: '1 hr', status: 'Closed' },
  { date: '2025-02-14', machine: 'CK&IJ-785-011', component: 'Alternator', technician: 'N. Zulu', work: 'Cleaned slip rings, tested output voltage', cost: 'R 3 200', downtime: '2 hrs', status: 'Closed' },
  { date: '2025-01-20', machine: 'CK&IJ-990-020', component: 'Radiator Assembly', technician: 'T. Dlamini', work: 'Descaling and pressure test', cost: 'R 4 500', downtime: '4 hrs', status: 'Closed' },
  { date: '2025-04-04', machine: 'CK&IJ-GD-007', component: 'Circle Drive Motor', technician: 'S. Mokoena', work: 'Seal replacement and pressure test completed', cost: 'R 4 800', downtime: '3 hrs', status: 'Closed' },
];

export default function MaintenanceLog() {
  return (
    <div className="min-h-screen bg-[#F8F9FC] dark:bg-slate-900 p-4 lg:p-10">
      <div className="mx-auto max-w-[1600px]">
        
        {/* Main Log Container */}
        <div className="rounded-[3rem] bg-white shadow-sm border border-slate-100 dark:bg-slate-800 dark:border-slate-700 overflow-hidden">
          
          {/* Header Area */}
          <div className="p-10 border-b border-slate-50 dark:border-slate-700/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="h-14 w-14 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-500">
                <ClipboardList size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Maintenance Log</h1>
                <p className="text-xs font-bold text-slate-400 tracking-wider">Full service event history across the fleet</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
               <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">
                 <Plus size={16} /> New Entry
               </button>
            </div>
          </div>

          {/* New Filters Section */}
          <div className="px-10 py-6 border-b border-slate-50 bg-[#FBFCFE] dark:bg-slate-900/30 flex flex-col lg:flex-row gap-4">
             <div className="flex-1 relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-purple-500 transition-colors" size={16} />
                <input 
                  type="text" 
                  placeholder="Search events, components or machines..." 
                  className="w-full pl-14 pr-8 py-4 rounded-2xl bg-white border border-slate-100 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                />
             </div>
             <div className="flex flex-wrap gap-4">
                <div className="relative group">
                  <select className="appearance-none pl-6 pr-12 py-4 rounded-2xl bg-white border border-slate-100 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                    <option>All Technicians</option>
                    <option>T. Dlamini</option>
                    <option>S. Mokoena</option>
                    <option>P. Khumalo</option>
                    <option>N. Zulu</option>
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                </div>
                <div className="relative group">
                  <select className="appearance-none pl-6 pr-12 py-4 rounded-2xl bg-white border border-slate-100 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                    <option>All Status</option>
                    <option>Open</option>
                    <option>Closed</option>
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                </div>
                <div className="relative group">
                  <select className="appearance-none pl-6 pr-12 py-4 rounded-2xl bg-white border border-slate-100 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                    <option>All Machines</option>
                    <option>CK&IJ-990-020</option>
                    <option>CK&IJ-785-011</option>
                    <option>CK&IJ-GD-007</option>
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                </div>
             </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto relative">
            {/* Orange edge highlight */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500" />
            
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FBFCFE] dark:bg-slate-900/50">
                  <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Date</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Machine</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Component</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Technician</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Work Performed</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Cost</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Downtime</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                {MAINTENANCE_EVENTS.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50/30 transition-all dark:hover:bg-slate-900/30 group">
                    <td className="px-10 py-7 text-xs font-bold text-slate-400">{item.date}</td>
                    <td className="px-10 py-7 text-xs font-black text-slate-900 dark:text-white">{item.machine}</td>
                    <td className="px-10 py-7 text-xs font-bold text-slate-600 dark:text-slate-300">{item.component}</td>
                    <td className="px-10 py-7 text-xs font-bold text-slate-500">{item.technician}</td>
                    <td className="px-10 py-7 text-xs font-medium text-slate-500 max-w-md italic">{item.work}</td>
                    <td className="px-10 py-7 text-xs font-black text-slate-900 dark:text-white">{item.cost}</td>
                    <td className="px-10 py-7 text-xs font-bold text-slate-500">{item.downtime}</td>
                    <td className="px-10 py-7 text-center">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase border-2 ${
                        item.status === 'Closed' 
                          ? 'bg-green-50 text-green-600 border-green-100' 
                          : 'bg-yellow-50 text-yellow-600 border-yellow-100'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Summary */}
          <div className="p-8 border-t border-slate-50 dark:border-slate-700/50 bg-[#FBFCFE] dark:bg-slate-900/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
               10 maintenance events logged
             </p>
             <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total cost:</span>
                   <span className="text-sm font-black text-slate-900 dark:text-white">R 641 900</span>
                </div>
                <div className="h-4 w-px bg-slate-200" />
                <div className="flex items-center gap-2">
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total downtime:</span>
                   <span className="text-sm font-black text-slate-900 dark:text-white">29 hrs</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

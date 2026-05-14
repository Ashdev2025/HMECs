import React from "react";
import { 
  Plus, 
  ChevronDown, 
  Save,
  RotateCcw
} from "lucide-react";

export default function AddComponent() {
  return (
    <div className="min-h-screen bg-[#F8F9FC] dark:bg-slate-900 p-4 lg:p-10">
      <div className="mx-auto max-w-[1400px]">
        
        {/* Main Form Container */}
        <div className="rounded-[3rem] bg-white shadow-sm border border-slate-100 dark:bg-slate-800 dark:border-slate-700 overflow-hidden">
          
          {/* Header Area */}
          <div className="p-10 border-b border-slate-50 dark:border-slate-700/50 flex items-center gap-5">
            <div className="h-12 w-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-500">
              <Plus size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Add New Component</h1>
              <p className="text-[10px] font-bold text-slate-400 tracking-wider">Register a component to the lifecycle tracker</p>
            </div>
          </div>

          <form className="p-10 space-y-12">
            
            {/* Machine & Equipment Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <p className="text-[10px] font-black uppercase text-orange-500 tracking-widest">Machine & Equipment</p>
                 <div className="h-px flex-1 bg-orange-100 dark:bg-orange-900/30" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                   <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Machine ID <span className="text-orange-500">*</span></label>
                   <input 
                     type="text" 
                     placeholder="CK&IJ-990-020" 
                     className="w-full px-6 py-4 rounded-2xl bg-[#F9FAFB] border border-slate-100 text-xs font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Equipment Type</label>
                   <input 
                     type="text" 
                     placeholder="FEL" 
                     className="w-full px-6 py-4 rounded-2xl bg-[#F9FAFB] border border-slate-100 text-xs font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Supplier</label>
                   <input 
                     type="text" 
                     placeholder="CK & IJ Group" 
                     className="w-full px-6 py-4 rounded-2xl bg-[#F9FAFB] border border-slate-100 text-xs font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                   />
                </div>
              </div>
            </div>

            {/* Component Details Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <p className="text-[10px] font-black uppercase text-orange-500 tracking-widest">Component Details</p>
                 <div className="h-px flex-1 bg-orange-100 dark:bg-orange-900/30" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                   <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Category <span className="text-orange-500">*</span></label>
                   <div className="relative">
                      <select className="appearance-none w-full px-6 py-4 rounded-2xl bg-[#F9FAFB] border border-slate-100 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all dark:bg-slate-900 dark:border-slate-700 dark:text-white">
                         <option>Tyre</option>
                         <option>Engine</option>
                         <option>Hydraulic</option>
                         <option>Brake</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Description <span className="text-orange-500">*</span></label>
                   <input 
                     type="text" 
                     placeholder="Front Left Tyre" 
                     className="w-full px-6 py-4 rounded-2xl bg-[#F9FAFB] border border-slate-100 text-xs font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Serial Number</label>
                   <input 
                     type="text" 
                     placeholder="TY-990-001" 
                     className="w-full px-6 py-4 rounded-2xl bg-[#F9FAFB] border border-slate-100 text-xs font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                   />
                </div>
              </div>
            </div>

            {/* Lifecycle & Cost Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <p className="text-[10px] font-black uppercase text-orange-500 tracking-widest">Lifecycle & Cost</p>
                 <div className="h-px flex-1 bg-orange-100 dark:bg-orange-900/30" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                   <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Install Hours</label>
                   <input 
                     type="number" 
                     defaultValue={0} 
                     className="w-full px-6 py-4 rounded-2xl bg-[#F9FAFB] border border-slate-100 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Current Hours</label>
                   <input 
                     type="number" 
                     defaultValue={0} 
                     className="w-full px-6 py-4 rounded-2xl bg-[#F9FAFB] border border-slate-100 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Planned Life (hrs)</label>
                   <input 
                     type="number" 
                     defaultValue={0} 
                     className="w-full px-6 py-4 rounded-2xl bg-[#F9FAFB] border border-slate-100 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Replacement Cost (R)</label>
                   <input 
                     type="number" 
                     defaultValue={0} 
                     className="w-full px-6 py-4 rounded-2xl bg-[#F9FAFB] border border-slate-100 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all dark:bg-slate-900 dark:border-slate-700 dark:text-white"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Condition</label>
                   <div className="relative">
                      <select defaultValue="3 - Monitor" className="appearance-none w-full px-6 py-4 rounded-2xl bg-[#F9FAFB] border border-slate-100 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all dark:bg-slate-900 dark:border-slate-700 dark:text-white">
                         <option>1 - New</option>
                         <option>2 - Good</option>
                         <option>3 - Monitor</option>
                         <option>4 - Warning</option>
                         <option>5 - Critical</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                   </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-10 flex items-center justify-end gap-4 border-t border-slate-50 dark:border-slate-700/50">
               <button type="reset" className="px-10 py-4 rounded-2xl border-2 border-slate-100 text-slate-500 text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all dark:border-slate-700 dark:hover:bg-slate-700">
                 Clear Form
               </button>
               <button type="submit" className="flex items-center gap-3 px-12 py-4 rounded-2xl bg-orange-500 text-white text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20">
                 <Save size={16} /> Save Component
               </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

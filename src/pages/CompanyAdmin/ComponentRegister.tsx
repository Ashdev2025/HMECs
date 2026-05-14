import React, { useState } from "react";
import { 
  Wrench, 
  Search, 
  ChevronDown, 
  Edit3, 
  Trash2, 
  X,
  Plus,
  Filter,
  Save
} from "lucide-react";

const COMPONENTS_DATA = [
  { id: 1, machine: 'CK&IJ-EX300-015', type: 'Excavator', category: 'Cabin', description: 'AC Compressor', serial: 'CB-EX-001', currentHrs: '4 900 h', lifeUsed: '4 100 h', remaining: 48.8, condition: 'Good', risk: 'Healthy', driver: 'Normal', cost: 'R 14K' },
  { id: 2, machine: 'CK&IJ-785-011', type: 'HT', category: 'Electrical', description: 'Alternator', serial: 'EL-785-001', currentHrs: '5 200 h', lifeUsed: '4 700 h', remaining: 41.3, condition: 'Monitor', risk: 'Healthy', driver: 'Normal', cost: 'R 34K' },
  { id: 3, machine: 'CK&IJ-D10-003', type: 'Dozer', category: 'Hydraulic', description: 'Blade Hydraulic Cylinder', serial: 'HY-D10-001', currentHrs: '3 100 h', lifeUsed: '2 900 h', remaining: 79.3, condition: 'Good', risk: 'Healthy', driver: 'Normal', cost: 'R 52K' },
  { id: 4, machine: 'CK&IJ-GD-007', type: 'Grader', category: 'Structural / Wear', description: 'Blade Cutting Edge', serial: 'WR-GD-001', currentHrs: '7 400 h', lifeUsed: '500 h', remaining: 93.3, condition: 'Warning', risk: 'Warning', driver: 'Poor Condition', cost: 'R 22K' },
  { id: 5, machine: 'CK&IJ-990-020', type: 'FEL', category: 'Brake', description: 'Brake System', serial: 'BR-990-001', currentHrs: '6 800 h', lifeUsed: '5 100 h', remaining: 43.3, condition: 'Good', risk: 'Healthy', driver: 'Normal', cost: 'R 95K' },
  { id: 6, machine: 'CK&IJ-EX300-015', type: 'Excavator', category: 'Structural / Wear', description: 'Bucket Teeth Set', serial: 'WR-EX-001', currentHrs: '4 900 h', lifeUsed: '500 h', remaining: 90.0, condition: 'Warning', risk: 'Warning', driver: 'Poor Condition', cost: 'R 19K' },
  { id: 7, machine: 'CK&IJ-GD-007', type: 'Hydraulic', description: 'Circle Drive Motor', serial: 'HY-GD-001', currentHrs: '7 400 h', lifeUsed: '4 400 h', remaining: 56.0, condition: 'Monitor', risk: 'Healthy', driver: 'Normal', cost: 'R 41K' },
];

export default function ComponentRegister() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<any>(null);

  const openEditModal = (comp: any) => {
    setSelectedComponent(comp);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] dark:bg-slate-900 p-4 lg:p-10">
      <div className="mx-auto max-w-[1600px] space-y-8">
        
        {/* Header Section */}
        <div className="rounded-[2.5rem] bg-white p-8 shadow-sm border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
             <div className="flex items-center gap-5">
                <div className="h-14 w-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500">
                  <Wrench size={28} />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Component Register</h1>
                  <p className="text-xs font-bold text-slate-400 tracking-wider">Full inventory — search, filter and manage all fleet components</p>
                </div>
             </div>
             <button 
               onClick={() => setIsAddModalOpen(true)}
               className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20"
             >
               <Plus size={16} /> Add Component
             </button>
           </div>
        </div>

        {/* Filters Section (unchanged) */}
        {/* ... */}

        {/* Filters Section */}
        <div className="flex flex-col lg:flex-row gap-4">
           <div className="flex-1 relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-orange-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search machine, component, category, serial..." 
                className="w-full pl-16 pr-8 py-5 rounded-2xl bg-white border border-slate-100 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-white"
              />
           </div>
           <div className="flex gap-4">
              <div className="relative group min-w-[200px]">
                <select className="appearance-none w-full pl-6 pr-12 py-5 rounded-2xl bg-white border border-slate-100 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                  <option>All Machines</option>
                  <option>CK&IJ-785-011</option>
                  <option>CK&IJ-785-042</option>
                  <option>CK&IJ-990-020</option>
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>
              <div className="relative group min-w-[200px]">
                <select className="appearance-none w-full pl-6 pr-12 py-5 rounded-2xl bg-white border border-slate-100 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-white">
                  <option>All Categories</option>
                  <option>Tyre</option>
                  <option>Engine</option>
                  <option>Hydraulic</option>
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>
           </div>
        </div>

        {/* Main Table Container */}
        <div className="rounded-[3rem] bg-white shadow-sm border border-slate-100 dark:bg-slate-800 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FBFCFE] border-b border-slate-50 dark:bg-slate-900/50 dark:border-slate-700/50">
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Machine / Type</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Category</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Description / Serial</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Current Hrs</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Life Used</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Remaining</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Condition</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Risk</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Risk Driver</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Repl. Cost</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                {COMPONENTS_DATA.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-all dark:hover:bg-slate-900/30">
                    <td className="px-8 py-6">
                      <p className="text-xs font-black text-slate-900 dark:text-white">{item.machine}</p>
                      <span className="mt-1 inline-block px-2 py-0.5 rounded-md bg-slate-900 text-[8px] font-black text-white uppercase tracking-tighter">
                        {item.type}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-xs text-slate-500 font-bold">{item.category}</td>
                    <td className="px-8 py-6">
                      <p className="text-xs font-black text-slate-700 dark:text-slate-200">{item.description}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.serial}</p>
                    </td>
                    <td className="px-8 py-6 text-center text-xs font-black text-slate-900 dark:text-white">{item.currentHrs}</td>
                    <td className="px-8 py-6 text-center text-xs font-black text-slate-900 dark:text-white">{item.lifeUsed}</td>
                    <td className="px-8 py-6 min-w-[140px]">
                      <div className="flex items-center gap-3">
                        <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden dark:bg-slate-700">
                          <div 
                            className={`h-full ${item.remaining > 90 ? 'bg-red-500' : item.remaining > 75 ? 'bg-orange-500' : 'bg-green-500'}`} 
                            style={{ width: `${item.remaining}%` }} 
                          />
                        </div>
                        <span className="text-[10px] font-black text-slate-600 dark:text-slate-400">{item.remaining}%</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                        item.condition === 'Good' ? 'bg-green-50 text-green-600 border border-green-100' :
                        item.condition === 'Warning' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                        'bg-yellow-50 text-yellow-600 border border-yellow-100'
                      }`}>
                        {item.condition}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                        item.risk === 'Healthy' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
                      }`}>
                        {item.risk}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="px-3 py-1 rounded-full bg-slate-50 text-[9px] font-black text-slate-600 uppercase border border-slate-100 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700">
                        {item.driver}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center text-xs font-black text-slate-900 dark:text-white">{item.cost}</td>
                    <td className="px-8 py-6 text-center">
                       <div className="flex items-center justify-center gap-2">
                         <button 
                           onClick={() => openEditModal(item)}
                           className="p-2 rounded-xl border border-slate-100 text-slate-400 hover:text-orange-500 hover:border-orange-100 hover:bg-orange-50 transition-all dark:border-slate-700 dark:hover:bg-slate-700"
                         >
                           <Edit3 size={14} />
                         </button>
                         <button className="p-2 rounded-xl border border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all dark:border-slate-700 dark:hover:bg-slate-700">
                           <Trash2 size={14} />
                         </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Component Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)} />
           <div className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 dark:bg-slate-800">
              <div className="p-10 border-b border-slate-50 dark:border-slate-700/50 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500">
                      <Edit3 size={20} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">Edit Component</h3>
                 </div>
                 <button onClick={() => setIsEditModalOpen(false)} className="p-2 rounded-xl hover:bg-slate-50 text-slate-400 transition-all">
                    <X size={20} />
                 </button>
              </div>

              <div className="p-10">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Machine ID <span className="text-orange-500">*</span></label>
                       <input type="text" defaultValue={selectedComponent?.machine} className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:bg-slate-900 dark:border-slate-700" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Equipment Type</label>
                       <input type="text" defaultValue={selectedComponent?.type} className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:bg-slate-900 dark:border-slate-700" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Category</label>
                       <div className="relative">
                          <select defaultValue={selectedComponent?.category} className="appearance-none w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:bg-slate-900 dark:border-slate-700">
                             <option>Cabin</option>
                             <option>Electrical</option>
                             <option>Hydraulic</option>
                             <option>Brake</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                       </div>
                    </div>
                    
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Description <span className="text-orange-500">*</span></label>
                       <input type="text" defaultValue={selectedComponent?.description} className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:bg-slate-900 dark:border-slate-700" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Serial Number</label>
                       <input type="text" defaultValue={selectedComponent?.serial} className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:bg-slate-900 dark:border-slate-700" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Supplier</label>
                       <input type="text" placeholder="e.g. Sanden" className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:bg-slate-900 dark:border-slate-700" />
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Install Hours</label>
                       <input type="text" placeholder="800" className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:bg-slate-900 dark:border-slate-700" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Current Hours</label>
                       <input type="text" defaultValue={selectedComponent?.currentHrs.split(' ')[0]} className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:bg-slate-900 dark:border-slate-700" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Planned Life (hrs)</label>
                       <input type="text" placeholder="8000" className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:bg-slate-900 dark:border-slate-700" />
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Replacement Cost (R)</label>
                       <input type="text" defaultValue={selectedComponent?.cost.replace('R ', '').replace('K', '000')} className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:bg-slate-900 dark:border-slate-700" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Condition</label>
                       <div className="relative">
                          <select defaultValue={selectedComponent?.condition} className="appearance-none w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:bg-slate-900 dark:border-slate-700">
                             <option>1 - New</option>
                             <option>2 - Good</option>
                             <option>3 - Monitor</option>
                             <option>4 - Warning</option>
                             <option>5 - Critical</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                       </div>
                    </div>
                 </div>

                 <div className="mt-12 flex items-center justify-end gap-4">
                    <button 
                      onClick={() => setIsEditModalOpen(false)}
                      className="px-8 py-3 rounded-2xl bg-slate-50 text-slate-500 text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-all dark:bg-slate-900 dark:hover:bg-slate-700"
                    >
                      Cancel
                    </button>
                    <button className="px-8 py-3 rounded-2xl bg-orange-500 text-white text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20">
                      Update Component
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
      {/* Add Component Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)} />
           <div className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 dark:bg-slate-800 max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 z-10 bg-white dark:bg-slate-800 p-8 border-b border-slate-50 dark:border-slate-700/50 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-2xl bg-green-50 flex items-center justify-center text-green-500">
                      <Plus size={20} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">Add New Component</h3>
                 </div>
                 <button onClick={() => setIsAddModalOpen(false)} className="p-2 rounded-xl hover:bg-slate-50 text-slate-400 transition-all dark:hover:bg-slate-700">
                    <X size={20} />
                 </button>
              </div>

              <div className="p-10 space-y-12">
                 {/* Machine & Equipment */}
                 <div className="space-y-6">
                    <div className="flex items-center gap-4">
                       <p className="text-[10px] font-black uppercase text-orange-500 tracking-widest">Machine & Equipment</p>
                       <div className="h-px flex-1 bg-orange-100 dark:bg-orange-900/30" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Machine ID *</label>
                          <input type="text" placeholder="CK&IJ-990-020" className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:bg-slate-900 dark:border-slate-700 dark:text-white" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Equipment Type</label>
                          <input type="text" placeholder="FEL" className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:bg-slate-900 dark:border-slate-700 dark:text-white" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Supplier</label>
                          <input type="text" placeholder="CK & IJ Group" className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:bg-slate-900 dark:border-slate-700 dark:text-white" />
                       </div>
                    </div>
                 </div>

                 {/* Component Details */}
                 <div className="space-y-6">
                    <div className="flex items-center gap-4">
                       <p className="text-[10px] font-black uppercase text-orange-500 tracking-widest">Component Details</p>
                       <div className="h-px flex-1 bg-orange-100 dark:bg-orange-900/30" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Category *</label>
                          <div className="relative">
                             <select className="appearance-none w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:bg-slate-900 dark:border-slate-700 dark:text-white">
                                <option>Tyre</option>
                                <option>Engine</option>
                                <option>Hydraulic</option>
                             </select>
                             <ChevronDown size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Description *</label>
                          <input type="text" placeholder="Front Left Tyre" className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:bg-slate-900 dark:border-slate-700 dark:text-white" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Serial Number</label>
                          <input type="text" placeholder="TY-990-001" className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:bg-slate-900 dark:border-slate-700 dark:text-white" />
                       </div>
                    </div>
                 </div>

                 {/* Lifecycle & Cost */}
                 <div className="space-y-6">
                    <div className="flex items-center gap-4">
                       <p className="text-[10px] font-black uppercase text-orange-500 tracking-widest">Lifecycle & Cost</p>
                       <div className="h-px flex-1 bg-orange-100 dark:bg-orange-900/30" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Install Hours</label>
                          <input type="number" defaultValue={0} className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:bg-slate-900 dark:border-slate-700 dark:text-white" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Current Hours</label>
                          <input type="number" defaultValue={0} className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:bg-slate-900 dark:border-slate-700 dark:text-white" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Planned Life (hrs)</label>
                          <input type="number" defaultValue={0} className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:bg-slate-900 dark:border-slate-700 dark:text-white" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Replacement Cost (R)</label>
                          <input type="number" defaultValue={0} className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:bg-slate-900 dark:border-slate-700 dark:text-white" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase text-slate-400 ml-1">Condition</label>
                          <div className="relative">
                             <select defaultValue="3 - Monitor" className="appearance-none w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:bg-slate-900 dark:border-slate-700 dark:text-white">
                                <option>1 - New</option>
                                <option>2 - Good</option>
                                <option>3 - Monitor</option>
                                <option>4 - Warning</option>
                                <option>5 - Critical</option>
                             </select>
                             <ChevronDown size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="flex items-center justify-end gap-4 pt-6">
                    <button 
                      onClick={() => setIsAddModalOpen(false)}
                      className="px-8 py-3 rounded-2xl bg-slate-50 text-slate-500 text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-all dark:bg-slate-900 dark:hover:bg-slate-700"
                    >
                      Cancel
                    </button>
                    <button className="flex items-center gap-3 px-8 py-3 rounded-2xl bg-orange-500 text-white text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20">
                      <Save size={16} /> Save Component
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

import React from "react";
import { Rocket, Timer, ChevronLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

export default function ComingSoon() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-10 animate-in fade-in zoom-in duration-500">
        
        {/* Animated Icon */}
        <div className="relative mx-auto w-32 h-32">
          <div className="absolute inset-0 bg-orange-500/20 rounded-full animate-ping" />
          <div className="relative flex items-center justify-center w-full h-full bg-white dark:bg-slate-800 rounded-full shadow-2xl border border-slate-100 dark:border-slate-700">
            <Rocket className="w-12 h-12 text-orange-500 animate-bounce" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-2 rounded-xl shadow-lg">
            <Timer size={20} />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
            We're building something <span className="text-orange-500">Amazing</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg font-medium max-w-lg mx-auto">
            This module is currently under development to provide you with the best fleet intelligence experience. Stay tuned!
          </p>
        </div>

        {/* Progress Bar Mockup */}
        <div className="max-w-md mx-auto space-y-3">
          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span>Development Progress</span>
            <span className="text-orange-500">75%</span>
          </div>
          <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-50 dark:border-slate-700">
            <div className="h-full w-3/4 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full shadow-sm shadow-orange-500/20" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-600 text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          >
            <ChevronLeft size={16} /> Go Back
          </button>
          <button 
            onClick={() => navigate('/company-admin/dashboard')}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 dark:bg-white dark:text-slate-900"
          >
            Back to Dashboard <ArrowRight size={16} />
          </button>
        </div>

        {/* Footer */}
        <div className="pt-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20">
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
             </span>
             <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-400">
               Live Updates Incoming
             </span>
          </div>
        </div>
      </div>
    </div>
  );
}

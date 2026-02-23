import React from 'react';
import { ArrowLeft, Pencil, MoreHorizontal, Bell } from 'lucide-react';

export const Header = () => {
  return (
    <div className="bg-white px-8 py-4 flex justify-between items-center border-b border-slate-200 z-10 sticky top-0">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-slate-100 rounded-md transition-colors border border-slate-200">
          <ArrowLeft size={18} className="text-slate-600" />
        </button>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Johnson Ranch</h1>
        <button className="p-1.5 hover:bg-slate-100 rounded-md transition-colors">
          <Pencil size={16} className="text-slate-400" />
        </button>
        <button className="p-1.5 hover:bg-slate-100 rounded-md transition-colors">
          <MoreHorizontal size={20} className="text-slate-400" />
        </button>
      </div>
      <div className="relative">
        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <Bell size={20} className="text-[#00b074]" />
        </button>
        <span className="absolute top-1 right-1 w-4 h-4 bg-[#e85d41] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white shadow-sm">
          1
        </span>
      </div>
    </div>
  );
};

export const ProgressBar = () => {
  return (
    <div className="px-8 py-4 bg-slate-50 border-b border-slate-200">
      <div className="flex h-10 rounded-md overflow-hidden text-sm font-medium shadow-sm border border-slate-200/50">
        <div className="flex-1 bg-[#00b074] text-white flex items-center justify-center relative">
          New
          <div className="absolute right-0 top-0 bottom-0 w-4 translate-x-1/2 bg-[#00b074] rotate-45 transform origin-center z-10 border-r-2 border-t-2 border-white"></div>
        </div>
        <div className="flex-1 bg-[#00b074] text-white flex items-center justify-center relative pl-4">
          In Progress
          <div className="absolute right-0 top-0 bottom-0 w-4 translate-x-1/2 bg-[#00b074] rotate-45 transform origin-center z-10 border-r-2 border-t-2 border-white"></div>
        </div>
        <div className="flex-1 bg-slate-100 text-slate-600 flex items-center justify-center pl-4">
          Complete
        </div>
      </div>
    </div>
  );
};

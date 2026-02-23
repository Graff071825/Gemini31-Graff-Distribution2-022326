import React from 'react';
import { LayoutDashboard, Target, Briefcase, ShoppingCart, LayoutList, Users, BarChart2, CheckSquare } from 'lucide-react';

export const Sidebar = () => {
  return (
    <div className="w-64 bg-[#1e2532] text-white flex flex-col h-screen fixed left-0 top-0 z-20">
      <div className="p-6 flex justify-center items-center border-b border-white/10">
        <div className="w-10 h-10 bg-[#e85d41] rounded-full flex items-center justify-center text-xl font-bold italic shadow-md">
          d
        </div>
      </div>
      <nav className="flex-1 py-4 overflow-y-auto">
        <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" />
        <SidebarItem icon={<Target size={20} />} label="Opportunities" />
        <SidebarItem icon={<Briefcase size={20} />} label="Projects" active />
        <SidebarItem icon={<ShoppingCart size={20} />} label="Orders" />
        <SidebarItem icon={<LayoutList size={20} />} label="Catalog" />
        <SidebarItem icon={<Users size={20} />} label="People" />
        <SidebarItem icon={<BarChart2 size={20} />} label="Reports" />
        <SidebarItem icon={<CheckSquare size={20} />} label="Tasks" />
      </nav>
      <div className="p-4 border-t border-white/10 flex justify-center">
        <img src="https://picsum.photos/seed/user/40/40" alt="User" className="w-10 h-10 rounded-full border-2 border-white/20" referrerPolicy="no-referrer" />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => {
  return (
    <div className={`flex items-center px-6 py-3 cursor-pointer transition-colors ${active ? 'bg-white/5 border-l-4 border-[#00b074] text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white border-l-4 border-transparent'}`}>
      <div className="mr-4">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

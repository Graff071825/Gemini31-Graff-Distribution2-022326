import React, { useState } from 'react';
import { MedicalRecord } from '../types';
import { Search, Filter, Plus, Edit2 } from 'lucide-react';

export const ActivityTimeline: React.FC<{ data: MedicalRecord[] }> = ({ data }) => {
  const [previewCount, setPreviewCount] = useState(5);
  const previewData = data.slice(0, previewCount);

  return (
    <div className="relative">
      <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200 z-0"></div>
      
      <div className="flex justify-between items-center mb-6 pl-12 relative">
        <h3 className="text-sm font-bold text-slate-800 bg-[#f8fafc] pr-4 relative z-10">Activity</h3>
        <div className="flex items-center gap-3">
          <button className="p-2 text-slate-500 hover:bg-slate-200 rounded-md transition-colors">
            <Search size={18} />
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors bg-white shadow-sm">
            <Filter size={16} /> Filters
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {previewData.map((record, i) => (
          <div key={i} className="relative pl-16 pr-2">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-slate-300 rounded-full flex items-center justify-center z-10 text-slate-400 shadow-sm">
              {i % 2 === 0 ? <Plus size={14} /> : <Edit2 size={12} />}
            </div>
            
            <div className="bg-white border border-slate-200 rounded-md p-4 shadow-sm flex items-start gap-4">
              <img src={`https://picsum.photos/seed/${record.SupplierID}/32/32`} alt="Avatar" className="w-8 h-8 rounded-full shadow-sm" referrerPolicy="no-referrer" />
              <div>
                <p className="text-sm text-slate-800">
                  <span className="font-bold">{record.SupplierID}</span> <span className="text-slate-500 text-xs ml-2 font-medium">{record.Deliverdate}</span>
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  Distributed <span className="font-medium text-slate-800">{record.Number}</span> unit(s) of <span className="font-medium text-slate-800">{record.DeviceNAME || record.Model}</span> to customer <span className="font-medium text-[#00b074]">{record.CustomerID}</span>.
                </p>
                <p className="text-xs text-slate-400 mt-1 font-medium">License: {record.LicenseNo}</p>
              </div>
            </div>
          </div>
        ))}
        
        {data.length > previewCount && (
          <div className="relative pl-16 pt-2 pb-8">
             <button 
               onClick={() => setPreviewCount(prev => prev + 5)}
               className="text-sm text-[#00b074] font-medium hover:underline bg-[#f8fafc] relative z-10 pr-4"
             >
               Load more activity...
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

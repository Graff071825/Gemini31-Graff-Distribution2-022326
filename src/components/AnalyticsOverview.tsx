import React, { useState } from 'react';
import { MedicalRecord } from '../types';
import { ArrowRight } from 'lucide-react';

export const AnalyticsOverview: React.FC<{ data: MedicalRecord[] }> = ({ data }) => {
  const [activeTab, setActiveTab] = useState('Ordering');

  const totalDevices = data.reduce((sum, record) => sum + (Number(record.Number) || 1), 0);
  const uniqueSuppliers = new Set(data.map(d => d.SupplierID)).size;
  const uniqueCustomers = new Set(data.map(d => d.CustomerID)).size;

  return (
    <div className="bg-white border border-slate-200 rounded-md shadow-sm mb-6">
      <div className="flex border-b border-slate-200 px-2">
        <button 
          className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'Summary' ? 'border-[#00b074] text-slate-800' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          onClick={() => setActiveTab('Summary')}
        >
          Summary
        </button>
        <button 
          className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'Ordering' ? 'border-[#00b074] text-slate-800' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          onClick={() => setActiveTab('Ordering')}
        >
          Ordering
        </button>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Unordered</h4>
            <p className="text-3xl font-bold text-slate-800">$1,000.00</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Draft</h4>
            <p className="text-3xl font-bold text-slate-800">$500.00</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Ordered</h4>
            <p className="text-3xl font-bold text-slate-800">$1,000.00</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex h-3 rounded-full overflow-hidden mb-4">
            <div className="bg-slate-200 w-[20%]"></div>
            <div className="bg-[#facc15] w-[30%]"></div>
            <div className="bg-[#3b82f6] w-[15%]"></div>
            <div className="bg-[#f97316] w-[25%]"></div>
            <div className="bg-[#00b074] w-[10%]"></div>
          </div>
          <div className="flex justify-between text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-sm bg-slate-200"></span> Unordered (1)</div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-sm bg-[#facc15]"></span> Ready to Order (2)</div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-sm bg-[#3b82f6]"></span> Draft (1)</div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-sm bg-[#f97316]"></span> Ordered (1)</div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-sm bg-[#00b074]"></span> Received (1)</div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button className="bg-[#00b074] hover:bg-[#009660] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 shadow-sm">
            Browse items to Order <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

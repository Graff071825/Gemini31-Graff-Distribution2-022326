import React from 'react';
import { MedicalRecord, FilterState } from '../types';
import { Filters } from './Filters';

interface DatasetDetailsProps {
  data: MedicalRecord[];
  filteredData: MedicalRecord[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

export const DatasetDetails: React.FC<DatasetDetailsProps> = ({ data, filteredData, filters, setFilters }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-md shadow-sm h-full">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center">
        <h2 className="font-bold text-slate-800 tracking-tight">Project Details</h2>
        <button className="text-sm text-[#00b074] font-medium hover:underline">Edit</button>
      </div>
      
      <div className="p-4 border-b border-slate-200">
        <h3 className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Account</h3>
        <p className="text-[#00b074] font-medium text-sm">Steve Johnson</p>
      </div>

      <div className="p-4 border-b border-slate-200">
        <h3 className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Owner</h3>
        <div className="flex items-center gap-2 mt-2">
          <img src="https://picsum.photos/seed/user2/32/32" alt="Owner" className="w-8 h-8 rounded-full shadow-sm" referrerPolicy="no-referrer" />
          <span className="text-sm text-slate-700 font-medium">Nick Powers</span>
        </div>
      </div>

      <div className="p-4 border-b border-slate-200">
        <h3 className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Contacts</h3>
        <p className="text-sm text-slate-500">No contacts</p>
      </div>

      <div className="p-4 border-b border-slate-200">
        <h3 className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Contract Total</h3>
        <p className="text-sm text-slate-800 font-medium">$20,414.00</p>
      </div>

      <div className="p-4 border-b border-slate-200">
        <h3 className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Attachments</h3>
        <p className="text-sm text-slate-500">No attachments</p>
      </div>

      <div className="p-4 border-b border-slate-200">
        <h3 className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider">Filters</h3>
        <Filters data={data} filters={filters} setFilters={setFilters} />
      </div>

      <div className="p-4">
        <h3 className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Site</h3>
        <div className="flex gap-4 items-center">
          <div className="w-24 h-24 bg-slate-100 rounded-md overflow-hidden flex-shrink-0 border border-slate-200">
            <img src="https://picsum.photos/seed/map/100/100" alt="Map" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <p className="text-sm font-bold text-slate-800 leading-tight">
            3217 Fifth Avenue San Diego, California 92103 United States
          </p>
        </div>
      </div>
    </div>
  );
};

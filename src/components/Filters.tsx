import React from 'react';
import { FilterState } from '../types';

interface FiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

export const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 mb-8">
      <h3 className="text-zinc-200 font-medium mb-4 text-sm uppercase tracking-wider">Filter Dataset</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.keys(filters).map((key) => {
          const labelMap: Record<string, string> = {
            timezone: 'Timezone',
            supplierID: 'Supplier ID',
            category: 'Category',
            licenseNo: 'License Number',
            model: 'Model',
            customerID: 'Customer ID',
            lotNo: 'Lot Number',
            sn: 'Serial Number (SN)'
          };
          return (
          <div key={key} className="flex flex-col">
            <label className="text-xs text-zinc-500 mb-1">{labelMap[key] || key}</label>
            <input
              type="text"
              name={key}
              value={filters[key as keyof FilterState]}
              onChange={handleChange}
              className="bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder={`Filter ${labelMap[key] || key}...`}
            />
          </div>
        )})}
      </div>
      <div className="mt-4 flex justify-end">
        <button 
          onClick={() => setFilters({
            timezone: '', supplierID: '', category: '', licenseNo: '', model: '', customerID: '', lotNo: '', sn: ''
          })}
          className="text-xs text-zinc-400 hover:text-white transition-colors px-3 py-1 border border-zinc-700 rounded-md"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

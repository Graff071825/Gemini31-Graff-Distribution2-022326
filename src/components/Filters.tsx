import React, { useMemo } from 'react';
import { FilterState, MedicalRecord } from '../types';
import { useSettings } from '../context/SettingsContext';

interface FiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  data: MedicalRecord[];
}

export const Filters: React.FC<FiltersProps> = ({ filters, setFilters, data }) => {
  const { t, accentColor } = useSettings();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const keyMap: Record<string, keyof MedicalRecord | 'timezone'> = {
    timezone: 'timezone' as any,
    supplierID: 'SupplierID',
    category: 'Category',
    licenseNo: 'LicenseNo',
    model: 'Model',
    customerID: 'CustomerID',
    lotNo: 'LotNO',
    sn: 'SerNo'
  };

  const uniqueValues = useMemo(() => {
    const result: Record<string, string[]> = {};
    Object.keys(filters).forEach(key => {
      const dataKey = keyMap[key];
      if (dataKey) {
        const values = data.map(item => String(item[dataKey as keyof MedicalRecord] || '')).filter(v => v !== '');
        result[key] = Array.from(new Set(values)).sort() as string[];
      } else {
        result[key] = [];
      }
    });
    return result;
  }, [data, filters]);

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 mb-8 shadow-sm">
      <h3 className="text-zinc-800 dark:text-zinc-200 font-medium mb-4 text-sm uppercase tracking-wider">{t('filterDataset')}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.keys(filters).map((key) => {
          const labelMap: Record<string, string> = {
            timezone: t('timezone'),
            supplierID: t('supplierID'),
            category: t('category'),
            licenseNo: t('licenseNo'),
            model: t('modelLabel'),
            customerID: t('customerID'),
            lotNo: t('lotNo'),
            sn: t('sn')
          };
          
          const options = uniqueValues[key] || [];

          return (
          <div key={key} className="flex flex-col">
            <label className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">{labelMap[key] || key}</label>
            <input
              type="text"
              name={key}
              list={`list-${key}`}
              value={filters[key as keyof FilterState]}
              onChange={handleChange}
              className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-900 dark:text-zinc-200 focus:outline-none transition-colors"
              style={{ outlineColor: accentColor }}
              placeholder={`All ${labelMap[key] || key}...`}
            />
            <datalist id={`list-${key}`}>
              {options.slice(0, 1000).map(opt => (
                <option key={opt} value={opt} />
              ))}
            </datalist>
          </div>
        )})}
      </div>
      <div className="mt-4 flex justify-end">
        <button 
          onClick={() => setFilters({
            timezone: '', supplierID: '', category: '', licenseNo: '', model: '', customerID: '', lotNo: '', sn: ''
          })}
          className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors px-3 py-1 border border-zinc-200 dark:border-zinc-700 rounded-md"
        >
          {t('clearFilters')}
        </button>
      </div>
    </div>
  );
};

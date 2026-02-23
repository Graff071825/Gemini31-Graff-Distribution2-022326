import React, { useState } from 'react';
import { MedicalRecord } from '../types';
import { useSettings } from '../context/SettingsContext';

interface DataPreviewProps {
  data: MedicalRecord[];
}

export const DataPreview: React.FC<DataPreviewProps> = ({ data }) => {
  const { t, accentColor } = useSettings();
  const [previewCount, setPreviewCount] = useState(20);

  if (!data || data.length === 0) return null;

  const previewData = data.slice(0, previewCount);
  const keys = Object.keys(data[0] || {}).filter(k => k !== 'key');

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden mb-8 shadow-sm">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-950">
        <h3 className="text-zinc-800 dark:text-zinc-200 font-medium text-sm">{t('dataPreview')} ({data.length} {t('totalRecords')})</h3>
        <div className="flex items-center space-x-2">
          <label className="text-xs text-zinc-500 dark:text-zinc-400">{t('showRecords')}</label>
          <select 
            value={previewCount} 
            onChange={(e) => setPreviewCount(Number(e.target.value))}
            className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-200 text-xs rounded px-2 py-1 focus:outline-none"
            style={{ outlineColor: accentColor }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={data.length}>{t('all')}</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto max-h-[400px]">
        <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-400">
          <thead className="text-xs text-zinc-500 dark:text-zinc-500 uppercase bg-zinc-50 dark:bg-zinc-900/50 sticky top-0">
            <tr>
              {keys.map(key => (
                <th key={key} className="px-4 py-3 font-medium whitespace-nowrap">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {previewData.map((row, i) => (
              <tr key={i} className="border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                {keys.map(key => (
                  <td key={`${i}-${key}`} className="px-4 py-2 whitespace-nowrap text-zinc-800 dark:text-zinc-300">
                    {row[key]?.toString() || '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

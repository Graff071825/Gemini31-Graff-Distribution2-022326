import React, { useState } from 'react';
import { MedicalRecord } from '../types';

interface DataPreviewProps {
  data: MedicalRecord[];
}

export const DataPreview: React.FC<DataPreviewProps> = ({ data }) => {
  const [previewCount, setPreviewCount] = useState(20);

  if (!data || data.length === 0) return null;

  const previewData = data.slice(0, previewCount);
  const keys = Object.keys(data[0] || {}).filter(k => k !== 'key');

  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden mb-8">
      <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-950">
        <h3 className="text-zinc-200 font-medium text-sm">Data Preview ({data.length} total records)</h3>
        <div className="flex items-center space-x-2">
          <label className="text-xs text-zinc-500">Show records:</label>
          <select 
            value={previewCount} 
            onChange={(e) => setPreviewCount(Number(e.target.value))}
            className="bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs rounded px-2 py-1 focus:outline-none"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={data.length}>All</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto max-h-[400px]">
        <table className="w-full text-left text-sm text-zinc-400">
          <thead className="text-xs text-zinc-500 uppercase bg-zinc-900/50 sticky top-0">
            <tr>
              {keys.map(key => (
                <th key={key} className="px-4 py-3 font-medium whitespace-nowrap">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {previewData.map((row, i) => (
              <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                {keys.map(key => (
                  <td key={`${i}-${key}`} className="px-4 py-2 whitespace-nowrap text-zinc-300">
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

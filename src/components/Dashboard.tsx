import React, { useState, useEffect } from 'react';
import { MedicalRecord, FilterState } from '../types';
import { parseData, filterData } from '../utils';
import { NetworkGraph } from './NetworkGraph';
import { Charts } from './Charts';
import { DataPreview } from './DataPreview';
import { Filters } from './Filters';
import { Summary } from './Summary';
import { Upload, FileJson, Download } from 'lucide-react';
import { SettingsPanel } from './SettingsPanel';
import { useSettings } from '../context/SettingsContext';

export const Dashboard: React.FC = () => {
  const { t, accentColor } = useSettings();
  const [data, setData] = useState<MedicalRecord[]>([]);
  const [filteredData, setFilteredData] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    timezone: '', supplierID: '', category: '', licenseNo: '', model: '', customerID: '', lotNo: '', sn: ''
  });

  useEffect(() => {
    const loadDefaultData = async () => {
      try {
        const response = await fetch('/defaultdataset.json');
        const json = await response.json();
        setData(json);
        setFilteredData(json);
      } catch (error) {
        console.error('Failed to load default dataset:', error);
      } finally {
        setLoading(false);
      }
    };
    loadDefaultData();
  }, []);

  useEffect(() => {
    setFilteredData(filterData(data, filters));
  }, [data, filters]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const parsed = await parseData(file);
      setData(parsed);
    } catch (error) {
      console.error('Error parsing file:', error);
      alert('Error parsing file. Please ensure it is a valid CSV or JSON.');
    } finally {
      setLoading(false);
    }
  };

  const [showPasteModal, setShowPasteModal] = useState(false);
  const [pasteText, setPasteText] = useState('');

  const handlePasteSubmit = async () => {
    if (!pasteText.trim()) return;
    setShowPasteModal(false);
    setLoading(true);
    try {
      const parsed = await parseData(pasteText);
      setData(parsed);
      setPasteText('');
    } catch (error) {
      console.error('Error parsing pasted data:', error);
      alert('Error parsing pasted data. Please ensure it is valid CSV or JSON.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-200 p-6 font-sans transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">{t('title')}</h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">{t('subtitle')}</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="cursor-pointer bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border border-zinc-200 dark:border-zinc-700 shadow-sm">
              <Upload size={16} />
              {t('uploadData')}
              <input type="file" accept=".csv,.json,.txt" className="hidden" onChange={handleFileUpload} />
            </label>
            <button 
              onClick={() => setShowPasteModal(true)}
              className="bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border border-zinc-200 dark:border-zinc-700 shadow-sm"
            >
              <FileJson size={16} />
              {t('pasteData')}
            </button>
            <SettingsPanel />
          </div>
        </header>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: accentColor }}></div>
          </div>
        ) : (
          <>
            <Filters filters={filters} setFilters={setFilters} data={data} />
            <Summary data={filteredData} />
            <DataPreview data={filteredData} />
            <Charts data={filteredData} />
            
            <div className="mb-8">
              <h3 className="text-zinc-800 dark:text-zinc-200 font-medium mb-4 text-sm uppercase tracking-wider">{t('distributionNetworkGraph')}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs mb-4">{t('networkGraphDesc')}</p>
              <NetworkGraph data={filteredData} />
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 mt-12 mb-8 shadow-sm">
              <h3 className="text-zinc-800 dark:text-zinc-200 font-medium mb-4 text-sm uppercase tracking-wider">{t('followUpQuestions')}</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                <li className="flex gap-2"><span style={{ color: accentColor }}>01.</span> What is the most common device category distributed?</li>
                <li className="flex gap-2"><span style={{ color: accentColor }}>02.</span> Which supplier has the highest distribution volume?</li>
                <li className="flex gap-2"><span style={{ color: accentColor }}>03.</span> Are there any seasonal trends in device deliveries?</li>
                <li className="flex gap-2"><span style={{ color: accentColor }}>04.</span> Which customer receives the widest variety of models?</li>
                <li className="flex gap-2"><span style={{ color: accentColor }}>05.</span> What is the average delivery time between supplier and customer?</li>
                <li className="flex gap-2"><span style={{ color: accentColor }}>06.</span> Are there specific regions that favor certain device models?</li>
                <li className="flex gap-2"><span style={{ color: accentColor }}>07.</span> How many unique licenses are currently active in the dataset?</li>
                <li className="flex gap-2"><span style={{ color: accentColor }}>08.</span> Which supplier provides the most unique categories?</li>
                <li className="flex gap-2"><span style={{ color: accentColor }}>09.</span> Are there any anomalies or outliers in the delivery quantities?</li>
                <li className="flex gap-2"><span style={{ color: accentColor }}>10.</span> What is the distribution ratio between different models of the same category?</li>
                <li className="flex gap-2"><span style={{ color: accentColor }}>11.</span> Can we predict future demand based on the current delivery trends?</li>
                <li className="flex gap-2"><span style={{ color: accentColor }}>12.</span> Which lot numbers are associated with the highest volume of devices?</li>
                <li className="flex gap-2"><span style={{ color: accentColor }}>13.</span> Are there any correlations between specific models and customer types?</li>
                <li className="flex gap-2"><span style={{ color: accentColor }}>14.</span> How does the distribution network change over different time zones?</li>
                <li className="flex gap-2"><span style={{ color: accentColor }}>15.</span> What is the most frequently distributed device name?</li>
                <li className="flex gap-2"><span style={{ color: accentColor }}>16.</span> Are there any bottlenecks in the distribution network graph?</li>
                <li className="flex gap-2"><span style={{ color: accentColor }}>17.</span> Which customers rely on a single supplier versus multiple suppliers?</li>
                <li className="flex gap-2"><span style={{ color: accentColor }}>18.</span> What is the overall growth rate of device distribution over the recorded period?</li>
                <li className="flex gap-2"><span style={{ color: accentColor }}>19.</span> Can we identify any potential supply chain risks from the network graph?</li>
                <li className="flex gap-2"><span style={{ color: accentColor }}>20.</span> How can we optimize the distribution routes based on historical data?</li>
              </ul>
            </div>
          </>
        )}
      </div>

      {showPasteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 w-full max-w-2xl shadow-xl">
            <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-4">{t('pasteModalTitle')}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">{t('pasteModalDesc')}</p>
            <textarea
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              className="w-full h-64 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md p-3 text-sm text-zinc-700 dark:text-zinc-300 font-mono focus:outline-none mb-4 resize-none"
              style={{ outlineColor: accentColor }}
              placeholder="SupplierID,Deliverdate,CustomerID..."
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowPasteModal(false);
                  setPasteText('');
                }}
                className="px-4 py-2 rounded-md text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handlePasteSubmit}
                disabled={!pasteText.trim()}
                className="text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: accentColor }}
              >
                {t('parseData')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

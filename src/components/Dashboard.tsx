import React, { useState, useEffect } from 'react';
import { MedicalRecord, FilterState } from '../types';
import { parseData, filterData } from '../utils';
import { NetworkGraph } from './NetworkGraph';
import { Charts } from './Charts';
import { DataPreview } from './DataPreview';
import { Filters } from './Filters';
import { Summary } from './Summary';
import { Upload, FileJson, Download } from 'lucide-react';

export const Dashboard: React.FC = () => {
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

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setLoading(true);
      const parsed = await parseData(text);
      setData(parsed);
    } catch (error) {
      console.error('Error parsing pasted data:', error);
      alert('Error parsing pasted data. Please ensure it is valid CSV or JSON.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Medical Device Distribution</h1>
            <p className="text-zinc-400 text-sm mt-1">Agentic AI Analysis System</p>
          </div>
          <div className="flex gap-3">
            <label className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border border-zinc-700">
              <Upload size={16} />
              Upload Data
              <input type="file" accept=".csv,.json,.txt" className="hidden" onChange={handleFileUpload} />
            </label>
            <button 
              onClick={handlePaste}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 border border-zinc-700"
            >
              <FileJson size={16} />
              Paste Data
            </button>
          </div>
        </header>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            <Filters filters={filters} setFilters={setFilters} />
            <Summary data={filteredData} />
            <DataPreview data={filteredData} />
            <Charts data={filteredData} />
            
            <div className="mb-8">
              <h3 className="text-zinc-200 font-medium mb-4 text-sm uppercase tracking-wider">Distribution Network Graph</h3>
              <p className="text-zinc-400 text-xs mb-4">SupplierID &gt; Category &gt; License Number &gt; Model &gt; CustomerID</p>
              <NetworkGraph data={filteredData} />
            </div>

            <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 mt-12 mb-8">
              <h3 className="text-zinc-200 font-medium mb-4 text-sm uppercase tracking-wider">Follow-up Questions</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-zinc-400">
                <li className="flex gap-2"><span className="text-indigo-400">01.</span> What is the most common device category distributed?</li>
                <li className="flex gap-2"><span className="text-indigo-400">02.</span> Which supplier has the highest distribution volume?</li>
                <li className="flex gap-2"><span className="text-indigo-400">03.</span> Are there any seasonal trends in device deliveries?</li>
                <li className="flex gap-2"><span className="text-indigo-400">04.</span> Which customer receives the widest variety of models?</li>
                <li className="flex gap-2"><span className="text-indigo-400">05.</span> What is the average delivery time between supplier and customer?</li>
                <li className="flex gap-2"><span className="text-indigo-400">06.</span> Are there specific regions that favor certain device models?</li>
                <li className="flex gap-2"><span className="text-indigo-400">07.</span> How many unique licenses are currently active in the dataset?</li>
                <li className="flex gap-2"><span className="text-indigo-400">08.</span> Which supplier provides the most unique categories?</li>
                <li className="flex gap-2"><span className="text-indigo-400">09.</span> Are there any anomalies or outliers in the delivery quantities?</li>
                <li className="flex gap-2"><span className="text-indigo-400">10.</span> What is the distribution ratio between different models of the same category?</li>
                <li className="flex gap-2"><span className="text-indigo-400">11.</span> Can we predict future demand based on the current delivery trends?</li>
                <li className="flex gap-2"><span className="text-indigo-400">12.</span> Which lot numbers are associated with the highest volume of devices?</li>
                <li className="flex gap-2"><span className="text-indigo-400">13.</span> Are there any correlations between specific models and customer types?</li>
                <li className="flex gap-2"><span className="text-indigo-400">14.</span> How does the distribution network change over different time zones?</li>
                <li className="flex gap-2"><span className="text-indigo-400">15.</span> What is the most frequently distributed device name?</li>
                <li className="flex gap-2"><span className="text-indigo-400">16.</span> Are there any bottlenecks in the distribution network graph?</li>
                <li className="flex gap-2"><span className="text-indigo-400">17.</span> Which customers rely on a single supplier versus multiple suppliers?</li>
                <li className="flex gap-2"><span className="text-indigo-400">18.</span> What is the overall growth rate of device distribution over the recorded period?</li>
                <li className="flex gap-2"><span className="text-indigo-400">19.</span> Can we identify any potential supply chain risks from the network graph?</li>
                <li className="flex gap-2"><span className="text-indigo-400">20.</span> How can we optimize the distribution routes based on historical data?</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

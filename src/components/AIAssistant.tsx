import React, { useState } from 'react';
import { MedicalRecord } from '../types';
import { GoogleGenAI } from '@google/genai';
import { Bold, Italic, List, ListOrdered, Type } from 'lucide-react';

export const AIAssistant: React.FC<{ data: MedicalRecord[] }> = ({ data }) => {
  const [activeTab, setActiveTab] = useState('New Note');
  const [prompt, setPrompt] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState('gemini-3-flash-preview');

  const generateSummary = async () => {
    if (!data || data.length === 0) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const sampleData = data.slice(0, 50);
      const response = await ai.models.generateContent({
        model: model,
        contents: `${prompt || 'Please provide a comprehensive summary of this medical device distribution dataset.'}\n\nDataset sample:\n${JSON.stringify(sampleData, null, 2)}`,
      });
      setSummary(response.text || 'No summary generated.');
    } catch (error) {
      console.error('Error generating summary:', error);
      setSummary('Error generating summary. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-md shadow-sm mb-6">
      <div className="flex border-b border-slate-200 px-2">
        <button 
          className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'New Note' ? 'border-[#00b074] text-slate-800' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          onClick={() => setActiveTab('New Note')}
        >
          New Note
        </button>
        <button 
          className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'New Task' ? 'border-[#00b074] text-slate-800' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          onClick={() => setActiveTab('New Task')}
        >
          New Task
        </button>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-1 mb-6 border border-slate-200 rounded-md p-1 w-fit shadow-sm">
          <button className="p-1.5 hover:bg-slate-100 rounded text-slate-600 font-serif font-bold">T</button>
          <button className="p-1.5 hover:bg-slate-100 rounded text-slate-600 font-serif text-sm font-bold">T</button>
          <div className="w-px h-4 bg-slate-200 mx-1"></div>
          <button className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><Italic size={16} /></button>
          <button className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><Bold size={16} /></button>
          <div className="w-px h-4 bg-slate-200 mx-1"></div>
          <button className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><List size={16} /></button>
          <button className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><ListOrdered size={16} /></button>
          <div className="w-px h-4 bg-slate-200 mx-1"></div>
          <select 
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="text-sm text-slate-600 bg-transparent focus:outline-none cursor-pointer px-2 font-medium"
          >
            <option value="gemini-3-flash-preview">Gemini 3 Flash</option>
            <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro</option>
          </select>
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full text-sm text-slate-700 placeholder-slate-500 focus:outline-none resize-none h-16 font-medium"
          placeholder="Mention your teammates (just type @ and their name) and they will be informed."
        />

        <div className="flex justify-end mt-2">
          <button 
            onClick={generateSummary}
            disabled={loading}
            className="bg-[#00b074] hover:bg-[#009660] disabled:opacity-50 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
          >
            {loading ? 'Generating...' : 'Generate AI Summary'}
          </button>
        </div>

        {summary && (
          <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-700 whitespace-pre-wrap shadow-inner">
            {summary}
          </div>
        )}
      </div>
    </div>
  );
};

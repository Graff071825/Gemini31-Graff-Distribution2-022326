import React, { useState } from 'react';
import { MedicalRecord } from '../types';
import { GoogleGenAI } from '@google/genai';
import { useSettings } from '../context/SettingsContext';

interface SummaryProps {
  data: MedicalRecord[];
}

export const Summary: React.FC<SummaryProps> = ({ data }) => {
  const { t, accentColor } = useSettings();
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('Please provide a comprehensive summary of this medical device distribution dataset.');
  const [model, setModel] = useState('gemini-3-flash-preview');

  const generateSummary = async () => {
    if (!data || data.length === 0) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const sampleData = data.slice(0, 50); // Send a sample to avoid token limits
      const response = await ai.models.generateContent({
        model: model,
        contents: `${prompt}\n\nDataset sample:\n${JSON.stringify(sampleData, null, 2)}`,
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
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 mb-8 shadow-sm">
      <h3 className="text-zinc-800 dark:text-zinc-200 font-medium mb-4 text-sm uppercase tracking-wider">{t('aiSummary')}</h3>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <label className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 block">{t('prompt')}</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-900 dark:text-zinc-200 focus:outline-none transition-colors resize-none h-20"
            style={{ outlineColor: accentColor }}
          />
        </div>
        <div className="w-full md:w-64 flex flex-col justify-between">
          <div>
            <label className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 block">{t('model')}</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-900 dark:text-zinc-200 focus:outline-none transition-colors"
              style={{ outlineColor: accentColor }}
            >
              <option value="gemini-3-flash-preview">Gemini 3 Flash</option>
              <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro</option>
            </select>
          </div>
          <button
            onClick={generateSummary}
            disabled={loading}
            className="mt-2 w-full text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: accentColor }}
          >
            {loading ? t('generating') : t('generateSummary')}
          </button>
        </div>
      </div>
      {summary && (
        <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md p-4 text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
          {summary}
        </div>
      )}
    </div>
  );
};

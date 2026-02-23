import React, { useState } from 'react';
import { Settings, X, Check } from 'lucide-react';
import { useSettings, PANTONE_COLORS } from '../context/SettingsContext';

export const SettingsPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, language, setLanguage, accentColor, setAccentColor, t } = useSettings();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300"
        style={{ color: isOpen ? accentColor : undefined }}
      >
        <Settings size={20} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl z-50 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100">{t('settings')}</h3>
              <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Theme */}
              <div>
                <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2 block">
                  {t('theme')}
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTheme('light')}
                    className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium border ${
                      theme === 'light' 
                        ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-zinc-100' 
                        : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                    }`}
                  >
                    {t('light')}
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium border ${
                      theme === 'dark' 
                        ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-zinc-100' 
                        : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                    }`}
                  >
                    {t('dark')}
                  </button>
                </div>
              </div>

              {/* Language */}
              <div>
                <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2 block">
                  {t('language')}
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium border ${
                      language === 'en' 
                        ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-zinc-100' 
                        : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage('zh-TW')}
                    className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium border ${
                      language === 'zh-TW' 
                        ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-zinc-100' 
                        : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                    }`}
                  >
                    繁體中文
                  </button>
                </div>
              </div>

              {/* Accent Color */}
              <div>
                <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2 block">
                  {t('accentColor')}
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {PANTONE_COLORS.map((color) => (
                    <button
                      key={color.hex}
                      onClick={() => setAccentColor(color.hex)}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {accentColor === color.hex && <Check size={14} className="text-white drop-shadow-md" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

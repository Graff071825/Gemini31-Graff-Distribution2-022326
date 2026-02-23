import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';
type Language = 'en' | 'zh-TW';

export const PANTONE_COLORS = [
  { name: 'Classic Blue', hex: '#0F4C81' },
  { name: 'Living Coral', hex: '#FF6F61' },
  { name: 'Ultra Violet', hex: '#5F4B8B' },
  { name: 'Greenery', hex: '#88B04B' },
  { name: 'Rose Quartz', hex: '#F7CAC9' },
  { name: 'Serenity', hex: '#92A8D1' },
  { name: 'Marsala', hex: '#955251' },
  { name: 'Radiant Orchid', hex: '#AD5E99' },
  { name: 'Emerald', hex: '#009473' },
  { name: 'Tangerine Tango', hex: '#DD4124' },
];

interface SettingsContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    title: 'Medical Device Distribution',
    subtitle: 'Agentic AI Analysis System',
    uploadData: 'Upload Data',
    pasteData: 'Paste Data',
    filterDataset: 'Filter Dataset',
    clearFilters: 'Clear Filters',
    aiSummary: 'AI Summary',
    prompt: 'Prompt',
    model: 'Model',
    generateSummary: 'Generate Summary',
    generating: 'Generating...',
    dataPreview: 'Data Preview',
    showRecords: 'Show records:',
    all: 'All',
    topSuppliers: 'Top Suppliers',
    categoryDistribution: 'Category Distribution',
    deliveryTrend: 'Delivery Trend',
    topCustomers: 'Top Customers',
    topModels: 'Top Models',
    distributionNetworkGraph: 'Distribution Network Graph',
    followUpQuestions: 'Follow-up Questions',
    settings: 'Settings',
    theme: 'Theme',
    language: 'Language',
    accentColor: 'Accent Color',
    light: 'Light',
    dark: 'Dark',
    timezone: 'Timezone',
    supplierID: 'Supplier ID',
    category: 'Category',
    licenseNo: 'License Number',
    modelLabel: 'Model',
    customerID: 'Customer ID',
    lotNo: 'Lot Number',
    sn: 'Serial Number (SN)',
    totalRecords: 'total records',
    pasteModalTitle: 'Paste Dataset Data',
    pasteModalDesc: 'Paste your CSV or JSON data below:',
    cancel: 'Cancel',
    parseData: 'Parse Data',
    nodeDetails: 'Node Details',
    level: 'Level',
    count: 'Count',
    close: 'Close',
    id: 'ID',
    networkGraphDesc: 'SupplierID > Category > License Number > Model > CustomerID'
  },
  'zh-TW': {
    title: '醫療器材分銷',
    subtitle: '代理 AI 分析系統',
    uploadData: '上傳資料',
    pasteData: '貼上資料',
    filterDataset: '篩選資料集',
    clearFilters: '清除篩選',
    aiSummary: 'AI 摘要',
    prompt: '提示詞',
    model: '模型',
    generateSummary: '生成摘要',
    generating: '生成中...',
    dataPreview: '資料預覽',
    showRecords: '顯示筆數:',
    all: '全部',
    topSuppliers: '前十大供應商',
    categoryDistribution: '類別分佈',
    deliveryTrend: '交貨趨勢',
    topCustomers: '前十大客戶',
    topModels: '前十大型號',
    distributionNetworkGraph: '分銷網路圖',
    followUpQuestions: '後續問題',
    settings: '設定',
    theme: '主題',
    language: '語言',
    accentColor: '強調色',
    light: '淺色',
    dark: '深色',
    timezone: '時區',
    supplierID: '供應商 ID',
    category: '類別',
    licenseNo: '許可證字號',
    modelLabel: '型號',
    customerID: '客戶 ID',
    lotNo: '批號',
    sn: '序號 (SN)',
    totalRecords: '總筆數',
    pasteModalTitle: '貼上資料集資料',
    pasteModalDesc: '請在下方貼上 CSV 或 JSON 資料：',
    cancel: '取消',
    parseData: '解析資料',
    nodeDetails: '節點詳細資訊',
    level: '層級',
    count: '數量',
    close: '關閉',
    id: 'ID',
    networkGraphDesc: '供應商 ID > 類別 > 許可證字號 > 型號 > 客戶 ID'
  }
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [language, setLanguage] = useState<Language>('en');
  const [accentColor, setAccentColor] = useState<string>(PANTONE_COLORS[0].hex);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const t = (key: string) => {
    return (translations[language] as any)[key] || key;
  };

  return (
    <SettingsContext.Provider value={{ theme, setTheme, language, setLanguage, accentColor, setAccentColor, t }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};

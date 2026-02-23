import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, ScatterChart, Scatter } from 'recharts';
import { MedicalRecord } from '../types';
import { useSettings } from '../context/SettingsContext';

interface ChartsProps {
  data: MedicalRecord[];
}

export const Charts: React.FC<ChartsProps> = ({ data }) => {
  const { t, theme, accentColor } = useSettings();
  if (!data || data.length === 0) return null;

  const isDark = theme === 'dark';
  const textColor = isDark ? '#a1a1aa' : '#52525b';
  const gridColor = isDark ? '#3f3f46' : '#e4e4e7';
  const tooltipBg = isDark ? '#18181b' : '#ffffff';
  const tooltipBorder = isDark ? '#27272a' : '#e4e4e7';
  const tooltipText = isDark ? '#ffffff' : '#18181b';

  const COLORS = [accentColor, '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  // 1. Supplier Distribution
  const supplierCounts = data.reduce((acc, curr) => {
    acc[curr.SupplierID] = (acc[curr.SupplierID] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const supplierData = Object.keys(supplierCounts).map(key => ({ name: key, value: supplierCounts[key] })).sort((a, b) => b.value - a.value).slice(0, 10);

  // 2. Category Distribution
  const categoryCounts = data.reduce((acc, curr) => {
    const cat = curr.Category.substring(0, 15) + '...';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const categoryData = Object.keys(categoryCounts).map(key => ({ name: key, value: categoryCounts[key] })).sort((a, b) => b.value - a.value).slice(0, 5);

  // 3. Deliver Date Trend
  const dateCounts = data.reduce((acc, curr) => {
    acc[curr.Deliverdate] = (acc[curr.Deliverdate] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const dateData = Object.keys(dateCounts).sort().map(key => ({ date: key, count: dateCounts[key] }));

  // 4. Top Customers
  const customerCounts = data.reduce((acc, curr) => {
    acc[curr.CustomerID] = (acc[curr.CustomerID] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const customerData = Object.keys(customerCounts).map(key => ({ name: key, value: customerCounts[key] })).sort((a, b) => b.value - a.value).slice(0, 10);

  // 5. Model Distribution
  const modelCounts = data.reduce((acc, curr) => {
    acc[curr.Model] = (acc[curr.Model] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const modelData = Object.keys(modelCounts).map(key => ({ name: key, value: modelCounts[key] })).sort((a, b) => b.value - a.value).slice(0, 10);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 h-80 shadow-sm">
        <h3 className="text-zinc-800 dark:text-zinc-200 font-medium mb-4 text-sm">{t('topSuppliers')}</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={supplierData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis type="number" stroke={textColor} />
            <YAxis dataKey="name" type="category" stroke={textColor} width={80} />
            <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText }} />
            <Bar dataKey="value" fill={accentColor} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 h-80 shadow-sm">
        <h3 className="text-zinc-800 dark:text-zinc-200 font-medium mb-4 text-sm">{t('categoryDistribution')}</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill={accentColor} paddingAngle={5} dataKey="value">
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText }} />
            <Legend wrapperStyle={{ fontSize: '12px', color: textColor }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 h-80 shadow-sm">
        <h3 className="text-zinc-800 dark:text-zinc-200 font-medium mb-4 text-sm">{t('deliveryTrend')}</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dateData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="date" stroke={textColor} tick={{ fontSize: 12 }} />
            <YAxis stroke={textColor} />
            <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText }} />
            <Area type="monotone" dataKey="count" stroke={accentColor} fill={accentColor} fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 h-80 shadow-sm">
        <h3 className="text-zinc-800 dark:text-zinc-200 font-medium mb-4 text-sm">{t('topCustomers')}</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={customerData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="name" stroke={textColor} tick={{ fontSize: 12 }} />
            <YAxis stroke={textColor} />
            <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText }} />
            <Bar dataKey="value" fill={COLORS[1]} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 h-80 shadow-sm">
        <h3 className="text-zinc-800 dark:text-zinc-200 font-medium mb-4 text-sm">{t('topModels')}</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={modelData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="name" stroke={textColor} tick={{ fontSize: 12 }} />
            <YAxis stroke={textColor} />
            <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText }} />
            <Line type="monotone" dataKey="value" stroke={COLORS[2]} strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

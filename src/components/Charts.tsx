import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, ScatterChart, Scatter } from 'recharts';
import { MedicalRecord } from '../types';

interface ChartsProps {
  data: MedicalRecord[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export const Charts: React.FC<ChartsProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

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
      <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 h-80">
        <h3 className="text-zinc-200 font-medium mb-4 text-sm">Top Suppliers</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={supplierData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis type="number" stroke="#888" />
            <YAxis dataKey="name" type="category" stroke="#888" width={80} />
            <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }} />
            <Bar dataKey="value" fill="#8884d8" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 h-80">
        <h3 className="text-zinc-200 font-medium mb-4 text-sm">Category Distribution</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value">
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }} />
            <Legend wrapperStyle={{ fontSize: '12px', color: '#ccc' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 h-80">
        <h3 className="text-zinc-200 font-medium mb-4 text-sm">Delivery Trend</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dateData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="date" stroke="#888" tick={{ fontSize: 12 }} />
            <YAxis stroke="#888" />
            <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }} />
            <Area type="monotone" dataKey="count" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 h-80">
        <h3 className="text-zinc-200 font-medium mb-4 text-sm">Top Customers</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={customerData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#888" tick={{ fontSize: 12 }} />
            <YAxis stroke="#888" />
            <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }} />
            <Bar dataKey="value" fill="#ffc658" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 h-80">
        <h3 className="text-zinc-200 font-medium mb-4 text-sm">Top Models</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={modelData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#888" tick={{ fontSize: 12 }} />
            <YAxis stroke="#888" />
            <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }} />
            <Line type="monotone" dataKey="value" stroke="#ff7300" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Seg', present: 85, absent: 15 },
  { day: 'Ter', present: 92, absent: 8 },
  { day: 'Qua', present: 78, absent: 22 },
  { day: 'Qui', present: 88, absent: 12 },
  { day: 'Sex', present: 95, absent: 5 },
];

const AttendanceChart = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-4">Frequência Semanal</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="day" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }} 
          />
          <Bar dataKey="present" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
          <Bar dataKey="absent" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;

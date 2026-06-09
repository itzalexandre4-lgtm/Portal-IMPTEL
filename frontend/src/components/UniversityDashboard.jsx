import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 10 }, { name: 'Fev', value: 20 }, { name: 'Mar', value: 15 },
  { name: 'Abr', value: 25 }, { name: 'Mai', value: 30 }, { name: 'Jun', value: 35 }
];

// Exportação única no final para garantir estabilidade
const UniversityDashboard = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Portal IMPTEL - Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card de métrica */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500">Total de Alunos</h3>
          <p className="text-4xl font-bold text-blue-600">124</p>
        </div>
        
        {/* Gráfico */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="mb-4">Evolução Académica</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#2563eb" fill="#bfdbfe" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UniversityDashboard;
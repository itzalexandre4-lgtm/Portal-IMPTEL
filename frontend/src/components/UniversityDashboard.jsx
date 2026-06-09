import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const data = [
  { name: 'Jan', value: 10 }, { name: 'Fev', value: 20 }, { name: 'Mar', value: 15 },
  { name: 'Abr', value: 25 }, { name: 'Mai', value: 30 }, { name: 'Jun', value: 35 }
];

export default function UniversityDashboard() {
  return (
    <div style={{ padding: '40px', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      <h1>Painel de Controlo</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ background: '#2563eb', color: 'white', padding: '20px', borderRadius: '10px' }}>
          <h3>Total de Alunos</h3>
          <p style={{ fontSize: '24px' }}>124</p>
        </div>
      </div>
      <div style={{ marginTop: '20px', background: 'white', padding: '20px' }}>
        <ResponsiveContainer width="100%" height={300}>
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
  );
}
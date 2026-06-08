import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const performanceData = [
  { name: 'Jan', value: 12 }, { name: 'Fev', value: 15 }, { name: 'Mar', value: 11 },
  { name: 'Abr', value: 22 }, { name: 'Mai', value: 18 }, { name: 'Jun', value: 24 }
];

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, cursos: 0 });

  useEffect(() => {
    const saved = localStorage.getItem('listaAlunos');
    const alunos = saved ? JSON.parse(saved) : [];
    setStats({
      total: alunos.length,
      cursos: new Set(alunos.map(a => a.curso)).size
    });
  }, []);

  return (
    <div style={{ padding: '30px', backgroundColor: '#f9fafb', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1>Painel de Controlo</h1>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div style={{ padding: '20px', background: '#3b82f6', color: 'white', borderRadius: '12px' }}>
          <h3>Total de Alunos</h3>
          <p style={{ fontSize: '32px' }}>{stats.total}</p>
        </div>
      </div>
      {/* Restante do código dos gráficos aqui */}
    </div>
  );
}
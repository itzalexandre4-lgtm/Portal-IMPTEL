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
    <div style={{ padding: '30px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '20px' }}>Painel de Controlo</h1>
      
      {/* Cards de Números */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div style={{ padding: '20px', background: '#3b82f6', color: 'white', borderRadius: '12px', width: '250px' }}>
          <h3>Total de Alunos</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{stats.total}</p>
        </div>
        <div style={{ padding: '20px', background: '#8b5cf6', color: 'white', borderRadius: '12px', width: '250px' }}>
          <h3>Cursos Ativos</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{stats.cursos}</p>
        </div>
      </div>

      {/* Área de Gráficos */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <h3>Evolução Académica</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#bfdbfe" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
          <h3>Frequência</h3>
          <div style={{ width: '150px', margin: '20px auto' }}>
            <CircularProgressbar value={85} text="85%" styles={buildStyles({ pathColor: '#10b981' })} />
          </div>
        </div>
      </div>
    </div>
  );
}
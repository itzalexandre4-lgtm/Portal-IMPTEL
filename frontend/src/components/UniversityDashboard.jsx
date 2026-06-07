import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, ativos: 0, pendentes: 0 });

  useEffect(() => {
    const saved = localStorage.getItem('listaAlunos');
    const alunos = saved ? JSON.parse(saved) : [];
    setStats({
      total: alunos.length,
      ativos: alunos.filter(a => a.status === 'Ativo').length,
      pendentes: alunos.filter(a => a.status === 'Pendente').length
    });
  }, []);

  return (
    <div style={{ padding: '30px' }}>
      <h1>Dashboard Académico</h1>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        {[
          { label: 'Total', value: stats.total, color: '#3b82f6' },
          { label: 'Ativos', value: stats.ativos, color: '#22c55e' },
          { label: 'Pendentes', value: stats.pendentes, color: '#eab308' }
        ].map((item, index) => (
          <div key={index} style={{ padding: '20px', background: item.color, color: 'white', borderRadius: '12px', width: '200px' }}>
            <h3>{item.label}</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
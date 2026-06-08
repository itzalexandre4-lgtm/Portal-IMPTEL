import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, cursos: 0 });

  const updateStats = () => {
    const saved = localStorage.getItem('listaAlunos');
    const alunos = saved ? JSON.parse(saved) : [];
    const total = alunos.length;
    const cursos = new Set(alunos.map(a => a.curso)).size;
    setStats({ total, cursos });
  };

  useEffect(() => {
    updateStats();
    window.addEventListener('storage', updateStats);
    return () => window.removeEventListener('storage', updateStats);
  }, []);

  return (
    <div style={{ padding: '30px' }}>
      <h1>Painel de Controlo</h1>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        
        {/* Card Total de Alunos */}
        <div style={{ padding: '20px', background: '#3b82f6', color: 'white', borderRadius: '12px', flex: 1 }}>
          <h3>Total de Alunos</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{stats.total}</p>
        </div>

        {/* Card Cursos Ativos */}
        <div style={{ padding: '20px', background: '#8b5cf6', color: 'white', borderRadius: '12px', flex: 1 }}>
          <h3>Cursos Ativos</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{stats.cursos}</p>
        </div>

      </div>
    </div>
  );
}
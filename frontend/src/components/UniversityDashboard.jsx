import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FiUsers, FiLayers, FiFileText, FiCalendar } from 'react-icons/fi';

// Dados de exemplo para o gráfico de evolução
const performanceData = [
  { name: 'Jan', value: 12 }, { name: 'Fev', value: 15 }, { name: 'Mar', value: 11 },
  { name: 'Abr', value: 22 }, { name: 'Mai', value: 18 }, { name: 'Jun', value: 24 },
  { name: 'Jul', value: 22 }, { name: 'Ago', value: 30 }, { name: 'Set', value: 28 },
];

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, cursos: 0 });
  const presenceRate = 100; // Taxa de presença fixa para o exemplo

  // Função para ler o localStorage e atualizar os números
  const updateStats = () => {
    const saved = localStorage.getItem('listaAlunos');
    const alunos = saved ? JSON.parse(saved) : [];
    
    // Contar total e cursos únicos
    const total = alunos.length;
    const cursos = new Set(alunos.map(a => a.curso)).size;
    
    setStats({ total, cursos });
  };

  useEffect(() => {
    // Atualiza ao carregar a página
    updateStats();
    
    // Escuta mudanças se estiverem no mesmo navegador
    window.addEventListener('storage', updateStats);
    return () => window.removeEventListener('storage', updateStats);
  }, []);

  // Estilos inline baseados na foto fornecida
  const styles = {
    container: { padding: '30px', backgroundColor: '#f9fafb', minHeight: '100vh', fontFamily: '"Inter", sans-serif' },
    header: { marginBottom: '30px' },
    title: { color: '#111827', fontSize: '28px', fontWeight: '800', margin: 0 },
    subtitle: { color: '#6b7280', marginTop: '5px' },
    gridStats: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' },
    card: { backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' },
    cardStat: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    iconWrapper: { padding: '10px', borderRadius: '8px' },
    gridCharts: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' },
    chartHeader: { marginBottom: '20px' }
  };

  return (
    <div style={styles.container}>
      {/* Cabeçalho */}
      <div style={styles.header}>
        <h1 style={styles.title}>Painel de Controle</h1>
        <p style={styles.subtitle}>Visão geral do rendimento académico e estatísticas em tempo real do IMPTEL.</p>
      </div>

      {/* Cartões de Estatísticas Dinâmicas */}
      <div style={styles.gridStats}>
        {/* Total de Alunos - Atualiza Automaticamente */}
        <div style={styles.card}>
          <div style={styles.cardStat}>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Total de Alunos</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', margin: '5px 0' }}>{stats.total}</p>
            </div>
            <div style={{...styles.iconWrapper, backgroundColor: '#eff6ff', color: '#3b82f6'}}>
              <FiUsers size={24} />
            </div>
          </div>
        </div>

        {/* Cursos Ativos - Atualiza Automaticamente */}
        <div style={styles.card}>
          <div style={styles.cardStat}>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Cursos Ativos</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', margin: '5px 0' }}>{stats.cursos}</p>
            </div>
            <div style={{...styles.iconWrapper, backgroundColor: '#f5f3ff', color: '#8b5cf6'}}>
              <FiLayers size={24} />
            </div>
          </div>
        </div>

        {/* Média Global (Exemplo Fixo) */}
        <div style={styles.card}>
          <div style={styles.cardStat}>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Média Global</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', margin: '5px 0' }}>15 / <span style={{fontSize: '20px', color: '#9ca3af'}}>20</span></p>
            </div>
            <div style={{...styles.iconWrapper, backgroundColor: '#ecfdf5', color: '#10b981'}}>
              <FiFileText size={24} />
            </div>
          </div>
        </div>

        {/* Taxa de Presença (Exemplo Fixo) */}
        <div style={styles.card}>
          <div style={styles.cardStat}>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Taxa de Presença</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b', margin: '5px 0' }}>{presenceRate}%</p>
            </div>
            <div style={{...styles.iconWrapper, backgroundColor: '#fffbeb', color: '#f59e0b'}}>
              <FiCalendar size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Área de Gráficos */}
      <div style={styles.gridCharts}>
        {/* Gráfico de Evolução e Rendimento Anual */}
        <div style={styles.card}>
          <div style={styles.chartHeader}>
            <p style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>Evolução e Rendimento Anual</p>
            <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>Gráfico estatístico de crescimento e aproveitamento dos alunos do IMPTEL.</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" stroke="#d1d5db" />
              <YAxis hide />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#bfdbfe" fillOpacity={0.6} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Métrica de Frequência das Turmas */}
        <div style={styles.card}>
          <div style={styles.chartHeader}>
            <p style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>Métrica de Frequência das Turmas</p>
            <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>Monitoramento visual da assiduidade diária nas salas de aula.</p>
          </div>
          <div style={{ width: '200px', margin: '0 auto', textAlign: 'center' }}>
            <CircularProgressbar
              value={presenceRate}
              text={`${presenceRate}%`}
              styles={buildStyles({
                textColor: '#111827',
                pathColor: '#10b981',
                trailColor: '#f3f4f6',
                strokeLinecap: 'round'
              })}
            />
            <div style={{ display: 'flex', gap: '15px', fontSize: '12px', color: '#6b7280', marginTop: '15px', justifyContent: 'center' }}>
              <span><span style={{color: '#10b981', fontWeight: 'bold'}}>●</span> Regular</span>
              <span><span style={{color: '#e5e7eb', fontWeight: 'bold'}}>●</span> Ausente</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
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
    <div style={{ padding: '40px', backgroundColor: '#f3f4f6', minHeight: '100vh', fontFamily: 'Arial' }}>
      <h1 style={{ marginBottom: '30px', color: '#1f2937' }}>Painel de Controlo IMPTEL</h1>
      
      {/* Cards de Resumo */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: '#2563eb', color: 'white', padding: '25px', borderRadius: '15px', flex: 1 }}>
          <h3>Total de Alunos</h3>
          <p style={{ fontSize: '40px', fontWeight: 'bold' }}>124</p>
        </div>
        <div style={{ background: '#7c3aed', color: 'white', padding: '25px', borderRadius: '15px', flex: 1 }}>
          <h3>Cursos Ativos</h3>
          <p style={{ fontSize: '40px', fontWeight: 'bold' }}>8</p>
        </div>
      </div>

      {/* Gráficos */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '15px', border: '1px solid #ddd' }}>
          <h3>Evolução de Inscrições</h3>
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
        
        <div style={{ background: 'white', padding: '20px', borderRadius: '15px', border: '1px solid #ddd', textAlign: 'center' }}>
          <h3>Taxa de Assiduidade</h3>
          <div style={{ width: '150px', margin: '40px auto' }}>
            <CircularProgressbar value={92} text="92%" styles={buildStyles({ pathColor: '#10b981', textColor: '#10b981' })} />
          </div>
        </div>
      </div>
    </div>
  );
}
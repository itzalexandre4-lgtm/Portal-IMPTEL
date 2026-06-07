import React, { useState } from 'react';

export default function Students() {
  const [alunos] = useState([
    { id: '001', nome: 'Alexandre Lopes', curso: 'Informática', status: 'Ativo' },
    { id: '002', nome: 'Beatriz Silva', curso: 'Gestão', status: 'Ativo' },
  ]);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#1e293b' }}>Gestão de Alunos</h2>
      
      <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
              <th style={{ padding: '10px' }}>Nome</th>
              <th style={{ padding: '10px' }}>Curso</th>
              <th style={{ padding: '10px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '10px' }}>{aluno.nome}</td>
                <td style={{ padding: '10px' }}>{aluno.curso}</td>
                <td style={{ padding: '10px' }}>
                  <span style={{ backgroundColor: '#dcfce7', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                    {aluno.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
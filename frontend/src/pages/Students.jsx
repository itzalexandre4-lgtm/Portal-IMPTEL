import React, { useState, useEffect } from 'react';

export default function Students() {
  const [alunos, setAlunos] = useState(() => {
    const saved = localStorage.getItem('listaAlunos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('listaAlunos', JSON.stringify(alunos));
    // Dispara evento para o Dashboard atualizar em tempo real
    window.dispatchEvent(new Event('storage'));
  }, [alunos]);

  const handleAddAluno = () => {
    const nome = prompt("Nome do aluno:");
    const curso = prompt("Curso do aluno:");
    const status = confirm("Clique em OK para Ativo, Cancelar para Pendente") ? 'Ativo' : 'Pendente';
    
    if (nome && curso) {
      const novoAluno = { id: String(Date.now()), nome, curso, status };
      setAlunos([...alunos, novoAluno]);
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1>Gestão de Alunos</h1>
        <button onClick={handleAddAluno} style={{ padding: '10px 20px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          + Novo Aluno
        </button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
            <th style={{ padding: '15px' }}>Nome</th>
            <th style={{ padding: '15px' }}>Curso</th>
            <th style={{ padding: '15px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map(aluno => (
            <tr key={aluno.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '15px' }}>{aluno.nome}</td>
              <td style={{ padding: '15px' }}>{aluno.curso}</td>
              <td style={{ padding: '15px' }}>{aluno.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
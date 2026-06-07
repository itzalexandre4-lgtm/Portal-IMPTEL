import React, { useState, useEffect } from 'react';

export default function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Carrega os alunos do localStorage ao iniciar
  const [alunos, setAlunos] = useState(() => {
    const saved = localStorage.getItem('listaAlunos');
    return saved ? JSON.parse(saved) : [
      { id: '001', nome: 'Guilherme Mandele', curso: 'Informática' },
      { id: '002', nome: 'Bruno Domingos', curso: 'Gestão' }
    ];
  });

  // Salva no localStorage sempre que a lista de alunos mudar
  useEffect(() => {
    localStorage.setItem('listaAlunos', JSON.stringify(alunos));
  }, [alunos]);

  const handleAddAluno = () => {
    const nome = prompt("Nome do aluno:");
    const curso = prompt("Curso do aluno:");
    if (nome && curso) {
      const novoAluno = { 
        id: String(Date.now()), // ID único baseado no tempo
        nome: nome, 
        curso: curso 
      };
      setAlunos([...alunos, novoAluno]);
    }
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1>Gestão de Alunos</h1>
        <button onClick={handleAddAluno} style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>
          + Adicionar Aluno
        </button>
      </div>

      <input 
        type="text" 
        placeholder="🔍 Pesquisar..." 
        style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
            <th style={{ padding: '15px' }}>Nome</th>
            <th style={{ padding: '15px' }}>Curso</th>
          </tr>
        </thead>
        <tbody>
          {alunos.filter(a => a.nome.toLowerCase().includes(searchTerm.toLowerCase())).map((aluno) => (
            <tr key={aluno.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '15px' }}>{aluno.nome}</td>
              <td style={{ padding: '15px' }}>{aluno.curso}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
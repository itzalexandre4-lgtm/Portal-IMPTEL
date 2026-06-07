import React, { useState, useEffect } from 'react';

export default function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estado inicial com persistência no LocalStorage
  const [alunos, setAlunos] = useState(() => {
    const saved = localStorage.getItem('listaAlunos');
    return saved ? JSON.parse(saved) : [
      { id: '001', nome: 'Guilherme Mandele', curso: 'Informática' },
      { id: '002', nome: 'Bruno Domingos', curso: 'Gestão' },
      { id: '003', nome: 'Dário Ramos', curso: 'Mecânica' },
      { id: '004', nome: 'Silvio Leonel', curso: 'Electrónica' },
      { id: '005', nome: 'Rufino', curso: 'Informática' },
      { id: '006', nome: 'Leonildo', curso: 'Gestão' }
    ];
  });

  // Atualiza o LocalStorage sempre que a lista mudar
  useEffect(() => {
    localStorage.setItem('listaAlunos', JSON.stringify(alunos));
  }, [alunos]);

  // Função para adicionar aluno
  const handleAddAluno = () => {
    const nome = prompt("Nome do novo aluno:");
    const curso = prompt("Curso do novo aluno:");
    if (nome && curso) {
      const novoAluno = { 
        id: String(Date.now()), 
        nome: nome, 
        curso: curso 
      };
      setAlunos([...alunos, novoAluno]);
    }
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Cabeçalho */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#1e293b', fontSize: '28px' }}>Gestão de Alunos</h1>
        <button 
          onClick={handleAddAluno} 
          style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
        >
          + Adicionar Aluno
        </button>
      </div>

      {/* Barra de Pesquisa */}
      <input 
        type="text" 
        placeholder="🔍 Pesquisar por nome ou curso..." 
        style={{ width: '100%', padding: '15px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '16px' }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Tabela de Alunos */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9', textAlign: 'left' }}>
              <th style={{ padding: '16px', color: '#475569' }}>Nome do Aluno</th>
              <th style={{ padding: '16px', color: '#475569' }}>Curso</th>
            </tr>
          </thead>
          <tbody>
            {alunos
              .filter(a => a.nome.toLowerCase().includes(searchTerm.toLowerCase()) || a.curso.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((aluno) => (
                <tr key={aluno.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px', color: '#1e293b' }}>{aluno.nome}</td>
                  <td style={{ padding: '16px', color: '#64748b' }}>{aluno.curso}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
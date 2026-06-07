import React, { useState } from 'react';

export default function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  const [alunos, setAlunos] = useState([
    { id: '001', nome: 'Guilherme Mandele', curso: 'Informática', status: 'Ativo' },
    { id: '002', nome: 'Bruno Domingos', curso: 'Gestão', status: 'Ativo' },
    { id: '003', nome: 'Dário Ramos', curso: 'Mecânica', status: 'Ativo' },
    { id: '004', nome: 'Silvio Leonel', curso: 'Electrónica', status: 'Ativo' },
    { id: '005', nome: 'Rufino', curso: 'Informática', status: 'Pendente' },
    { id: '006', nome: 'Leonildo', curso: 'Gestão', status: 'Pendente' },
  ]);

  // Lógica da Pesquisa
  const filteredAlunos = alunos.filter(aluno =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Lógica do Botão "Adicionar"
  const handleAddAluno = () => {
    const novoNome = prompt("Digite o nome do novo aluno:");
    if (novoNome) {
      const novoAluno = { 
        id: String(alunos.length + 1).padStart(3, '0'), 
        nome: novoNome, 
        curso: 'Novo Curso', 
        status: 'Pendente' 
      };
      setAlunos([...alunos, novoAluno]); // Adiciona à lista
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
        placeholder="🔍 Pesquisar por nome..." 
        style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Liga a pesquisa ao input
      />

      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
            <th style={{ padding: '15px' }}>Nome</th>
            <th style={{ padding: '15px' }}>Curso</th>
            <th style={{ padding: '15px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlunos.map((aluno) => (
            <tr key={aluno.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
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
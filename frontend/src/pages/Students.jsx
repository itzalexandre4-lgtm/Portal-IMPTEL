import React, { useState } from 'react';

export default function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  const [alunos] = useState([
    { id: 1, nome: 'Nome Completo', curso: 'Técnico em Informática', status: 'Ativo', data: '15/01/2023' },
    { id: 2, nome: 'Panthario Feito', curso: 'Mecânica Industrial', status: 'Inativo', data: '03/01/2023' },
    // Adiciona aqui o resto dos teus dados...
  ]);

  const filteredAlunos = alunos.filter(aluno => 
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Gestão de Alunos</h1>
      
      {/* Barra de Pesquisa */}
      <input 
        type="text" 
        placeholder="Pesquisar por nome ou ID..." 
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Tabela */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
            <th>ID</th><th>Nome Completo</th><th>Curso</th><th>Status</th><th>Data</th><th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlunos.map((aluno) => (
            <tr key={aluno.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.curso}</td>
              <td>{aluno.status}</td>
              <td>{aluno.data}</td>
              <td>
                <button>👁️</button> <button>✏️</button> <button>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
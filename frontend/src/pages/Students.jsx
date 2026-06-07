import React, { useState } from 'react';

export default function Students() {
  // Estado inicial com os teus dados
  const [alunos] = useState([
    { id: 1, nome: 'Nome Completo', curso: 'Técnico em Informática', status: 'Ativo', data: '15/01/2023' },
    { id: 2, nome: 'Panthario Feito', curso: 'Mecânica Industrial', status: 'Inativo', data: '03/01/2023' },
    { id: 3, nome: 'Teste Nome', curso: 'Administração', status: 'Ativo', data: '16/01/2023' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // Filtro de pesquisa
  const filteredAlunos = alunos.filter(aluno => 
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Gestão de Alunos</h1>
      
      {/* Barra de Pesquisa */}
      <input 
        type="text" 
        placeholder="Pesquisar por nome..." 
        style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ccc' }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Tabela */}
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
        <thead>
          <tr style={{ backgroundColor: '#e9ecef', textAlign: 'left' }}>
            <th style={{ padding: '12px' }}>ID</th>
            <th style={{ padding: '12px' }}>Nome Completo</th>
            <th style={{ padding: '12px' }}>Curso</th>
            <th style={{ padding: '12px' }}>Status</th>
            <th style={{ padding: '12px' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlunos.map((aluno) => (
            <tr key={aluno.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '12px' }}>{aluno.id}</td>
              <td style={{ padding: '12px' }}>{aluno.nome}</td>
              <td style={{ padding: '12px' }}>{aluno.curso}</td>
              <td style={{ padding: '12px' }}>{aluno.status}</td>
              <td style={{ padding: '12px' }}>
                <button style={{ marginRight: '5px' }}>👁️</button>
                <button style={{ marginRight: '5px' }}>✏️</button>
                <button>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
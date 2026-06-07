import React, { useState } from 'react';

export default function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  const [alunos] = useState([
    { id: '001', nome: 'Alexandre Lopes', curso: 'Técnico de Informática', status: 'Ativo', turma: '12ª A' },
    { id: '002', nome: 'Beatriz Silva', curso: 'Gestão de Sistemas', status: 'Ativo', turma: '10ª B' },
    { id: '003', nome: 'Carlos Manuel', curso: 'Mecânica Industrial', status: 'Pendente', turma: '11ª C' },
    { id: '004', nome: 'Dário Costa', curso: 'Electrónica', status: 'Inativo', turma: '12ª B' },
  ]);

  // Filtro de pesquisa inteligente
  const filteredAlunos = alunos.filter(aluno =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aluno.id.includes(searchTerm)
  );

  // Estilos Uniformes (Azul IMPTEL #2563eb)
  const styles = {
    container: { padding: '30px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: '"Inter", sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
    title: { color: '#1e293b', fontSize: '28px', margin: 0, fontWeight: '700' },
    card: { backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', overflow: 'hidden', border: '1px solid #e2e8f0' },
    searchBar: { padding: '20px', borderBottom: '1px solid #f1f5f9' },
    input: { width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', outline: 'none' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { backgroundColor: '#f8fafc', padding: '15px', textAlign: 'left', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #f1f5f9' },
    td: { padding: '15px', borderBottom: '1px solid #f1f5f9', color: '#334155', fontSize: '15px' },
    badge: (status) => ({
      padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
      backgroundColor: status === 'Ativo' ? '#dcfce7' : status === 'Pendente' ? '#fef9c3' : '#fee2e2',
      color: status === 'Ativo' ? '#166534' : status === 'Pendente' ? '#854d0e' : '#991b1b'
    }),
    btnPrimary: { backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }
  };

  return (
    <div style={styles.container}>
      {/* Cabeçalho */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Gestão de Alunos</h1>
          <p style={{ color: '#64748b', marginTop: '5px' }}>Painel administrativo do Portal IMPTEL</p>
        </div>
        <button style={styles.btnPrimary}>+ Adicionar Aluno</button>
      </div>

      {/* Tabela de Dados */}
      <div style={styles.card}>
        <div style={styles.searchBar}>
          <input 
            type="text" 
            placeholder="🔍 Pesquisar aluno por nome ou ID..." 
            style={styles.input}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Nome do Estudante</th>
              <th style={styles.th}>Curso / Turma</th>
              <th style={styles.th}>Estado</th>
              <th style={styles.th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlunos.map((aluno) => (
              <tr key={aluno.id}>
                <td style={styles.td}><strong>{aluno.id}</strong></td>
                <td style={styles.td}>{aluno.nome}</td>
                <td style={styles.td}>
                  <div>{aluno.curso}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>{aluno.turma}</div>
                </td>
                <td style={styles.td}>
                  <span style={styles.badge(aluno.status)}>{aluno.status}</span>
                </td>
                <td style={styles.td}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '10px' }}>👁️</button>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>✏️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredAlunos.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
            Nenhum aluno encontrado com esse nome.
          </div>
        )}
      </div>
    </div>
  );
}
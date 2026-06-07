import React, { useState } from 'react';

export default function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  // Lista inicial solicitada
  const [alunos] = useState([
    { id: '001', nome: 'Guilherme Mandele', curso: 'Informática', status: 'Ativo', turma: '12ª A' },
    { id: '002', nome: 'Bruno Domingos', curso: 'Gestão', status: 'Ativo', turma: '10ª B' },
    { id: '003', nome: 'Dário Ramos', curso: 'Infotmática', status: 'Ativo', turma: '11ª C' },
    { id: '004', nome: 'Silvio Leonel', curso: 'Informática', status: 'Ativo', turma: '12ª B' },
    { id: '005', nome: 'Rufino', curso: 'Informática', status: 'Pendente', turma: '10ª A' },
    { id: '006', nome: 'Leonildo', curso: 'Gestão', status: 'Pendente', turma: '11ª A' },
  ]);

  const filteredAlunos = alunos.filter(aluno =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const styles = {
    container: { padding: '30px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: '"Inter", sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
    card: { backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', overflow: 'hidden' },
    input: { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { backgroundColor: '#f8fafc', padding: '15px', textAlign: 'left', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', borderBottom: '2px solid #f1f5f9' },
    td: { padding: '15px', borderBottom: '1px solid #f1f5f9', color: '#334155' },
    badge: (status) => ({
      padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600',
      backgroundColor: status === 'Ativo' ? '#dcfce7' : '#fef9c3',
      color: status === 'Ativo' ? '#166534' : '#854d0e'
    })
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={{ color: '#1e293b', fontSize: '24px' }}>Gestão de Alunos</h1>
        <button style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>+ Novo Aluno</button>
      </div>

      <div style={styles.card}>
        <div style={{ padding: '20px', borderBottom: '1px solid #f1f5f9' }}>
          <input type="text" placeholder="Pesquisar..." style={styles.input} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Nome</th>
              <th style={styles.th}>Curso</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlunos.map((aluno) => (
              <tr key={aluno.id}>
                <td style={styles.td}>{aluno.nome}</td>
                <td style={styles.td}>{aluno.curso}</td>
                <td style={styles.td}><span style={styles.badge(aluno.status)}>{aluno.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
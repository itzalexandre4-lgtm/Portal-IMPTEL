import { useState } from 'react';

export default function Students() {
  const [alunos, setAlunos] = useState([
    { nome: 'Teste Nome', curso: 'Teste Curso', email: 'teste@email.com', telefone: '000000' }
  ]);

  return (
    <div style={{ padding: '20px', color: 'black' }}>
      <h1>Debug: Lista de Alunos</h1>
      <table border="1" style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Curso</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno, index) => (
            <tr key={index}>
              <td>{aluno.nome}</td>
              <td>{aluno.curso}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
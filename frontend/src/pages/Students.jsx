import React, { useState } from 'react';

export default function Students() {
  const [alunos] = useState([
    { id: '001', nome: 'Guilherme Mandele', curso: 'Informática' },
    { id: '002', nome: 'Bruno Domingos', curso: 'Gestão' }
  ]);

  // Esta função é o teste de funcionamento
  const testarBotao = () => {
    alert("O botão está a funcionar!");
  };

  return (
    <div style={{ padding: '50px' }}>
      <h1>Gestão de Alunos</h1>
      
      {/* Botão com teste de alerta */}
      <button 
        onClick={testarBotao} 
        style={{ padding: '20px', fontSize: '20px', cursor: 'pointer', backgroundColor: 'red', color: 'white' }}
      >
        CLICA AQUI PARA TESTAR
      </button>

      <ul style={{ marginTop: '30px' }}>
        {alunos.map(a => <li key={a.id}>{a.nome}</li>)}
      </ul>
    </div>
  );
}
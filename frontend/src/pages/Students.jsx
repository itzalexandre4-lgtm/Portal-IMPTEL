import { useState } from 'react';

export default function Students() {
  // 1. Estado para a lista de alunos e para os inputs
  const [alunos, setAlunos] = useState([]);
  const [formData, setFormData] = useState({ 
    nome: '', 
    curso: '', 
    email: '', 
    telefone: '' 
  });

  // 2. Função para atualizar os inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 3. Função para adicionar aluno à tabela
  const addAluno = () => {
    if (formData.nome.trim() !== '') {
      setAlunos([...alunos, formData]);
      // Limpa os campos após adicionar
      setFormData({ nome: '', curso: '', email: '', telefone: '' });
    }
  };

  return (
    <div className="p-6">
      {/* Formulário de Input */}
      <div className="flex gap-2 mb-6">
        <input name="nome" value={formData.nome} onChange={handleInputChange} placeholder="Nome Completo" className="border p-2 rounded" />
        <input name="curso" value={formData.curso} onChange={handleInputChange} placeholder="Curso Técnico" className="border p-2 rounded" />
        <input name="email" value={formData.email} onChange={handleInputChange} placeholder="E-mail" className="border p-2 rounded" />
        <input name="telefone" value={formData.telefone} onChange={handleInputChange} placeholder="Telemóvel" className="border p-2 rounded" />
        <button onClick={addAluno} className="bg-blue-600 text-white p-2 px-4 rounded hover:bg-blue-700">
          Adicionar
        </button>
      </div>

      {/* Tabela de Alunos */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-2">Nome Completo</th>
            <th className="p-2">Curso Técnico</th>
            <th className="p-2">E-mail</th>
            <th className="p-2">Telemóvel</th>
          </tr>
        </thead>
        <tbody>
          {alunos.length > 0 ? (
            alunos.map((aluno, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{aluno.nome}</td>
                <td className="p-2">{aluno.curso}</td>
                <td className="p-2">{aluno.email}</td>
                <td className="p-2">{aluno.telefone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">Nenhum aluno adicionado ainda.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
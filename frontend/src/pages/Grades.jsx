import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";

export default function Grades() {
  // 1. Declaração de todos os Estados dentro do componente
  const [grades, setGrades] = useState([]);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState("");
  const [subject, setSubject] = useState("");
  const [value, setValue] = useState("");

  // Lista estática de disciplinas padrão para o ensino técnico
  const subjects = [
    "SEAC (Sistemas de Exploração e Arq. de Computadores)",
    "TLR (Técnicas de Linguagens de Programação)",
    "TREI (Tecnologias de Redes de Computadores)",
    "Matemática",
    "Física",
    "Língua Portuguesa"
  ];

  // 2. Carregamento inicial dos dados assim que o componente monta
  useEffect(() => {
    async function loadData() {
      try {
        const resGrades = await fetch("http://localhost:5000/grades");
        if (resGrades.ok) {
          const dataGrades = await resGrades.json();
          setGrades(dataGrades);
        }
      } catch (err) {
        console.error("Não foi possível carregar as notas do servidor:", err);
      }

      try {
        const resStudents = await fetch("http://localhost:5000/students");
        if (resStudents.ok) {
          const dataStudents = await resStudents.json();
          setStudents(dataStudents);
        }
      } catch (err) {
        console.error("Não foi possível carregar os alunos do servidor:", err);
      }
    }

    loadData();
  }, []);

  // 3. Função para submeter a nova nota para a API
  const addGrade = async () => {
    if (!student || !subject || !value) return;

    const gradeNum = Number(value);
    if (gradeNum < 0 || gradeNum > 20) {
      alert("Por favor, insira uma nota válida entre 0 e 20 valores.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/grades", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student,
          subject,
          value: gradeNum,
        }),
      });

      if (response.ok) {
        // Recarregar a lista diretamente após salvar com sucesso
        const res = await fetch("http://localhost:5000/grades");
        const data = await res.json();
        setGrades(data);

        // Limpar o formulário e fechar o modal de inserção
        setStudent("");
        setSubject("");
        setValue("");
        setOpen(false);
      }
    } catch (err) {
      console.error("Erro ao enviar a nota para o servidor:", err);
      alert("Erro ao conectar com o servidor. Verifique se o backend está ligado.");
    }
  };

  // 4. Filtro em tempo real para a barra de pesquisa
  const filteredGrades = grades.filter((g) =>
    (g.student && g.student.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (g.subject && g.subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // 5. Cálculos das Métricas para os Cards Informativos
  const totalNotas = grades.length;
  const mediaGlobal = totalNotas > 0 
    ? (grades.reduce((acc, curr) => acc + Number(curr.value), 0) / totalNotas).toFixed(1) 
    : "0.0";
  const aprovados = grades.filter((g) => Number(g.value) >= 10).length;
  const taxaAproveitamento = totalNotas > 0 ? Math.round((aprovados / totalNotas) * 100) : 0;

  return (
    <div style={styles.page}>
      
      {/* CABEÇALHO */}
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.title}>📝 Lançamento de Notas</h1>
          <p style={styles.subtitle}>Gerencie as avaliações, pautas e desempenho escolar dos estudantes.</p>
        </div>
      </div>

      {/* CARDS INDICADORES */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Notas Registadas</span>
          <h2 style={styles.statValue}>{totalNotas}</h2>
          <span style={styles.statSub}>Este trimestre</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Média Geral</span>
          <h2 style={{ ...styles.statValue, color: Number(mediaGlobal) >= 10 ? "#10B981" : "#EF4444" }}>
            {mediaGlobal} <span style={{ fontSize: 14, fontWeight: "normal", color: "#64748B" }}>/20</span>
          </h2>
          <span style={styles.statSub}>Rendimento global</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Taxa de Aproveitamento</span>
          <h2 style={styles.statValue}>{taxaAproveitamento}%</h2>
          <span style={styles.statSub}>Notas ≥ 10 valores</span>
        </div>
      </div>

      {/* BARRA DE PESQUISA E BOTÃO */}
      <div style={styles.actionBar}>
        <div style={styles.searchContainer}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Pesquisar por aluno ou disciplina..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <button style={styles.addBtn} onClick={() => setOpen(true)}>
          ➕ Lançar Nova Nota
        </button>
      </div>

      {/* TABELA DE DADOS */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeadRow}>
              <th style={styles.th}>Estudante</th>
              <th style={styles.th}>Disciplina</th>
              <th style={{ ...styles.th, textAlign: "center" }}>Nota Final</th>
              <th style={styles.th}>Resultado</th>
            </tr>
          </thead>
          <tbody>
            {filteredGrades.length > 0 ? (
              filteredGrades.map((g, index) => {
                const isPositive = Number(g.value) >= 10;
                return (
                  <tr key={g._id || index} style={styles.tableRow}>
                    <td style={{ ...styles.td, fontWeight: "600", color: "#0F172A" }}>{g.student}</td>
                    <td style={styles.td}>{g.subject}</td>
                    <td style={{ ...styles.td, textAlign: "center", fontWeight: "700", fontSize: "16px", color: isPositive ? "#10B981" : "#EF4444" }}>
                      {Number(g.value).toFixed(1)}
                    </td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.statusBadge,
                        background: isPositive ? "#ECFDF5" : "#FEF2F2",
                        color: isPositive ? "#059669" : "#DC2626"
                      }}>
                        {isPositive ? "Aprovado" : "Exame / Recurso"}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" style={styles.emptyTd}>
                  Nenhuma nota lançada ou encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL PARA LANÇAMENTO */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={styles.modalContent}>
          <h2 style={styles.modalTitle}>Lançar Nota Académica</h2>
          <p style={styles.modalSubtitle}>Selecione o estudante, a disciplina e insira a classificação oficial.</p>

          <label style={styles.label}>Estudante</label>
          <select
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            style={styles.select}
          >
            <option value="">Selecione o Aluno</option>
            {students.map((s, idx) => (
              <option key={s._id || idx} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>

          <label style={{ ...styles.label, marginTop: 15 }}>Disciplina / Módulo</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={styles.select}
          >
            <option value="">Selecione a Disciplina</option>
            {subjects.map((sub, idx) => (
              <option key={idx} value={sub}>
                {sub}
              </option>
            ))}
          </select>

          <label style={{ ...styles.label, marginTop: 15 }}>Classificação (0 a 20)</label>
          <input
            type="number"
            min="0"
            max="20"
            step="0.1"
            placeholder="Ex: 14.5"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={styles.input}
          />

          <div style={styles.modalActions}>
            <button onClick={() => setOpen(false)} style={styles.cancelBtn}>
              Cancelar
            </button>
            <button onClick={addGrade} style={styles.saveBtn}>
              Confirmar e Lançar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// EstilosCSS-in-JS organizados
const styles = {
  page: {
    padding: "30px",
    background: "#F8FAFC",
    minHeight: "100vh",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  pageHeader: {
    marginBottom: "25px",
  },
  title: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "700",
    color: "#0F172A",
  },
  subtitle: {
    margin: "6px 0 0 0",
    color: "#64748B",
    fontSize: "15px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  statCard: {
    background: "#FFFFFF",
    borderRadius: "14px",
    padding: "20px",
    border: "1px solid #E2E8F0",
    boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
  },
  statLabel: {
    fontSize: "13px",
    fontWeight: "500",
    color: "#64748B",
  },
  statValue: {
    margin: "8px 0 4px 0",
    fontSize: "28px",
    fontWeight: "700",
    color: "#0F172A",
  },
  statSub: {
    fontSize: "12px",
    color: "#64748B",
    fontWeight: "500",
  },
  actionBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    background: "#FFFFFF",
    padding: "10px 16px",
    borderRadius: "12px",
    border: "1px solid #E2E8F0",
    width: "100%",
    maxWidth: "400px",
  },
  searchIcon: {
    marginRight: "10px",
    color: "#64748B",
  },
  searchInput: {
    border: "none",
    background: "transparent",
    outline: "none",
    width: "100%",
    fontSize: "14px",
    color: "#1E293B",
  },
  addBtn: {
    background: "#2563EB",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    whiteSpace: "nowrap",
  },
  tableWrapper: {
    background: "#FFFFFF",
    borderRadius: "16px",
    border: "1px solid #E2E8F0",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.01)",
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
    fontSize: "14px",
  },
  tableHeadRow: {
    background: "#F8FAFC",
    borderBottom: "1px solid #E2E8F0",
  },
  th: {
    padding: "16px 20px",
    fontWeight: "600",
    color: "#64748B",
  },
  tableRow: {
    borderBottom: "1px solid #F1F5F9",
    transition: "0.2s",
  },
  td: {
    padding: "16px 20px",
    color: "#334155",
  },
  emptyTd: {
    padding: "30px",
    textAlign: "center",
    color: "#94A3B8",
  },
  statusBadge: {
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    display: "inline-block",
  },
  modalContent: {
    padding: "10px 5px",
  },
  modalTitle: {
    margin: "0 0 4px 0",
    fontSize: "20px",
    fontWeight: "700",
    color: "#0F172A",
  },
  modalSubtitle: {
    margin: "0 0 20px 0",
    color: "#64748B",
    fontSize: "14px",
  },
  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: "#475569",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #CBD5E1",
    fontSize: "14px",
    color: "#1E293B",
    outline: "none",
    boxSizing: "border-box",
  },
  select: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #CBD5E1",
    fontSize: "14px",
    color: "#1E293B",
    outline: "none",
    background: "#FFFFFF",
    boxSizing: "border-box",
    marginBottom: "10px",
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "25px",
  },
  cancelBtn: {
    background: "#F1F5F9",
    color: "#475569",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },
  saveBtn: {
    background: "#2563EB",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },
};
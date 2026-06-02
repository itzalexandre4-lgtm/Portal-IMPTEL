import React, { useEffect, useState } from "react";

export default function Attendance() {
  const [students, setStudents] = useState([]);
  const [attendanceList, setAttendanceList] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [searchTerm, setSearchTerm] = useState("");

  // Disciplinas para o filtro de chamada do IMPTEL
  const subjects = [
    "SEAC (Sistemas de Exploração e Arq. de Computadores)",
    "TLR (Técnicas de Linguagens de Programação)",
    "TREI (Tecnologias de Redes de Computadores)",
    "Matemática",
    "Física",
    "Língua Portuguesa"
  ];

  // 1. Carregar Alunos e Histórico de Presenças do Backend
  useEffect(() => {
    async function loadData() {
      try {
        const resStudents = await fetch("http://localhost:5000/students");
        if (resStudents.ok) setStudents(await resStudents.json());

        const resAttendance = await fetch("http://localhost:5000/attendance");
        if (resAttendance.ok) setAttendanceList(await resAttendance.json());
      } catch (err) {
        console.error("Erro ao carregar dados de presenças:", err);
      }
    }
    loadData();
  }, []);

  // 2. Função para salvar ou atualizar a presença de um aluno
  const toggleAttendance = async (studentName, currentStatus) => {
    if (!selectedSubject) {
      alert("Por favor, selecione primeiro a Disciplina para abrir a chamada.");
      return;
    }

    // Se o status atual for "Presente", muda para "Falta", caso contrário vira "Presente"
    const newStatus = currentStatus === "Presente" ? "Falta" : "Presente";

    try {
      const response = await fetch("http://localhost:5000/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student: studentName,
          subject: selectedSubject,
          date: selectedDate,
          status: newStatus,
        }),
      });

      if (response.ok) {
        // Recarregar lista de presenças do banco para atualizar a tela em tempo real
        const res = await fetch("http://localhost:5000/attendance");
        if (res.ok) setAttendanceList(await res.json());
      }
    } catch (err) {
      console.error("Erro ao salvar presença:", err);
    }
  };

  // 3. Descobrir o status atual do aluno para a data e disciplina selecionadas
  const getStudentStatus = (studentName) => {
    const record = attendanceList.find(
      (a) => a.student === studentName && a.date === selectedDate && a.subject === selectedSubject
    );
    return record ? record.status : "Pendente";
  };

  // Filtro de busca de alunos por nome
  const filteredStudents = students.filter((s) =>
    s.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Métricas Rápidas do Dia Selecionado
  const totalAlunosTurma = students.length;
  const chamadasDoDia = attendanceList.filter((a) => a.date === selectedDate && a.subject === selectedSubject);
  const totalPresentes = chamadasDoDia.filter((a) => a.status === "Presente").length;
  const totalFaltas = chamadasDoDia.filter((a) => a.status === "Falta").length;

  return (
    <div style={styles.page}>
      
      {/* CABEÇALHO */}
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.title}>📅 Diário de Presenças</h1>
          <p style={styles.subtitle}>Selecione a data e a disciplina para realizar a chamada diária dos alunos.</p>
        </div>
      </div>

      {/* CONTROLES DE FILTRO (DISCIPLINA E DATA) */}
      <div style={styles.filterBar}>
        <div style={styles.filterGroup}>
          <label style={styles.label}>Disciplina / Módulo</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            style={styles.select}
          >
            <option value="">Selecione a Disciplina para iniciar...</option>
            {subjects.map((sub, idx) => (
              <option key={idx} value={sub}>{sub}</option>
            ))}
          </select>
        </div>

        <div style={{ ...styles.filterGroup, maxWidth: "200px" }}>
          <label style={styles.label}>Data da Aula</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={styles.dateInput}
          />
        </div>
      </div>

      {/* CARDS INDICADORES DE PRESENÇA */}
      {selectedSubject && (
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <span style={styles.statLabel}>Alunos na Turma</span>
            <h2 style={styles.statValue}>{totalAlunosTurma}</h2>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statLabel}>Presentes Hoje</span>
            <h2 style={{ ...styles.statValue, color: "#10B981" }}>{totalPresentes}</h2>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statLabel}>Faltas Registadas</span>
            <h2 style={{ ...styles.statValue, color: "#EF4444" }}>{totalFaltas}</h2>
          </div>
        </div>
      )}

      {/* LISTA DE CHAMADA */}
      <div style={styles.tableWrapper}>
        <div style={styles.tableHeaderActions}>
          <h3 style={styles.tableSectionTitle}>
            {selectedSubject ? `📋 Lista de Chamada` : "⚠️ Aguardando Seleção de Disciplina"}
          </h3>
          <input
            type="text"
            placeholder="Filtrar aluno por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.innerSearchInput}
            disabled={!selectedSubject}
          />
        </div>

        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeadRow}>
              <th style={styles.th}>Nome do Aluno</th>
              <th style={styles.th}>Curso</th>
              <th style={{ ...styles.th, textAlign: "center" }}>Estado Atual</th>
              <th style={{ ...styles.th, textAlign: "right" }}>Ações Rápidas</th>
            </tr>
          </thead>
          <tbody>
            {selectedSubject ? (
              filteredStudents.length > 0 ? (
                filteredStudents.map((s, idx) => {
                  const status = getStudentStatus(s.name);
                  
                  // Configuração dinâmica de cores das Badges de Status
                  let badgeBg = "#F1F5F9";
                  let badgeColor = "#475569";
                  if (status === "Presente") { badgeBg = "#ECFDF5"; badgeColor = "#059669"; }
                  if (status === "Falta") { badgeBg = "#FEF2F2"; badgeColor = "#DC2626"; }

                  return (
                    <tr key={s._id || idx} style={styles.tableRow}>
                      <td style={{ ...styles.td, fontWeight: "600", color: "#0F172A" }}>{s.name}</td>
                      <td style={styles.td}>{s.course}</td>
                      <td style={{ ...styles.td, textAlign: "center" }}>
                        <span style={{ ...styles.statusBadge, background: badgeBg, color: badgeColor }}>
                          {status}
                        </span>
                      </td>
                      <td style={{ ...styles.td, textAlign: "right" }}>
                        <button
                          onClick={() => toggleAttendance(s.name, status)}
                          style={{
                            ...styles.actionToggleBtn,
                            background: status === "Presente" ? "#EF4444" : "#10B981"
                          }}
                        >
                          {status === "Presente" ? "Marcar Falta ❌" : "Dar Presença ✔️"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" style={styles.emptyTd}>Nenhum aluno encontrado na base de dados.</td>
                </tr>
              )
            ) : (
              <tr>
                <td colSpan="4" style={{ ...styles.emptyTd, padding: "50px", color: "#64748B" }}>
                  💡 Por favor, escolha uma disciplina no menu superior para carregar a pauta de presenças.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

// Estilos corrigidos e com as chaves CamelCase unificadas
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
  filterBar: {
    display: "flex",
    gap: "20px",
    background: "#FFFFFF",
    padding: "20px",
    borderRadius: "16px",
    border: "1px solid #E2E8F0",
    boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
    marginBottom: "25px",
  },
  filterGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    flex: 1,
  },
  label: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  select: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #CBD5E1",
    fontSize: "14px",
    color: "#1E293B",
    outline: "none",
    background: "#FFFFFF",
  },
  dateInput: {
    padding: "11px",
    borderRadius: "10px",
    border: "1px solid #CBD5E1",
    fontSize: "14px",
    color: "#1E293B",
    outline: "none",
    background: "#FFFFFF",
    fontFamily: "inherit",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "25px",
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
    margin: "8px 0 0 0",
    fontSize: "26px",
    fontWeight: "700",
    color: "#0F172A",
  },
  tableWrapper: {
    background: "#FFFFFF",
    borderRadius: "16px",
    border: "1px solid #E2E8F0",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.01)",
    overflow: "hidden",
  },
  tableHeaderActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #E2E8F0",
    background: "#F8FAFC",
  },
  tableSectionTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: "600",
    color: "#1E293B",
  },
  innerSearchInput: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "1px solid #CBD5E1",
    fontSize: "13px",
    outline: "none",
    width: "220px",
    background: "#FFFFFF",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
    fontSize: "14px",
  },
  tableHeadRow: {
    borderBottom: "1px solid #E2E8F0",
    background: "#FFFFFF",
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
    padding: "14px 20px",
    color: "#334155",
    verticalAlign: "middle",
  },
  emptyTd: {
    padding: "30px",
    textAlign: "center",
    color: "#94A3B8",
  },
  statusBadge: {
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    display: "inline-block",
    minWidth: "70px",
  },
  actionToggleBtn: {
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "12px",
    transition: "background 0.2s",
  }
};
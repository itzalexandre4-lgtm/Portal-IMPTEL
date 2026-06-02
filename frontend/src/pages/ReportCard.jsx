import React, { useEffect, useState } from "react";

export default function ReportCard() {
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Conectado diretamente à API oficial do IMPTEL para sincronização em tempo real
  useEffect(() => {
    async function loadReportData() {
      try {
        const [resStudents, resGrades, resAttendance] = await Promise.all([
          fetch("http://localhost:5000/students"),
          fetch("http://localhost:5000/grades"),
          fetch("http://localhost:5000/attendance").catch(() => null) // Previne quebra caso a rota de presença ainda não exista
        ]);

        if (resStudents && resStudents.ok) setStudents(await resStudents.json());
        if (resGrades && resGrades.ok) setGrades(await resGrades.json());
        if (resAttendance && resAttendance.ok) setAttendance(await resAttendance.json());
      } catch (err) {
        console.error("Erro ao sincronizar dados do boletim:", err);
      }
    }
    loadReportData();
  }, []);

  const getStudentGrades = (name) =>
    grades.filter((g) => g.student === name);

  const getAverage = (name) => {
    const studentGrades = getStudentGrades(name);
    if (studentGrades.length === 0) return "0.0";

    const sum = studentGrades.reduce((a, b) => a + Number(b.value), 0);
    return (sum / studentGrades.length).toFixed(1);
  };

  const getStatus = (avg) => {
    const numericAvg = Number(avg);
    if (numericAvg >= 10) return { label: "Aprovado", color: "#059669", bg: "#ECFDF5" };
    if (numericAvg >= 7) return { label: "Recurso", color: "#D97706", bg: "#FEF3C7" };
    return { label: "Retido", color: "#DC2626", bg: "#FEF2F2" };
  };

  const getAttendanceStats = (name) => {
    if (!attendance || attendance.length === 0) return { pres: 0, faltas: 0, taxa: "100%" };
    
    const studentRecords = attendance.filter((x) => x.student === name);
    if (studentRecords.length === 0) return { pres: 0, faltas: 0, taxa: "100%" };

    const pres = studentRecords.filter((x) => x.status === "Presente").length;
    const faltas = studentRecords.filter((x) => x.status === "Falta").length;
    const taxa = ((pres / studentRecords.length) * 100).toFixed(0) + "%";

    return { pres, faltas, taxa };
  };

  // Filtro de pesquisa rápida de estudantes
  const filteredStudents = students.filter((s) =>
    s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.course?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.page}>
      
      {/* CABEÇALHO */}
      <div style={styles.pageHeader}>
        <h1 style={styles.title}>📄 Emissão de Boletins</h1>
        <p style={styles.subtitle}>Selecione um estudante da lista técnica do IMPTEL para gerar a folha de rendimento oficial.</p>
      </div>

      {/* DISPOSIÇÃO EM DUAS COLUNAS (PAINEL DIVIDIDO) */}
      <div style={styles.splitLayout}>
        
        {/* COLUNA ESQUERDA: LISTA E PESQUISA */}
        <div style={styles.sidebarSection}>
          <div style={styles.searchContainer}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Pesquisar estudante..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          <div style={styles.listContainer}>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((s, idx) => {
                const avg = getAverage(s.name);
                const statusInfo = getStatus(avg);
                const isSelected = selected && (selected._id === s._id || selected.name === s.name);

                return (
                  <div
                    key={s._id || idx}
                    onClick={() => setSelected(s)}
                    style={{
                      ...styles.studentListItem,
                      borderLeft: isSelected ? "4px solid #2563EB" : "4px solid transparent",
                      background: isSelected ? "#EFF6FF" : "#FFFFFF"
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <h4 style={styles.studentName}>{s.name}</h4>
                      <p style={styles.studentCourse}>{s.course}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ ...styles.miniBadge, background: statusInfo.bg, color: statusInfo.color }}>
                        Média: {avg}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p style={styles.emptyText}>Nenhum aluno cadastrado ou localizado.</p>
            )}
          </div>
        </div>

        {/* COLUNA DIREITA: VISUALIZAÇÃO DO BOLETIM OFICIAL */}
        <div style={styles.previewSection}>
          {selected ? (
            <div style={styles.reportSheet}>
              {/* TIMBRE DO BOLETIM */}
              <div style={styles.reportHeader}>
                <div>
                  <span style={styles.institutionTag}>INSTITUTO MÉDIO POLITÉCNICO</span>
                  <h2 style={styles.reportTitle}>BOLETIM DE NOTAS OFICIAL</h2>
                  <p style={styles.reportDocId}>ID do Processo: #{selected._id ? selected._id.substring(0, 8).toUpperCase() : "INTERNO"}</p>
                </div>
                <div style={styles.stampBox}>IMPTEL</div>
              </div>

              {/* DADOS CADASTRAIS DO ESTUDANTE */}
              <div style={styles.studentMetaGrid}>
                <div>
                  <span style={styles.metaLabel}>NOME DO ALUNO</span>
                  <p style={styles.metaValue}>{selected.name}</p>
                </div>
                <div>
                  <span style={styles.metaLabel}>CURSO TÉCNICO</span>
                  <p style={styles.metaValue}>{selected.course}</p>
                </div>
              </div>

              {/* TABELA DE NOTAS POR DISCIPLINA */}
              <h4 style={styles.sectionDividerTitle}>📝 Aproveitamento por Componente Curricular</h4>
              <table style={styles.reportTable}>
                <thead>
                  <tr style={styles.reportThRow}>
                    <th style={styles.rTh}>Disciplina / Módulo</th>
                    <th style={{ ...styles.rTh, textAlign: "center" }}>Classificação</th>
                    <th style={styles.rTh}>Situação</th>
                  </tr>
                </thead>
                <tbody>
                  {getStudentGrades(selected.name).length > 0 ? (
                    getStudentGrades(selected.name).map((g, idx) => {
                      const isPositive = Number(g.value) >= 10;
                      return (
                        <tr key={g._id || idx} style={styles.reportTdRow}>
                          <td style={styles.rTd}>{g.subject}</td>
                          <td style={{ ...styles.rTd, textAlign: "center", fontWeight: "700", color: isPositive ? "#10B981" : "#EF4444" }}>
                            {Number(g.value).toFixed(1)}
                          </td>
                          <td style={styles.rTd}>
                            <span style={{ color: isPositive ? "#059669" : "#DC2626", fontWeight: "600" }}>
                              {isPositive ? "Apto" : "Não Apto"}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="3" style={styles.emptyTd}>Nenhuma avaliação processada para este aluno.</td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* QUADRO DE SÍNTESE FINAL (MÉDIA E ASSIDUIDADE) */}
              <h4 style={styles.sectionDividerTitle}>📊 Resumo de Frequência e Aproveitamento Global</h4>
              <div style={styles.summaryContainer}>
                <div style={styles.summaryBlock}>
                  <span style={styles.metaLabel}>MÉDIA FINAL</span>
                  <h3 style={{ ...styles.summaryBigValue, color: getStatus(getAverage(selected.name)).color }}>
                    {getAverage(selected.name)}
                  </h3>
                  <span style={{
                    ...styles.statusBadge,
                    background: getStatus(getAverage(selected.name)).bg,
                    color: getStatus(getAverage(selected.name)).color
                  }}>
                    {getStatus(getAverage(selected.name)).label}
                  </span>
                </div>
                <div style={styles.summaryBlock}>
                  <span style={styles.metaLabel}>ASSIDUIDADE (PRESENÇAS)</span>
                  <h3 style={styles.summaryBigValue}>{getAttendanceStats(selected.name).taxa}</h3>
                  <span style={styles.attendanceDetailText}>
                    ✔️ {getAttendanceStats(selected.name).pres} Presenças | ❌ {getAttendanceStats(selected.name).faltas} Faltas
                  </span>
                </div>
              </div>

              {/* RODAPÉ DO DOCUMENTO */}
              <div style={styles.reportFooter}>
                <div style={styles.signatureLine}>A Direção Pedagógica</div>
                <button onClick={() => setSelected(null)} style={styles.clearSelectionBtn}>
                  Fechar Visualização
                </button>
              </div>

            </div>
          ) : (
            <div style={styles.emptyStateContainer}>
              <div style={styles.emptyStateIcon}>📋</div>
              <h3>Nenhum boletim selecionado</h3>
              <p>Escolha um estudante na barra lateral esquerda para processar e visualizar as pautas oficiais.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

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
  splitLayout: {
    display: "grid",
    gridTemplateColumns: "350px 1fr",
    gap: "30px",
    alignItems: "start",
  },
  sidebarSection: {
    background: "#FFFFFF",
    borderRadius: "16px",
    padding: "20px",
    border: "1px solid #E2E8F0",
    boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    background: "#F1F5F9",
    padding: "10px 14px",
    borderRadius: "10px",
    marginBottom: "15px",
  },
  searchIcon: {
    marginRight: "8px",
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
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxHeight: "65vh",
    overflowY: "auto",
  },
  studentListItem: {
    padding: "12px 14px",
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "0.2s",
    border: "1px solid #F1F5F9",
  },
  studentName: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "600",
    color: "#0F172A",
  },
  studentCourse: {
    margin: "4px 0 0 0",
    fontSize: "12px",
    color: "#64748B",
  },
  miniBadge: {
    fontSize: "11px",
    fontWeight: "700",
    padding: "4px 8px",
    borderRadius: "6px",
  },
  previewSection: {
    minHeight: "75vh",
  },
  reportSheet: {
    background: "#FFFFFF",
    borderRadius: "16px",
    padding: "40px",
    border: "1px solid #E2E8F0",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.01)",
    position: "relative",
  },
  reportHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottom: "2px solid #0F172A",
    paddingBottom: "20px",
    marginBottom: "25px",
  },
  institutionTag: {
    fontSize: "11px",
    fontWeight: "800",
    color: "#2563EB",
    letterSpacing: "1px",
  },
  reportTitle: {
    margin: "4px 0 0 0",
    fontSize: "22px",
    fontWeight: "800",
    color: "#0F172A",
  },
  reportDocId: {
    margin: "4px 0 0 0",
    fontSize: "12px",
    color: "#94A3B8",
    fontFamily: "monospace",
  },
  stampBox: {
    border: "2px dashed #94A3B8",
    padding: "10px 18px",
    borderRadius: "8px",
    color: "#94A3B8",
    fontWeight: "bold",
    fontSize: "14px",
    transform: "rotate(-5deg)",
  },
  studentMetaGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    background: "#F8FAFC",
    padding: "16px 20px",
    borderRadius: "12px",
    border: "1px solid #E2E8F0",
    marginBottom: "25px",
  },
  metaLabel: {
    fontSize: "11px",
    fontWeight: "600",
    color: "#64748B",
    display: "block",
    marginBottom: "4px",
  },
  metaValue: {
    margin: 0,
    fontSize: "15px",
    fontWeight: "700",
    color: "#0F172A",
  },
  sectionDividerTitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#475569",
    margin: "0 0 12px 0",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  reportTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "30px",
  },
  reportThRow: {
    background: "#F1F5F9",
  },
  rTh: {
    padding: "12px 16px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#475569",
    textAlign: "left",
  },
  reportTdRow: {
    borderBottom: "1px solid #E2E8F0",
  },
  rTd: {
    padding: "14px 16px",
    fontSize: "14px",
    color: "#334155",
  },
  emptyTd: {
    padding: "20px",
    textAlign: "center",
    color: "#94A3B8",
  },
  summaryContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "40px",
  },
  summaryBlock: {
    border: "1px solid #E2E8F0",
    borderRadius: "12px",
    padding: "20px",
    textAlign: "center",
    background: "#F8FAFC",
  },
  summaryBigValue: {
    margin: "5px 0",
    fontSize: "32px",
    fontWeight: "800",
  },
  statusBadge: {
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    display: "inline-block",
  },
  attendanceDetailText: {
    fontSize: "12px",
    color: "#64748B",
    fontWeight: "500",
  },
  reportFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #E2E8F0",
    paddingTop: "20px",
  },
  signatureLine: {
    borderTop: "1px solid #64748B",
    width: "200px",
    textAlign: "center",
    paddingTop: "6px",
    fontSize: "12px",
    color: "#64748B",
    fontWeight: "500",
  },
  clearSelectionBtn: {
    background: "#EF4444",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px",
  },
  emptyStateContainer: {
    background: "#FFFFFF",
    borderRadius: "16px",
    border: "1px dashed #CBD5E1",
    padding: "60px 40px",
    textAlign: "center",
    color: "#64748B",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "50vh",
  },
  emptyStateIcon: {
    fontSize: "40px",
    marginBottom: "15px",
    opacity: 0.7,
  },
  emptyText: {
    textAlign: "center",
    color: "#94A3B8",
    fontSize: "14px",
    padding: "20px",
  },
};
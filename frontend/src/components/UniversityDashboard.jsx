import React, { useEffect, useState } from "react";

export default function UniversityDashboard() {
  const [metrics, setMetrics] = useState({
    totalStudents: 0,
    totalCourses: 0,
    averageGrade: 0,
    attendanceRate: 100
  });

  useEffect(() => {
    async function loadDashboardMetrics() {
      try {
        const resStudents = await fetch("http://localhost:5000/students");
        const resCourses = await fetch("http://localhost:5000/courses");
        const resGrades = await fetch("http://localhost:5000/grades");
        const resAttendance = await fetch("http://localhost:5000/attendance");

        const students = resStudents.ok ? await resStudents.json() : [];
        const courses = resCourses.ok ? await resCourses.json() : [];
        const grades = resGrades.ok ? await resGrades.json() : [];
        const attendance = resAttendance.ok ? await resAttendance.json() : [];

        const totalStudents = students.length;
        const totalCourses = courses.length;

        const validGrades = grades.filter(g => g.value !== undefined);
        const averageGrade = validGrades.length > 0 
          ? (validGrades.reduce((acc, curr) => acc + curr.value, 0) / validGrades.length).toFixed(1)
          : 0;

        const totalCalls = attendance.length;
        const presents = attendance.filter(a => a.status === "Presente").length;
        const attendanceRate = totalCalls > 0 
          ? Math.round((presents / totalCalls) * 100) 
          : 100;

        setMetrics({ totalStudents, totalCourses, averageGrade, attendanceRate });
      } catch (err) {
        console.error("Erro ao carregar métricas do dashboard:", err);
      }
    }
    loadDashboardMetrics();
  }, []);

  return (
    <div style={styles.page}>
      
      {/* CABEÇALHO */}
      <div style={styles.pageHeader}>
        <h1 style={styles.title}>📊 Painel de Controle</h1>
        <p style={styles.subtitle}>Visão geral do rendimento académico e estatísticas em tempo real do IMPTEL.</p>
      </div>

      {/* CARTÕES INDICADORES SUPERIORES COM IMAGENS VETORIAIS REAIS */}
      <div style={styles.statsGrid}>
        
        {/* CARD 1: ALUNO */}
        <div style={styles.statCard}>
          <div style={styles.cardInfo}>
            <span style={styles.statLabel}>Total de Alunos</span>
            <h2 style={styles.statValue}>{metrics.totalStudents}</h2>
          </div>
          <div style={{ ...styles.cardIcon, background: "#EFF6FF" }}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"/>
              <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
            </svg>
          </div>
        </div>

        {/* CARD 2: CURSOS */}
        <div style={styles.statCard}>
          <div style={styles.cardInfo}>
            <span style={styles.statLabel}>Cursos Ativos</span>
            <h2 style={styles.statValue}>{metrics.totalCourses}</h2>
          </div>
          <div style={{ ...styles.cardIcon, background: "#F5F3FF" }}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6 2h14v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6 2z"/>
            </svg>
          </div>
        </div>

        {/* CARD 3: NOTAS */}
        <div style={styles.statCard}>
          <div style={styles.cardInfo}>
            <span style={styles.statLabel}>Média Global</span>
            <h2 style={{ ...styles.statValue, color: "#10B981" }}>{metrics.averageGrade} <span style={styles.valScale}>/20</span></h2>
          </div>
          <div style={{ ...styles.cardIcon, background: "#ECFDF5" }}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
        </div>

        {/* CARD 4: PRESENÇAS */}
        <div style={styles.statCard}>
          <div style={styles.cardInfo}>
            <span style={styles.statLabel}>Taxa de Presença</span>
            <h2 style={{ ...styles.statValue, color: "#F59E0B" }}>{metrics.attendanceRate}%</h2>
          </div>
          <div style={{ ...styles.cardIcon, background: "#FEF3C7" }}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ÁREA DOS GRÁFICOS INTACTA E ALINHADA */}
      <div style={styles.mainGrid}>
        
        <div style={styles.chartCard}>
          <h3 style={styles.cardTitle}>📈 Evolução e Rendimento Anual</h3>
          <p style={styles.cardDescription}>Gráfico estatístico de crescimento e aproveitamento dos alunos do IMPTEL.</p>
          
          <div style={styles.imageWrapper}>
            <svg viewBox="0 0 400 200" width="100%" height="100%">
              <defs>
                <linearGradient id="blueGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#EFF6FF" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="1"/>
                </linearGradient>
              </defs>
              <line x1="10" y1="20" x2="390" y2="20" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="10" y1="70" x2="390" y2="70" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="10" y1="120" x2="390" y2="120" stroke="#F1F5F9" strokeWidth="1" />
              <line x1="10" y1="170" x2="390" y2="170" stroke="#CBD5E1" strokeWidth="1.5" />
              
              <rect x="40" y="80" width="25" height="90" rx="4" fill="url(#blueGrad)" />
              <rect x="100" y="50" width="25" height="120" rx="4" fill="url(#blueGrad)" />
              <rect x="160" y="95" width="25" height="75" rx="4" fill="url(#blueGrad)" />
              <rect x="220" y="40" width="25" height="130" rx="4" fill="url(#blueGrad)" />
              <rect x="280" y="65" width="25" height="105" rx="4" fill="url(#blueGrad)" />
              <rect x="340" y="30" width="25" height="140" rx="4" fill="url(#blueGrad)" />

              <path d="M52 100 Q 112 40, 172 110 T 292 60 T 352 40" fill="none" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
              <circle cx="352" cy="40" r="4" fill="#F59E0B" />
            </svg>
          </div>
        </div>

        <div style={styles.chartCard}>
          <h3 style={styles.cardTitle}>🎯 Métrica de Frequência das Turmas</h3>
          <p style={styles.cardDescription}>Monitoramento visual da assiduidade diária nas salas de aula.</p>
          
          <div style={styles.imageWrapper}>
            <svg viewBox="0 0 400 200" width="100%" height="100%">
              <circle cx="200" cy="90" r="60" fill="none" stroke="#F1F5F9" strokeWidth="12"/>
              <circle cx="200" cy="90" r="60" fill="none" stroke="#10B981" strokeWidth="12" 
                strokeDasharray="377" strokeDashoffset="80" strokeLinecap="round" transform="rotate(-90 200 90)"/>
              
              <text x="200" y="98" textAnchor="middle" fontSize="24" fontWeight="800" fill="#0F172A">{metrics.attendanceRate}%</text>
              <text x="200" y="118" textAnchor="middle" fontSize="10" fontWeight="700" fill="#94A3B8" letterSpacing="0.5">PRESENÇAS</text>

              <circle cx="120" cy="175" r="5" fill="#10B981" />
              <text x="132" y="179" fontSize="11" fontWeight="600" fill="#475569">Regular</text>

              <circle cx="230" cy="175" r="5" fill="#F1F5F9" />
              <text x="242" y="179" fontSize="11" fontWeight="600" fill="#94A3B8">Ausente</text>
            </svg>
          </div>
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
    fontFamily: "system-ui, -apple-system, sans-serif",
    boxSizing: "border-box",
    width: "100%",
  },
  pageHeader: {
    marginBottom: "30px",
    marginTop: 0,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  title: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "700",
    color: "#0F172A",
    lineHeight: "1.2",
  },
  subtitle: {
    margin: 0,
    color: "#64748B",
    fontSize: "15px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
    width: "100%",
  },
  statCard: {
    background: "#FFFFFF",
    borderRadius: "16px",
    padding: "22px 24px",
    border: "1px solid #E2E8F0",
    boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box",
  },
  cardInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  statLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#64748B",
  },
  statValue: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "700",
    color: "#0F172A",
    lineHeight: "1",
  },
  valScale: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#94A3B8",
  },
  cardIcon: {
    width: "46px",
    height: "46px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "24px",
    width: "100%",
    alignItems: "stretch",
  },
  chartCard: {
    background: "#FFFFFF",
    borderRadius: "16px",
    padding: "24px",
    border: "1px solid #E2E8F0",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.01)",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
  },
  cardTitle: {
    margin: 0,
    fontSize: "17px",
    fontWeight: "700",
    color: "#1E293B",
  },
  cardDescription: {
    margin: "4px 0 20px 0",
    fontSize: "13px",
    color: "#64748B",
  },
  imageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: "10px",
    background: "#FCFDFE",
    borderRadius: "12px",
    border: "1px dashed #E2E8F0"
  },
};
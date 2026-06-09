import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const data = [
  { name: "Jan", alunos: 10, media: 12 },
  { name: "Fev", alunos: 20, media: 14 },
  { name: "Mar", alunos: 15, media: 13 },
  { name: "Abr", alunos: 25, media: 16 },
  { name: "Mai", alunos: 30, media: 17 },
  { name: "Jun", alunos: 35, media: 18 },
];

const UniversityDashboard = () => {
  const activities = [
    "Novo aluno registado",
    "Nota adicionada",
    "Presença atualizada",
    "Curso criado",
  ];

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Portal IMPTEL</h1>
          <p style={styles.subtitle}>Painel de controlo académico inteligente</p>
        </div>

        <div style={styles.actions}>
          <button style={styles.btnPrimary}>+ Adicionar Aluno</button>
          <button style={styles.btnSecondary}>Relatórios</button>
        </div>
      </header>

      {/* CARDS */}
      <div style={styles.cards}>
        <div style={styles.card}>
          <h3>Total de Alunos</h3>
          <p style={styles.cardValue}>124</p>
        </div>
        <div style={styles.card}>
          <h3>Cursos Ativos</h3>
          <p style={styles.cardValue}>4</p>
        </div>
        <div style={styles.card}>
          <h3>Média Global</h3>
          <p style={styles.cardValue}>14.5</p>
        </div>
        <div style={styles.cardHighlight}>
          <h3>Taxa de Presença</h3>
          <p style={styles.cardValueHighlight}>94%</p>
        </div>
      </div>

      {/* GRID */}
      <div style={styles.grid}>
        {/* GRÁFICO PRINCIPAL */}
        <div style={styles.panel}>
          <h3 style={styles.panelTitle}>Evolução Académica</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="alunos" stroke="#2563eb" strokeWidth={3} />
              <Line type="monotone" dataKey="media" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* PAINEL LATERAL */}
        <div style={styles.panel}>
          <h3 style={styles.panelTitle}>Atividades Recentes</h3>
          <ul style={styles.list}>
            {activities.map((act, index) => (
              <li key={index}>✔ {act}</li>
            ))}
          </ul>
          <div style={styles.quickActions}>
            <button style={styles.smallBtn}>Ver Alunos</button>
            <button style={styles.smallBtn}>Ver Notas</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: 20, background: "#F4F7FB", minHeight: "100vh", fontFamily: "Segoe UI, sans-serif" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  title: { margin: 0, fontSize: 28, color: "#0B1F3A" },
  subtitle: { margin: 0, color: "#6B7280" },
  actions: { display: "flex", gap: 10 },
  btnPrimary: { background: "#2563EB", color: "#fff", border: "none", padding: "10px 15px", borderRadius: 8, cursor: "pointer" },
  btnSecondary: { background: "#E5E7EB", border: "none", padding: "10px 15px", borderRadius: 8, cursor: "pointer" },
  cards: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 15, marginBottom: 20 },
  card: { background: "#fff", padding: 15, borderRadius: 12, boxShadow: "0 5px 15px rgba(0,0,0,0.05)" },
  cardHighlight: { background: "#2563EB", color: "#fff", padding: 15, borderRadius: 12 },
  cardValue: { fontSize: 20, fontWeight: 'bold' },
  cardValueHighlight: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  grid: { display: "grid", gridTemplateColumns: "2fr 1fr", gap: 15 },
  panel: { background: "#fff", padding: 15, borderRadius: 12, boxShadow: "0 5px 15px rgba(0,0,0,0.05)" },
  panelTitle: { marginBottom: 15 },
  list: { paddingLeft: 15, lineHeight: "28px", listStyleType: "none" },
  quickActions: { display: "flex", gap: 10, marginTop: 15 },
  smallBtn: { flex: 1, padding: 8, border: "none", borderRadius: 8, cursor: "pointer", background: "#F3F4F6" },
};

export default UniversityDashboard;
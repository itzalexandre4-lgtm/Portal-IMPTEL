import React, { useEffect, useState } from "react";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [open, setOpen] = useState(false);

  const loadData = async () => {
    try {
      const resS = await fetch("http://127.0.0.1:5000/students");
      if (resS.ok) setStudents(await resS.json());
      const resC = await fetch("http://127.0.0.1:5000/courses");
      if (resC.ok) setCourses(await resC.json());
    } catch (err) { console.error(err); }
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !course) return alert("Por favor, digite o Nome e selecione o Curso.");

    try {
      const response = await fetch("http://127.0.0.1:5000/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, course, email, phone }),
      });

      if (response.ok) {
        await loadData();
        setName(""); setCourse(""); setEmail(""); setPhone(""); setOpen(false);
      }
    } catch (err) { console.error(err); }
  };

  return (
    <div style={styles.page}>
      <div style={styles.pageHeader}>
        <h1 style={styles.title}>👨‍💻 Secretaria de Alunos</h1>
        <p style={styles.subtitle}>Gerenciamento de matrículas oficiais do IMPTEL.</p>
      </div>

      <div style={styles.actionBar}>
        <input
          type="text"
          placeholder="Pesquisar aluno..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <button style={styles.addBtn} onClick={() => setOpen(!open)}>
          {open ? "❌ Fechar" : "➕ Nova Matrícula"}
        </button>
      </div>

      {open && (
        <form onSubmit={handleSubmit} style={styles.formContainer}>
          <div style={styles.formGrid}>
            <input type="text" placeholder="Nome Completo" value={name} onChange={e => setName(e.target.value)} style={styles.input} />
            <select value={course} onChange={e => setCourse(e.target.value)} style={styles.select}>
              <option value="">-- Escolha o Curso Técnico --</option>
              {courses.map((c, i) => (
                <option key={c._id || i} value={c.name}>{c.name}</option>
              ))}
            </select>
            <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} style={styles.input} />
            <input type="text" placeholder="Telemóvel" value={phone} onChange={e => setPhone(e.target.value)} style={styles.input} />
          </div>
          <button type="submit" style={styles.saveBtn}>Finalizar Matrícula</button>
        </form>
      )}

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.theadRow}>
              <th style={styles.th}>Nome Completo</th>
              <th style={styles.th}>Curso Técnico</th>
              <th style={styles.th}>E-mail</th>
              <th style={styles.th}>Telemóvel</th>
            </tr>
          </thead>
          <tbody>
            {students.filter(s => s.name?.toLowerCase().includes(searchTerm.toLowerCase())).map((s, i) => (
              <tr key={s._id || i} style={styles.tableRow}>
                <td style={{ ...styles.td, fontWeight: "600" }}>{s.name}</td>
                <td style={styles.td}><span style={styles.courseBadge}>{s.course}</span></td>
                <td style={styles.td}>{s.email || "---"}</td>
                <td style={styles.td}>{s.phone || "---"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "30px", background: "#F8FAFC", minHeight: "100vh", fontFamily: "system-ui, sans-serif" },
  pageHeader: { marginBottom: "25px" },
  title: { margin: 0, fontSize: "26px", color: "#0F172A", fontWeight: "700" },
  subtitle: { margin: "5px 0 0 0", color: "#64748B" },
  actionBar: { display: "flex", justifyContent: "space-between", marginBottom: "25px" },
  searchInput: { padding: "12px", borderRadius: "10px", border: "1px solid #CBD5E1", width: "100%", maxWidth: "350px", outline: "none" },
  addBtn: { background: "#2563EB", color: "white", border: "none", padding: "12px 20px", borderRadius: "10px", cursor: "pointer", fontWeight: "600" },
  formContainer: { background: "#FFF", padding: "20px", borderRadius: "12px", border: "1px solid #E2E8F0", marginBottom: "25px" },
  formGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px", marginBottom: "15px" },
  input: { width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", boxSizing: "border-box", outline: "none" },
  select: { width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1", boxSizing: "border-box", background: "#FFF", outline: "none" },
  saveBtn: { background: "#10B981", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "600" },
  tableWrapper: { background: "#FFF", borderRadius: "12px", border: "1px solid #E2E8F0", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" },
  theadRow: { background: "#F8FAFC", borderBottom: "1px solid #E2E8F0" },
  th: { padding: "14px 20px", color: "#64748B", fontWeight: "600" },
  tableRow: { borderBottom: "1px solid #F1F5F9" },
  td: { padding: "14px 20px", color: "#334155" },
  courseBadge: { background: "#EFF6FF", color: "#2563EB", padding: "4px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: "600" }
};
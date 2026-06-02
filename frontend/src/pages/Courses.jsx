import React, { useEffect, useState } from "react";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("3 Anos");
  const [coordinator, setCoordinator] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  const loadData = async () => {
    try {
      const resC = await fetch("http://127.0.0.1:5000/courses");
      if (resC.ok) setCourses(await resC.json());
      const resS = await fetch("http://127.0.0.1:5000/students");
      if (resS.ok) setStudents(await resS.json());
    } catch (err) { console.error(err); }
  };

  useEffect(() => { loadData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !coordinator) return alert("Preencha o Nome do Curso e o Coordenador.");

    try {
      const response = await fetch("http://127.0.0.1:5000/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, duration, coordinator, description }),
      });
      if (response.ok) {
        await loadData();
        setName(""); setCoordinator(""); setDescription(""); setOpen(false);
      }
    } catch (err) { console.error(err); }
  };

  return (
    <div style={styles.page}>
      <div style={styles.pageHeader}>
        <h1 style={styles.title}>📚 Cursos Técnicos</h1>
        <p style={styles.subtitle}>Gestão de especialidades e coordenação do IMPTEL.</p>
      </div>

      <div style={styles.actionBar}>
        <input
          type="text"
          placeholder="Pesquisar curso..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <button style={styles.addBtn} onClick={() => setOpen(!open)}>
          {open ? "❌ Fechar" : "➕ Novo Curso"}
        </button>
      </div>

      {open && (
        <form onSubmit={handleSubmit} style={styles.formContainer}>
          <div style={styles.formGrid}>
            <input type="text" placeholder="Nome do Curso" value={name} onChange={e => setName(e.target.value)} style={styles.input} />
            <input type="text" placeholder="Coordenador" value={coordinator} onChange={e => setCoordinator(e.target.value)} style={styles.input} />
            <select value={duration} onChange={e => setDuration(e.target.value)} style={styles.select}>
              <option value="3 Anos">3 Anos (Médio Técnico)</option>
              <option value="4 Anos">4 Anos</option>
            </select>
            <input type="text" placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} style={styles.input} />
          </div>
          <button type="submit" style={styles.saveBtn}>Salvar Especialidade</button>
        </form>
      )}

      <div style={styles.coursesGrid}>
        {courses.filter(c => c.name?.toLowerCase().includes(searchTerm.toLowerCase())).map((c, i) => (
          <div key={c._id || i} style={styles.courseCard}>
            <div style={styles.cardHeader}>
              <span style={styles.durationTag}>{c.duration}</span>
              <span style={styles.badge}>👤 {students.filter(s => s.course === c.name).length} Alunos</span>
            </div>
            <h3 style={styles.courseName}>{c.name}</h3>
            <p style={styles.courseDesc}>{c.description || "Sem descrição disponível."}</p>
            <div style={styles.cardFooter}>
              <span style={styles.coordLabel}>COORDENAÇÃO</span>
              <span style={styles.coordName}>💼 {c.coordinator}</span>
            </div>
          </div>
        ))}
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
  coursesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" },
  courseCard: { background: "#FFF", padding: "20px", borderRadius: "12px", border: "1px solid #E2E8F0" },
  cardHeader: { display: "flex", justifyContent: "space-between", marginBottom: "12px" },
  durationTag: { background: "#EFF6FF", color: "#2563EB", padding: "3px 8px", borderRadius: "12px", fontSize: "12px", fontWeight: "700" },
  badge: { background: "#F1F5F9", color: "#475569", padding: "3px 8px", borderRadius: "8px", fontSize: "12px" },
  courseName: { margin: "0 0 8px 0", fontSize: "18px", color: "#0F172A" },
  courseDesc: { margin: "0 0 15px 0", fontSize: "14px", color: "#64748B" },
  cardFooter: { borderTop: "1px solid #F1F5F9", paddingTop: "12px", display: "flex", flexDirection: "column" },
  coordLabel: { fontSize: "10px", color: "#94A3B8", fontWeight: "700" },
  coordName: { fontSize: "13px", color: "#334155", fontWeight: "600" }
};
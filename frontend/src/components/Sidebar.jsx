import React from "react";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ClipboardList,
  CalendarDays,
  GraduationCap,
} from "lucide-react";

export default function Sidebar({ page, setPage, open, setOpen }) {
  // Corrigido: Associando os ícones importados aos itens correspondentes
  const menu = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      key: "students",
      label: "Alunos",
      icon: <Users size={20} />,
    },
    {
      key: "courses",
      label: "Cursos Técnicos",
      icon: <BookOpen size={20} />,
    },
    {
      key: "grades",
      label: "Notas",
      icon: <ClipboardList size={20} />,
    },
    {
      key: "attendance",
      label: "Presenças",
      icon: <CalendarDays size={20} />,
    },
    {
      key: "report",
      label: "Boletim",
      icon: <GraduationCap size={20} />,
    },
  ];

  return (
    <div
      style={{
        ...styles.sidebar,
        width: open ? 270 : 85,
      }}
    >
      {/* LOGO e TOGGLE (Corrigido o fechamento das divs) */}
      <div style={styles.header}>
        {open && (
          <div>
            <h1 style={styles.logo}>IMPTEL</h1>
            <p style={styles.logoSub}>Gestão Académica</p>
          </div>
        )}
        <button onClick={() => setOpen(!open)} style={styles.toggle}>
          ☰
        </button>
      </div>

      {/* MENU */}
      <div style={styles.menu}>
        {menu.map((item) => (
          <button
            key={item.key}
            onClick={() => setPage(item.key)}
            style={{
              ...styles.item,
              background: page === item.key ? "#2563EB" : "transparent",
              justifyContent: open ? "flex-start" : "center", // Centraliza o ícone se o menu estiver fechado
            }}
          >
            {item.icon}
            {open && <span>{item.label}</span>}
          </button>
        ))}
      </div>

      {/* PERFIL */}
      <div style={styles.profile}>
        <div style={styles.avatar}>A</div>
        {open && (
          <div>
            <div style={styles.profileName}>Administrador</div>
            <div style={styles.profileRole}>Direção Escolar</div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    background: "#0B1F3A",
    color: "#fff",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    transition: "0.3s",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 15px",
  },
  logo: {
    margin: 0,
    fontSize: 24,
    fontWeight: "700",
  },
  logoSub: {
    margin: 0,
    fontSize: 12,
    opacity: 0.7,
  },
  toggle: {
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: 20,
    cursor: "pointer",
  },
  menu: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    flex: 1,
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: 14,
    border: "none",
    borderRadius: 12,
    color: "white",
    cursor: "pointer",
    fontSize: 15,
    transition: "0.2s",
  },
  profile: {
    padding: 15,
    display: "flex",
    alignItems: "center",
    gap: 10,
    borderTop: "1px solid rgba(255,255,255,0.1)",
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: "50%",
    background: "#2563EB",
    display: "flex",
    flexItems: "center",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 18,
    flexShrink: 0, // Evita que o avatar amasse quando fechar a barra
  },
  profileName: {
    fontWeight: "600",
    whiteSpace: "nowrap",
  },
  profileRole: {
    fontSize: 12,
    opacity: 0.7,
    whiteSpace: "nowrap",
  },
};
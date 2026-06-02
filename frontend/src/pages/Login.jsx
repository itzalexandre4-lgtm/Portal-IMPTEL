import React, { useState } from "react";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (!email || !password) {
      alert("Preencha o email e a password.");
      return;
    }

    setUser({
      name: "Administrador",
      email,
      role: "admin",
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🏫 Sistema de Gestão Escolar</h1>

        <p style={styles.subtitle}>
          Entre para aceder ao painel administrativo
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={login} style={styles.button}>
          Entrar
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#F4F7FB",
    padding: 20,
  },

  card: {
    width: 400,
    background: "#fff",
    padding: 30,
    borderRadius: 20,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },

  title: {
    margin: 0,
    textAlign: "center",
    color: "#0B1F3A",
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 10,
  },

  input: {
    padding: 12,
    borderRadius: 10,
    border: "1px solid #ccc",
    fontSize: 15,
  },

  button: {
    padding: 12,
    border: "none",
    borderRadius: 10,
    background: "#2563EB",
    color: "#fff",
    fontSize: 16,
    cursor: "pointer",
    fontWeight: "bold",
  },
};
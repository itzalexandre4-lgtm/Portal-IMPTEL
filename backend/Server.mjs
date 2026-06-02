const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ==========================================
// 1. MIDDLEWARES (Configurações de Rede)
// ==========================================
app.use(express.json());
app.use(cors()); // 🔥 Liberta o acesso para o React (Porta 5173) não ser bloqueado

// ==========================================
// 2. LIGAÇÃO AO BANCO DE DADOS (MongoDB)
// ==========================================
// Usando o IP direto 127.0.0.1 que é mais estável que 'localhost'
mongoose.connect("mongodb://127.0.0.1:27017/imptel")
  .then(() => console.log("💾 Base de dados IMPTEL conectada com sucesso ao MongoDB!"))
  .catch((err) => console.error("❌ Erro crítico ao conectar ao MongoDB:", err));

// ==========================================
// 3. MODELOS / SCHEMAS (Estrutura do Banco)
// ==========================================
const Course = mongoose.model("Course", new mongoose.Schema({
  name: String,
  duration: String,
  coordinator: String,
  description: String
}));

const Student = mongoose.model("Student", new mongoose.Schema({
  name: String,
  course: String,
  email: String,
  phone: String
}));

// ==========================================
// 4. ROTAS DA API (Exatamente o que o React chama)
// ==========================================

// --- ROTAS PARA CURSOS (Courses) ---
app.get("/courses", async (req, res) => {
  try {
    const allCourses = await Course.find();
    res.status(200).json(allCourses);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar cursos", details: err.message });
  }
});

app.post("/courses", async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(500).json({ error: "Erro ao salvar curso", details: err.message });
  }
});

// --- ROTAS PARA ALUNOS (Students) ---
app.get("/students", async (req, res) => {
  try {
    const allStudents = await Student.find();
    res.status(200).json(allStudents);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar alunos", details: err.message });
  }
});

app.post("/students", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ error: "Erro ao salvar aluno", details: err.message });
  }
});

// ==========================================
// 5. ARRANQUE DO SERVIDOR
// ==========================================
app.listen(5000, () => {
  console.log("🚀 ================================================");
  console.log("🚀 SERVIDOR DO IMPTEL ATIVO E RODANDO NA PORTA 5000");
  console.log("🚀 ================================================");
});
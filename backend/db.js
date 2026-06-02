import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "imptel",
});

db.connect((err) => {
  if (err) {
    console.log("Erro ao conectar MySQL");
    return;
  }

  console.log("MySQL conectado");
});

export default db;
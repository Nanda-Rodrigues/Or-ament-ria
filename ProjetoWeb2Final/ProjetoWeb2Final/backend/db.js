const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

// Garante que o diretório 'data' exista
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const dbPath = path.join(dataDir, "database.sqlite");

// Abre a conexão com o banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ ERRO DB: Falha ao abrir o banco de dados.", err.message);
  } else {
    console.log(`✅ DB Conectado: ${dbPath}`);

    // Cria a tabela 'lancamentos'
    db.run(
      `
            CREATE TABLE IF NOT EXISTS lancamentos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                descricao TEXT NOT NULL,
                valor REAL NOT NULL,
                tipo TEXT NOT NULL,
                data TEXT NOT NULL
            )
        `,
      (err) => {
        if (err) {
          console.error(
            "❌ ERRO DB: Falha ao criar a tabela 'lancamentos'.",
            err.message
          );
        } else {
          console.log("✔️ Tabela 'lancamentos' verificada/criada com sucesso.");
        }
      }
    );
  }
});

module.exports = db;

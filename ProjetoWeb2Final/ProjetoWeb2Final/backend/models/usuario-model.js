const path = require("path");
const db = require(path.join(__dirname, "..", "db"));

const UsuarioModel = {
  listarTransacoes: () => {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT * FROM lancamentos ORDER BY data DESC, id DESC",
        [],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  },

  criarLancamento: (lancamento) => {
    return new Promise((resolve, reject) => {
      const { descricao, valor, tipo, data } = lancamento;

      const sql = `INSERT INTO lancamentos (descricao, valor, tipo, data) VALUES (?, ?, ?, ?)`;
      const params = [descricao, valor, tipo, data];

      db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...lancamento });
        }
      });
    });
  },

  deletarLancamento: (id) => {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM lancamentos WHERE id = ?", [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  },

  calcularSaldo: () => {
    return new Promise((resolve, reject) => {
      const sql = `
                SELECT 
                    SUM(CASE WHEN tipo = 'entrada' THEN valor ELSE 0 END) AS entradas,
                    SUM(CASE WHEN tipo = 'saida' THEN valor ELSE 0 END) AS saidas,
                    SUM(CASE WHEN tipo = 'entrada' THEN valor ELSE -valor END) AS saldo
                FROM lancamentos;
            `;
      db.get(sql, [], (err, row) => {
        if (err) {
          reject(err);
        } else {
          // Garante que retorne 0 se a tabela estiver vazia
          resolve(row || { entradas: 0, saidas: 0, saldo: 0 });
        }
      });
    });
  },
};

module.exports = UsuarioModel;

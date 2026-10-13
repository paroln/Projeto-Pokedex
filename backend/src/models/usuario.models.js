const sql = require('../db/conexao');

function inserirUsuarios(nome_usuario, email, senha_hash){
    sql.prepare(`INSERT INTO usuarios (nome_usuario, email, senha_hash)
    VALUES (?, ?, ?)`
).run(nome_usuario, email, senha_hash);
}

module.exports = inserirUsuarios;
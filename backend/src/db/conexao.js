const banco = require('better-sqlite3');
const path = require('path');
const caminhoDoBanco = path.join(__dirname, 'pokedex.db');
const conexao = new banco(caminhoDoBanco);

conexao.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER,
    nome_usuario TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    senha_hash TEXT,
    PRIMARY KEY(id AUTOINCREMENT)
    )`
);

module.exports = conexao;
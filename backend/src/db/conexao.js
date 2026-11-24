import banco from 'better-sqlite3';
import path from 'path';

const caminhoDoBanco = path.join(import.meta.dirname, 'pokedex.db');
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

export default conexao;
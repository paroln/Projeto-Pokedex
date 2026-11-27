import banco from 'better-sqlite3';
import path from 'path';

const caminhoDoBanco = path.join(import.meta.dirname, 'pokedex.db');
const conexao = new banco(caminhoDoBanco);
conexao.pragma('foreign_keys = ON');

conexao.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER,
        nome_usuario TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        senha_hash TEXT,
        PRIMARY KEY(id AUTOINCREMENT)
    );

    CREATE TABLE IF NOT EXISTS favoritos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    pokemon_id INTEGER NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    UNIQUE (usuario_id, pokemon_id)

    );
`);
  
export default conexao;
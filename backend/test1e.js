import conexao from './src/db/conexao.js';

conexao.prepare(`
    INSERT INTO favoritos (usuario_id, pokemon_id)
    VALUES (?, ?)
`).run(999, 25);
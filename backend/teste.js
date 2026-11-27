
import conexao from "./src/db/conexao.js"

conexao.prepare(`
    INSERT INTO favoritos (usuario_id, pokemon_id)
    VALUES (?, ?)
`).run(1, 25);

conexao.prepare(`
    INSERT INTO favoritos (usuario_id, pokemon_id)
    VALUES (?, ?)
`).run(1, 25);

console.log(
    conexao.prepare('SELECT id, nome_usuario FROM usuarios').all()
);
import conexao from '../db/conexao.js';

function adicionarFavorito(usuario_id, pokemon_id) {
    conexao.prepare(`
        INSERT INTO favoritos (usuario_id, pokemon_id)
        VALUES (?, ?)
    `).run(usuario_id, pokemon_id);
}

function buscarFavoritos(usuario_id){
    return conexao.prepare(`SELECT * FROM favoritos WHERE usuario_id = ?`).all(usuario_id)
}

function removerFavoritos(usuario_id, pokemon_id){
    return conexao.prepare(`DELETE FROM favoritos WHERE usuario_id = ? AND pokemon_id = ?`).run(usuario_id, pokemon_id)
}

export { adicionarFavorito, buscarFavoritos, removerFavoritos };
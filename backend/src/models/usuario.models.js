import conexao from '../db/conexao.js';

function inserirUsuarios(nome_usuario, email, senha_hash){
    conexao.prepare(`INSERT INTO usuarios (nome_usuario, email, senha_hash)
    VALUES (?, ?, ?)`
).run(nome_usuario, email, senha_hash);
}

function buscarUsuarioPorEmail(email){
    return conexao.prepare(`SELECT * FROM usuarios WHERE email = ?`).get(email);
}



export {inserirUsuarios, buscarUsuarioPorEmail}
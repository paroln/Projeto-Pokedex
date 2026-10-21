const URL_BACKEND = 'http://localhost:3000/api';

export async function cadastrarUsuario(nome_usuario, email, senha) {
    const resposta = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome_usuario, email, senha })
    });
    const dados = await resposta.json();
    if (!resposta.ok) throw new Error(dados.erro);
    
    return dados;
}
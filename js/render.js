const historico = [];

export const  mostrarPoke = (dados)=>{
    const hp = document.getElementById('hp');
    const tipo = document.getElementById('tipo');
    const dano = document.getElementById('ataque');
    const vel = document.getElementById('velocidade');
    const imagem = document.getElementById('imagem-poke');

    tipo.textContent = dados.types[0].type.name;
    hp.textContent = dados.stats[0].base_stat;
    vel.textContent = dados.stats[5].base_stat;
    dano.textContent = dados.stats[1].base_stat;
    imagem.src = dados.sprites.front_default;
}

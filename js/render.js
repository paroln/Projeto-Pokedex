const historico = [];
export let pokemonAtual = null;

export const  mostrarPoke = (dados)=>{
    pokemonAtual = dados;

    const nome = document.getElementById('nome')
    const hp = document.getElementById('hp');
    const tipo = document.getElementById('tipo');
    const dano = document.getElementById('ataque');
    const vel = document.getElementById('velocidade');
    const imagem = document.getElementById('imagem-poke');
    
    nome.textContent = dados.name;
    tipo.textContent = dados.types[0].type.name;
    hp.textContent = dados.stats[0].base_stat;
    vel.textContent = dados.stats[5].base_stat;
    dano.textContent = dados.stats[1].base_stat;
    imagem.src = dados.sprites.front_default;
}

export const renderizarFavoritos = (favoritos) => {
        
    const pokeFavoritos = document.getElementById('lista-favoritos');
    pokeFavoritos.innerHTML = "";

    favoritos.forEach(pokemon => {
        const card = document.createElement('div');
        const nomeFav = document.createElement('p');
        const imgFav = document.createElement('img');

        card.classList.add('card-favorito');

        nomeFav.textContent = pokemon.name;
        imgFav.src = pokemon.sprites.front_default;

        card.appendChild(nomeFav);
        card.appendChild(imgFav);
        pokeFavoritos.appendChild(card);

        
    });

};
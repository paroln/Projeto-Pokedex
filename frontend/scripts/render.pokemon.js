const elementsPokemon = {
    id: document.getElementById('pokemon-number'),
    name: document.getElementById('pokemon-name'),
    image: document.getElementById('pokemon-image'),
    types: document.getElementById('pokemon-types'),
    height: document.getElementById('pokemon-height'),
    weight: document.getElementById('pokemon-weight'),
    abilities: document.getElementById('pokemon-abilities'),
    statsList: document.getElementById('pokemon-stats-list'),
    evolutions: document.getElementById('pokemon-evolution-list')
};

const typeSprites = {
    normal: 1,
    fighting: 2,
    flying: 3,
    poison: 4,
    ground: 5,
    rock: 6,
    bug: 7,
    ghost: 8,
    steel: 9,
    fire: 10,
    water: 11,
    grass: 12,
    electric: 13,
    psychic: 14,
    ice: 15,
    dragon: 16,
    dark: 17,
    fairy: 18
}

export function renderPokeHeader(pokemon){
    elementsPokemon.name.textContent = pokemon.name.toUpperCase();
    elementsPokemon.id.textContent = `# ${String(pokemon.id).padStart(3, '0')}`;

    const animationSprite = pokemon.sprites.versions?.['generation-v']?.['black-white']?.animated?.front_default;
    const staticSprite = pokemon.sprites.front_default;

    elementsPokemon.image.src = animationSprite || staticSprite || '../assets/blastoise.png';
}


export function renderPokeTypes(pokemon){
    elementsPokemon.types.replaceChildren();
    
    pokemon.types.forEach((item) => {
        const typeName = item.type.name;
        const typeId = typeSprites[typeName];

        const typeImg = document.createElement('img');

        typeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-white/${typeId}.png`;

        elementsPokemon.types.appendChild(typeImg);
});
}

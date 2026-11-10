const elementsPokemon = {
    elId: document.getElementById('pokemon-number'),
    elName: document.getElementById('pokemon-name'),
    elImage: document.getElementById('pokemon-image'),
    elTypes: document.getElementById('pokemon-types'),
    elHeight: document.getElementById('pokemon-height'),
    elWeight: document.getElementById('pokemon-weight'),
    elAbilities: document.getElementById('pokemon-abilities'),
    elStatsList: document.getElementById('pokemon-stats-list'),
    elEvolutions: document.getElementById('pokemon-evolution-list'),
    elStatHp: document.getElementById('stat-hp'),
    elStatAttack: document.getElementById('stat-attack'),
    elStatDefense: document.getElementById('stat-defense'),
    elStatSpecialAttack: document.getElementById('stat-special-attack'),
    elStatSpecialDefense: document.getElementById('stat-special-defense'),
    elStatSpeed: document.getElementById('stat-speed')
};

const statElements = {
    hp: elementsPokemon.elStatHp,
    attack: elementsPokemon.elStatAttack,
    defense: elementsPokemon.elStatDefense,
    'special-attack': elementsPokemon.elStatSpecialAttack,
    'special-defense': elementsPokemon.elStatSpecialDefense,
    speed: elementsPokemon.elStatSpeed
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
    elementsPokemon.elName.textContent = pokemon.name.toUpperCase();
    elementsPokemon.elId.textContent = `# ${String(pokemon.id).padStart(3, '0')}`;

    const animationSprite = pokemon.sprites.versions?.['generation-v']?.['black-white']?.animated?.front_default;
    const staticSprite = pokemon.sprites.front_default;

    elementsPokemon.elImage.src = animationSprite || staticSprite || '../assets/blastoise.png';
}


export function renderPokeTypes(pokemon){
    elementsPokemon.elTypes.replaceChildren();

    pokemon.types.forEach((item) => {
        const typeName = item.type.name;
        const typeId = typeSprites[typeName];

        const typeImg = document.createElement('img');

        typeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-white/${typeId}.png`;

        elementsPokemon.elTypes.appendChild(typeImg);
});
}

export function renderPokemonDetails(pokemon){

    elementsPokemon.elAbilities.replaceChildren();
    const pokeHeight = pokemon.height / 10;
    const pokeWeight = pokemon.weight / 10;


    elementsPokemon.elHeight.textContent = `${pokeHeight}`;
    elementsPokemon.elWeight.textContent = `${pokeWeight}`;

    pokemon.abilities.forEach((item )=>{
        const abilityName = item.ability.name;
        const abilityList = document.createElement('li');

        elementsPokemon.elAbilities.appendChild(abilityList);
        abilityList.textContent = abilityName;


    })
    pokemon.stats.forEach((item) => {
        const statName = item.stat.name;
        const statValue = item.base_stat;

        statElements[statName].textContent = statValue;
    });
}
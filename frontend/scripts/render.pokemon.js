export const elementsPokemon = {
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
    elStatSpeed: document.getElementById('stat-speed'),
    elPreviousEvolution: document.getElementById('btn-previous-evolution'),
    elNextEvolution: document.getElementById('btn-next-evolution'),
    elFavoritesList: document.getElementById('favorites-list'),
    elFavoritesCount: document.getElementById('favorites-count'),
    elFavoritesEmpty: document.getElementById('favorites-empty'),
    elAddFavorite: document.getElementById('btn-add-favorite')
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
export const elementsModal = {
    elPokemonModal: document.getElementById('pokemon-modal'),
    elCloseModal: document.getElementById('btn-close-modal'),
    elId: document.getElementById('modal-pokemon-number'),
    elName: document.getElementById('modal-pokemon-name'),
    elImage: document.getElementById('modal-pokemon-image'),
    elTypes: document.getElementById('modal-pokemon-types'),
    elBiography: document.getElementById('modal-pokemon-biography'),
    elHeight: document.getElementById('modal-pokemon-height'),
    elWeight: document.getElementById('modal-pokemon-weight'),
    elAbilities: document.getElementById('modal-pokemon-abilities'),
    elRemoveFavorite: document.getElementById('btn-remove-favorite'),
    elViewInPokedex: document.getElementById('btn-view-in-pokedex')
};

export function renderPokeHeader(pokemon, elements = elementsPokemon) {
    elements.elName.textContent = pokemon.name.toUpperCase();
    elements.elId.textContent = `# ${String(pokemon.id).padStart(3, '0')}`;

    const animationSprite = pokemon.sprites.versions?.['generation-v']?.['black-white']?.animated?.front_default;
    const staticSprite = pokemon.sprites.front_default;

    elements.elImage.src = animationSprite || staticSprite || '../assets/blastoise.png';
}
export function renderPokeTypes(pokemon, elements = elementsPokemon) {
    elements.elTypes.replaceChildren();

    pokemon.types.forEach((item) => {
        const typeName = item.type.name;
        const typeId = typeSprites[typeName];

        const typeImg = document.createElement('img');

        typeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-v/black-white/${typeId}.png`;

        elements.elTypes.appendChild(typeImg);
    });
}
export function renderPokemonDetails(pokemon, elements = elementsPokemon) {
    elements.elAbilities.replaceChildren();

    const pokeHeight = pokemon.height / 10;
    const pokeWeight = pokemon.weight / 10;

    elements.elHeight.textContent = `${pokeHeight} m`;
    elements.elWeight.textContent = `${pokeWeight} kg`;

    pokemon.abilities.forEach((item) => {
        const abilityName = item.ability.name;
        const abilityList = document.createElement('li');

        abilityList.textContent = abilityName;
        elements.elAbilities.appendChild(abilityList);
    });

    if (elements === elementsPokemon) {
        pokemon.stats.forEach((item) => {
            const statName = item.stat.name;
            const statValue = item.base_stat;

            statElements[statName].textContent = statValue;
        });
    }
}
export function renderPokemonEvo(evolutions, index) {
    const elEvolutions = elementsPokemon.elEvolutions;

    elEvolutions.replaceChildren();
    const pokemon = evolutions[index];

    const animationSprite = pokemon.pokemonData.sprites.versions?.['generation-v']?.['black-white']?.animated?.front_default;
    const staticSprite = pokemon.pokemonData.sprites.front_default;

    const img = document.createElement('img');
    const name = document.createElement('div');

    name.textContent = pokemon.name;
    img.src = animationSprite || staticSprite;


    elEvolutions.appendChild(name);
    elEvolutions.appendChild(img);

    elementsPokemon.elPreviousEvolution.disabled = index === 0;

    elementsPokemon.elNextEvolution.disabled = index === evolutions.length - 1;
}

export function renderFavorites(favorites) {
    const elFavoritesList = elementsPokemon.elFavoritesList;

    elFavoritesList.replaceChildren();

    elementsPokemon.elFavoritesCount.textContent = favorites.length;

    elementsPokemon.elFavoritesEmpty.style.display =
        favorites.length === 0 ? 'block' : 'none';

    favorites.forEach(pokemon => {
        const card = document.createElement('div');
        const image = document.createElement('img');
        const number = document.createElement('span');
        const name = document.createElement('h3');
        number.classList.add('favorite-number');
        name.classList.add('favorite-name');

        card.classList.add('favorite-card');
        card.dataset.pokemonId = pokemon.id;
        image.src = pokemon.sprites.front_default;
        image.alt = pokemon.name;
        number.textContent = `#${pokemon.id}`;
        name.textContent = pokemon.name.toUpperCase();

        card.append(image, number, name);
        elFavoritesList.appendChild(card);
    });
}

export function renderPokemonModal(pokemon, biography) {
    renderPokeHeader(pokemon, elementsModal);
    renderPokeTypes(pokemon, elementsModal);
    renderPokemonDetails(pokemon, elementsModal);

    elementsModal.elBiography.textContent = biography;
    elementsModal.elPokemonModal.classList.add('active');
}
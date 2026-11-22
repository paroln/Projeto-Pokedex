
import { state } from './state.js';
import { getPokemons, getEvolutionChain, getPokemonBiography } from './service.pokemon.js';
import {
    renderPokeHeader,
    renderPokemonDetails,
    renderPokeTypes,
    renderPokemonEvo,
    elementsPokemon,
    elementsModal,
    renderPokemonModal,
    renderFavorites
} from './render.pokemon.js';

console.log('main.js carregado');

const telaLogin = document.getElementById('screen-login');
const telaPokedex = document.getElementById('screen-pokedex');
const botaoConvidado = document.getElementById('btn-guest');

function openPokedex() {
    telaLogin.classList.remove('active');
    telaPokedex.classList.add('active');

    loadPokemon(state.currentPokemonId);
}

botaoConvidado.addEventListener('click', openPokedex);

async function loadPokemon(idOrName) {
    try {
        const pokemon = await getPokemons(idOrName);

        if (!pokemon) {
            alert('Pokémon não encontrado!');
            return;
        }

        state.currentPokemonId = pokemon.id;
        state.currentPokemonData = pokemon;
        updateFavoriteButton();

        renderPokeHeader(pokemon);
        renderPokeTypes(pokemon);
        renderPokemonDetails(pokemon);

        const data = await getEvolutionChain(pokemon.id);

        state.evolutionChain = data.evolutions;
        state.currentEvolutionIndex = 0;

        renderPokemonEvo(
            state.evolutionChain,
            state.currentEvolutionIndex
        );

    } catch (error) {
        console.error('Erro ao carregar Pokémon:', error);
        alert('Não foi possível carregar os dados do Pokémon.');
    }
}

function nextEvolution() {
    if (state.currentEvolutionIndex < state.evolutionChain.length - 1) {
        state.currentEvolutionIndex++;

        renderPokemonEvo(
            state.evolutionChain,
            state.currentEvolutionIndex
        );
    }
}

function previousEvolution() {
    if (state.currentEvolutionIndex > 0) {
        state.currentEvolutionIndex--;

        renderPokemonEvo(
            state.evolutionChain,
            state.currentEvolutionIndex
        );
    }
}

elementsPokemon.elNextEvolution.addEventListener('click', nextEvolution);
elementsPokemon.elPreviousEvolution.addEventListener('click', previousEvolution);

const searchInput = document.getElementById('pokemon-search-input');
const searchButton = document.getElementById('btn-search-pokemon');

searchButton.addEventListener('click', () => {
    loadPokemon(searchInput.value);
});

const btnShowPokedex = document.getElementById('btn-show-pokedex');
const btnShowFavorites = document.getElementById('btn-show-favorites');

const pokedexView = document.getElementById('pokedex-view');
const favoritesView = document.getElementById('favorites-view');

function changeTab(tab) {
    const showFavorites = tab === 'favorites';

    pokedexView.classList.toggle('active', !showFavorites);
    favoritesView.classList.toggle('active', showFavorites);

    btnShowPokedex.classList.toggle('active', !showFavorites);
    btnShowFavorites.classList.toggle('active', showFavorites);
}
btnShowPokedex.addEventListener('click', () => {
    changeTab('pokedex');
    
});

btnShowFavorites.addEventListener('click', () => {
    changeTab('favorites');
    renderFavorites(state.favorites);
});



const btnAddFavorite = elementsPokemon.elAddFavorite


function toggleFavorite() {
    const pokemon = state.currentPokemonData;

    if (!pokemon) return;

    const favoriteIndex = state.favorites.findIndex(
        favorite => favorite.id === pokemon.id
    );

    if (favoriteIndex === -1) {
        state.favorites.push(pokemon);
    } else {
        state.favorites.splice(favoriteIndex, 1);
    }

    updateFavoriteButton();
    renderFavorites(state.favorites);
}


function updateFavoriteButton() {
    const pokemon = state.currentPokemonData;

    if (!pokemon) return;

    const isFavorite = state.favorites.some(
        favorite => favorite.id === pokemon.id
    );

    btnAddFavorite.classList.toggle('active', isFavorite);
    btnAddFavorite.textContent = isFavorite ? '★' : '☆';
}

btnAddFavorite.addEventListener('click', toggleFavorite);
async function openFavoriteDetails(event) {
    const card = event.target.closest('.favorite-card');

    if (!card) return;

    const pokemonId = Number(card.dataset.pokemonId);

    const pokemon = state.favorites.find(
        favorite => favorite.id === pokemonId
    );

    if (!pokemon) return;

    try {
        const biography = await getPokemonBiography(pokemon.id);

        renderPokemonModal(pokemon, biography);
        state.currentModalPokemon = pokemon;

    } catch (error) {
        console.error('Erro ao carregar biografia:', error);
        alert('Não foi possível carregar os detalhes do Pokémon.');
    }
}

elementsPokemon.elFavoritesList.addEventListener('click', openFavoriteDetails);

elementsModal.elCloseModal.addEventListener('click', () => {
    elementsModal.elPokemonModal.classList.remove('active');
});

function removeFavoriteFromModal() {
    const pokemon = state.currentModalPokemon;

    if (!pokemon) return;

    const favoriteIndex = state.favorites.findIndex(
        favorite => favorite.id === pokemon.id
    );

    if (favoriteIndex === -1) return;

    state.favorites.splice(favoriteIndex, 1);

    renderFavorites(state.favorites);
    updateFavoriteButton();

    elementsModal.elPokemonModal.classList.remove('active');

    state.currentModalPokemon = null;
}

function viewFavoriteInPokedex() {
    const pokemon = state.currentModalPokemon;

    if (!pokemon) return;

    elementsModal.elPokemonModal.classList.remove('active');
    state.currentModalPokemon = null;

    changeTab('pokedex');
    loadPokemon(pokemon.id);
}
elementsModal.elViewInPokedex.addEventListener(
    'click',
    viewFavoriteInPokedex
);
elementsModal.elRemoveFavorite.addEventListener(
    'click',
    removeFavoriteFromModal
);

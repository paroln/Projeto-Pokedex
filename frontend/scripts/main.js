
import { state } from './state.js';
import { getPokemons, getEvolutionChain } from './service.pokemon.js';
import {
    renderPokeHeader,
    renderPokemonDetails,
    renderPokeTypes,
    renderPokemonEvo,
    elementsPokemon
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
});
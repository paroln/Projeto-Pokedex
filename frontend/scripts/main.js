import { state } from './state.js';
import { searchPokemon } from './service.pokemon.js';
import { renderPokeHeader, renderPokemonDetails, renderPokeTypes} from './render.pokemon.js';

console.log('main.js carregado');
const telaLogin = document.getElementById('screen-login');
const telaPokedex = document.getElementById('screen-pokedex');
const botaoConvidado = document.getElementById('btn-guest');

function openPokedex() {
    telaLogin.classList.remove('active');
    telaPokedex.classList.add('active');
    console.log('botaocarregado carregado');
}


botaoConvidado.addEventListener('click', openPokedex);

async function loadPokemon(idOrName) {
    const pokemon = await searchPokemon(idOrName);

    if (!pokemon) {
        alert('Pokémon não encontrado!');
        return;
    }

    state.currentPokemonId = pokemon.id;
    state.currentPokemonData = pokemon;

    renderPokeHeader(pokemon);
    renderPokeTypes(pokemon);
    renderPokemonDetails(pokemon);
}

const campoPesquisa = document.getElementById('pokemon-search-input');
const botaoPesquisa = document.getElementById('btn-search-pokemon');

botaoPesquisa.addEventListener('click', () => {
    loadPokemon(campoPesquisa.value);
});
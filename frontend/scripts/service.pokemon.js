import { fetchPokemon } from "./api.pokemon.js";
import { fetchPokemonSpecies } from "./api.pokemon.species.js";

export async function searchPokemon(pokemon){
    const pokemonData = await fetchPokemon(pokemon);

    return pokemonData;


}

export async function searchPokemonSpecies(pokemon) {

    const pokemonDataSpecies = await fetchPokemonSpecies(pokemon);

    return pokemonDataSpecies;

    
}

function searchEvolution(pokemon, evolutions){
    const envolvesTo = pokemon.envolves_to;

    if(envolvesTo.length === 0){
        return;
    }
    
    envolvesTo.forEach(item => {
        evolutions.push(item.species.name);

        searchEvolution(item, evolutions);
        
    });
}
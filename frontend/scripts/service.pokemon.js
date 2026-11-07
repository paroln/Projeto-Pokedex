import { fetchPokemon } from "./api.pokemon.js";

export async function searchPokemon(pokemon){
    const pokemonData = await fetchPokemon(pokemon);

    return pokemonData;


}
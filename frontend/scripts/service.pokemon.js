import { fetchPokemon } from "./api.pokemon.js";
import { fetchPokemonSpecies } from "./api.pokemon.species.js";

export async function getPokemons(pokemon){
    const pokemonData = await fetchPokemon(pokemon);

    return pokemonData;


}

export async function getEvolutionChain(pokemon) {

    const pokemonDataSpecies = await fetchPokemonSpecies(pokemon);

    const evoChain = pokemonDataSpecies.evolutionChain.chain;
    const arrEvo = [];

    arrEvo.push({
        name: evoChain.species.name,
        url: evoChain.species.url
    });

    extractEvolutions(evoChain, arrEvo);

    for (const evolution of arrEvo) {   

    const pokemonData = await getEvolutionPokemonData(evolution);
    evolution.pokemonData = pokemonData;

}
    return {
        species: pokemonDataSpecies,
        evolutions: arrEvo
    }

    
}

function extractEvolutions(pokemon, evolutions){
    const evolvesTo = pokemon.evolves_to;
    if(evolvesTo.length === 0){
        return;
    }
    
    evolvesTo.forEach(item => {
        evolutions.push({
            name: item.species.name,
            url: item.species.url

        })

        extractEvolutions(item, evolutions);
        
    });
}

async function getEvolutionPokemonData(pokemon){

    const pokemonData = await fetchPokemon(pokemon.name);
    
    return pokemonData;
}
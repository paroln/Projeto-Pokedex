    export async function fetchPokemonSpecies(pokemon) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);

    if (!response.ok) {
        return null;
    }

    const data = await response.json();

    
    const evolutionResponse = await fetch (data.evolution_chain.url);
    
    if(!evolutionResponse.ok){
        return null;
    }

    const evolutionData = await evolutionResponse.json();

    return {
        species: data,
        evolutionChain: evolutionData
    }
}
    

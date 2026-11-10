    export async function fetchPokemonSpecies(pokemon) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);

    if (!response.ok) {
        return null;
    }

    const data = await response.json();

    return data;
}
    

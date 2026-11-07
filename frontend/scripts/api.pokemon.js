export async function fetchPokemon(pokemon) {

    const  pokemonTrated = String (pokemon).trim().toUpperCase();

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonTrated}`);

    if(!response.ok){
        return null;
    }

    const data = await response.json();
    return data;

    
}
export class ErroAoEncontrarPoke extends Error{};

export async function buscarPokemon(pokemon){
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    const resposta = await fetch(url);
    
    if(!resposta.ok){
        throw new ErroAoEncontrarPoke("Pokemon nao encontrado");
    }
    const dados = await resposta.json();
    return dados;
}

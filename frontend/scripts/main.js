import { searchPokemon } from "./service.pokemon.js";

console.log("Pokemon adicionado!");
const pokemon = await searchPokemon(100);
console.log(pokemon);
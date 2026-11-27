import { adicionarFavorito, buscarFavoritos, removerFavoritos } from '../models/favoritos.models.js'
import { ErroValidacao, ErroConflito } from '../errors/lancador.erro.js';

function favoritarPokemon(usuario_id, pokemon_id){
    if (!Number.isInteger(pokemon_id) || pokemon_id <= 0){
        throw new ErroValidacao('ID DO POKEMON INVALIDO');

    }
    if (!Number.isInteger(usuario_id) || usuario_id <= 0){
        throw new ErroValidacao ('ID DO USUARIO NAO ENCONTRADO')
    }
    try{
        adicionarFavorito(usuario_id, pokemon_id)
        } catch(erro){
            if(erro.code === 'SQLITE_CONSTRAINT_UNIQUE'){
            throw new ErroConflito('Pokemon ja favoritado!');
        }

        throw erro;

    }

}
function listarFavoritos(usuario_id) {
    if (!Number.isInteger(usuario_id) || usuario_id <= 0){
        throw new ErroValidacao ('ID DO USUARIO NAO ENCONTRADO');
    }

    return buscarFavoritos(usuario_id);
}

function desfavoritarPokemon(usuario_id, pokemon_id) {
    if (!Number.isInteger(pokemon_id) || pokemon_id <= 0){
        throw new ErroValidacao('ID DO POKEMON INVALIDO');

    }
    if (!Number.isInteger(usuario_id) || usuario_id <= 0){
        throw new ErroValidacao ('ID DO USUARIO NAO ENCONTRADO')
    }

    const resultado = removerFavoritos(usuario_id, pokemon_id);
    if (resultado.changes === 0 ){
        throw new ErroValidacao('Pokemon nao encontrado nos favoritos');
    }

    return resultado;
}   

export {favoritarPokemon, listarFavoritos, desfavoritarPokemon}
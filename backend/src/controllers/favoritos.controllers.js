import { favoritarPokemon, listarFavoritos, desfavoritarPokemon } from '../services/favoritos.service.js';
import { ErroConflito, ErroValidacao } from '../errors/lancador.erro.js';
function adicionar(req, res){
    try{
        const { usuario_id, pokemon_id } = req.body;

        favoritarPokemon(usuario_id, pokemon_id);
        res.status(201).json({
            mensagem: 'Pokemon adicionado aos favoritos'
        });

    } 
    catch(err){

        if(err instanceof ErroValidacao){
            res.status(400).json({
                erro: err.message
            });
        } else if (err instanceof ErroConflito){
            res.status(409).json({
                erro: err.message
            })
        } else {
            console.error(err);
            res.status(500).json({
                erro: 'Erro no sistema'
            })
        }

    }
}

function listar (req, res ){
    const usuario_id = Number(req.params.usuario_id);
    try{
        const resultado = listarFavoritos(usuario_id);
        res.status(200).json(resultado);

    }catch (err){
        if (err instanceof ErroValidacao){
            res.status(400).json({
                erro: err.message
            });

        } else {
            console.error(err);
            res.status(500).json({
                erro: 'Erro no sistema'
            });

        }
    }
}

function remover(req, res){
    try{
        const usuario_id = Number(req.params.usuario_id);
        const pokemon_id = Number(req.params.pokemon_id);

        desfavoritarPokemon(usuario_id, pokemon_id);
        res.status(200).json({
            mensagem: 'Pokemon removido dos favoritos!'
        })
    } catch(err){
          if (err instanceof ErroValidacao){
            res.status(400).json({
                erro: err.message
            });

        } else {
            console.error(err);
            res.status(500).json({
                erro: 'Erro no sistema'
            });

        }
    }
}
export {adicionar, listar, remover}
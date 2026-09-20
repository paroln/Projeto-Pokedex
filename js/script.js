import { buscarPokemon, ErroAoEncontrarPoke } from "./api.js";
import { mostrarPoke, salvarHistorico } from "./render.js";

const meuForm = document.getElementById('form-poke');
meuForm.addEventListener('submit', pesquisarPoke);



let telaJaTrocou = false;
document.addEventListener('keydown', function(evento){
    if(evento.code ==='Enter' && !telaJaTrocou){
        const telaIncial = document.getElementById('tela-inicial');
        const telaPokedex = document.getElementById('tela-pokedex');

        telaIncial.style.display = "none";
        telaPokedex.style.display = "block";
        telaJaTrocou = true;    
    }
});


async function pesquisarPoke(evento){
    evento.preventDefault();
    const pokemon = document.getElementById('pokemon').value.toLowerCase();

    try{
        const valor = await buscarPokemon(pokemon);
        mostrarPoke(valor);
        salvarHistorico(valor.name);
    }

    catch(erro){
        
        if(erro instanceof ErroAoEncontrarPoke){
            const campoPoke = document.getElementById('pokemon');
            campoPoke.value = "";
            campoPoke.placeholder = erro.message;
        } else{
            console.log(erro);
        }
        

    }

}
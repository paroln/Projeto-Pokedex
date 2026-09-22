import { buscarPokemon, ErroAoEncontrarPoke } from "./api.js";
import { mostrarPoke } from "./render.js";

    const meuForm = document.getElementById('form-poke');
    meuForm.addEventListener('submit', pesquisarPoke);


    let telaJaTrocou = false;
    let usuarioLog = false;

    function entrarConvidado(){
        if(usuarioLog === true) return;

        const telaLogin = document.getElementById('tela-login');
        const telaIncial = document.getElementById('tela-inicial');

        telaLogin.style.display = "none";
        telaIncial.style.display = "block";
        usuarioLog = true;
    }
        const botaoConvi = document.getElementById('btn-convidado');
        botaoConvi.addEventListener('click', entrarConvidado)
        

    function iniciarPokedex(){
        const telaIncial = document.getElementById('tela-inicial');
        const telaPokedex = document.getElementById('tela-pokedex');
        const som = new Audio('/assets/sons/musica-poke.mp3');
        som.play(); 
        telaIncial.style.display = "none";
        telaPokedex.style.display = "block"
        telaJaTrocou =  true;
    }

    document.addEventListener('keydown', function(evento){
        if(evento.code ==='Enter' && !telaJaTrocou && usuarioLog){
            iniciarPokedex();
    
        }
    });


    async function pesquisarPoke(evento){
        evento.preventDefault();

        const pokemon = document.getElementById('pokemon').value.toLowerCase();

        try{
            const valor = await buscarPokemon(pokemon);
            mostrarPoke(valor);
        }

        catch(erro){
            if(erro instanceof ErroAoEncontrarPoke){
                const campoPoke = document.getElementById('pokemon');
                campoPoke.value = "";
                campoPoke.placeholder = erro.message;
         }else{
            console.log(erro);
        }
        

    }

}
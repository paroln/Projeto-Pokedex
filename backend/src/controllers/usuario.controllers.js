import {cadastrarUsuario, autenticarUsuario} from "../services/usuarios.service.js";
import { ErroConflito, ErroValidacao } from "../errors/lancador.erro.js";

function registrar(req,res){

    const {nome_usuario, email, senha } = req.body;

    try{
        cadastrarUsuario(nome_usuario, email, senha);
        res.status(201).json({mensagem: 'Usuario cadastrado!'});

    } catch(erro) {
        if(erro instanceof ErroConflito){
            res.status(409).json({erro: erro.message});

        } else if(erro instanceof ErroValidacao){
            res.status(400).json({erro: erro.message});
        } else {
            console.error(erro);
            res.status(500).json({erro: 'Erro no sistema'});
        }
        
    }

}
function login(req, res){

    const {email, senha} = req.body;
    try{
        const usuario = autenticarUsuario(email, senha);
    
        res.status(200).json({
            mensagem: 'Login realizado com sucesso!',
            usuario: usuario
        });


    }catch(erro){
        if(erro instanceof ErroValidacao){
            res.status(400).json({erro: erro.message})
        } else {
            console.error(erro);
            res.status(500).json({erro: 'Erro no sistema'});
        }

    }


}
export {registrar, login}
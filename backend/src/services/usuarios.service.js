import { ErroValidacao, ErroConflito } from '../errors/lancador.erro.js';
import criptografia from 'bcryptjs';
import inserirUsuarios from '../models/usuario.models.js';

function cadastrarUsuario(nome_usuario, email, senha){
    if (!nome_usuario || !email || !senha) {
        throw new ErroValidacao('Preencha nome de usuário, email e senha');
    
    }
        
    const emailCad = email.trim().toLowerCase();
    const nomeCad = nome_usuario.trim();

    if(senha.length < 6 ){
        throw new ErroValidacao('A senha precisa possuir no minimo 6 caracteres');
    }

    const senha_hash = criptografia.hashSync(senha, 10);

    try{
        inserirUsuarios(nomeCad, emailCad, senha_hash);

    } catch(erro){
        if(erro.code === 'SQLITE_CONSTRAINT_UNIQUE'){
            throw new ErroConflito('Usuario ou email ja cadastrado');

        }else{
            throw erro;

        }

    }
}
    export default cadastrarUsuario;
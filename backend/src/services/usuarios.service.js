const criptografia = require('bcryptjs');
const inserirUsuarios = require('../models/usuario.models');

function cadastrarUsuario(nome_usuario, email, senha){
    const emailCad = email.trim().toLowerCase();

    if(senha.length < 6 ){
        throw new Error('A senha precisa possuir no minimo 6 caracteres');
    }
}

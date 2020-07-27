'use strict'

const repository = require('../repositories/usuario-repository');
const _repo = new repository();
const validation = require('../bin/helpers/validation');
const ctrlBase = require('../bin/base/controller-base');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const variables = require('../bin/configurations/variables');

function usuarioController() {

}

usuarioController.prototype.post = async (req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.nome, 'Informe seu nome');
    _validationContract.isRequired(req.body.email, 'Informe seu e-mail');
    _validationContract.isEmail(req.body.email, 'O e-mail informado é inválido');
    _validationContract.isRequired(req.body.senha, 'A senha informada é obrigatória');
    _validationContract.isRequired(req.body.senhaConfirmacao, 'A senha de confirmação é obrigatória');
    _validationContract.isTrue(req.body.senha != req.body.senhaConfirmacao, 'A senha e a confirmação não são iguais');
    

    let usuarioIsExiste = await _repo.IsEmailExite(req.body.email); 
    
    if (usuarioIsExiste) {
        _validationContract.isTrue((usuarioIsExiste.nome != undefined), `Já existe o email ${req.body.email} cadastrado em nossa base`);
    }
    
    if (req.body.senha) {
        // Criptografa a senha do usuário
        req.body.senha = md5(req.body.senha);
    }
        
    ctrlBase.post(_repo, _validationContract, req, res);
};

usuarioController.prototype.put = async (req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.nome, 'Informe seu nome');
    _validationContract.isRequired(req.body.email, 'Informe seu email');
    _validationContract.isEmail(req.body.email, 'O email informado é inválido');
    _validationContract.isRequired(req.params.id, "Informe o id do usuario que será editado")

    let usuarioIsExiste = await _repo.IsEmailExite(req.body.email);
    if (usuarioIsExiste) {
        _validationContract.isTrue(
            (usuarioIsExiste.nome != undefined) &&
            (usuarioIsExiste._id != req.params.id), `Já existe o email ${req.body.email} cadastrado em nossa base`);
    }

    ctrlBase.put(_repo, _validationContract, req, res);
};

usuarioController.prototype.get = async (req, res) => { 
    ctrlBase.get(_repo, req, res);
};

usuarioController.prototype.getById = async (req, res) => {
    ctrlBase.getById(_repo, req, res);
};

usuarioController.prototype.delete = async (req, res) => {
    ctrlBase.delete(_repo, req, res);
};

usuarioController.prototype.autenticar = async (req, res) => {

    let _validationContract = new validation();
    _validationContract.isRequired(req.body.email, 'Informe seu email');
    _validationContract.isEmail(req.body.email, 'O email informado é inválido');
    _validationContract.isRequired(req.body.senha, 'Informe sua senha');

    if (!_validationContract.isValid()) {
        res.status(400).send({ message: 'Não foi possível efetuar o login', validation: _validationContract.errors() });
        return;
    }

    let usuarioEncontrado = await _repo.authenticate(req.body.email, req.body.senha);
    if (usuarioEncontrado) {
        res.status(200).send({
            usuario: usuarioEncontrado,
            token: jwt.sign({ user: usuarioEncontrado }, variables.Security.secretyKey)
        })
    } else {
        res.status(404).send({ message: 'Usuário ou senha estão inválidos' });
    }

}



module.exports = usuarioController;

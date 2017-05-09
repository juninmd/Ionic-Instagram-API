var validate = require("node-validate");
var requestMessage = require('./requestMessageValidate.js');

module.exports = {
    validate: (user, error) => {
        var v = validate().isLength(user.EMAIL, 1, 'Necessário informar o login!')
            .isLength(user.SENHA, 1, 'Necessário informar a senha!')
            .isLength(user.NOME, 3, 'O nome precisa ter ao menos 3 caracteres');
        if (v.errors.length > 0) {
            error(requestMessage.send(v.errors));
        } else {
            error(null);
        }
    }
};
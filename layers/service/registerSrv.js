var usuarioRep = require('../repository/mysql/usuarioRep.js');

module.exports = {
    insert: (body) => {
        return usuarioRep.getById(body.EMAIL)
            .then(e => {
                if (e.length == 0) {
                    return usuarioRep.insert(body);
                }
                return Promise.reject({ message: { userMessage: 'Usuário já foi registrado!' }, statusCode: 400 });
            });
    }

}
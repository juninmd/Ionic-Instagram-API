var usuarioRep = require('../repository/mysql/usuarioRep.js');

module.exports = {
    get: (body) => {
        return usuarioRep.getById(body.EMAIL)
            .then(e => {
                if (e.length == 0) {
                    return { message: { userMessage: 'Usuário não encontrado!' }, statusCode: 404 };
                }
                let confere = body.SENHA == e[0].SENHA;
                delete e[0].SENHA;
                if (confere) {
                    return { content: e[0], statusCode: 200 }
                }
                return { message: { userMessage: 'Senha inválida!' }, statusCode: 401 };
            })
            .catch(err => {
                return { message: { userMessage: 'Falha ao efetuar login!', devMessage: err.toString() }, statusCode: 404 };
            });
    },
    insert: (body) => {
        return usuarioRep.insert(body);
    }

}
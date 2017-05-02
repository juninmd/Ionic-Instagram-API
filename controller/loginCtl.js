var loginSrv = require('../service/loginSrv.js');

module.exports = (server) => {
    server.route({
        method: 'GET',
        path: '/login',
        handler: (request, reply) => {
            let body = {
                IDUSUARIO: request.headers["usuario"],
                SENHA: request.headers["senha"]
            };
            loginSrv.get(body)
                .then(q => {
                    return reply(q).code(q.statusCode || 200);
                }).catch(err => {
                    return reply(err).code(q.statusCode || 500);
                });
        }
    });
}
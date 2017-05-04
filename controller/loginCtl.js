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
                    return reply(err).code(err.statusCode || 500);
                });
        }
    });

    server.route({
        method: 'POST',
        path: '/login',
        handler: (request, reply) => {
            loginSrv.insert(request.payload)
                .then(q => {
                    return reply(q).code(q.statusCode || 200);
                }).catch(err => {
                    return reply(err).code(err.statusCode || 500);
                });
        }
    });

}
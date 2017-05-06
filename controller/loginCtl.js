var loginSrv = require('../service/loginSrv.js');
var Joi = require('joi');

module.exports = (server) => {

    server.route({
        method: 'GET',
        path: '/login',
        config: {
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
            },
            validate: {
                headers: {
                    usuario: Joi.string().min(1).required(),
                    senha: Joi.string().min(1).max(140).required()
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/login',
        config: {
            handler: (request, reply) => {
                loginSrv.insert(request.payload)
                    .then(q => {
                        return reply(q).code(q.statusCode || 200);
                    }).catch(err => {
                        return reply(err).code(err.statusCode || 500);
                    });
            },
            validate: {
                payload: {
                    usuario: Joi.string().min(1).required(),
                    senha: Joi.string().min(1).max(140).required()
                }
            }
        }
    });

}
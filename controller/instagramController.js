var instaService = require('../service/instagramService.js');

module.exports = (server) => {
    server.route({
        method: 'GET',
        path: '/hello',
        handler: (request, reply) => {
            return reply({ teste: 'ok' }).code(500);
        }
    });

    server.route({
        method: 'POST',
        path: '/upload',
        handler: (request, reply) => {
            instaService.upload(request.body)
                .then(q => reply({ Upload: 'ok' }).code(200))
                .catch(err => reply({ err: err }).code(500));
        }
    });
}
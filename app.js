const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

require('./controller/instagramController.js')(server);

// Start the server
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('[Ionic Instagram] - Ativo :D | :', server.info.uri);
});
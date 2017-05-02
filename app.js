var webconfig = require('./webconfig.js');

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
    host: webconfig.urlApi,
    port: webconfig.portApi
});

require('./controller/instagramCtl.js')(server);
require('./controller/loginCtl.js')(server);

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('[Ionic Instagram] - Ativo :D | :', server.info.uri);
});
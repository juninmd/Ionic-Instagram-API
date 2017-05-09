var morgan = require('morgan');

module.exports = (app) => {
    app.use(morgan(':method | :status | HTTP :http-version | Resposta: :response-time ms | Data: :date[web] | URL: :url'));
};
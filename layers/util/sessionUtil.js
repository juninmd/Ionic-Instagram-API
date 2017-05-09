module.exports = {
    getUsuarioLogado: (req) => {
        var header = (req.headers['usuariologado'] || req.query.usuariologado);
        return JSON.parse(new Buffer(header, 'base64').toString()).user;
    }
};
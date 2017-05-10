var registerSrv = require('../service/registerSrv.js');
var registerVld = require('../validate/registerVld.js');

module.exports = (app) => {
    app.post('/register', (req, res) => {
        req.body.EMAIL = req.body.EMAIL.trim().toLowerCase();

        registerVld.validate(req.body, (err) => {
            if (err) {
                res.status(err.statusCode || 500).send(err);
                return;
            }

            registerSrv.insert(req.body)
                .then(q => res.status(200).send(q))
                .catch(err => {
                    return res.status(err.statusCode || 500).send(err);
                });
        });
    });
};
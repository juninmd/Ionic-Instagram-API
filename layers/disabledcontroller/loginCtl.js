var loginSrv = require('../service/loginSrv.js');
var loginVld = require('../validate/loginVld.js');

module.exports = (app) => {
    app.post('/login', (req, res) => {
        req.body.EMAIL = req.body.EMAIL.trim().toLowerCase();

        loginVld.validate(req.body, (err) => {
            if (err) {
                res.status(err.statusCode || 500).send(err);
                return;
            }

            loginSrv.get(req.body)
                .then(q => res.status(200).send(q))
                .catch(err => {
                    return res.status(err.statusCode || 500).send(err);
                });
        });
    });
};
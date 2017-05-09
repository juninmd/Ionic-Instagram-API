module.exports = (app) => {
    /**
     * Tratamento de expections
     */
    app.use((err, req, res, next) => {
        console.log(`-> Erro: ${err} | Cliente: ${req._remoteAddress} | URL: ${req.protocol + '://' + req.get('host') + req.originalUrl}`);

        if (res.headersSent || res.finished)
            return;

        res.status(500).send({
            message: {
                developerMessage: `-> Erro: ${err}`,
                userMessage: `Falha inesperada pela aplicação | erro interno`
            },
            content: null,
            isSuccess: false,
            details: {
                isUnexpectedError: true
            },
            statusCode: err.status || 500,
        });
          next();
    });
};

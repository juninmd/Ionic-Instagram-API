module.exports = {
    send: function (errors) {
        return {
            message: {
                developerMessage: 'Paramêtros header não são válidos!',
                userMessage: 'Alguns dados submetidos estão inválidos!',
                validation: errors
            },
            isSuccess: false,
            details: {
                isParamterError: true
            },
            statusCode: 400
        }
    }
}
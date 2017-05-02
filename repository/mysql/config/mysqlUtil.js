/**
 * Módulo de validações para a request message
 */
module.exports = {
    returnError: function (rm, statusCode, userMessage, developerMessage) {
        rm.content = null;
        rm.message = {
            developerMessage: developerMessage,
            userMessage: userMessage
        };
        rm.isSuccess = statusCode == 200;
        rm.statusCode = statusCode;
        return rm;
    }
};
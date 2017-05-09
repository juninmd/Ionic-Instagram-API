/**
 * Objeto Definido | Não alterar
 */
module.exports =
    /**
     * Retorno isSuccess é automático : 200 == success != error
     * statusCode, userMessage, developerMessage, content, package
     */
    function (statusCode, userMessage, developerMessage, content, package) {
        return {
            content: content,
            message: {
                developerMessage: developerMessage,
                userMessage: userMessage
            },
            package: package,
            isSuccess: statusCode == 200,
            statusCode: statusCode
        };
    };

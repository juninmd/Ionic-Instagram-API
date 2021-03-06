var request = require('request');

module.exports = {
    requestApi: (options) => {
        return new Promise((resolve, reject) => {
            request(options, (error, response) => {
                module.exports.validateRequest(error, response, options, (result) => {
                    if (!result.isSuccess) {
                        reject(result);
                    } else if (result.content && result.content.records.length > 0) {
                        resolve(result.content);
                    }
                    else {
                        resolve({ message: { userMessage: "Nenhuma informação foi retornada da sua Requisição!" } });
                    }
                })
            });
        });

    },
    validateRequest: (error, response, options, callback) => {
        options.headers = {};
        var RequestMessage = {
            content: {},
            message: {
                developerMessage: '',
                userMessage: ''
            },
            options: options,
            details: {
            },
            isSuccess: false,
            statusCode: 0
        };

        /**
         * Método responsável pelo callback ao método invocador
         * 
         * @param {any} statusCode
         * @param {any} message
         * @param {any} content
         */
        function sendApiResponse(statusCode, message, content, details) {
            statusCode = TratarStatusCode(statusCode);
            RequestMessage.isSuccess = statusCode == 200 || statusCode == 202;
            RequestMessage.statusCode = statusCode;
            RequestMessage.content = content;
            RequestMessage.message = message;
            if (details)
                RequestMessage.details = details;
            callback(RequestMessage);
            return;
        }

        try {
            if (error) {
                if (error.code == 'ECONNREFUSED') {
                    sendApiResponse(500, {
                        developerMessage: `A conexão foi recusada pelo servidor ${error.address}:${error.port}, aparentemente está off-line.`,
                        userMessage: 'Não conseguimos nos comunicar com alguma Api, tente novamente.'
                    }, error, { isApiError: true });
                    return;
                }
                else if (error.code !== 'ETIMEDOUT' && error.code !== 'ESOCKETTIMEDOUT') {
                    sendApiResponse(500, {
                        developerMessage: 'Erro não esperado pelo sistema',
                        userMessage: 'Ocorreu alguma falha inesperada em alguma api, tente novamente'
                    }, typeof (error) == "object" ? error : JSON.parse(error), { isApiError: true });
                    return;
                }
                else {
                    sendApiResponse(500, {
                        developerMessage: 'Time Out',
                        userMessage: 'Alguma api demorou mais do que o esperado para responder, tente novamente.'
                    }, null, { isApiError: true });
                    return;
                }
            }

            if (!response) {
                sendApiResponse(500, {
                    developerMessage: 'Falha inesperada',
                    userMessage: 'Erro na chamada de Api! Tente outra vez.'
                }, null, { isApiError: true });
                return;
            }

            if (response.headers && response.headers["content-type"].indexOf("application/json") !== 0) {
                sendApiResponse(500, {
                    developerMessage: 'O Content Type esperado é diferente do formato JSON',
                    userMessage: 'Erro na chamada de Api! Tente outra vez.'
                }, response.body, { isApiError: true });
                return;
            }

            if (response.statusCode != 200 && response.statusCode != 202) {
                if (typeof (response.body) == 'object') {
                    var json = response.body;
                }
                else {
                    var json = JSON.parse(response.body);
                }


                /**
                 * Entendemos que esse objeto é uma Request Message
                 * Assim retornamos o objeto inteiro.
                 */
                if (json.message && json.message.developerMessage && json.message.userMessage) {
                    callback(json);
                    return;
                }

                /**
               * Entendemos que esse objeto é um retorno válido Api
               * Assim adaptamos o seu retorno ao padrão Request Message
               */
                if (json.developerMessage && json.userMessage) {
                    sendApiResponse(response.statusCode, {
                        developerMessage: json.developerMessage,
                        userMessage: json.userMessage
                    }, json, { isApiError: true });
                    return;
                }

                sendApiResponse(500, {
                    developerMessage: response.body,
                    userMessage: 'Algum erro totalmente inesperado surgiu.'
                }, json, { isInexpectedError: true });
                return;
            }

            if (typeof (response.body) == 'object') {
                sendApiResponse(200, {}, response.body);
            }
            else {
                sendApiResponse(200, {}, JSON.parse(response.body));
            }

            return;
        }
        catch (err) {
            sendApiResponse(500, {
                developerMessage: err.message,
                userMessage: 'Falha não tratada no sistema.'
            }, err.message, { isSystemProblem: true });
        }
    }
};


function TratarStatusCode(status) {
    switch (status) {
        case 200:
            return 200
        case 202:
            return 202;
        case 404:
            return 404;
        case 304:
            return 304;
        case 204:
            return 204;
        case 401:
            return 401;
        case 400:
            return 400;
        default:
            return 500;
    }
}
var request = require('request');
var apiRequest = require('./apiRequest.js');
var webconfig = require('../webconfig.js');

module.exports = {
    uploadFile: (body) => {
        var options = {
            url: `${webconfig.apis.imgur.url}`,
            method: 'POST',
            headers: {
                'Authorization': webconfig.apis.imgur.token,
            },
            json: true,
            body: body,
            timeout: webconfig.apiRequestTimeout
        };
        return apiRequest.requestApi(options);
    },
    getImages: () => {

    }
}
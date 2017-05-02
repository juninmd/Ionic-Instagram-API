var instaApi = require('../api/imgurApi.js');
var upload = require('./uploadService.js');

module.exports = {
    // upload: () => {
    //     let body = {
    //         image: image_url,
    //         type: 'url',
    //         title: "WORKS"
    //     };
    //     return instaApi.uploadFile(body);
    // }
    upload: (body) => {
        return new Promise((resolve, reject) => {
            if (body.IMAGEM == null || body.IMAGEM.split(":")[0] == "http") {
                resolve({ message: { developerMessage: "A imagem não foi alterada, logo não foi feito um novo upload." } });
            }
            else {
                resolve(upload.upload(new Buffer(body.IMAGEM.split(",")[1], 'base64'), `Foto_${new Date().getTimezoneOffset()}.jpg`))
            }
        });
    }
}
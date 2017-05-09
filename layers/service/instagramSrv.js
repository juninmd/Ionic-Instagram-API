var instaApi = require('../api/imgurApi.js');
var upload = require('./uploadService.js');
var fotoRepository = require('../repository/mysql/fotoRepository.js');

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
                let body = { IDUSUARIO: 1, DESCRICAO: 'Nova Foto' };
                fotoRepository.insert(body)
                    .then(q => {
                        console.log(q);
                        return resolve(upload.upload(new Buffer(body.IMAGEM.split(",")[1], 'base64'), `Foto_${q}.jpg`))
                    })
                    .catch(err => {
                        return reject(err);
                    });
            }
        });
    }
}
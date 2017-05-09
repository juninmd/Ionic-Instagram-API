var fs = require('fs');

module.exports = {
    upload: (body) => {
        fs.writeFileSync(body.IMAGEM, __dirname + body.filename);
    }
};

var mysql = require('./config/initMysql.js');

module.exports = {
    getById: (id) => {
        return new Promise((resolve, reject) => {
            mysql.executeString("zqkajlxf", "SELECT * FROM usuario WHERE IDUSUARIO =  " + id,
                (err, result) => err ? reject(err) : resolve(result));
        });
    },
    getAll: () => {
        return new Promise((resolve, reject) => {
            mysql.executeString("zqkajlxf", "SELECT * FROM usuario ",
                (err, result) => err ? reject(err) : resolve(result));
        });
    },
    insert: (body) => {
        return new Promise((resolve, reject) => {
            mysql.execute("zqkajlxf", "INSERT INTO usuario SET ?", { NOME: body.NOME, SENHA: body.SENHA },
                (err, result) => err ? reject(err) : resolve(result));
        });
    },
    update: (body) => {
        return new Promise((resolve, reject) => {
            mysql.execute("zqkajlxf", "UPDATE usuario SET ? WHERE IDUSUARIO =" + body.IDUSUARIO, { IDUSUARIO: body.IDUSUARIO, NOME: body.NOME, SENHA: body.SENHA },
                (err, result) => err ? reject(err) : resolve(result));
        });
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            mysql.executeString("zqkajlxf", "DELETE FROM usuario WHERE IDUSUARIO =" + id,
                (err, result) => err ? reject(err) : resolve(result));
        });
    },
};

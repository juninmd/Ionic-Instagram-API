var mysql = require('./config/initMysql.js');

module.exports = {
    getById: (id) => {
        return new Promise((resolve, reject) => {
            mysql.executeString("MYSQL", `SELECT * FROM usuario WHERE IDUSUARIO = '${id}'`,
                (err, result) => err ? reject(err) : resolve(result.content));
        });
    },
    getAll: () => {
        return new Promise((resolve, reject) => {
            mysql.executeString("MYSQL", "SELECT * FROM usuario ",
                (err, result) => err ? reject(err) : resolve(result));
        });
    },
    insert: (body) => {
        return new Promise((resolve, reject) => {
            mysql.execute("MYSQL", "INSERT INTO usuario SET ?", { NOME: body.NOME, SENHA: body.SENHA },
                (err, result) => err ? reject(err) : resolve(result));
        });
    },
    update: (body) => {
        return new Promise((resolve, reject) => {
            mysql.execute("MYSQL", "UPDATE usuario SET ? WHERE IDUSUARIO =" + body.IDUSUARIO, { IDUSUARIO: body.IDUSUARIO, NOME: body.NOME, SENHA: body.SENHA },
                (err, result) => err ? reject(err) : resolve(result));
        });
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            mysql.executeString("MYSQL", "DELETE FROM usuario WHERE IDUSUARIO =" + id,
                (err, result) => err ? reject(err) : resolve(result));
        });
    },
};

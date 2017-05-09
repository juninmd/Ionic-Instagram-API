var mysql = require('./config/initMysql.js');

module.exports = {
    getById: (EMAIL) => {
        return new Promise((resolve, reject) => {
            mysql.executeString("MYSQL", `SELECT * FROM usuario WHERE EMAIL = '${EMAIL}'`,
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
            mysql.execute("MYSQL", "INSERT INTO usuario SET ?", { EMAIL: body.EMAIL, NOME: body.NOME, SENHA: body.SENHA },
                (err, result) => err ? reject(err) : resolve(result));
        });
    },
    update: (body) => {
        return new Promise((resolve, reject) => {
            mysql.execute("MYSQL", "UPDATE usuario SET ? WHERE EMAIL =" + body.EMAIL, { EMAIL: body.EMAIL, NOME: body.NOME, SENHA: body.SENHA },
                (err, result) => err ? reject(err) : resolve(result));
        });
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            mysql.executeString("MYSQL", "DELETE FROM usuario WHERE EMAIL =" + id,
                (err, result) => err ? reject(err) : resolve(result));
        });
    },
};

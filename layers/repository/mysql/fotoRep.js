var mysql = require('./config/initMysql.js');

module.exports = {
    getById: (id) => {
        return new Promise((resolve, reject) => {
            mysql.executeString("MYSQL", "SELECT * FROM foto WHERE IDFOTO =  " + id,
                (err, result) => err ? reject(err) : resolve(result));
        });
    },
    getAll: () => {
        return new Promise((resolve, reject) => {
            mysql.executeString("MYSQL", "SELECT * FROM foto ",
                (err, result) => err ? reject(err) : resolve(result));
        });
    },
    insert: (body) => {
        return new Promise((resolve, reject) => {
            mysql.execute("MYSQL", "INSERT INTO foto SET ?", { IDUSUARIO: body.IDUSUARIO, DESCRICAO: body.DESCRICAO, DATA: new Date() },
                (err, result) => err ? reject(err) : resolve(result));
        });
    },
    update: (body) => {
        return new Promise((resolve, reject) => {
            mysql.execute("MYSQL", "UPDATE foto SET ? WHERE IDFOTO =" + body.IDFOTO, { IDFOTO: body.IDFOTO, IDUSUARIO: body.IDUSUARIO, DESCRICAO: body.DESCRICAO, DATA: body.DATA },
                (err, result) => err ? reject(err) : resolve(result));
        });
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            mysql.executeString("MYSQL", "DELETE FROM foto WHERE IDFOTO =" + id,
                (err, result) => err ? reject(err) : resolve(result));
        });
    },
};

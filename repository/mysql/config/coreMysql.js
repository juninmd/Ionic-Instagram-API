var mysqlUtil = require('./mysqlUtil.js');
var mysql = require('mysql');

module.exports = function (connection) {
    var modules = {};

    modules.executeString = function (rm, query, callback) {
        executeString(connection, rm, query, callback);
    },
        modules.executeProcedure = function (rm, array, callback) {
            executeProcedure(connection, rm, array, callback);
        },
        modules.readProcedure = function (rm, array, callback) {
            readProcedure(connection, rm, array, callback);
        },
        modules.execute = function (rm, table, object, callback) {
            execute(connection, rm, table, object, callback);
        },
        modules.executeTransaction = function (rm, table, object, callback) {
            executeTransaction(connection, rm, table, object, callback);
        }
    modules.connection = () => {
        return connection;
    }

    return modules;
};

function execute(connection, rm, table, object, callback) {
    connection.query(table, object, function (err, info) {
        if (err) {
            connection.end();
            callback(mysqlUtil.returnError(rm, 500, "Ocorreu uma falha ao submeter os dados.", err.message), null);
            return;
        }
        else {
            if (info.affectedRows == 0) {
                connection.end();
                callback(mysqlUtil.returnError(rm, 500, "Ocorreu uma falha ao submeter os dados.", "Registro não foi inserido."), null);
                return;
            }
            else {
                connection.end();
                callback(null, { metaData: [], content: info.insertId });
                return;
            }
        }
    });
}

//Retorna a conexão no callback
function executeTransaction(connection, rm, table, object, callback) {
    connection.query(table, object, function (err, info) {
        if (err) {
            connection.rollback();
            connection.end();
            callback(mysqlUtil.returnError(rm, 500, "Ocorreu uma falha ao submeter os dados.", err.message), null);
            return;
        }
        else {
            if (info.affectedRows == 0) {
                connection.rollback();
                connection.end();
                callback(mysqlUtil.returnError(rm, 500, "Ocorreu uma falha ao submeter os dados.", "Registro não foi inserido."), null);
                return;
            }
            else {
                callback(null, { metaData: [], content: info.insertId, message: info.message, connection: connection });
                return;
            }
        }
    });
}

function executeString(connection, rm, query, callback) {
    connection.query(query, function (err, rows, fields) {
        if (err) {
            connection.end();
            callback(mysqlUtil.returnError(rm, 500, "Ocorreu uma falha ao submeter os dados.", err.message), null);
            return;
        }
        else {
            if (rows.length == 0) {
                connection.end();
                callback(null, { metaData: [], content: [] });
                return;
            }
            connection.end();
            callback(null, { metaData: fields, content: rows });
        }
    });
}

function executeProcedure(connection, rm, array, callback) {
    connection.query('CALL ?? (?)', [rm.package, array], (err, result) => {
        if (err) {
            connection.end();
            callback(mysqlUtil.returnError(rm, 500, "Ocorreu uma falha ao submeter os dados.", err.message), null);
            return;
        }
        else {
            connection.commit();
            if (result.affectedRows == 1) {
                connection.end();

                callback(null, { metaData: [], content: { retorno: 'OK', Id: result.insertId } });
                return;
            }
            else {
                connection.end();
                callback(mysqlUtil.returnError(rm, 500, "Ocorreu uma falha ao submeter os dados.", "O registro não foi adicionado."), null);
            }
        }
    });
}
function readProcedure(connection, rm, array, callback) {
    connection.query('CALL ?? (?)', [rm.package, array], (err, result) => {
        if (err) {
            connection.end();
            callback(mysqlUtil.returnError(rm, 500, "Ocorreu uma falha ao submeter os dados.", err.message), null);
            return;
        }
        else {

            connection.end();
            callback(null, { content: result[0] });
        }
    });
}


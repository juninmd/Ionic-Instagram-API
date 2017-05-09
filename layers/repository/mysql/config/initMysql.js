var mysql = require('mysql');
var requestMessage = require("./requestMessage.js");
var webconfig = require('../../../webconfig.js');
 
module.exports = {
    executeString: function (databaseName, query, callback) {
        executeString(databaseName, query, callback);
    },
    execute: function (databaseName, table, object, callback) {
        execute(databaseName, table, object, callback);
    },
    executeProcedure: function (databaseName, procedure, array, callback) {
        executeProcedure(databaseName, procedure, array, callback)
    },
    readProcedure: function (databaseName, procedure, array, callback) {
        readProcedure(databaseName, procedure, array, callback)
    },
    iniciaTransaction: (databaseName) => {
        return iniciaTransaction(databaseName);
    },
    executeTransaction: (connection, table, object) => {
        return executeTransaction(connection, table, object)
    },
}

function execute(databaseName, table, object, callback) {
    var rm = requestMessage(200, '', '', '', table);
    var mysql = MySqlInit(databaseName);
    mysql.execute(rm, table, object, callback);
}

function executeString(databaseName, query, callback) {
    var rm = requestMessage(200, '', '', '', query);
    var mysql = MySqlInit(databaseName);
    mysql.executeString(rm, query, callback);
}

function executeProcedure(databaseName, procedure, array, callback) {
    var rm = requestMessage(200, '', '', array.toString(), procedure);
    var mysql = MySqlInit(databaseName);
    mysql.executeProcedure(rm, array, callback);
}

function readProcedure(databaseName, procedure, array, callback) {
    var rm = requestMessage(200, '', '', array.toString(), procedure);
    var mysql = MySqlInit(databaseName);
    mysql.readProcedure(rm, array, callback);
}

function iniciaTransaction(databaseName) {
    return new Promise((resolve, reject) => {
        var connection = MySqlInit(databaseName);
        connection.connection().beginTransaction((err) => {
            if (err) {
                reject(err);
                return;
            }
            else {
                resolve(connection.connection());
            }
        });
    });
}
function executeTransaction(connection, table, object) {
    return new Promise((resolve, reject) => {
        var rm = requestMessage(200, '', '', object, table);
        require("./coreMysql.js")(connection).executeTransaction(rm, table, object, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}



/** Funcionalidade:
 * Função private responsável pela conexão ao banco de dados
 * com ela fazemos a devida tratativa da conexão.
 * 
 * Paramêtros:
 * Nome do Database | Callback
 */
function MySqlInit(databaseName) {
    try {
        var connection = mysql.createConnection(webconfig.dataConfig[databaseName]);
        connection.connect();
        return require("./coreMysql.js")(connection);
    } catch (ex) {
        throw ex;
    }
}
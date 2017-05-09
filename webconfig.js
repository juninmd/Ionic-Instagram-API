module.exports = {
    urlApi: 'http://localhost',
    portApi: process.env.PORT || 4500,
    dataConfig: {
        MYSQL: getBanco()
    }
};
function getBanco() {
    if (process.env.DEBUG) {
        console.log("[MYSQL] Conectado a localhost");
        return {
            host: 'localhost',
            user: 'root',
            database: 'instagram',
            password: '',
            port: 5500
        }
    }

    console.log("[MYSQL] Connection Free");
    return {
        host: 'sql10.freemysqlhosting.net',
        user: 'sql10173456',
        database: 'sql10173456',
        password: '9bG3ZVW76Y',
        port: 3306
    }
}

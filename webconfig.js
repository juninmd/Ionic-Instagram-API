module.exports = {
    urlApi: 'http://localhost',
    portApi: process.env.PORT || 4500,
    dataConfig: {
        MYSQL: getDB()
    }
};

function getDB(bool) {
    if (bool) {
        return {
            host: 'mysql8.db4free.net',
            user: 'zqkajlxf',
            database: 'zqkajlxf',
            password: 'zqkajlxf@eelmail.com',
            port: 3307
        }
    }
    return {
        host: 'localhost',
        user: 'root',
        database: 'instagram',
        password: '',
        port: 5500
    };
}

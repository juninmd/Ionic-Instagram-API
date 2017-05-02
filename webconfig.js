module.exports = {
    apis: {
        imgur: {
            url: 'https://api.imgur.com/3/',
            token: 'Bearer 13db359d4e61fd9b0ea31a57ea8db7384b6ffd8c',
        }
    },
    apiRequestTimeout: 3500,
    urlApi: 'localhost',
    portApi: process.env.PORT || 8000,
    dataConfig: {
        MYSQL: {
            host: 'mysql8.db4free.net',
            user: 'zqkajlxf',
            database: 'zqkajlxf',
            password: 'zqkajlxf@eelmail.com',
            port: 3307
        },
    }
};
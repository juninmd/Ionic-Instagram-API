var loginSrv = require('../service/loginSrv.js');
var loginVld = require('../validate/loginVld.js');

module.exports = (app) => {
    app.post('/instagram', (req, res) => {
        if (app.local.instagram == null) {
            app.local.instagram = [];
        }

        app.local.instagram.push({
            "ID": req.body.ID || "neymarjr",
            "FOTOPERFIL": req.body.FOTOPERFIL || "https://instagram.fplu1-1.fna.fbcdn.net/t51.2885-19/s150x150/17125864_609085729286427_4729609031348387840_a.jpg",
            "DESCRICAO": "NOVA FOTO!",
            "DATA": new Date(),
            "CURTIDAS": "0",
            "COMENTARIOS": [
            ],
            "URL": req.body.URL
        });

        res.status(200).send(app.local.instagram);
    });
    app.get('/instagram', (req, res) => {
        let q = [
            {
                "ID": "neymarjr",
                "FOTOPERFIL": "https://instagram.fplu1-1.fna.fbcdn.net/t51.2885-19/s150x150/17125864_609085729286427_4729609031348387840_a.jpg",
                "DESCRICAO": "Deus é TOP!",
                "DATA": new Date(),
                "CURTIDAS": "0",
                "COMENTARIOS": [
                ],
                "URL": "http://blogs.odiario.com/inforgospel/wp-content/uploads/sites/6/2015/06/neymar-agradece-a-Jesus-pela-vitoria-na-liga-dos-campeoes-2015-a.jpg"
            },
            {
                "ID": "jr_acn",
                "FOTOPERFIL": "https://instagram.fplu1-1.fna.fbcdn.net/t51.2885-19/s150x150/18382021_353256151743489_3605989215269027840_a.jpg",
                "DESCRICAO": "#Partiu #Assistir #Filme #Liga!",
                "DATA": new Date(),
                "CURTIDAS": "555",
                "COMENTARIOS": [
                    {
                        "ID": "prideofgypsies",
                        "FOTOPERFIL": "https://instagram.fplu1-1.fna.fbcdn.net/t51.2885-19/11248838_873218356092636_1231690214_a.jpg",
                        "COMENTARIO": "Melhor filme do ano!"
                    },
                    {
                        "ID": "gal_gadot",
                        "FOTOPERFIL": "https://instagram.fplu1-1.fna.fbcdn.net/t51.2885-19/s150x150/17882610_1302382303183296_7289216107322277888_a.jpg",
                        "COMENTARIO": "Vocês vão se surpreender"
                    }
                ],
                "URL": "http://img.cinemablend.com/cb/d/3/1/d/6/9/d31d696881fbf9fe0e9800a6af80de6d2de696babcfa2790f5b8d585da18d0af.jpg"
            },
            {
                "ID": "twhiddleston",
                "FOTOPERFIL": "https://instagram.fplu1-1.fna.fbcdn.net/t51.2885-19/s150x150/16789166_1850562905199522_1062759373580795904_a.jpg",
                "DESCRICAO": "Mais que irmãos, brothers!!!",
                "DATA": new Date(),
                "CURTIDAS": "0",
                "COMENTARIOS": [
                ],
                "URL": "https://instagram.fplu1-1.fna.fbcdn.net/t51.2885-15/e35/13643630_1084810748221153_1799496662_n.jpg"
            },
            {
                "ID": "jairmessiasbolsonaro",
                "FOTOPERFIL": "https://instagram.fplu1-1.fna.fbcdn.net/t51.2885-19/s150x150/14499097_1784967618408690_8846951525256265728_a.jpg",
                "DESCRICAO": "#partiu #pescar",
                "DATA": new Date(),
                "CURTIDAS": "3",
                "COMENTARIOS": [
                ],
                "URL": "https://marligo.files.wordpress.com/2010/11/jair_bolsonaro_robalo.jpg"
            },
        ];

        if (app.local.instagram == null) {
            app.local.instagram = q;
        }
        res.status(200).send(app.local.instagram);
    });
};
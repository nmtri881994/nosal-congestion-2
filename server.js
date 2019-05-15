const express = require('express');
const expressGraphQL = require('express-graphql');
const next = require('next');
const https = require('https');
const http = require('http');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const nextI18NextMiddleware = require('next-i18next/middleware')

const nextI18next = require('./configs/i18next');

const dev = process.env.NODE_ENV != 'production';
const app = next({ dev });
const handle = app.getRequestHandler();


const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Post = require('./server_src/models/Post')

const loginRouter = require('./server_src/routes/login');
const userRouter = require('./server_src/routes/user');
const postRouter = require('./server_src/routes/post');

const postGraphQLSchema = require('./server_src/graphQLSchema/postSchema');

const options = {
    key: fs.readFileSync('server_src/self_signed_certificate/client-key.pem'),
    cert: fs.readFileSync('server_src/self_signed_certificate/client-cert.pem')
};

const config = require('./server_src/config/appConfigs');

function change_alias_and_remove_space(alias) {
    let str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    str = str.replace(/ + /g, " ");
    str = str.trim();
    return str.split(" ").join("-");
};

function getPostNameByLangForURL(postNameParsedText, targetlang, originalLang) {
    let nameByLang = "";
    postNameParsedText.map(textItem => {
        if (textItem.text[targetlang]) {
            nameByLang = nameByLang.concat(textItem.text[targetlang]);
        } else {
            nameByLang = nameByLang.concat(textItem.text[originalLang]);
        }
    });

    return change_alias_and_remove_space(nameByLang);
}

app
    .prepare()
    .then(() => {
        const server = express();

        server.use(bodyParser.urlencoded({ extended: false, limit: '50MB' }));
        server.use(bodyParser.json({ limit: '50MB' }));

        // server.use(function (req, res, next) {

        //     // Website you wish to allow to connect
        //     res.setHeader('Access-Control-Allow-Origin', '*');

        //     // Request methods you wish to allow
        //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        //     // Request headers you wish to allow
        //     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');

        //     // Set to true if you need the website to include cookies in the requests sent
        //     // to the API (e.g. in case you use sessions)
        //     res.setHeader('Access-Control-Allow-Credentials', true);

        //     // Pass to next layer of middleware
        //     next();
        // });

        server.use(cors());

        server.use('/server/auth', loginRouter);
        server.use('/server/user', userRouter);
        server.use('/server/post', postRouter);
        server.use('/server/post-graphql', expressGraphQL({
            schema: postGraphQLSchema,
            graphiql: true
        }));

        server.use(express.static('static/public'));
        server.use(express.static('static/system'));

        server.use(nextI18NextMiddleware(nextI18next));

        server.get('/admin/translate/ls/:postName/:postID/:lang', (req, res) => {
            Post.findById(req.params.postID)
                .then(post => {
                    const postNameForURL = getPostNameByLangForURL(post.detail.name.parsedText, req.params.lang, post.detail.originalLanguage);
                    const actualPage = "/admin/translate/language-version";
                    const queryParams = {
                        postName: postNameForURL,
                        lang: req.params.lang,
                        postID: req.params.postID
                    };
                    app.render(req, res, actualPage, queryParams);
                })
                .catch(error => {
                    console.log(error);
                    const actualPage = "/_error";
                    app.render(req, res, actualPage);
                })

        })

        server.get('/p/:postName/:postID/:lang', (req, res) => {
            console.log(1);
            Post.findById(req.params.postID)
                .then(post => {
                    console.log(2);
                    const postNameForURL = getPostNameByLangForURL(post.detail.name.parsedText, req.params.lang, post.detail.originalLanguage);
                    const actualPage = "/post";
                    const queryParams = {
                        postName: postNameForURL,
                        lang: req.params.lang,
                        postID: req.params.postID
                    };
                    console.log(queryParams);
                    app.render(req, res, actualPage, queryParams);
                })
                .catch(error => {
                    console.log(error);
                    const actualPage = "/_error";
                    app.render(req, res, actualPage);
                })


            // const actualPage = "/post";
            // const queryParams = {
            //     postName: req.params.postName,
            //     lang: req.params.lang,
            //     postID: req.params.postID
            // };
            // app.render(req, res, actualPage, queryParams);
        })

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        // https.createServer(options, server).listen(443, config.server_ip, (err) => {
        //     if (err) throw err;
        //     console.log(`> Server ready on https://${config.server_ip}`);
        // });

        server.listen(4000, err => {
            if (err) throw err;
            console.log(`> Server ready on http://${config.server_ip}:4000`);
        });

    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });

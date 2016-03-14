var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var http = require('http');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-locals');
var settings = require('./settings');
/*
//session存入mongoDB中(存在bug)
var MongoStore = require('connect-mongo')(session);
app.use(session({
 secret: settings.cookieSecret,
 expires:0,
 key: settings.db,//cookie name
 store: new MongoStore({
 db: settings.db,
 host: settings.host,
 port: settings.port,
 url : settings.url
 })
 }));*/

var port = process.env.PORT || 3000;
var app = express();

//视图引擎
app.engine('ejs', engine);
app.set('views',['./app/show/views/pages','./app/admin/views']);
app.set('view engine', 'ejs');

//指定静态资源
app.use(express.static(path.join(__dirname, 'public')));

//http请求体中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));

//cookie,session中间件
app.use(cookieParser());
var cookieSession = require('cookie-session');
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}))

//日志
var log4js = require('log4js');
log4js.configure({
    appenders: [
        { type: 'console' }, //控制台输出
        {
            type: 'file', //文件输出
            filename: 'logs/access.log',
            maxLogSize: 1024,
            backups:3,
            category: 'normal'
        }
    ],
    replaceConsole: true
});
var logger = log4js.getLogger('normal');
app.use(log4js.connectLogger(logger, {level: 'auto', format:':method :url'}));

//路由
var route = require('./routes/index');
new route(app).run();
app.listen(port);
console.log("server listen to port:%s",port);





var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var http = require('http');
var bodyParser = require('body-parser');
var logger = require('./common/logger');
var config = require('./config');
var redisStore = require('connect-redis')(session);
var app = express();





//视图引擎
app.set('views', ['./app/show/views/pages','./app/admin/views']);
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));
app.enable('trust proxy');


//指定静态资源
app.use(express.static(path.join(__dirname, 'public')));

//http请求体中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));

//cookie,session中间件
app.use(cookieParser(config.session_secret));
app.use(session({
    secret: config.session_secret,
    store: new redisStore({
        port: config.redis_port,
        host: config.redis_host,
    }),
    resave: true,
    saveUninitialized: true,
}));


//路由
var route = require('./routes/index');
var cache = require('./common/cache');
new route(app);

var onlineUsers = [];


var server = http.createServer(app);
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){
    socket.on('chat', function(msg){
        var data = JSON.parse(msg);
        var responese = {
            icon:15,
            msg:data.msg
        };
        console.log(cache.toString());
        io.emit('message', responese);
    });
    socket.on('disconnect', function() {
        console.log("disconnect");
    });
});

server.listen(config.port);
console.log("server listen to port:%s",config.port);

module.exports = app;
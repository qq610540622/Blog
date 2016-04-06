var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var http = require('http');
var errorhandler = require('errorhandler');
var bodyParser = require('body-parser');
var logger = require('./common/logger');
var config = require('./config');
var csrf = require('csurf');
var auth = require("./middlewares/auth");
var RedisStore = require('connect-redis')(session);
var cluster = require('cluster');
var _ = require('lodash');
var loader = require('loader');
var csurf = require('csurf');

var app = express();
//视图引擎
app.set('views', ['./app/show/views/pages','./app/admin/views']);
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));
app.enable('trust proxy');

//指定静态资源
app.use(express.static(path.join(__dirname, 'public')));
_.extend(app.locals, {
	config: config,
	loader: loader
});

//http请求体中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '50mb',extended: false }));

//cookie,session中间件
app.use(cookieParser(config.session_secret));
//redis保存session
app.use(session({
	secret: config.session_secret,
	store: new RedisStore({
		port: config.redis_port,
		host: config.redis_host
	}),
	resave: true,
	saveUninitialized: true
}));

//自定义中间件
app.use(auth.authPermission);

//当不是调试环境则启用csrf
if(!config.debug) {
	//csrf
	app.use(function (req, res, next) {
		if (req.path.indexOf('/api') === -1 && req.path.indexOf('/admin') === -1) {
			csurf()(req, res, next);
			return;
		}
		next();
	});
	app.use(function(req, res, next) {
		res.locals.csrf = req.csrfToken ? req.csrfToken() : '';
		next();
	});
}

//路由
var route = require('./routes/index');
new route(app);

// error handler
if (config.debug) {
	app.use(errorhandler());
} else {
	app.use(function (err, req, res, next) {
		logger.error(err);
		return res.render("error");
	});
}

//在线用户
var onlineUsers = {};
//当前在线人数
var onlineCount = 0;
var server = http.createServer(app);
var io = require('socket.io').listen(server);
io.on('connection', function(socket){
	socket.on('login', function(obj){
		console.log("login");
		var result = {};
		socket.name = obj.userid;
		if(!onlineUsers.hasOwnProperty(obj.userid)) {
			onlineUsers[obj.userid] = obj.username;
			onlineCount++;
		}
		result.onlineUsers = onlineUsers;
		result.onlineCount = onlineCount;
		result.user = obj;
		io.emit('login', result);
	});

	socket.on('message', function(obj){
		io.emit('message', obj);
	});

	socket.on('disconnect', function(){
		if(onlineUsers.hasOwnProperty(socket.name)) {
			var obj = {userid:socket.name, username:onlineUsers[socket.name]};
			delete onlineUsers[socket.name];
			onlineCount--;
			io.emit('logout', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
		}
	});
});

server.listen(config.port);
console.log("server listen to port:%s",config.port);
module.exports = app;
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var http = require('http');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-locals');
var settings = require('./settings');
//var MongoStore = require('connect-mongo')(session);


var port = process.env.PORT || 3000;
var app = express();
app.engine('ejs', engine);
app.set('views',['./app/show/views/pages','./app/admin/views']);
app.set('view engine', 'ejs');


app.use(cookieParser());                      //cookie
app.use(bodyParser.json());

/*app.use(session({
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var cookieSession = require('cookie-session');
app.use(cookieSession({
    keys: ['secret1', 'secret2']
}));

require('./routes/index')(app);
app.listen(port);
console.log("server listen to port:%s",port);



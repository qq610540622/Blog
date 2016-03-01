/**
 * Created by Administrator on 2016-01-28.
 */
var mongoose = require('mongoose');
var settings = require('../settings');
var fs = require('fs');


mongoose.connect(settings.connectionstring);

var db = mongoose.connection;
db.on('error', function(err){
    console.error('connect to %s error: ', settings.connectionstring, err.message);
    process.exit(1);
});
db.once('open', function () {
    console.log('%s has been connected.', settings.connectionstring);
});
var models_path = __dirname + '/mapping'

fs.readdirSync(models_path).forEach(function (file) {
    var modelName = file.replace('.js', '');
    require(models_path + '/' + modelName);
    exports[modelName] = mongoose.model(modelName);
});

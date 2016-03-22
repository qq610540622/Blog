/**
 * Created by Administrator on 2016-01-28.
 */
var mongoose = require('mongoose');
var config = require('../config');
var fs = require('fs');


mongoose.connect(config.db);

var db = mongoose.connection;
db.on('error', function(err){
    console.error('connect to %s error: ', config.db, err.message);
    process.exit(1);
});
db.once('open', function () {
    console.log('%s has been connected.', config.db);
});
var models_path = __dirname + '/mapping'

fs.readdirSync(models_path).forEach(function (file) {
    var modelName = file.replace('.js', '');
    require(models_path + '/' + modelName);
    exports[modelName] = mongoose.model(modelName);
});

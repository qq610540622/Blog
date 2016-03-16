var mongoose = require("mongoose");
var mongoosePaginate = require('mongoose-paginate');
var schema = new mongoose.Schema({
    username:String,
    password:String,
    status:{type:Number,default:0},
    type:{type:Number,default:0},
    icon:{type:Number,default:1}
}, {collection : 'user'});
schema.plugin(mongoosePaginate);
var user = mongoose.model('user', schema);
exports = user;

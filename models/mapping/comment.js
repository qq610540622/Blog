var mongoose = require("mongoose");
var mongoosePaginate = require('mongoose-paginate');
var schema = new mongoose.Schema({
    content:String,
    articleId:String,
    commitTime:Number,
    username:String,
    supportCount:{type:Number,default:0},
    icon:Number,
    status:{type:Number,default:0},
    reply:[]
}, {collection : 'comment'});
schema.plugin(mongoosePaginate);
var user = mongoose.model('comment', schema);
exports = user;



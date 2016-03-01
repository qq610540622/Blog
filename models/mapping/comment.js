

var mongoose = require("mongoose");
var schema = new mongoose.Schema({
    content:String,
    articleId:String,
    commentTime:Number,
    parentId:String,
    username:String,
    supportCount:{type:Number,default:0},
    icon:Number,
    status:{type:Number,default:0}
}, {collection : 'comment'});
var user = mongoose.model('comment', schema);
exports = user;


